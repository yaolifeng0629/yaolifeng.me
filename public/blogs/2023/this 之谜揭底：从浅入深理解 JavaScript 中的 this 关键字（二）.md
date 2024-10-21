## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（二）
### 调用位置
-   在理解 this 的绑定过程之前，首先要理解`调用位置`：`调用位置就是函数在代码中被调用的位置(而不是声明的位置)`。
-   通常来说，寻找调用位置就是寻找"函数被调用的位置", 最重要的要分析调用栈(就是为了到达当前执行位置所调用的所有函数)。运行代码时，调用器会在那个位置暂停，同时会在展示当前位置的函数调用列表，这就是调用栈。

### 绑定规则
-   函数的调用位置决定了 this 的绑定对象，通常情况下分为以下几种规则：
#### 默认绑定
-   最常用的函数调用类型：`独立函数调用`。可把这条规则看到是无法应用其他规则时的默认规则。
```js
function foo(){
    console.log(this.a);
}
var a = 2;
foo(); // 2
```
-   当调用 foo() 时，this.a 被解析成了全局变量 a。为什么？
    -   因为在上述代码中，函数调用时应用了this 的默认绑定，因此 this 指向全局对象。(要理解 this，就要先理解调用位置)
-   `如果使用严格模式(strict mode)，那全局对象将无法使用默认绑定，因此 this 会绑定到 undefined。`
```js
function foo(){
    "use strict";
    console.log(this.a);
}
var a = 2;
foo(); // Type: this is undefined
```
-   虽然 this 的绑定规则完全取决于调用位置，但是`只有 foo() 运行在非 strict mode下时，默认绑定才能绑定到全局对象；` 严格模式下与 foo() 的调用位置无关。
```js
function foo(){
    console.log(this.a);
}

var a = 2;

(function (){
    "use strict";

    foo(); // 2
})
```
-   通常情况下，尽量减少在代码中混合使用 `strict mode` 与 `non-strict mode`，尽量减少在代码中混合使用 strict mode 和 non-strict mode。


#### 隐式绑定
-   `另一条规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或包裹。`
-   考虑以下代码：
```js
function foo() {
    console.log(this.a); // 2
}

var obj = {
    a: 2,
    foo: foo
}

obj.foo();
```
-   上述代码中，调用位置使用 obj 的上下文来引用函数，可以说函数被调用时 obj 对象拥有或包含它。
-   `当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象上`，因此在调用 foo() 时 this 被绑定到了 obj 上，所以 this.a 与 obj.a 是一样的。
-   注意：`对象属性引用链中只有最顶层或最后一层会影响调用位置`。
-   如下代码：
```js
function foo() {
    console.log( this.a );
}

var obj2 = {
    a: 42,
    foo: foo
};

var obj1 = {
    a: 2,
    obj2: obj2
};

obj1.obj2.foo(); // 42
```
-   隐式丢失：在被隐式绑定的函数会丢失绑定对象，也就是说它会默认绑定，从而把 this 绑定到全局对象或 undefined 上，这取决于是否是严格模式。
-   如下代码：
```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var bar = obj.foo; // 函数别名！

var a = "oops, global"; // a 是全局对象的属性

bar(); // "oops, global"
```
-   还有一种奇怪的方式，就是在传入回调函数时隐式丢失
```js
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
 // fn其实引用的是 foo

    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a 是全局对象的属性

doFoo( obj.foo ); // "oops, global"
```
-   在我们传入函数时也会被隐式赋值。
-   那如果传入的函数不是自定义的函数，而是语言内置的函数呢？结果还是一样的，没有区别
```js
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a 是全局对象的属性

setTimeout( obj.foo, 100 ); // "oops, global"
```

#### 显示绑定
-   那我们不想在对象内部包含函数引用，而是想在某个对象上强制调用函数，该如何操作？
    -   那就必须要使用 `call() 和 apply()。第一个参数是一个对象，也就是需要绑定的对象，第二个参数传入的参数，而两者之间的区别就在于第二个参数，call 的第二个参数是一个个参数，而 apply 则是一个参数数组。`
```js
// call()
function foo() {
    console.log( this.a );
}

var obj = {
    a:2
};

foo.call( obj ); // 2


// apply()
function foo(something) {
    console.log( this.a, something );
    return this.a + something;
}

var obj = {
    a:2
};

var bar = function() {
    return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3
console.log( b ); // 5
```
#### new绑定
-   在传统的语言中，构造函数时一个特殊方法，使用 new 初始化需要调用的类，通常形式下是 `let something = new MyClass();`。
-   在使用 new 来调用函数，会自动执行以下操作：
    1.  创建一个新对象
    2.  让新对象的 `__proto__`(隐式原型) 等于函数的 prototype(显式原型)
    3.  绑定 this, 让新象绑定于函数的 this 指向
    4.  判断返回值，如果返回值不是一个对象，则返回刚新建的新对象。


### 优先级
-   如果在某个调用位置应用多条规则该如何？那为了解决此问题，那就引申出了优先级问题。
-   毫无疑问，默认绑定的优先级是四条规则中最低的，可以先不考虑它。
-   先来看看隐式绑定和显式绑定那个优先级更高？
```js
function foo() {
    console.log( this.a );
}

var obj1 = {
    a: 2,
    foo: foo
};

var obj2 = {
    a: 3,
    foo: foo
};

// 隐式绑定
obj1.foo(); // 2
obj2.foo(); // 3

// 显式绑定
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```
-   可以看出，`显式绑定的优先级更高`，也就是说在判断时应当考虑是否可以应用显式绑定。
-   再来看看new绑定和隐式绑定的优先级？
```js
function foo(something) {
    this.a = something;
}

var obj1 = {
    foo: foo
};

var obj2 = {};

// 隐式绑定
obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

// new绑定
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```
-   可以看出，`new 绑定比隐式绑定的优先级更高`，但 new 绑定和显式绑定谁的优先级更高呢？
-   new 与 call/apply 无法一起使用，因此无法通过 new foo.call(obj1) 来进行测试，但可以通过硬绑定来测试他两的优先级。
-   硬绑定：Function.prototype.bind(...) 会创建一个新的包装函数，这个函数会忽略当前的this绑定(无论绑定的对象是什么)，并把我们提供的对象绑定到this上。
-   这样看起来硬绑定（也是显式绑定的一种）似乎比 new 绑定的优先级更高，无法使用 new 来控制 this 绑定。
```js
function foo(something) {
    this.a = something;
}

var obj1 = {};

var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar(3);
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```
-   出乎意料！ bar 被硬绑定到 obj1 上，但是 new bar(3) 并没有像我们预计的那样把 obj1.a 修改为 3。相反， new 修改了硬绑定（到 obj1 的）调用 bar(..) 中的 this。因为使用了 new 绑定，我们得到了一个名字为 baz 的新对象，并且 baz.a 的值是 3。
-   硬绑定中的bind(...) 的功能之一就是可以把除了第一个参数(第一个参数用于绑定this)之外的其他参数传递给下层的函数(这种技术称为"部分应用",是"柯里化"的一种)。
```js
function foo(p1,p2) {
    this.val = p1 + p2;
}

// 之所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么
// 反正使用 new 时 this 会被修改
var bar = foo.bind( null, "p1" );

var baz = new bar( "p2" );

baz.val; // p1p2
```
-   **判断this**
    1.  是否在 new 中调用(new 绑定), this 指向新创建的对象
    2.  是否通过 call、apply(显示绑定)，this 指向绑定的对象
    3.  是否在某个对象中调用(隐式绑定)，this 指向绑定的上下文对象
    4.  如果都不是，则是默认绑定，在严格模式下，this 指向 undefined, 非严格模式下，this 指向全局对象。
-   **优先级问题**
    -   显式绑定：call()、apply()。(硬绑定也是显式绑定的其中一种: bind())
    -   new 绑定: new Foo()
    -   隐式绑定: obj.foo();
    -   默认绑定: foo();
-   `排序：显式绑定 > new 绑定 > 隐式绑 定 > 默认绑定`

### 绑定例子
#### 被忽略的this
-   `如果你把 null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind，这些值在调用时会被忽略，实际应用的是默认绑定规则：`
```js
function foo() {
    console.log( this.a );
}

var a = 2;

foo.call( null ); // 2
```
-   那在什么情况下会传入 null 呢？
    -   `一种非常常见的做法是使用 apply(..) 来“展开”一个数组，并当作参数传入一个函数。`
```js
function foo(a,b) {
    console.log( "a:" + a + ", b:" + b );
}

// 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3

// 使用 bind(..) 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ); // a:2, b:3
```
-   但总是用 null 来忽略 this 绑定可能会产生一些副作用。
-   **更安全的this**
    -   DMZ(demilitarized zone)空委托对象
-   `在 JavaScript 中创建一个空对象最简单的方法都是 Object.create(null)。Object.create(null) 和 {} 很 像， 但 是 并 不 会 创 建 Object.prototype 这个委托，所以它比 {}“更空”：`
```js
function foo(a,b) {
    console.log( "a:" + a + ", b:" + b );
}

// 我们的 DMZ 空对象
var ø = Object.create( null );

// 把数组展开成参数
foo.apply( ø, [2, 3] ); // a:2, b:3

// 使用 bind(..) 进行柯里化
var bar = foo.bind( ø, 2 );
bar( 3 ); // a:2, b:3
```
#### 间接引用
```js
function foo() {
    console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```
-   赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。根据我们之前说过的，这里会应用默认绑定。
-   `注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则this 会被绑定到全局对象。`

#### 软绑定
-   硬绑定这种方式可以把 this 强制绑定到指定的对象（除了使用 new 时），防止函数调用应用默认绑定规则。使用硬绑定会大大降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或显示绑定来修改 this。
-   可通过一种软绑定的方法来实现：
```js
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有 curried 参数
        var curried = [].slice.call( arguments, 1 );
        var bound = function() {
            return fn.apply(
                (!this || this === (window || global)) ?
                    obj : this
                curried.concat.apply( curried, arguments )
            );
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}
```
-   实现软绑定功能：
```js
function foo() {
   console.log("name: " + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

var fooOBJ = foo.softBind( obj );

fooOBJ(); // name: obj

obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！

fooOBJ.call( obj3 ); // name: obj3 <---- 看！

setTimeout( obj2.foo, 10 );
// name: obj   <---- 应用了软绑定
```
-   可以看到，软绑定的 foo() 可手动将 this 绑定到 obj2 或 obj3 上，但如果应用默认绑定，则会将 this 绑定到 obj。
### this 词法
-   在 ES6 中出现了一种无法使用这些规则的特殊函数类型：`箭头函数`
-   `箭头函数不适用 this 的四种标准规则，而是根据外层(函数或全局)的作用域来决定 this`
```js
function foo() {
    // 返回一个箭头函数
    return (a) => {
    //this 继承自 foo()
        console.log( this.a );
    };
}

var obj1 = {
    a:2
};

var obj2 = {
    a:3
};

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是 3 ！
```
-   foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1， bar（引用箭头函数）的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。（new 也不行！）
-   在 ES6 之前，我们也有使用和箭头函数一样的模式，如下代码：
```js
function foo() {
    var self = this; // this 快照
    setTimeout( function(){
        console.log( self.a );
    }, 100 );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2
```
-   虽然 self = this 和箭头函数看起来都可以取代 bind(..)，但是从本质上来说，它们想替代的是 this 机制。

### 小结
1.  **判断 this 指向**
    1.  是否在 new 中调用(new 绑定), this 指向新创建的对象
    2.  是否通过 call、apply(显示绑定)，this 指向绑定的对象
    3.  是否在某个对象中调用(隐式绑定)，this 指向绑定对象的上下文
    4.  如果都不是，则是默认绑定，在严格模式下，this 指向 undefined, 非严格模式下，this 指向全局对象。
2.  箭头函数不会使用上述的四条规则，而是根据当前的词法作用域来决定 this 的。箭头函数会继承外层函数调用的 this 绑定(无论 this 绑定到什么)。与 ES6 之前的 self = this 的机制一样。
3.  注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则this 会被绑定到全局对象。

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
