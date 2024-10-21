## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
# 理论+实践：从原型链到继承模式，掌握 Object 的精髓(二)
### 前言
-   上篇文章中介绍了对象，那本篇文章将继续介绍类相关的面向对象编程和原型。
    -   我们知道类中有这三个关键的概念：实例化(instantiation),继承(inheritance),相对多态(polymorphism)，首先从理论说起。

## 类
### 类理论
-   在面向对象编程中强调的是数据和操作数据的行为在本质上是互相关联的，因此好的设计就是要把数据以及相关的行为封装起来。
-   `多态：父类的一些通用行为可以被子类的行为重写。`
-   在类中强烈建议父类和子类使用相同的方法名来表示特定的行为，从而让子类重写父类。
-   多态并不表示父类和子类有关联，子类得到只是父类的一个副本，类的继承就是复制。

### 类机制
-   在许多面向类的语言中(比如 Java)中，"标准库"会提供 stack 类，而它是一种栈结构，支持压入(push)，弹出(pop)等。
-   一个类其实就是一张蓝图，只是一个计划，并不是真正的可以交互的对象，我们必须通过实例化来调用所有公有数据属性，而这个`实例化对象就是类的所有特性的一份副本`。

### 类的继承
-   在类的继承中，所说的父类和子类并不是实例，而是应当把父类和子类成为父类 DNA 和子类 DNA，我们需要根据这些 DNA 来实例化一个对象，通过这个对象来以此进行沟通。
-   在类被继承时，行为也会被复制到子类中。

## 原型
### `[[Prototype]]`
-   JavaScript 对象中有一个特殊的 `[[Prototype]]` 内置属性，这其实是对其他对象的引用。在所有对象创建时 `[[Prototype]]` 属性都会被赋予一个非空的值。
-   考虑以下代码：
```js
var myObject = {
    a: 2
};
myObject.a; // 2
```
-   `[[Prototype]]` 引用有什么用呢？在之前的文章中我们说过，当视图引用对象的属性时会触发 [[Get]] 操作，比如 `myObject.a`。对于默认的 [[Get]] 操作来说，第一步是检查对象本身是否有这个属性，如果有的话就使用它。但如果 `a` 不在 `myObject` 中，就需要使用对象的 `[[Prototype]]` 原型链了。
-   考虑以下代码：
```js
var anotherObject  = {
    a: 2
};

var myObject = Object.create(anotherObject);
myObject.a; // 2
```
-   上面用到了 `Object.create()` 方法，我们可以暂且先不考虑它，后续会聊到。
-   现在 `myObject` 对象的 `[[Prototype]]` 关联到了 `anotherObject` 上。显然 `myObject.a` 并不存在，但是属性访问仍然能成功地(在 `anotherObject` ) 找到了 `a`。
-   但如果 `anotherObject` 中也找不到 `a` 并且 `[[Prototype]]` 链不为空的话，就会继续查找下去。
-   这个查找过程会持续找到匹配的属性名或查找完整条 `[[Prototype]]` 链。如果找到完整的 `[[Prototype]]` 链的话，[[Get]] 操作的就会返回 `undefined。`
-   **下面来看操作符对 object 有哪些作用？**
-   使用 `for...in` 遍历对象和 `in` 操作符时都会查找对象的`整条原型链`。(无论属性是否可枚举)
-   如下代码：
```js
var anotherObject = {
    a:2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );

for (var k in myObject) {
    console.log("found: " + k);
}
// found: a

("a" in myObject); // true
```
-   注意：`当你通过各种语法进行属性查找时都会查找`[[Prototype]]`链，直到找到属性或找到完整的原型链。`

#### Object.prototype
-   但哪里是 `[[Prototype]]` 的尽头呢？
    -   所有普通的 `[[Prototype]]` 链最终都会指向内置的 `Object.prototype`。

#### 属性设置和屏蔽
-   之前说过，给一个对象设置属性不仅仅是添加一个新属性或修改已有的属性值那么简单，下面来聊一下完整的这个过程。
-   如下代码：
```js
myObject.foo = 'bar';
```
-   如果 `myObject` 中存在 `foo` 属性，那以上这条赋值语句只会修改已有的属性值。
-   如果 `myObject` 中不存在 `foo` 属性，`[[Prototype]]` 原型链就会遍历查找，类似于 `[[Get]]` 操作，如果原型链上找不到 `foo`, `foo` 就会被添加到 `myObject` 上。
-   如果 `foo` 存在于原型链的上层，以上赋值语句的行为就会有些不同，后续会聊到。
-   如果 `foo` 属性即存在于 `myObject` 中，也出现在 `myObject` 的 `[[Prototype]]` 原型链上层，那就会发生`屏蔽`。`myObject` 中的 `foo` 属性会屏蔽原型链上层的所有 `foo` 属性，因为 `myObject.foo` 总会选择原型链中最底层的 `foo` 属性。
-   如下代码：
```js
let a = {
    foo: "afoo",
};

let c = Object.create(a);
c.foo = "cfoo";
console.log("c ------>", c.foo); // cfoo
```
-   我们可以分析下如果 foo 不直接存在于 myObject 中而是存在于原型链上层时 `myObject.foo = 'bar';` 会出现三种情况：
    1.  如果在 `[[Prototype]]` 原型链上层存在 foo 访问属性，并且没有被标记为只读`(writable: false)`,那就会直接在 myObject 中添加一个 foo 属性，则它是屏蔽属性。
    2.  如果在 `[[Prototype]]` 原型链上存在 foo 属性，但是被标记为只读, 那就无法修改已有属性或在 myObject 上创建屏蔽属性。如果在严格模式下运行，会直接抛出一个错误。否则，这条赋值语句就会被忽略。总之，不会发生屏蔽。
    3.  如果在 `[[Prototype]]` 原型链上层存在 foo 并且它是一个 `setter`，那就一定会调用这个 `setter`。foo 不会被添加到(可以说屏蔽到) myObject 中，也不会重新定义 foo 这个 `setter`。如下代码：
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
c.foo = "cfoo";
console.log("c ------>", c.foo); // afoo

// 把赋值[[put]] 操作存储到了另一个变量 _a_ 中，名称 _a_ 只是一种惯例，没有任何特殊行为，与其他普通属性一样。

```
-   很多情况下，我们都会认为如果向 `[[Prototype]]` 链上层已经存在的属性进行 [[Put]] 赋值操作，就一定会触发屏蔽，但如你所见，三种情况中只有第一种是这样的。
-   如果你希望在第二种和第三种情况下也屏蔽 foo, 那就不能使用 `=` 操作符来赋值，而是使用 `Object.defineProperty(...)` 来向 myObject 中添加 foo。
-   注意：第二种情况下，只读属性会阻止 `[[Prototype]]` 原型链下层隐式屏蔽同名属性。而这个限制仅存在于 `=` 操作符中，使用 `Object.defineProperty(...)` 则不会受到影响。

### 类
-   JavaScript 与其他面向类的语言不同，它并没有用类作为对象的抽象模式或蓝图，而 JavaScript 只有对象。
-   在面向类的语言中，`类可以或实例化多次`。
```js
function Foo(){
    //
};
var a = new Foo();
Object.getPrototypeof(a) === Foo.prototype; // true
```
-   在以上代码中，new Foo() 这个函数调用实际上并没有直接创建关联，这个关联只是一个意外的副作用。new Foo() 只是间接完成了我们的目标，一个关联到其他对象的新对象。
-   `在对象中，继承意味着复制操作`，JavaScript 默认情况下不会复制对象属性，只会在两个对象之间创建一个关联。

#### 构造函数
```js
function Foo(){
    //
}

var a = new Foo();
```
-   在以上代码为什么会让我们认为 Foo 是一个类呢？
    -   因为我们看到了关键字 `new`，在面向对象的语言中构造类实例时也会用到它。另一个原因就是，看起来我们执行了类的构造函数方法，而 Foo() 的调用方式很像初始化类时构造函数的调用方式。
-   除了构造函数外， Foo.prototype 还有一个绝招，如下代码：
```js
function Foo(){ }

Foo.prototype.constructor === Foo; // true
var a = new Foo();
a.constructor === Foo(); // true
// 实际上 .constructor 引用同样被委托给了 Foo.prototype，而 Foo.prototype.constructor 默认指向 Foo
```
-   Foo.prototype 有一个公有且不可枚举的属性 .constructor。而在上述代码中的 `constructor 属性引用的是对象关联的函数`(上述代码中是 Foo)。
-   还有一个 JavaScript 惯例，`类 名首字母要大写`，所以 Foo 而非 foo，这也提示这它是一个 `类`。

###### 是构造函数还是调用
-   上一段代码很容易让人认为 Foo 是一个构造函数，因为我们使用 new 来调用它并看到它 "构造" 了一个对象。
-   实际上，`Foo 和普通函数没有任何区别`。`函数本身并不是构造函数`。但是`当你在普通的函数调用前加上 new 关键字后，就会把当前函数编程一个构造函数调用`。`实际上，new 会劫持所有普通函数并用构造对象的形式来调用它`。
-   如下代码：
```js
function NothingSpecial() {
    console.log( "Don't mind me!" );
}

var a = new NothingSpecial();
// "Don't mind me!"

a; // {}
```
-   NothingSpecial 只是一个普通函数，但使用 new 调用时，它就会构造成一个对象并赋值给 a。而这个调用时一个构造函数调用，但 NothingSpecial 本身并不是一个构造函数。
-   `在 JavaScript 中对于构造函数最准确的解释是，所有带 new 的函数调用。`所以，函数不是构造函数，但是仅当使用 new 时，函数调用就会被变成 构造函数调用。

### 对象关联
-   现在我们了解了 `[[Prototype]]` 机制就是存在于对象中的一个内部链接，他会引用到其他对象。
-   何为原型链？
    -   如果在对象上没有找到需要的属性或方法引用，引擎就会先会在当前对象中查找，如果找不到，就在 `[[Prototype]]` 关联的对象进行查找。如果后者也没有找到需要的引用就会继续查找它的 `[[Prototype]]`，直到 `Object.prototype` 为止。以此类推，这一系列的对象链接被称为 "原型链"。

#### 创建关联
-   那 `[[Prototype]]` 机制的意义是什么？为什么要创建这些关联呢？
-   如下代码：
```js
var foo = {
    something: function(){
        console.log('do something');
    }
};

var bar = Object.create(foo);
var.something(); // do something
```
-   使用 `Object.create() 创建了一个新对象且关联到 foo`,这样就可避免一些不必要的麻烦(比如使用 new 的构造函数调用会生成 .prototype 和 .constructor 引用)
-   注意：`Object.create(null) 会创建一个空链接的对象，因为是空的，所有无法进行委托，并且由于这个对象没有原型链，在使用 instanceof 时也就无法进行判断，因此他们总是会返回 false。`
-   在上述的代码中我们通过创建一个新的类来创建两个对象之间的关系，其实并不需要这么做，只需要通过委托关系来关联对象就足够了。
```js
// Object.create()的 polyfill 代码

if(Object.create){
    Object.create = function(o){
        function F(){};
        F.prototype = o;
        return new F();
    }
}
```
-   上述代码使用一个一次性函数 F, 通过改写它的 .prototype 属性使其指向想要关联的对象，然后再使用 new F() 来构造一个新对象进行关联。

-   Object.create() 的扩展：
```js
var anotherObject = {
    a:2
};

var myObject = Object.create( anotherObject, {
    b: {
        enumerable: false,
        writable: true,
        configurable: false,
        value: 3
    },
    c: {
        enumerable: true,
        writable: false,
        configurable: false,
        value: 4
    }
});

myObject.hasOwnProperty( "a" ); // false
myObject.hasOwnProperty( "b" ); // true
myObject.hasOwnProperty( "c" ); // true

myObject.a; // 2
myObject.b; // 3
myObject.c; // 4
```
-   Object.create() 的第二个参数指定了需要添加到新对象中的属性名以及这些属性的属性描述符。

### 小结
1.  当访问对象中不存在的一个属性时，[[Get]] 操作就会查找对象内部 `[[Prototype]]` 关联的对象，这个关联关系就是一条 "原型链"(有点像嵌套的作用域)，在找到属性时会对它进行遍历。
2.  所有普通对象都有内置的 Object.prototype，指向原型链的顶端(比如说全局作用域), 如果在原型链中找不到指定的属性就会停止。
3.  关联两个对象最常用的方法就是用 new 关键字进行函数调用，在调用的第四个步骤中会创建一个关联到创建的新对象。
4.  使用 new 调用函数时会把新对象的 .prototype 属性关联到其他对象，带 new 的函数调用被称为构造函数调用
5.  对象之间是通过 `[[Prototype]]` 链关联的。
6.  Object.create(null) 会创建一个空链接的对象，因为是空的，所有无法进行委托，并且由于这个对象没有原型链，在使用 instanceof 时也就无法进行判断，因此他们总是会返回 false。
7.  如果对象中的属性不直接存在于当前对象中而是存在于原型链上层时会出现三种情况：
    1.  如果在 `[[Prototype]]` 原型链上层存在对象中的属性访问属性，并且没有被标记为只读`(writable: false)`,那就会直接在当前对象中添加一个对象中的属性属性，则它是屏蔽属性。
    2.  如果在 `[[Prototype]]` 原型链上存在对象中的属性属性，但是被标记为只读, 那就无法修改已有属性或在当前对象上创建屏蔽属性。如果在严格模式下运行，会直接抛出一个错误。否则，这条赋值语句就会被忽略。总之，不会发生屏蔽。
    3.  如果在 `[[Prototype]]` 原型链上层存在对象中的属性并且它是一个 `setter`，那就一定会调用这个 `setter`。对象中的属性不会被添加到(可以说屏蔽到)当前对象中，也不会重新定义对象中的属性这个 `setter`。
8.  使用 `for...in` 遍历对象和 `in` 操作符时都会查找对象的`整条原型链`。(无论属性是否可枚举)
9.  一个类其实就是一张蓝图，只是一个计划，并不是真正的可以交互的对象，我们必须通过实例化来调用所有公有数据属性，而这个`实例化对象就是类的所有特性的一份副本`。
10. 多态：父类的一些通用行为可以被子类的行为重写。
11. 多态并不表示父类和子类有关联，子类得到只是父类的一个副本，类的继承就是复制。


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
