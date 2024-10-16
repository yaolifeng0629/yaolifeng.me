## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## JavaScript中eval和with语句如何影响作用域链：探索深度知识

### 前言
-   在上篇文章中，我们介绍了深度剖析了[作用域](https://mp.weixin.qq.com/s/zfTTVsgBRjoOk0Sm6Scb2w)，并将其定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进行变量查找。
    -   上篇文章入口：`JavaScript作用域深度剖析：从局部到全局一网打尽: https://mp.weixin.qq.com/s/zfTTVsgBRjoOk0Sm6Scb2w`
-   而作用域一共分为两种：`词法作用域` 和 `动态作用域`, 而本篇文章我们将深入 `词法作用域`，让我们一起来了解一下吧。
### 2.1 词法阶段
-   简单来说，`词法作用域就是定义在词法阶段的作用域`。换句话说，词法作用域是由你在写代码时将变量和块作用域写在哪里决定的。
![](https://s1.locimg.com/2023/05/16/16be0b0bac3b3.png);
-   上述代码作用域：
    1.  包含着整个全局作用域，其中只有一个标识符: foo
    2.  包含着 foo 所创建的作用域，其中有三个标识符: a、bar、b
    3.  包含着 bar 所创建的作用域，其中只有一个标识符：c
-   在此，只要假设每个函数都会创建一个新的作用域气泡即可。
-   记住：`作用域查找会在找到第一个匹配的标识符时停止`。在多层的嵌套作用域中可定义同名的标识符，这叫做"`遮蔽效应`"(内部标识符 "遮蔽" 了外部的标识符)。
-   **作用域查找规则**：`作用域查找始终从运行时所处的最内部作用域开始，逐级向外或者说向上进行，直到遇见第一个匹配的标识符为止。`
-   **无论函数在哪里被调用，或如何被调用，它的词法作用域都只由函数被声明时所处的位置决定**。
```js
function foo(a) {
    var b = a * 2;
    function bar(c) {
        console.log(a, b, c);
    }
    bar(b * 3);
}
foo(2); // 2 4 12
```
-   词法作用域只会查找一级标识符，比如a、b、c。如果代码中引用了 foo.bar.baz, 词法作用域查找只会试图查找 foo 标识符，找到这个变量后，对象属性访问规则会分别接管与 bar 和 baz 属性的访问。

### 2.2 欺骗词法
-   JavaScript 有两种机制来实现这个目的。
#### 2.2.1 eval(不推荐使用)
-   JS 中的 `eval(...)` 函数可接收一个字符串作为参数。换句话说，在此位置写的内容就好像是写在那个位置上的代码一样。根据这个原理来理解 `eval(...)` 它是如何通过代码欺骗和假装成书写时代码就在那，来实现修改词法作用域环境的。
-   在执行 `eval(...)` 之后的代码时，引擎并不 知道 或 在意 前面的代码是否以动态形式插入进来的，并对词法作用域的环境进行修改的。引擎只会如往常地进行此法作用域查找。
```js
function foo(str, a) {
    eval(str); // 欺骗！
    console.log(a, b); // 1 3
}
var b = 2;
foo("var b = 3;", 1);
```
-   `eval(...)` 调用中的 `var b = 3;` 这段代码就会被当做本来就在那里一样来处理。由于这段代码声明了一个新的变量 b,因此它对已经存在的 `foo(...)` 词法作用域进行了修改。事实上，这段代码再 `foo(...)` 内部创建了一个变量 b,并遮蔽了外部(全局)作用域中的同名变量。
-   当执行 `console.log(...) `时，会在 `foo(...)` 的内部找到 a 和 b，但永远无法找到外部的 b。因此会输出 1, 3, 而不是正常情况下输出的 1, 2。
-   默认情况下，`eval(...)`中所执行的代码中包含一个或多个声明(无论是变量还是函数),都会对 `eval(...)` 所处的词法作用域进行修改。
-   **严格模式下**：**`eval(...)`在运行时有着自己的词法作用域，意味着其中的声明无法修改所在的作用域。**
```js
function foo(str) {
    'use strict';
    eval(str);
    console.log(a); // ReferenceError: a is not defined
}
foo("var b = 3;");
```

#### 2.2.2 with(不推荐使用)
-   with 通常被当做重复引用同一个对象中多个属性的快捷方式。
```js
var obj = {
    a: 1,
    b: 2,
    c: 3
};

// 单调乏味的重复"obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;

// 简单的快捷方式
with (obj) {
    a = 3;
    b = 4;
    c = 5;
}
```
-   其实不仅仅是为了方便访问对象属性，例如：
```js
function foo(obj) {
    with (obj) {
        a = 2;
    }
}
var o1 = {
    a: 3
};
var o2 = {
    b: 3
};

foo( o1 );
console.log( o1.a ); // 2

foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2——不好，a 被泄漏到全局作用域上了！
```
-   这个例子中创建了 o1、o2 两个对象，其中一个具有 a 属性，另一个没有。`foo(...)` 函数接收一个 obj 参数，该参数是一个对象引用，并对这个对象引用执行了 `with(obj){...}`。在 with 内部，只是对变量 a 进行了简单的词法引用，实际上就是一个 [LHS](https://mp.weixin.qq.com/s/zfTTVsgBRjoOk0Sm6Scb2w), 并将 2 复制给了它。
-   当我们将 o1 传递进去，a = 2 赋值操作找到了 o1.a 并将 2 赋值给它，这在后面的console.log(o1.a) 中可以体现出来。`而当 o2 传递进去，o2 没有 a 属性，因此不会创建一个属性，o2.a 保持 undefined。`
-   但是可以注意到一个奇怪的`副作用`，`实际上 a = 2 赋值操作创建了一个全局的变量 a。这是怎么回事？`
    -   `with 可将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域`,因此这个对象的属性会被处理为定义在这个作用域中的词法标识符。
    -   `尽管 with 块可将一个对象处理为词法作用域，但这个块内中正常的 var 声明并不会被限制在这个块的作用域中，而是被添加到 with 所处的函数作用域中。`

-   **eval 与 with 的区别？**
    -   `eval(...)` 函数接收一个或多个声明的代码，`会修改其所处的词法作用域`，而 with 声明实际上是根据你传递给它的对象凭空`创建一个全新的词法作用域`。

-   另外不推荐使用 `eval(...)` 和 `with(...){...}` 的原因是会被严格模式所影响(限制)。with 被完全禁止，而在保留核心功能的前提下，间接或非安全地使用 `eval(...)` 也被禁止了。

#### 2.2.3 性能
-   你可能会问，如果他们能实现更复杂的功能，并且代码更具有扩展性，难道不是非常好的功能吗？答案是否定的。
-   `JavaScript 引擎`会在`编译阶段`进行数项的`性能优化`。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。
-   但如果引擎在代码中发现了 `eval(..) 或 with`，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道 eval(..) 会接收到什么代码，这些代码会如何对作用域进行修改，也无法知道传递给 with 用来创建新词法作用域的对象的内容到底是什么。
-   `最悲观的情况是如果出现了 eval(..) 或 with，所有的优化可能都是无意义的，因此最简单的做法就是完全不做任何优化。`
-   如果代码中大量使用 eval(..) 或 with，那么运行起来一定会变得非常慢。无论引擎多聪明，试图将这些悲观情况的副作用限制在最小范围内，也无法避免如果没有这些优化，代码会运行得更慢这个事实。

### 2.3 小结
1.  `词法作用域`意味着`作用域是由书写代码时函数声明的位置来决定`。
2.  JavaScript 有`两种机制`可欺骗词法作用域：`eval(...)` 和 `with(...){...}`。
    -   `eval(...)`: `修改所处位置的词法作用域`。
    -   `with(...){...}`: 将对象的引用当做作用域来处理，将对象中的属性当做作用域中标识符来处理，从而`创建一个新的词法作用域`。
3.  `eval(...)` 和 `with(...){...}` 这`两个机制的副作用`是引擎`无法`在编译时对作用域查找进行`优化`的。所以, `不要使用他们`。


## 特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`
## 往期推荐：
-   [前端面试实录HTML篇](https://mp.weixin.qq.com/s/1OCKVhbDhx9jS4KoPinccw)
-   [前端面试实录CSS篇](https://mp.weixin.qq.com/s/Lpe_0f_t6TKbo9bfi5fNKw)
-   [JS 如何判断一个元素是否在可视区域内？](https://mp.weixin.qq.com/s/2swYyWAGhOxLZHL40QRt2w)
-   [Vue2、3 生命周期及作用？](https://mp.weixin.qq.com/s/_1ZVSI63e39jaL8PhXRd3w)
-   [排序算法：QuickSort](https://mp.weixin.qq.com/s/w2BCeVf52UrP1JgMvaOoKw)
-   [箭头函数与普通函数的区别？](https://mp.weixin.qq.com/s/o-6DpwxL-k7dQsf5J8dA9w)
-   [这是你理解的CSS选择器权重吗？](https://mp.weixin.qq.com/s/6W3dcwcsBURGxYD9AeBeWA)
-   [JS 中 call, apply, bind 概念、用法、区别及实现？](https://mp.weixin.qq.com/s/v9eYEpwpzXazXm7pLTkDhw)
-   [常用位运算方法？](https://mp.weixin.qq.com/s/gn4sBeM6luE_b6jaAZOgyQ)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)
-   [为什么 0.1+ 0.2 != 0.3，如何让其相等？](https://mp.weixin.qq.com/s/wsXtNGpNl6NrickR6_7ePw)
-   [聊聊对 this 的理解？](https://mp.weixin.qq.com/s/w_RV1AUwXsW2fSHCfxXD2A)
-   [JavaScript 为什么要进行变量提升，它导致了什么问题？](https://mp.weixin.qq.com/s/mBBUVF7mrPt4ik1f4dBPrQ)
## 最后：
-   欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，一起快乐摸鱼和学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
