# JavaScript 实践+理论(总结篇)：作用域、闭包、this、对象原型

## 作用域与闭包

### 第一章 作用域是什么

-   作用域：根据标识符查找变量的一套规则。
-   嵌套作用域：从当前作用域开始查找变量，如果找不到就向上一层继续查找，直到找到最外层的全局作用域为止。
-   严格模式与非严格模式下引擎查找规则：
    -   严格模式：
        1.  在 `use strict` 模式下禁止自动或隐式地创建全局变量，所以在引擎执行 LHS 时，不会再隐式地创建一个全局变量，而是直接抛出一个 `ReferenceError`。
        2.  在该模式下，RHS 找到一个变量当对这个变量进行不合规的操作时会抛出一个 `TypeError`, 而 `ReferenceError` 代表着在作用域查找或判断失败，`TypeError` 代表作用域查找成功了，但对该变量的操作不合规。
    -   非严格模式：
        1.  引擎执行 RHS 时若找不到该标识符，会抛出 `ReferenceError`
        2.  引擎执行 LHS 时若找不到该标识符，会隐式地在全局作用域中创建一个该名称的变量，并将其返回给引擎。
-   引擎的查找规则：
    1.  LHS: 赋值操作的目标
    2.  RHS: 赋值操作的源头

### 第二章 词法作用域

-   作用域查找规则：从当前所处作用域最内部开始，逐级向上查找，直到找到第一个匹配的标识符为止。并且词法作用域只会查找一级标识符，如果 foo.bar.baz，词法作用域只会试图查找 foo 标识符，然后再分别访问 bar 和 baz。
-   函数不论是在哪里被调用，或如何被调用，它的词法作用域都是由被声明时所处的位置决定。
-   非严格模式下, eval(...) 中的语句会修改 eval(...) 所处的词法作用域。
-   严格模式下, eval(...) 在运行时有自己词法作用域，不会修改所处作用域。
-   with(...) 会将当前对象的引用当做作用域来处理，将对象中的属性当做作用域中的标识符来处理，从而创建一个新的词法作用域。

### 附录 A 动态作用域

-   作用域是基于调用栈的，而不是代码中的作用域嵌套的。
-   动态作用域是在运行时确定的
-   词法作用域关注函数从何处声明
-   动态作用域关注函数从何处调用

### 第三章 函数作用域和块作用域

-   如何区分函数声明和函数表达式：如果 function 为声明中的第一个关键字，那它就是一个函数声明，否则就是一个函数表达式。
-   IIFE(立即执行函数表达式)，第一个() 将函数变成表达式，第二个() 将执行这个函数。且第二个 () 可放在第一个 () 内最后位置，且含义相同。
-   在 IIFE 中可在第二个 () 中传递参数，在第一个 () 中的形参就是第二个 () 所传进去的参数。
-   var 声明符写在哪里都是一样的，因为它会变量提升。
-   let 声明符声明的变量和函数不会被提升，何为提升，就是在代码执行时是否有被声明过，如果没有声明过则直接抛出错误。

### 第四章 提升

1.  先有鸡(声明),再有蛋(赋值)
2.  如 `var a = 2;` 这段声明代码 JavaScript 引擎会将他们分为 `var a` 和 `a = 2;` 两个单独的声明来处理，第一个是在编译阶段所执行，第二个是在执行阶段所执行。
3.  重复定义的函数声明，后面的会覆盖前面的。
4.  函数声明会被提升，而函数表达式不会被提升
5.  只有函数本身会被提升， 而函数表达式在内的赋值操作并不会被提升。

### 第五章 作用域闭包

1.  何为闭包：当函数可以记住并访问所在的词法作用域时，即使函数在当前词法作用域之外执行，这时就会产生闭包。
2.  严格意义上来说，一个函数返回另一个函数。
3.  空的 IIFE 并不是闭包，虽然通过 IIFE 改造有用了更多的词法作用域，但在 IIFE 中的所创建的作用域是封闭起来的。只能通过从外传入一个参数到 IIFE 中被使用时，才是闭包。

```js
for(var = 1 ; i <= 5; i++){
    (function() {
        var j = i;
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })();
}

// 再次改进后
for(var = 1 ; i <= 5; i++){
    (function(j) {
        setTimeout(function timer() {
            console.log(j);
        }, j * 1000);
    })(i);
}
```

## this 与对象原型

### 第一章 关于 this

1.  this 既不指向函数自身也不指向函数的词法作用域
2.  this 是在函数被调用时发生的绑定关系，它指向哪里完全取决于函数在哪里被调用

### 第二章 this 全面解析

-   判断 this 指向的四种规则：

1.  是否在 new 中调用(new 调用), this 指向新创建的对象

```js
function Foo() {
    // do something
}
let f = new Foo();
```
2.  是否通过 call, apply(显示绑定), this 指向绑定的对象
```js
// call()
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
};
foo.call(obj); // 2
// apply()
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a: 2,
};
var bar = function () {
    return foo.apply(obj, arguments);
};
var b = bar(3); // 2 3
console.log(b); // 5
// bind()
function foo(something) {
    this.a = something;
}
var obj1 = {};
var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2
var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```
3.  是否在某个对象中调用(隐式绑定), this 指向绑定对象的上下文
```js
// eg1:
function foo() {
    console.log(this.a); // 2
}
var obj = {
    a: 2,
    foo: foo,
};
obj.foo();
// eg2:
function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo,
};
var obj1 = {
    a: 2,
    obj2: obj2,
};
obj1.obj2.foo(); // 42
```
4.  如果都不是，则是默认绑定，在严格模式下，this 指向 undefined。非严格模式下, this 指向全局对象。
```js
function foo() {
    console.log(this.a);
}
var a = 2;
foo(); // 2
// 严格模式下的位置
function foo() {
    'use strict';
    console.log(this.a);
}
var a = 2;
foo(); // Type: this is undefined
function foo() {
    console.log(this.a);
}
var a = 2;
(function () {
    'use strict';
    foo(); // 2
});
```

2.  箭头函数不会使用上述四条规则，而是根据当前的词法作用域来决定 this 的，箭头函数会继承外层函数的 this。
3.  注意：对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined, 否则 this 会绑定到全局对象。
4.  **优先级问题**
    -   显式绑定：call()、apply()。(硬绑定也是显式绑定的其中一种: bind())
    -   new 绑定: new Foo()
    -   隐式绑定: obj.foo();
    -   默认绑定: foo();

-   `排序：显式绑定 > new 绑定 > 隐式绑定 > 默认绑定`

### 第三章 对象

1.  对象一共有两种语法：文字形式(`var obj = {....}`)和构造形式(`var obj = new Object()`)。两种形式的唯一区别在于文字声明可添加多个键值对，而构造形式必须逐个添加。
2.  在 JavaScript 中为什么 typeof null 会返回 object？
    -   因为不同的对象在底层都是通过二进制表示的，在 JavaScript 中二进制前三位都是 0 的话会被判别为 object 类型，而 null 的二进制都为 0，自然前三位也是 0，所以执行 typeof 时会返回 object。
3.  对象属性访问中通过 `.` 操作符访问被称为属性访问，通过 `[]` 操作符访问被称为键访问。
4.  对象操作的快捷方法：
    1.  在已有属性的对象上禁止扩展其他属性：Object.preventExtensions()
        -   严格模式: 抛出 TypeError 错误
        -   非严格模式：静默失败
    2.  密封一个对象，既不能重新配置和删除现有属性(即时是可修改属性): Object.seal()
    3.  冻结一个对象，既不能添加，删除，修改：Object.freeze()
    4.  判断一个属性是否在对象的可枚举属性中: xxx.propertyIsEnumerable('xxxx')
5.  in 操作符会检查属性是否对象及其 [[Prototype]] 原型链中，而 hasOwnProperty()，propertyIsEnumerable() 只会检查属性是否在某个对象中，不会检查 [[Prototype]] 原型链。
6.  Object.keys(...) 会返回一个数组，包含所有可枚举属性，Object.getOwnPropertyNames(...)会返回一个数组，包含所有属性，无论他们是否可枚举。

### 第四章 混合对象的类

1.  多态：父类的一些通过行为可以被子类的行为重写
2.  父类与子类之间的继承其实就是复制。
3.  一个类就是一个蓝图，也就只是一个计划，并不是真正可以交互的对象，必须通过实例化对象来调用所有的特性，而实例化对象就是类的所有特性的一个副本。
4.  在类被继承时，行为也会被复制到子类中。

### 第五章 原型

1.  当访问对象中一个不存在的属性时，[[Get]] 操作就会查找对象内部的 [[Prototype]] 关联的对象，而这个关联关系就像是嵌套的作用域，在查找属性时会对其进行遍历查找。直到找到普通对象内置的 Object.prototype 顶端，如果找不到就会停止。
2.  关联两个对象最常用的方法就是用 new 关键字调用，因为在调用的第四个步骤中会关联到所创建的新对象。
3.  使用 for...in 遍历对象和 in 操作符时都会查找对象的整条原型链。(无论属性是否可枚举)

```js
var anotherObject = {
    a: 2,
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create(anotherObject);

for (var k in myObject) {
    console.log('found: ' + k);
}
// found: a

'a' in myObject; // true
```

-   注意：`当你通过各种语法进行属性查找时都会查找[[Prototype]]链，直到找到属性或找到完整的原型链。`

4.  但到哪是 [[Prototype]] 的尽头呢？
    -   所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype。
5.  如果对象中的某个属性不直接存在于某个对象上时会发生以下几种情况：

```js
myObject.foo = 'bar';
```
1.  如果在 [[Prototype]] 原型链上层存在 foo 访问属性，并且没有被标记为只读(writable: false),那就会直接在 myObject 中添加一个 foo 属性，则它是屏蔽属性。
```js
let a = {
    foo: 'atxt',
};
let c = Object.create(a);
c.foo = 'cfoo';
console.log('c ------>', c.foo); // atxt
```
2.  如果在 [[Prototype]] 原型链上存在 foo 属性，但是被标记为只读, 那就无法修改已有属性或在 myObject 上创建屏蔽属性。如果在严格模式下运行，会直接抛出一个错误。否则，这条赋值语句就会被忽略。总之，不会发生屏蔽。
```js
let a = {
    foo: 'atxt',
};
Object.defineProperty(a, 'foo', {
    writable: false,
});
let c = Object.create(a);
c.foo = 'cfoo';
console.log('c ------>', c.foo); // atxt
```
3.  如果在 [[Prototype]] 原型链上层存在 foo 并且它是一个 setter，那就一定会调用这个 setter。foo 不会被添加到(可以说屏蔽到) myObject 中，也不会重新定义 foo 这个 setter。如下代码：
```js
let a = {
    get foo() {
        return this._foo_;
    },
    set foo(v) {
        this._foo_ = 'afoo';
    },
};
a.foo = 'afoo';
let c = Object.create(a);
c.foo = 'cfoo';
console.log('c ------>', c.foo); // afoo
// 把赋值[[put]] 操作存储到了另一个变量 _a_ 中，名称 _a_ 只是一种惯例，没有任何特殊行为，与其他普通属性一样。
```
在面向类的语言中，类可以实例化多次。
使用 new 调用是构造函数还是调用？
-   实际上，Foo 和普通函数没有任何区别。函数本身并不是构造函数。但是当你在普通的函数调用前加上 new 关键字后，就会把当前函数变成一个构造函数调用。实际上，new 会劫持所有普通函数并用构造对象的形式来调用它。
-   如下代码：
```js
function NothingSpecial() {
    console.log("Don't mind me!");
}
var a = new NothingSpecial();
// "Don't mind me!"
a; // {}
```

8.  在 JavaScript 中对于构造函数最准确的解释是，所有带 new 的函数调用。
9.  何为原型链？
    -   [[Prototype]] 的作用: 如果在对象上没有找到需要的属性或方法引用，引擎就会技术在 [[Prototype]] 关联的对象进行查找。如果后者也没有找到需要的引用就会继续查找它的 [[Prototype]]。以此类推，这一系列的对象链接被称为 "原型链"。
10. 对象之间是通过 [[Prototype]] 链关联的。

### 第六章 行为委托

1.  行为委托认为对象之间是兄弟关系，而不是父类与子类的关系，两者相互委托。而 JavaScript 中的 [[Prototype]] 机制本质上就是委托机制。

## 详解篇(按顺序阅读)

1.  [JavaScript 作用域深度剖析：从局部到全局一网打尽](https://mp.weixin.qq.com/s/zfTTVsgBRjoOk0Sm6Scb2w)
2.  [JavaScript 中 eval 和 with 语句如何影响作用域链：探索深度知识](https://mp.weixin.qq.com/s/H1gpn0vfmUwrglMZwk2gzw)
3.  [JavaScript 作用域深度剖析：动态作用域](https://mp.weixin.qq.com/s/C2DlhYwMq6jowU53XUvtTQ)
4.  [【深度剖析】JavaScript 中块级作用域与函数作用域](https://mp.weixin.qq.com/s/EpNEgYd-J53hwHbR_81Pfg)
5.  [JavaScript 深度剖析之变量、函数提升：从表面到本质](https://mp.weixin.qq.com/s/xf1nQe-EGY_DvqQ8deUtHg)
6.  [this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（一）](https://mp.weixin.qq.com/s/MWWd5xVNCccgVoBtSnbDzA)
7.  [this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（二）](https://mp.weixin.qq.com/s/7uGjOgaZVG3CgdF_ql9j8g)
8.  [理论+实践：从原型链到继承模式，掌握 Object 的精髓(一)](https://mp.weixin.qq.com/s/bIRQLHOFJnhF10RCG-eSKg)
9.  [理论+实践：从原型链到继承模式，掌握 Object 的精髓(二)](https://mp.weixin.qq.com/s/ZTfybLBAswv8xcYtDRIwzQ)
