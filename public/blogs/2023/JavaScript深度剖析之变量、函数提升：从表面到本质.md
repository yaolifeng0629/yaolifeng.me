##  JavaScript深度剖析之变量、函数提升：从表面到本质

## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
-   想要彻底理解`提升`这篇文章，除非你已经理解了`作用域、词法作用域、动态作用域、编译器、引擎` 之间的联系，否则建议你先从之前的文章读起。
-   在前几篇文章中提到的作用域中的变量声明出现的位置有着某种微妙的联系，而这个联系就是本篇文章所讨论的内容。

## 先有鸡还是先有蛋
-   在我们的直觉上 `JavaScript` 代码在执行时是一行一行执行的，其实并不完全正确，有一种情况会导致这个假设是错误的。
-   考虑以下代码：
```js
a = 2;
var a;
console.log(a); // ？这里会输出什么呢？
```
-   可能会有人认为会输出 `undefined`，因为 `var a` 声明是在 `a = 2;` 赋值之后的，他们会自然而然地认为变量被重新赋值了，因为会被赋予默认值 `undefined`。但正确的输出结果为 `2`;
-   再考虑另外一段代码：
```js
console.log(a); // ？这里会输出什么呢？
var a = 2;
```
-   鉴于上一个代码片段所表现出的某种非自上而下的行为特点，你可能会认为这段代码会输出 `2`。或者还有人可能认为，由于变量 `a` 在使用前没有事先被声明过，会抛出 `ReferenceError` 异常。然而，两种猜测都不会，正确的输出结果为 `undefined`。

-   **那到底还是先有鸡还是先有蛋？到底是声明(蛋)在前，还是赋值(鸡)在前？**，让我们带着这个问题接着向下看。

##  编译器阶段
-   根据前面分享的几篇文章我们可得知，引擎会在解释 `JavaScript` 代码之前会首先对其进行编译。而编译阶段中的一部分工作就是先找到所有的声明，并用合适的作用域将他们关联起来。因此，`包括变量和函数在内的所有声明都会在任何代码被执行前首先被处理。`
-   当你看到 `var a = 2;` 时，你可能会认为这是一个声明。但 `JavaScript` 会将他们看成两个声明。`var a` 和 `a = 2;`。`第一个定义声明是在编译阶段进行的`，`第二个赋值声明会被留在原地等待执行阶段`。
-   第一段代码的解析过程：
```js
var a; // 被提升后的声明
a = 2;
// var a;  // 注意, var a 会被提升到顶部, 也就是上面提到的声明
console.log(a); // 2
```
-   第二段代码的解析过程：
```js
// var a;
console.log(a); // undefined
var a = 2;
```
-   因此，`这个过程就好像变量和函数声明从他们的代码中出现的位置被"移动"到了最上面，这个过程就叫做提升。`
-   换句话说，`先有蛋(声明)后有鸡(赋值)`

-   `只有声明本身会被提升，而赋值或其他运行逻辑会留在原地。如果提升改变了代码的执行顺序，会造成非常严重的破坏。`
-   考虑以下代码：
```js
foo();

function foo() {
    console.log(a);
    var a = 2;
}
```
-   根据上面两个示例代码，先不要看答案。你可以试着将上面这段代码的解析后的结果写出来，巩固实践一下。
    <details>
    <summary>查看答案</summary>
    <pre>

    ```js
    function foo() {
        // var a; 提升后的声明
        console.log(a); // undefined
        var a = 2;
    }

    foo(); // foo 函数的声明也被隐含地提升了，因此第一行在调用 foo 可正常执行。
    ```
    </pre>
    </details>
-   另外，需要注意的是，`每个作用域都会进行提升操作`。这里的 `foo(...)` 函数自身也会在内容对 `var a` 进行提升(并不是提升到这个程序的最上方)。
-   再考虑以下代码：
```js
foo(); // 会输出 success 吗？

var foo = function bar(){
    console.log('success');
}
```
-   其实并不会，知道为什么吗？可以先自己想一下，再看下面的答案：
    <details>
    <summary>查看答案</summary>
    <pre>

    ```js
    var foo;
    foo(); // TypeError: foo is not a function

    foo = function bar() {
        console.log("success");
    };

    /**
    你可能会疑惑为什么不是 ReferenceError？
        因为后面的 var foo = ... 对 foo 进行提升，默认值为 undefined。因为并不会抛出 ReferenceError。
    为什么会抛出 TypeError？
        在前面几篇文章中我们说过，对变量进行一些不合规的操作时则会抛出 undefined, 因此，这里对 undefined 进行函数调用，则抛出 TypeError。
     */

    ```
    </pre>
    </details>
-   **因此，从上面的代码中得知，函数声明会被提升，但函数表达式并不会被提升。**
-   再考虑以下代码：
```js
foo();
bar();

var foo = function bar() {
    console.log("success");
};
```
-   自己可以先试着写出这段代码的解析后的结果，在查看答案：
    <details>
    <summary>查看答案</summary>
    <pre>

    ```js
    var foo;
    foo(); // TypeError: foo is not a function
    bar(); // ReferenceError: bar is not defined

    foo = function {
        var bar = ...self...
    };
    ```
    </pre>
    </details>

## 函数优先
-   `函数声明和变量声明都会被提升,但出现有多个 "重复" 声明的代码中是函数首先会被提升，然后才是变量。`
-   考虑以下代码：
```js
foo(); // ？会输出什么呢？
var foo;

function foo() {
    console.log(1);
}

foo = function () {
    console.log(2);
}
```
-   自己可以先试着写出这段代码的解析后的结果，再查看答案：
    <details>
    <summary>查看答案</summary>
    <pre>

    ```js
    function foo() {
        console.log(1);
    }

    foo(); // 1
    // var foo; 尽管 var foo; 声明出现在 function foo(...) 之前，但他还是重复声明，因此会被忽略。因为函数声明会被提升到普通变量之前。

    // 此处函数表达式并不会被提升
    foo = function () {
        console.log(2);
    }
    ```
    </pre>
    </details>
-   再考虑以下代码：
```js
foo(); // ？这里会输出什么呢？

function foo() {
    console.log(1);
}

var foo = function () {
    console.log(2);
}

function foo() {
    console.log(3);
}
```
-   和之前一样，可先试试自己写出解析后的结果，再查看答案：
    <details>
    <summary>查看答案</summary>
    <pre>

    ```js
    foo(); // 3
    // 尽管重复的 var 声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的函数声明的。

    function foo() {
        console.log(1);
    }

    var foo = function () {
        console.log(2);
    }

    // 会使用这个函数的结果
    function foo() {
        console.log(3);
    }
    ```
    </pre>
    </details>

-   从上面代码可以看出，在同一个作用域内重复定义是很糟糕的，经常会导致各种奇怪的问题。
-   **小测试**：
    -   考虑以下代码：
```js
foo(); // 这里会调用那个函数？

var a = true;
if (a) {
    function foo() { console.log("a"); }
}
else {
    function foo() { console.log("b"); }
}
```
-   自己先写出解析后的结果后，再来看看自己的答案是否正确：
    <details>
    <summary>查看答案</summary>
    <pre>

    ```js
    foo(); // TypeError: foo is not a function
    /**
        为什么会抛出 TypeError 而不是 ReferenceError？
            其实 foo(); 这段调用函数的代码会被解析成以下代码：
            var foo;
            foo();
            看到这里，你应该明白，为什么会抛出 TypeError 异常了吧。如果还是没理解，建议你从头重新读起。
     */
    var a = true;
    if (a) {
        function foo() { console.log("a"); }
    }
    else {
        function foo() { console.log("b"); }
    }
    ```
    </pre>
    </details>

## 小结
1.  `先有鸡(声明)，后有蛋(赋值)。`
2.  记住如 `var a = 2;` 这段代码看起来是一个声明，但 JavaScript 引擎并不这么认为，它会将这段代码当做 `var a` 和 `a = 2;` 两个单独的声明来处理，第一个是在编译阶段执行的任务，第二个是在执行阶段执行的任务。
3. ` 重复定义的函数声明后面的会覆盖前面的。`
4.  `函数声明会被提升，但函数表达式并不会被提升。`
5.  只有声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会被提升。


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
