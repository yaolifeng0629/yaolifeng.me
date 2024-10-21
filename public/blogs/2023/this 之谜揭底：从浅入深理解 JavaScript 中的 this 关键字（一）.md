## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（一）
### 为什么要用 this
-   考虑以下代码：
```js
function identify() {
    return this.name.toUpperCase();
}

function speak() {
    var greeting = "Hello, I'm " + identify.call( this );
    console.log( greeting );
}

var me = {
    name: "Kyle"
};

var you = {
    name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

speak.call( me ); // Hello, 我是 KYLE
speak.call( you ); // Hello, 我是 READER
```
-   这段代码再不同的上下文对象(me 和 you) 中重复使用函数 identify() 和 speak(), 不用针对每个对象编写不同版本的函数。
-   若不使用 this 如下代码：
```js
function identify(context) {
    return context.name.toUpperCase();
}

function speak(context) {
    var greeting = "Hello, I'm " + identify( context );
    console.log( greeting );
}

identify( you ); // READER
speak( me ); //hello, 我是 KYLE
```


### 消除对 this 的误解
-   在解释下 this 到底是如何工作的，首先必需消除对 this 的错误认识。
#### 指向自身
-   为什么需要从函数内部引用函数自身呢？
    -   最常见的原因是递归。
-   其实 this 并不像我们所想的那样指向函数本身。
-   考虑以下代码：
```js
function foo(num) {
    console.log( "foo: " + num );

 // 记录 foo 被调用的次数
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo 被调用了多少次？
console.log( foo.count ); // 这里会输出多少次呢？
```
-   先思考，后查看
<details>
<summary>查看答案</summary>
<pre>

```js
function foo(num) {
    console.log( "foo: " + num );
// 记录 foo 被调用的次数
    this.count++;
}
foo.count = 0;
var i;
for (i=0; i<10; i++) {
    if (i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9
// foo 被调用了多少次？
console.log( foo.count ); // 0
// 为什么会输出 0 呢？
// 从字面意思来看，上面的函数执行了 4 此，理应来说， foo.count 应该是 4 才对。
```
</pre>
</details>

-   当执行 foo.count = 0; 时，的确向函数对象 foo 中添加了一个属性 count, 但是函数内部代码中 this.count 中的 this 并不是指向那个函数对象，虽然属性名相同，跟对象却并不相同，困惑随之产生。
-   如果你会有 “如果我增加的 count 属性和预期的不一样，那我增加的是那个 count？”疑惑。实际上，如果你读过之前的文章，就会发现这段代码会隐式地创建一个全局变量 count。它的值为 NaN。如果你发现为什么是这么个奇怪的结果，那你肯定会有 “为什么它的值是 NaN, 而不是其他值？” 的疑惑。(原理参考：https://mp.weixin.qq.com/s/H1gpn0vfmUwrglMZwk2gzw)
-   当然也有方法对上述代码进行规避：
```js
function foo(num) {
    console.log( "foo: " + num );

 // 记录 foo 被调用的次数
    data.count++;
}

var data = {
    count: 0
};

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo 被调用了多少次？
console.log( data.count ); // 4
```
-   虽然从某种角度来说，解决了问题，但忽略了真正的问题——无法理解 this 的含义和工作原理，上述代码而是返回了舒适区——词法作用域。
-   上面提到的如果匿名函数需要引用自身，除了 this 还有已经被废弃的 `arguments.callee` 来引用当前正在运行的函数对象。
-   对于上述提到的代码，更进阶的方式就是使用 foo 标识符来替代 this 来引用函数对象，如下代码：
```js
function foo(num) {
    console.log( "foo: " + num );

    // 记录 foo 被调用的次数
    foo.count++;
}
foo.count=0
var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        foo( i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo 被调用了多少次？
console.log( foo.count ); // 4
```
-   这种解决方式依然规避了 this 问题，并且完全依赖于变量 foo 的词法作用域。
-   更进阶的方式是强制 this 指向 foo 函数对象, 使用 `call, bind, apply` 关键字来实现。
```js
function foo(num) {
    console.log( "foo: " + num );

 // 记录 foo 被调用的次数
 // 注意，在当前的调用方式下（参见下方代码），this 确实指向 foo
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
 // 使用 call(..) 可以确保 this指向函数对象 foo 本身
        foo.call( foo, i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// foo 被调用了多少次？
console.log( foo.count ); // 4
```

#### 它的作用域
-   常见的误解：this 指向函数的作用域，其实在某种情况下是正确的，但在其他情况下是错误的。
-   其实，this 在任何情况下都不指向函数的词法作用域。
-   考虑一下代码：
```js
function foo() {
    var a = 2;
    this.bar();
}

function bar() {
    console.log( this.a );
}

foo();

// 这段代码你一共能发现几处错误？并且报错后会抛出什么？
```
-   先思考，后查看
<details>
<summary>查看答案</summary>
<pre>

```js
function foo() {
    var a = 2;
    this.bar();
    // bar(); // 当前方式会根据词法作用域的规则来查找 bar() 方法，并且调用它
}
function bar() {
    console.log(this.a); // ReferenceError: a is not defined
    // console.log(a); // 这种方式也不行，因为函数会创建一个块作用域，所以无法通过 bar 的作用域访问到上层 foo 作用域。
}
foo(); // TypeError: this.bar is not a function
```
</pre>
</details>

-   首先，这段代码试图通过 this.bar() 来引用 bar() 函数。这是绝对不可能成功的，我们之后会解释原因。调用 bar() 最自然的方法是省略前面的 this，直接使用词法引用标识符。

-   此外，编写这段代码的开发者还试图使用 this 联通 foo() 和 bar() 的词法作用域，从而让bar() 可以访问 foo() 作用域里的变量 a。这是不可能实现的，你不能使用 this 来引用一个词法作用域内部的东西。

### this 到底是什么
-   说了这么多，那 this 到底是一个什么样的机制呢？
    -   之前我们说过 this 是在运行时进行绑定的，而不是在编写时绑定的，它的上下文取决于函数调用时的各种条件。
    -   this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
-   当一个函数被调用是，会创建一个执行上下文，这个执行上下文汇总会包含函数在哪里被调用(也就是调用栈)，函数的调用方法， 传入的参数等信息。而 this 就是这样一个属性，会在函数执行的过程中被用到。

### 小结
-   学习 this 的第一步要明白 this 既不指向函数自身也不指向函数的词法作用域。
-   this 实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。


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
