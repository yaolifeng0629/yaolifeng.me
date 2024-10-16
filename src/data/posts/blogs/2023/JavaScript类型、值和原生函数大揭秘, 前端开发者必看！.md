## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## JavaScript类型、值和原生函数大揭秘, 前端开发者必看！
### 类型
-   ECMAScript 一共有七种语言类型：`Undefined、Null、Boolean、String、Number、Object、Symbol`
#### 内置类型
-   函数不仅是对象，还拥有属性。`在函数中的 length 属性是参数的个数`
-   如下代码：
```js
function a(b,c){
    // do something
}

a.length; // 2
```
-   `typeof [...] 为什么等于 object？`
    -   `数组也是对象，但确切来说，它是 object 的一个 "子类型"`
-   如下代码：
```js
typeof [1,2,3] === 'object'; // true
```

#### 值和类型
-   typeof 运算符总是会返回一个字符串
-   如下代码：
```js
typeof typeof 42; // string

// typeof 42 首先会返回 number, 然后 typeof number 返回 string
```
#### 小结
1.  变量没有类型，他们所拥有的值才有类型。
2.  typeof [...] 为什么等于 object？
    -   `数组也是对象，但确切来说，它是 object 的一个 "子类型"`


### 值
#### 数组
-   `使用 `delete` 操作符不会影响数组长度`
```js
let a = ['a', 'b', 'c', 'd'];
delete a[2];
console.log('a ------>', a); // [ 'a', 'b', <1 empty item>, 'd' ]
console.log('a ------>', a.length); // 4
```

-   数组索引既可以通过数字索引，也可以通过字符串索引，可以通过像访问对象的建制属性一样访问数组元素。`除了通过使用数字索引的方式，其他都不计算进数组长度内`
```js
let a2 = [];
a2[0] = 1;
a2['foo'] = 2;

console.log('a2.length ------>', a2.length);  // 1
console.log("a2['foo'] ------>", a2['foo']); // 2
console.log('a2.foo ------>', a2.foo); // 2
```

-   如果字符串值被强制转换为十进制数字，数组会被当做数字索引来处理
```js
var a = [];
a['13'] = 42;
a.length; // 14
```

-   将类数组转为数组, 还有其他方法: indexOf()、concat()、map().....
```js
var arr = Array.from(arguments);
Array.prototype.slice.call();
```
#### 数字
-   数字语法：`数字前面的 0 可省略`
```js
var a = 0.42;
var b = .42;
```

-   由于数字值使用 Number 对象封装，因此数字值可调用 Number.prototype 中的方法。
    -   toPrecision(..) 方法用来指定有效数位的显示位数：
```js
var a = 42.59;

a.toPrecision( 1 ); // "4e+1"
a.toPrecision( 2 ); // "43"
a.toPrecision( 3 ); // "42.6"
a.toPrecision( 4 ); // "42.59"
a.toPrecision( 5 ); // "42.590"
a.toPrecision( 6 ); // "42.5900"
```
-   注意，`对于 `.` 操作符来说，因为他们是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符。`
```js
// 无效语法：
42.toFixed( 3 );    // SyntaxError

// 下面的语法都有效：
(42).toFixed( 3 );  // "42.000"
0.42.toFixed( 3 );  // "0.420"
42..toFixed( 3 );   // "42.000"

// 注意其中的空格
42 .toFixed(3);  // "42.000"
```
-   42.tofixed(3) 是无效语法，因为 . 被视为常量 42. 的一部分（如前所述），所以没有 . 属性访问运算符来调用 tofixed 方法。
-   42..tofixed(3) 则没有问题，因为第一个 . 被视为 number 的一部分，第二个 . 是属性访问运算符。只是这样看着奇怪，实际情况中也很少见。在基本类型值上直接调用的方法并不多见，不过这并不代表不好或不对。
###### 数值检测方法
-   能够被"安全"呈现的最大整数是 2^53 - 1，即 `9007199254740991`，在 ES6 中被定义为 `Number.MAX_SAFE_INTEGER`。最小整数是 `-9007199254740991`，在 ES6 中被定义为 `Number.MIN_SAFE_INTEGER`。
-   要检测一个值是否是整数，可以使用 ES6 中的 `Number.isInteger(..)` 方法：
```js
Number.isInteger( 42 );     // true
Number.isInteger( 42.000 ); // true
Number.isInteger( 42.3 );   // false
```
-   也可以为 ES6 之前的版本 polyﬁll `Number.isInteger(..)` 方法：
```js
if (!Number.isInteger) {
    Number.isInteger = function(num) {
        return typeof num == "number" && num % 1 == 0;
    };
}
```
-   要检测一个值是否是安全的整数，可以使用 ES6 中的 Number.isSafeInteger(..) 方法：
```js
Number.isSafeInteger( Number.MAX_SAFE_INTEGER );    // true
Number.isSafeInteger( Math.pow( 2, 53 ) );          // false
Number.isSafeInteger( Math.pow( 2, 53 ) - 1 );      // true
```
-   可以为 ES6 之前的版本 polyﬁll Number.isSafeInteger(..) 方法：
```js
if (!Number.isSafeInteger) {
    Number.isSafeInteger = function(num) {
        return Number.isInteger( num ) &&
            Math.abs( num ) <= Number.MAX_SAFE_INTEGER;
    };
}
```

#### 特殊数值
-   `null 和 undefined。nul 是一个特殊关键字，不是标识符，不能将其当做变量来使用和赋值`。但 undefined 确实一个标识符，可被当做变量来使用和赋值。
```js
null: 指空值
undefined：指没有值
```
-   `NaN：NaN 是一个特殊值，它和自身并不相等，是唯一一个非自反(即 x === x 不成立的值)，而 NaN != NaN 为 true。`
-   那如何判断 NaN 呢？
```js
var a = 2 / 'foo';
isNaN(a); // true
```
-   ES6 开始我们可使用工具函数 Number.isNaN()
```js
var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false——好！
```
-   还有一个简单方法，利用 NaN 不等于自身这个特点。
```js
if (!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    };
}
```
#### 小结
1.  使用 `delete` 操作符不会影响数组长度
2.  除了通过使用数字索引的方式，其他都不计算进数组长度内
3.  数值语法中数字前面的 0 可省略
4.  注意，`对于 `.` 操作符来说，因为他们是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符。`
5.  要检测一个值是否是整数，可以使用 ES6 中的 `Number.isInteger(..)` 方法
6.  最大整数是 `9007199254740991`，在 ES6 中被定义为 `Number.MAX_SAFE_INTEGER`。最小整数是 `-9007199254740991`，在 ES6 中被定义为 `Number.MIN_SAFE_INTEGER`
7.  NaN：NaN 是一个特殊值，它和自身并不相等，是唯一一个非自反(即 x === x 不成立的值)，而 NaN != NaN 为 true。
8.  如何判断一个数是否是 NaN？
```js
var a = 2 / "foo";
var b = "foo";

Number.isNaN( a ); // true
Number.isNaN( b ); // false ——好！
```


### 原生函数
-   常见原生函数：
```js
• String()
• Number()
• Boolean()
• Array()
• Object()
• Function()
• RegExp()
• Date()
• Error()
• Symbol() ——ES6 中新加入的！
```
-   原生函数可当构造函数使用，但构造出来的对象会我们设想的有所出入。
```js
var a = new String( "abc" );

typeof a;                            // 是"object"，不是"String"

a instanceof String;                 // true

Object.prototype.toString.call( a ); // "[object String]"
```
-   `使用构造函数创建出来的是封装了基本类型值的封装对象。`
-   注意：`typeof 在此返回的是对象类型的子类型。`

#### 内部属性 `[[Class]]`
```js
Object.prototype.toString.call( [1,2,3] );
// "[object Array]"

Object.prototype.toString.call( /regex-literal/i );
// "[object RegExp]"

Object.prototype.toString.call( null );
// "[object Null]"

Object.prototype.toString.call( undefined );
// "[object Undefined]"

Object.prototype.toString.call( "abc" );
// "[object String]"

Object.prototype.toString.call( 42 );
// "[object Number]"

Object.prototype.toString.call( true );
// "[object Boolean]"
```
-   上例中，数组的内部 [[Class]] 属性值是 "Array"，正则表达式的值是 "RegExp"......

#### 封装对象包装
```js
var a = new Boolean( false );
console.log('a ------>', a); // [Boolean: false]
console.log(Boolean(a)); // true
if (!a) {
    console.log( "Oops" ); // 执行不到这里
}
```
-   若想要自定义基本类型值，可使用 `Object()` 函数(不带 new 关键字)
```js
var a = "abc";
var b = new String( a );
var c = Object( a );

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
```

#### 小结
1.  使用原生函数构造出来的函数对象时封装了基本类型值的封装对象。
2.  若想要自定义基本类型值，可使用 `Object()` 函数(不带 new 关键字)
```js
var b = new String( a );
var c = Object( a );

Object.prototype.toString.call( b ); // "[object String]"
Object.prototype.toString.call( c ); // "[object String]"
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
