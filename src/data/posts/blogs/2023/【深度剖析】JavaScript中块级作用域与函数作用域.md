# 面试官必问系列：深入理解JavaScript块和函数作用域
-   在 JavaScript 中，究竟是什么会生成一个新的作用域，只有函数才会生成新的作用域吗？那 JavaScript 其他结构能生成新的作用域吗？
## 3.1 函数中的作用域
-   在之前的词法作用域中可见 JavaScript 具有基于函数的作用域，这也就意味着一个函数都会创建一个新的作用域。但其实并不完全正确，看以下例子：
```js
function foo(a) {
    var b = 2;
    function bar() {
        // ...
    }
    var c = 3;
}
```
-   以上代码片段中，foo() 的作用域中包含了标识符 a, b, c 和 bar。无论表示声明出现在作用域中的何处，这个标识符所代表的变量和函数都附属于所处作用域的作用域中。
-   bar() 中也拥有属于自己的作用域，全局作用域也有属于自己的作用域，它只包含了一个标识符: foo()
-   由于标识符 a, b, c 和 bar 都附属于 foo() 的作用域内，因此无法从 foo() 的外部对它们进行访问。也就是说，这些标识符在全局作用域中是无法被访问到的，因此如下代码会抛出 ReferenceError:
```js
bar(); // ReferenceError: bar is not defined

console.log(a, b, c); // 全都抛出 ReferenceError
```
-   但标识符 a, b, c 和 bar 可在 foo() 的内部被访问的。
-   **函数作用域的含义**：`属于这个函数的全部变量都可以在整个函数的范围内使用及复用(在嵌套的作用域中也可以使用)`。这种设计方案可根据需要改变值类型的 "动态" 特性。

## 3.2 隐藏内部实现
-   我们对函数的传统认知就是先声明一个函数，然后再向里面添加代码，但`反过来`可带来一些启示：`从所写的代码中挑选出一个任意片段，然后就用函数声明的方式对它进行包装，实际上就是把这些代码 "隐藏" 起来了。`
-   `实际的结果就是在这个代码片段的周围创建了一个新的作用域`，也就是说这段代码中的任何声明(变量或函数)都将绑定在这个新创建的函数作用域中，而不是先前所在的作用域中。换句话说，可把变量和函数包裹在一个函数的作用域中，然后用这个作用域来 "隐藏" 他们。
-   为什么 "隐藏" 变量和函数是一个有用的技术？
```js
function doSomething(a) {
    b = a + doSomethingElse( a * 2 );
    console.log( b * 3 );
}
function doSomethingElse(a) {
    return a - 1;
}
var b;
doSomething( 2 ); // 15
```
-   上述代码片段中，变量 b 和函数 doSomethingElse(..) 应该是 doSomething(..) 内部具体实现的 "私有" 内容。而上述代码将变量 b 和函数 doSomethingElse(..) 的访问权限放在了外部作用域中，这可能是 "危险" 的。更 "合理" 的设计应该是将这些私有内容放在 doSomething(...) 的内部。
-   如下：
```js
function doSomething(a) {
    function doSomethingElse(a) {
        return a - 1;
    }

    var b;
    b = a + doSomethingElse( a * 2 );
    console.log( b * 3 );
}
doSomething( 2 ); // 15
```
-   **规避冲突**
-   `"隐藏" 作用域中的变量和函数的另一个好处是可避免同名标识符的冲突`，两个标识符名字相同但用途不同，无意间可能会造成命名冲突，而冲突会导致变量的值被意外覆盖。
-   例如：
```js
function foo() {
    function bar(a) {
        i = 3; // 修改for 循环所属作用域中的i
        console.log( a + i );
    }
    for (var i=0; i<10; i++) {
        bar( i * 2 ); // 糟糕，无限循环了！
    }
}
foo();
```
-   bar(...) 内部的赋值表达式 i = 3 意外地覆盖了声明在 foo(..) 内部 for 循环中的 i。在这个例子中将会导致无限循环，因为 i 被固定设置为 3，永远满足小于 10 这个条件。
-   **规则冲突的方式**：
    1.  **全局命名空间**：在全局作用域中声明一个足够独特的变量，通常为一个对象，如下：
```js
var MyReallyCoolLibrary = {
    awesome: "stuff",
    doSomething: function() {
        // ...
    },
    doAnotherThing: function() {
        // ...
    }
}
```
    2.  **模块管理**
## 3.3 函数作用域
-   现在知道，在任意代码片段外部添加包装函数，可将内部的变量和函数定义 "隐藏" 起来，外部作用域无法访问包装函数内部的任何内容。
-   如下：
```js
var a = 2;
function foo() { // <-- 添加这一行
    var a = 3;
    console.log( a ); // 3
} // <-- 以及这一行
foo(); // <-- 以及这一行
console.log( a ); // 2
```
-   上述代码会导致一些额外的问题，首先，必需先声明一个具名函数 foo(), 这就意味着 foo 这个名称本身 "污染" 了所在作用域(上述代码为全局作用域)。其次，必须显式地通过 foo() 来调用这个函数。
-   如果函数不需要函数名(或者至少函数名可以不污染所在作用域)，且能够自行运行，这将会更理想。
-   JavaScript 提供了两种方案来解决：
```js
var a = 2;
(function foo() {
    // <-- 添加这一行
    var a = 3;
    console.log(a); // 3
})(); // <-- 以及这一行
console.log(a); // 2
```
-   在上述代码中，包装函数的声明以 `(function...` 而不仅是以 `function...` 开始。`函数会被当做函数表达式而不是一个标准的函数声明来处理。`
-   **如何区分函数声明和表达式？**
    -   最简单的方式就是看 `function 关键字出现在声明中的位置`(不仅仅是一行代码，而是整个声明中的位置)。`如果 function 为声明中的第一个关键字，那它就是一个函数声明，否则就是一个函数表达式。`
    -   `函数声明和函数表达式之间最重要的区别就是他们的名称标识符将会绑定在何处。`
-   比较一下前面两个代码片段。第一个片段中 foo 被绑定在所在作用域中，可以直接通过 foo() 来调用它。第二个片段中foo 被绑定在函数表达式自身的函数中而不是所在作用域中。
-   换句话说，`(function foo(){...}) `作为函数表达式意味着 `foo` 只能在 `...` 所代表的位置中被访问，外部作用域则不行。

### 3.3.1 匿名和具名
-   对于函数表达式最熟悉的就是回调参数了，如下：
```js
setTimeout(function () {
    console.log("I waited 1 second!");
}, 1000);
```
-   这叫作`匿名函数表达式`，因为 `function()..` 没有名称标识符。函数表达式可以是匿名的，而函数声明则不可以省略函数名——在JavaScript 的语法中这是非法的。
-   **匿名函数表达式的缺点**：
    1.  `匿名函数在栈追踪中不会显示出有意义的函数名`，这使调试很困难。
    2.  如果没有函数名，当函数需要引用自身时只能通过已经`过期`的 `arguments.callee` 来引用。
    3.  匿名函数对`代码可读性`不是很友好。
-   上述代码的改造结果：
```js
setTimeout(function timeoutHandler() {
    console.log("I waited 1 second!");
}, 1000);
```

### 3.3.2 立即执行函数表达式
```js
var a = 2;
(function IIFE() {
    var a = 3;
    console.log(a); // 3
})();
console.log(a); // 2
```
-   由于函数被包含在一对( ) 括号内部，因此成为了一个表达式，通过在末尾加上另外一个( ) 可以立即执行这个函数，比如(function foo(){ .. })()。第一个( ) 将函数变成表达式，第二个( ) 执行了这个函数。
-   立即执行函数表达式的术语为：IIFE(Immediately Invoked Function Expression);
-   **IIFE 的应用场景**：
    1.  除了上述传统的 IIFE 方式，还有另一个方式，如下：
```js
var a = 2;
(function IIFE() {
    var a = 3;
    console.log(a); // 3
}());
console.log(a); // 2
```
-   第一种形式中函数表达式被包含在 ( ) 中，然后在后面用另一个 () 括号来调用。第二种形式中用来调用的 () 括号被移进了用来包装的 ( ) 括号中。
-   这两种方式的选择全凭个人喜好。
2.  IIFE 还有一种进阶用法，就是`把他们当做函数调用并传递参数进去`,如下：
```js
var a = 2;
(function IIFE(global) {
    var a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
})(window);
console.log(a); // 2
```
3.  IIFE 的另一个应用场景是`解决 undefined 标识符的默认值被错误覆盖导致的异常`。
    -   将一个参数命名为 undefined, 但在对应的位置不传入任何值，这样就可以就保证在代码块中 undefined 标识符的值为 undefined
```js
undefined = true; // 给其他代码挖了一个大坑！绝对不要这样做！
(function IIFE(undefined) {
    var a;
    if (a === undefined) {
        console.log("Undefined is safe here!");
    }
})();
```
4.  IIFE 的另一种变化的用途是`倒置代码的运行顺序，将需要运行的函数放在第二位，在IIFE执行之后当做参数传递进去`。
```js
var a = 2;
(function IIFE(def) {
    def(window);
})(function def(global) {
    var a = 3;
    console.log(a); // 3
    console.log(global.a); // 2
});
```
-   函数表达式 def 定义在片段的第二部分，然后当做参数(这个参数也叫做 def)被传递 IIFE 函数定义的第一部分中。最后，参数 def(也就是传递进去的函数)被调用，并将 window 传入当做 global 参数的值。
## 3.4 块作用域
-   如下：
```js
for (var i = 0; i < 5; i++){
    console.log(i);
}
```
-   在 for 循环中定义了变量 i，通常是想在 for 循环内部的上下文中使用 i, 而忽略 i 会绑定在外部作用域(函数或全局)中。
-   修改后：
```js
var foo = true;
if(foo) {
    var bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}
```
-   上述代码中，变量 bar 仅在 if 的上下文中使用，将它声明在 if 内部中式非常一个清晰的结构。
-   **当使用 var 声明变量时，它写在哪里都是一样的，因为它最终都会属于外部作用域。(这也就是变量提升)**

### 3.4.1 with
-   在[词法作用域](https://mp.weixin.qq.com/s/zfTTVsgBRjoOk0Sm6Scb2w)中介绍了 with 关键字，它不仅是一个难于理解的结构，同是也是一块作用域的一个例子(块作用域的一种形式)，`用 with 从对象中创建出的作用域仅在 with 所处作用域中有效`。

### 3.4.2 try/catch
-   很少有人注意，JavaScript 在 ES3 规范 `try/catch` 的 catch 分句会创建一个块作用域，其中声明的变量仅会在 catch 内部有效。
```js
try {
    undefined(); // 目的是让他抛出一个异常
} catch (error) {
    console.log("error ------>", error); // TypeError: undefined is not a function
}
console.log("error ------>", error); // ReferenceError: error is not defined
```
-   `error 仅存在于 catch 分句内部，当视图从别处引用它时会抛出错误。`
-   关于 catch 分句看起来只是一些理论，但还是会有一些有用的信息的，后续文章会提到。

### 3.4.3 let
-   JavaScript 在 ES6 中引入了 let 关键字。
-   `let 关键字将变量绑定到所处的任意作用域中(通常是 { ... } 内部)。换句话说，let 声明的变量隐式地了所在的块作用域。`
```js
var foo = true;
if(foo) {
    var bar = foo * 2;
    bar = something(bar);
    console.log(bar);
}
console.log(bar); // ReferenceError: bar is not defined
```
-   `使用 let 进行的声明不会再块作用域中进行提升。声明的代码被运行前，声明并不 "存在"。`
```js
{
    console.log(bar); // ReferenceError
    let bar = 2;
}
```
**1.  垃圾收集**
-   另一个块作用域很有用的原因和闭包中的内存垃圾回收机制相关。
-   如下代码：
```js
function process(data) {
    // do something
}

var someObj = {};
process(someObj);

var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(evt) {
    console.log('clicked');
}, /*capturingPhase=*/false);
```
-   click 函数的点击回调并不需要 someReallyBigData 变量。理论上这意味着当 process(..) 执行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于 click函数形成了一个覆盖整个作用域的闭包，JavaScript 引擎极有可能依然保存着这个结构（取决于具体实现）。
-   修改后：
```js
function process(data) {
    // do something
}

// 在这个块中定义内容就可以销毁了
{
    var someObj = {};
    process(someObj);
}

var btn = document.getElementById('my_button');
btn.addEventListener('click', function click(evt) {
    console.log('clicked');
}, /*capturingPhase=*/false);
```
**2.  let循环**
-   代码如下：
```js
for(let i = 0; i < 10; i++) {
    console.log(i);
};
console.log(i); // ReferenceError
```
-   for 循环中的 let 不仅将 i 绑定了for 循环内部的块中，事实上他将其重新绑定到了循环的每一次迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。
-   下面通过另一种方式来说明每次迭代时进行重新绑定的行为；
```js
{
    let i;
    for(i = 0; i < 10; i++) {
        let j = i; // 每次迭代中重新绑定
        console.log(j);
    };
}
```
-   let 声明附属与一个新的作用域而不是当前的函数作用域(也不属于全局作用域)。
-   考虑一下代码：
```js
var foo = true, baz = 10;

if (foo) {
    var bar = 3;

    if (baz > bar) {
        console.log( baz );
    }

    // ...
}
```
-   这段代码可以简单地被重构成下面的同等形式：
```js
var foo = true, baz = 10;

if (foo) {
    var bar = 3;
    // ...
}

if (baz > bar) {
    console.log( baz );
}
```
-   但是在使用块级作用域的变量时需要注意以下变化：
```js
var foo = true, baz = 10;

if (foo) {
    let bar = 3;

    if (baz > bar) { // <-- 移动代码时不要忘了 bar!
        console.log( baz );
    }
}
```

### 3.4.4 const
-   `ES6 还引入了 const, 同样可用来创建块级作用域，但其值是固定的(常量), 不可修改。`
```js
var foo = true;

if (foo) {
    var a = 2;
    const b = 3; // 包含在 if 中的块作用域常量

    a = 3; // 正常 !
    b = 4; // 错误 !
}

console.log( a ); // 3
console.log( b ); // ReferenceError!
```

## 3.5 小结
1.  `函数时 JavaScript 中最常见的作用域单元。`
2.  `块作用域值的是变量和函数布局可以属于所处的作用域，也可以属于某个代码块(通常指 {...} 内部)`
3.  从 `ES3` 开始， `try/catch 结构在 catch 分句中具有块作用域`。
4.  从 `ES6` 引入了 `let，const 关键字来创建块级作用域`。
