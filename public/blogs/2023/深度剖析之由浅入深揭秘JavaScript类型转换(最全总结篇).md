## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。

## 深度剖析之由浅入深揭秘JavaScript类型转换(最全总结篇)
### 值类型转换
-   将值从一种类型转换为另一种类型通常称为类型转换，分为 `隐式强制类型转换` 和 `显示强制类型转换`。两者的区别在于是否可直观看出。
-   如下代码：
```js
var a = 42;

var b = a + "";         // 隐式强制类型转换

var c = String( a );    // 显式强制类型转换

b; // 42
c; // 42
```
-   上述代码中，对于 b 而言是隐式转换，而对于 c 而言是显示转换。

### 抽象值操作
-   在值类型转换前我们先来看看字符串、数字、布尔值之前的基本转换规则。
#### toString
-   该操作，`负责处理非字符串到字符串的强制类型转换。`
-   例如：null -> "null"，undefined -> "undefined", true -> "true"
-   `对于普通对象来说，除非自定义，否则都会调用其内部的 toString() 方法。`
-   Array
    -   `数组的toString() 方法经过了重定义，会将所有数组元素用 `,` 连接起来。`
```js
var a = [1,2,3];

a.toString(); // 1,2,3
```
-   JSON
    -   工具函数 JSON.stringify() 在将 JSON 对象序列化为字符串时也用到了 toString
-   对于大多数简单值来说，JSON 字符串与 toString() 的结果基本相同。但对于某一些值来说不同，例如：undefined, function, symbol, 循环引用(对象之间的相互引用，行程一个无限循环)，JSON.stringify() 就无法处理它。
-   如下代码：
```js
JSON.stringify(undefined); // undefined
JSON.stringify(function () {}); // undefined

JSON.stringify([1, undefined, function () {}, 4]); // "[1,null,null,4]"
JSON.stringify({ a: 2, b: function () {} }); // "{"a":2}"
JSON.stringify([undefined, Object, Symbol("")]);  // '[null,null,null]'
```
-   对于包含循环引用的对象执行 JSON.stringify() 会出错。但我们可以通过 `toJSON()` 方法进行重写。
-   如下代码：
```js
// eg1:
var o = { };

var a = {
    b: 42,
    c: o,
    d: function(){}
};
// 在a中创建一个循环引用
o.e = a;

// 循环引用在这里会产生错误
// JSON.stringify( a ); // TypeError: Converting circular structure to JSON

// 自定义的JSON序列化
a.toJSON = function() {
    // 序列化仅包含b
    return { b: this.b };
};

JSON.stringify( a ); // "{"b":42}"


// eg2:
var a = {
    val: [1,2,3],

    // 可能是我们想要的结果！
    toJSON: function(){
        return this.val.slice( 1 );
    }
};
JSON.stringify( a ); // "[2,3]"
```
-   还有关于 JSON.stringify() 的不太为人知的功能：
    -   可向 JSON.stringify() 中传递第二个参数 replacer, 可以是`数组或函数`。
    -   `如果 replacer 为数组, 那它必须为字符串数组，数组中包含了要序列化要处理的对象 key, 除此之外的属性则会被忽略`。
    -   `如果 replacer 为函数，那它会对对象本身调用一次，然后对对象中的每个属性各调用一次，可传递两个参数，键和值。`
-   如下代码：
```js
var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};

// replacer 为数组
JSON.stringify( a, ["b","c"] ); // "{"b":42,"c":"42"}"

// replacer 为函数
JSON.stringify( a, function(k,v){
    if (k !== "c") return v;
} );
// "{"b":42,"d":[1,2,3]}"
```

-   `还有一个可选参数 space，用于指定缩进格式。`
```js
var a = {
    b: 42,
    c: "42",
    d: [1,2,3]
};

JSON.stringify( a, null, 3 );
// "{
//    "b": 42,
//    "c": "42",
//    "d": [
//       1,
//       2,
//       3
//    ]
// }"
```
-   总结：
    -   `对于字符串，数字，布尔值和 null，结果与 toString() 基本相同。`
    -   `如果在 JSON.stringify() 的对象中重定义了 toJSON() 方法，那该方法会在字符序列化前调用。`
#### toNumber
-   其中 true 转换为 1，false 转换为 0。undefined 转换为 NaN，null 转换为 0。
-   将值转换时会遵循以下规则：
    -   `在使用 Number() 或 toNumber() 方法将一个字符串转换为数字时，如果字符串中出现非数字字符，则会返回 NaN。`
```js
let obj = {
    // 首先调用
    [Symbol.toPrimitive]() {
        return 200;
    },
    // 中间调用
    valueOf() {
        return 300;
    },
    // 最后调用
    toString() {
        return 'Hello';
    }
}
console.log(obj + 200); // 400
```
#### toBoolean
-   以下这些是假值：
```js
• undefined
• null
• false
• +0、-0 和 NaN
• ""

// 假值的布尔强制类型转换结果为 false。
```
-   我们可以这么理解除了以上假值列表意外的值都是真值。
```js
// eg1:
var a = new Boolean(false);
var b = new Number(0);
var c = new String("");
console.log(!!(a && b && c)); // true

// eg2:
var a = 'false';
var b = '0';
var c = "''";
console.log(!!(a && b && c)); // true
```
#### toPromitive
-   转换规则：
    -   如果检查该值是否有 valueOf 方法，看是否会返回原始值，如果返回值是原始值，则直接使用。否则，就使用 toString 方法，如果 toString 方法返回的是原始值，则直接使用，否则抛出 TypeError 错误。
```js
"0" == false; // true
false == 0; // true
false == ""; // true
false == []; // true
"" == 0; // true
"" == []; // true
0 == []; // true
```
### 显示强制类型转换
-   `~(非) 运算符`
    -   对于非运算符的理解：我们可理解为` ~ 会返回 2 的补码`。
-   如下：
```js
// ~x 大致等于 -(x + 1)。

~42; // -(42 + 1) ==> -43
```
-   `在 -(x + 1) 中唯一能够得到 0 的 x 值是 -1。也就是如果 x 为 -1 时，~ 与其他一些数字值会返回 false 值，否则返回 true 值。`
```js
// before
var a = "Hello World";

if (a.indexOf( "lo" ) >= 0) {   // true
    // 找到匹配！
}
if (a.indexOf( "lo" ) != -1) {  // true
    // 找到匹配！
}

if (a.indexOf( "ol" ) < 0) {    // true
    // 没有找到匹配！
}
if (a.indexOf( "ol" ) == -1) {  // true
    // 没有找到匹配！
}

// after
var a = "Hello World";

~a.indexOf( "lo" );         // -4   <-- 真值!

if (~a.indexOf( "lo" )) {   // true
    // 找到匹配！
}

~a.indexOf( "ol" );         // 0    <-- 假值!
!~a.indexOf( "ol" );        // true

if (!~a.indexOf( "ol" )) {  // true
    // 没有找到匹配！
}
```
-   显示转换为布尔值
```js
// before
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

Boolean( a ); // true
Boolean( b ); // true
Boolean( c ); // true

Boolean( d ); // false
Boolean( e ); // false
Boolean( f ); // false
Boolean( g ); // false



// after
var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

!!a;    // true
!!b;    // true
!!c;    // true

!!d;    // false
!!e;    // false
!!f;    // false
!!g;    // false
```
-   在if() 判断中，如果没有使用 Boolean() 和 !!, 就会自动隐式进行 toBoolean 转换。
### 隐式强制类型转换
-   `+` 运算符既能用于加法运算，也能用于字符串拼接。
```js
var a = "42";
var b = "0";

var c = 42;
var d = 0;

a + b; // "420"
c + d; // 42
```
-   S: `如果 + 运算符中其中一个操作数是字符串，则执行字符串拼接，否则执行加法运算。`
#### 隐式强制类型转换为布尔值
-   (1) if (..) 语句中的条件判断表达式。
-   (2) for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
-   (3) while (..) 和 do..while(..) 循环中的条件判断表达式。
-   (4) ? : 中的条件判断表达式。
-   (5) 逻辑运算符 ||（逻辑或）和 &&（逻辑与）左边的操作数（作为条件判断表达式）。

-   `|| 和 &&`
    -   他们的`返回值两个操作数中的其中一个`。
```js
var a = 42;
var b = "abc";
var c = null;

a || b;     // 42
a && b;     // "abc"

c || b;     // "abc"
c && b;     // null
```
-   `|| 和 && 操作符会对第一个操作数进行条件判断，且会对第一个操作数进行隐式类型转换(会通过 toBoolean 操作)，然后再进行条件判断。`
-   `|| 运算符，如果条件判断结果为true， 就返回第一个操作数的结果。如果为 false, 就返回第二个操作数的结果。`
-   `&& 运算符则相反，如果条件判断结果为 true 就返回第二个操作数结果，如果为 false, 就返回第一个操作数的结果。`
```js
a || b;
// 大致相当于
a ? a : b;

a && b;
// 大致相当于
a ? b : a;
```
### 宽松相等(==)和严格相等(===)
-   宽松相等 == 与严格相等 === 都是用于判断两个值是否相等。但他们之间有一个重要的区别，特别是在`判断条件上`。
-   在之前的了解和很多文章中很多人这样聊到： `== 检查值是否相等， === 检查值和类型是否相等`。这么说听起来蛮有道理，但不够准确。正确的解释应该是: `== 允许在相等比较中进行强制类型转换，而 === 不允许`
#### 两种操作符的性能
-   根据第一种(`== 检查值是否相等， === 检查值和类型是否相等`)解释：严格相等(===) 比 宽松相等(==) 似乎做的事情更多，因为它还要检查值的类型。而第二种(`== 允许在相等比较中进行强制类型转换，而 === 不允许`) 解释： 宽松相等(==) 似乎做的事情更多，如果值类型不同还需要进行强制类型转换。
-   这样下来，有人觉得 == 比 === 慢，实际上确实 == 在强制类型转换的时候需要花费时间，但这个时间为微妙级的(百万分之一秒)。所以，`在进行比较两个值类型相同的情况下，使用 == 与 === 没有什么区别`。`如果两个值类型不同，这时候就要考虑有没有强制类型转换的必要，有就用 ==，没有就用 ===，不需要在乎性能`。
-   == 和 === 他们都会检查操作数的类型，区别在于操作数类型不同时他们的处理方式的不同。
###### 字符串和数字之间的相等比较
```js
var a = 42;
var a = "42";

a === b; // false
a == b; // true
```
-   a === b 因为没有强制类型转换，所以 a === b 为 false, 也就是 42 和 "42" 不相等。
-   a == b 因为是宽松相等，即当两个值类型不同时，则对其中一个值进行强制类型转换。那如何转换，是转换 a，还是转换 b 呢？
-   ES5 规范 11.9.3.4-5 规则：
    -   `如果 Type(x) 为数字，Type(y) 为字符串，则返回 x == toNumber(y) 的结果`
    -   `如果 Type(x) 为字符串，Type(y) 是数字，则返回 toNumber(x) == y 的结果`
-   所以根据以上规则，"42" 会被进行 toNumber 转换然后进行相等比较，所以 42 == 42 为 true。
###### 其他类型与布尔类型之间的相等比较
-   == 很容易出错的一个地方就是 true、false 和其他类型之间的相等比较。
```js
var a = "42";
var b = true;

a == b; // false
```
-   我们知道变量 a 为字符串 "42" 是一个真值，那为什么 a == b 会返回 false 呢？
-   ES5 规范 11.9.3.6-7 规则：
    -   `如果 Type(x) 是布尔类型，则返回 toNumber(x) == y 的结果`
    -   `如果 Type(y) 是布尔类型，则返回 x == toNumber(y) 的结果`
-   所以根据以上规则， Type(b) 为布尔类型，所以会对 b 进行 toNumber 操作，然后就是 true = 1, 根据字符串与数字之间的比较规则可得出 42 != 1，所以结果为 false。
-   所以现在你搞懂了吗？？？
-   "42" 是一个真值没错，但 "42" == true 并没有发生布尔值比较和强制类型转换。这里并不是 "42" 转换为布尔值，而是 true 进行 toNumber 操作。
-   所以我们要搞清 == 对不同类型的组合会怎样处理，`== 两边的布尔值会进行 toNumber 操作`。
-   所以建议大家不管什么情况下都不要使用 == true 和 == false 来判断。但对于 === 来说，它不会发生强制类型转换，所以不需要进行 toNumber 操作。
```js
var a = "42";
// 不要这样用，条件判断不成立：
if (a == true) {
    // ..
}

// 也不要这样用，条件判断不成立：
if (a === true) {
    // ..
}

// 这样的显式用法没问题：
if (a) {
    // ..
}

// 这样的显式用法更好：
if (!!a) {
    // ..
}

// 这样的显式用法也很好：
if (Boolean( a )) {
    // ..
}
```
###### null 和 undefined 之间的相等比较
-   ES5 规范 11.9.3.2-3 规则：
    -   `如果 x 为 null, y 为 undefined, 则结果为 true`
    -   `如果 x 为 undefined, y 为 null, 则结果为 true`
-   在 == 中 null 和 undefined 相等且他们也与自身相等，除此之外不存在这种情况。也就是说`在 == 中的 null 和 undefined 是一回事，可进行隐式的强制类型转换`。
```js
var a = null;
var b;

a == b;     // true
a == null;  // true
b == null;  // true
null == undefined;  // true
null == null;  // true
undefined == undefined;  // true

a == false; // false
b == false; // false
a == "";    // false
b == "";    // false
a == 0;     // false
b == 0;     // false
```
-   所以我们`可将 null 和 undefined 作为等价来处理`。
```js
var a = doSomething();

if (a == null) {
    // ..
}
```
-   以上的 if 判断语句只有当 a 为 null 或 undefined 时才成立，除此之外都不成立，包含 0, false 和 ''。
###### 对象与非对象之间的相等比较
-   关于对象(对象、函数、数组)与基本类型(字符串、数字，布尔值)之间的相等比较。
-   ES5规范 11.9.3.8-9 规则如下：
    -   `如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == toPromitive(y) 的结果`
    -   `如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 toPromitive(x) == y 的结果`
```js
var a = 42;
var b = [ 42 ];

a == b; // true
```
-   [ 42 ] 首先调用 toPromitive 抽象操作，返回 "42"，变成 "42" == 42，然后又变成 42 == 42，最后二者相等。

###### 比较少见的情况
-   如何让同时 a == 1 && a == 2 && a == 3？
-   其中不能用同时，因为 a = 1 在 a = 2 之前执行，a = 2 在 a = 3 之前执行。
-   如下代码：
```js
// 方法一：
var a = {
    i: 1,
    [Symbol.toPrimitive]() {
        return this.i++;
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log(a); // { i: 4, valueOf: [Function: valueOf] } 输出 a 对象，注意 i 的值
}

// 方法二：
var a = {
    i: 1,
    valueOf() {
        return this.i++;
    },
};
if (a == 1 && a == 2 && a == 3) {
    console.log(a); // { i: 4, valueOf: [Function: valueOf] } 输出 a 对象，注意 i 的值
}
// 如果让 a.valueOf() 每次调用都产生副作用，比如第一次返回 1, 第二次返回 2，以此类推，就会产生这种情况。

// 方法三：
var a = {
    i: 1,
    toString() {
        return this.i++;
    },
};
if (a == 1 && a == 2 && a == 3) {
    console.log(a); // { i: 4, valueOf: [Function: valueOf] } 输出 a 对象，注意 i 的值
}
```

-   在 == 隐式强制类型转换中最令人头疼的就是假值得相等比较。
```js
"0" == null;           // false
"0" == undefined;      // false
"0" == false;          // true -- 晕！
"0" == NaN;            // false
"0" == 0;              // true
"0" == "";             // false

false == null;         // false
false == undefined;    // false
false == NaN;          // false
false == 0;            // true -- 晕！
false == "";           // true -- 晕！
false == [];           // true -- 晕！
false == {};           // false

"" == null;            // false
"" == undefined;       // false
"" == NaN;             // false
"" == 0;               // true -- 晕！
"" == [];              // true -- 晕！
"" == {};              // false

0 == null;             // false
0 == undefined;        // false
0 == NaN;              // false
0 == [];               // true -- 晕！
0 == {};               // false
```
-   以上的这 24种情况 中有 17 中我们比较好理解，但有 7 中不好理解。
-   那`如何安全使用 == 操作符呢？`
    1.  `如果两边的值有 true 或 false, 千万不要使用 ==`
    2.  `如果两边的值有 []、""、0, 千万不要使用 ==`

### 抽象关系比较
-   在我们日常的代码中，可能会存在 a < b 这种情况的判断，但这里面也涉及了隐式强制类型转换，有必要要了解一下。
-   会发生隐式强制类型转换的算法只会针对于 `a < b, a = "" > b 会被处理为 b <>`
-   ES5 规则：
    -   `比较双方会首先调用 toPromitive，如果结果中出现非字符串，就根据 toNumber 的规则将双方强制类型转换为数字进行比较`
```js
// 如下：
var a = 42;
var b = "43";
a < b; // true 这里为什么会返回 true, 先保留疑惑，后面会解答
b < a; // false


// 再比如：如果比较双方都是字符串，则按照字母顺序进行比较：
var a = ["42"];
var b = ["043"];
a < b; // false
b < a; // true



// 再比如：如果比较双方都是字符串, 则会进行 toPromitive 操作
var a = {b: 42};
var b = {b: 43};
a < b; // false
b < a; // false
// 因为 a = [object Object], b 也是 [object, Object]，所以按照字母顺序排序 a < b, b < a 不成立。



// 再比如：
var a = {b: 42};
var b = {b: 43};
a < b; // false
a == b; // false
a > b; // false
a <= b; // true
a >= b; // true

// 此时你可能会好奇 a < b 和 a == b 都是 false，为什么 a <= b 和 a > b 为 true？
// 因为根据规则 a <= b 会被处理为 b < a, 然后将结果反转。（如果没懂，回头看这段实例代码）
```
-   上面的结果可能与我们设想的大相径庭，相等比较有严格相等，关系比较却没有严格相等，也就是说`如果要避免  a < b 之间的隐式强制类型转转，就只能确保 a 和 b 为相同的类型, 或进行显示的强制类型转换。`

### 小结
1.  值类型转换规则：
    -   `toString： 对于普通对象来说，除非自定义，否则都会调用其内部的 toString() 方法。`
    -   `toNumber: 在使用 Number() 或 toNumber() 方法将一个字符串转换为数字时，如果字符串中出现非数字字符，则会返回 NaN。`
    -   `toBoolean: 除 undefined、null、false、+0、-0 和 NaN、"" 都为真值`
    -   `toPromitive: 如果检查该值是否有 valueOf 方法，看是否会返回原始值，如果返回值是原始值，则直接使用。否则，就使用 toString 方法，如果 toString 方法返回的是原始值，则直接使用，否则抛出 TypeError 错误。`
2.  显/隐式强制类型转换：
    -   `如果 + 运算符中其中一个操作数是字符串，则执行字符串拼接，否则执行加法运算`。
    -   `~(非) 运算符: ~ 会返回 2 的补码, 而 ~x 大致等于 -(x + 1)`
```js
// ~x 大致等于 -(x + 1)。

~42; // -(42 + 1) ==> -43
```
3.  || 与 &&:
    -   `|| 和 && 操作符会对第一个操作数进行条件判断，且会对第一个操作数进行隐式类型转换(会通过 toBoolean 操作)，然后再进行条件判断。`
    -   `|| 运算符，如果条件判断结果为true， 就返回第一个操作数的结果。如果为 false, 就返回第二个操作数的结果`。
    -   `&& 运算符则相反，如果条件判断结果为 true 就返回第二个操作数结果，如果为 false, 就返回第一个操作数的结果`。
```js
a || b;
// 大致相当于
a ? a : b;

a && b;
// 大致相当于
a ? b : a;
```
4.  严格相等(===) 与宽松相等(==) 有一个重要的区别，特别是在判断条件上(`在于对操作数类型不同时他们的处理方式不同`)：`== 允许在相等比较中进行强制类型转换，而 === 不允许`。
    -   `在两个值类型相同情况下，使用 == 与 === 没有区别`
    -   `在两个值类型不同情况下，就要考虑是否有没有强制类型转换的必要，有就用 ==, 没有就用 ===`
5.  字符串与数字之间的比较规则：
    -   `如果 Type(x) 为数字，Type(y) 为字符串，则返回 x == toNumber(y) 的结果`
    -   `如果 Type(x) 为字符串，Type(y) 是数字，则返回 toNumber(x) == y 的结果`
```js
var a = 42;
var a = "42";

a === b; // false
a == b; // true
```
6.  其他类型与布尔值的比较规则：(宽松相等(==) 判断时两边的布尔值会进行 toNumber 操作)
    -   `如果 Type(x) 是布尔类型，则返回 toNumber(x) == y 的结果`
    -   `如果 Type(y) 是布尔类型，则返回 x == toNumber(y) 的结果`
```js
var a = "42";
var b = true;

a == b; // false
```
```js
var a = "42";
// 不要这样用，条件判断不成立：
if (a == true) {
    // ..
}

// 也不要这样用，条件判断不成立：
if (a === true) {
    // ..
}

// 这样的显式用法没问题：
if (a) {
    // ..
}

// 这样的显式用法更好：
if (!!a) {
    // ..
}

// 这样的显式用法也很好：
if (Boolean( a )) {
    // ..
}
```
7.  null 与 undefined 的比较规则：
    -   `如果 x 为 null, y 为 undefined, 则结果为 true`
    -   `如果 x 为 undefined, y 为 null, 则结果为 true`
```js
var a = null;
var b;

a == b;     // true
a == null;  // true
b == null;  // true
null == undefined;  // true
null == null;  // true
undefined == undefined;  // true

a == false; // false
b == false; // false
a == "";    // false
b == "";    // false
a == 0;     // false
b == 0;     // false
```
-   所以我们`可将 null 和 undefined 作为等价来处理`。
```js
var a = doSomething();

if (a == null) {
    // ..
}
```
8.  对象与非对象之间的相等比较规则：
    -   `如果 Type(x) 是字符串或数字，Type(y) 是对象，则返回 x == toPromitive(y) 的结果`
    -   `如果 Type(x) 是对象，Type(y) 是字符串或数字，则返回 toPromitive(x) == y 的结果`
9.  宽松相等(==) 的假真值比较：
```js
"0" == null;           // false
"0" == undefined;      // false
"0" == false;          // true -- 晕！
"0" == NaN;            // false
"0" == 0;              // true
"0" == "";             // false

false == null;         // false
false == undefined;    // false
false == NaN;          // false
false == 0;            // true -- 晕！
false == "";           // true -- 晕！
false == [];           // true -- 晕！
false == {};           // false

"" == null;            // false
"" == undefined;       // false
"" == NaN;             // false
"" == 0;               // true -- 晕！
"" == [];              // true -- 晕！
"" == {};              // false

0 == null;             // false
0 == undefined;        // false
0 == NaN;              // false
0 == [];               // true -- 晕！
0 == {};               // false
```
10. 如何安全使用 宽松相等(==) 操作符呢？
    1.  `如果两边的值有 true 或 false, 千万不要使用 ==;`
    2.  `如果两边的值有 []、""、0, 千万不要使用 ==;`
11. 抽象关系比较存在隐式的强制类型转换，通常存在于 `a < b, a = "" > b 会被处理为 b <>` 判断中，其中一个很重要的点是，`会将结果反转`。
-   那`如何规避掉上述隐式的强制类型转换`？
    -   `确保 a 和 b 为相同的类型, 或进行显示的强制类型转换。`
12. 如何让同时 a == 1 && a == 2 && a == 3？
    -   其中不能用同时，因为 a = 1 在 a = 2 之前执行，a = 2 在 a = 3 之前执行。
```js
// 方法一：
var a = {
    i: 1,
    [Symbol.toPrimitive]() {
        return this.i++;
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log(a); // { i: 4, valueOf: [Function: valueOf] } 输出 a 对象，注意 i 的值
}

// 方法二：
var a = {
    i: 1,
    valueOf() {
        return this.i++;
    },
};
if (a == 1 && a == 2 && a == 3) {
    console.log(a); // { i: 4, valueOf: [Function: valueOf] } 输出 a 对象，注意 i 的值
}
// 如果让 a.valueOf() 每次调用都产生副作用，比如第一次返回 1, 第二次返回 2，以此类推，就会产生这种情况。

// 方法三：
var a = {
    i: 1,
    toString() {
        return this.i++;
    },
};
if (a == 1 && a == 2 && a == 3) {
    console.log(a); // { i: 4, valueOf: [Function: valueOf] } 输出 a 对象，注意 i 的值
}
```

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
