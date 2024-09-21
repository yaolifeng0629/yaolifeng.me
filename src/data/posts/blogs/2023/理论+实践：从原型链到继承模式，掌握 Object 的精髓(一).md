## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 理论+实践：从原型链到继承模式，掌握 Object 的精髓(一)
-   在之前的文章中，我们介绍了函数调用位置的不同造成了 this 绑定对象的不同，但对象到底是什么？为什么我们需要绑定他们呢？
### 语法
-   对象一共有两种语法：`定义(文字)形式和构造形式。`
```js
// 对象的文字语法大概是这样：
var myObj = {
    key: value
    // ...
};

// 构造形式大概是这样：
var myObj = new Object();
myObj.key = value;
```
-   **构造形式和文字形式生成的对象是一样的，唯一的区别在于，在文字声明中你可以添加多个键值对，但在构造形式中你必须逐个添加属性。**

### 类型
-   JavaScript 一种有6中主要类型。
```js
• string
• number
• boolean
• null
• undefined
• object
```
-   `其中，简单基本类型(string,boolean,number,null,undefined) 本身不是对象。null 会被当做一种对象类型，只是语言本身的一个bug，即对 null 执行 typeof null 时会返回字符串 object。但实际上，null 本身就是基本类型。`
-   在 JavaScript 中有一种错误的说法：JavaScript 中的万物皆对象。

#### 内置对象
```js
• String
• Number
• Boolean
• Object
• Function
• Array
• Date
• RegExp
• Error
```
-   `在 JavaScript 中，为什么 typeof null 会返回 object？`
    -   因为不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都是 0 的话会被判断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回 object。

### 内容
-   在对象中，我们都知道每个对象都有属性，但存储在对象容器内容的是这些属性的名称，他们就像指针(技术角度来说是引用)一样，指向这些值真正的存储位置。
```js
var myObject = {
    a: 2
};

myObject.a; // 2

myObject["a"]; // 2
```
-   上述方式中，使用 `. 操作符被称为属性访问， [] 操作符被称为键访问。`
#### 属性描述符
-   在 ES5 之前，JS 没有提供给检测属性特性的方法，比如判断属性是否只读。
```js
var myObject = {
    a:2
};

Object.getOwnPropertyDescriptor( myObject, "a" );
// {
//    value: 2,
//    writable: true, 是否可写
//    enumerable: true, 是否可枚举
//    configurable: true 是否可配置
// }
```
-   需要注意的是，`即便 configurable: false，但我们还是可以把 writable 的状态从 true 改为 false,但是无法由 false 改为 true。除了无法修改，configurable: false 这个属性还会禁止删除这个属性。`
```js
var myObject = {
    a:2
};

myObject.a; // 2

delete myObject.a;
myObject.a; // undefined

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true
} );

myObject.a; // 2
delete myObject.a;
myObject.a; // 2
```
#### 不变性
1.  对象常量：结合 writable: false 和 configurable: false 即可创建一个真正的常量属性。(不可修改，重定义或删除)
```js
var myObject = {};

Object.defineProperty( myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
} );
```
2.  `禁止扩展: 若想禁止一个对象添加新属性并且保留已有属性，可使用 `Object.preventExtensions(...)``
    -   `非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。`
```js
var myObject = {
    a:2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined
```
3.  `密封：Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用。Object.preventExtensions(..) 会把所有现有属性标记为 configurable:false。`
    -   故密封之后不仅不能添加新属性，也不能重新配置或删除现有属性(虽然可修改属性的值)。`

4.  `冻结：Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。`
#### 存在性
-   在属性中属性返回可能是 undefined。但有可能属性中有可能储存的就是 undefined, 也有可能是因为属性不存在就返回 undefined。那如何区分呢？
-   `可在不访问属性值的情况下判断对象中是否存在这个属性：`
```js
var myObject = {
    a:2
};

("a" in myObject); // true
("b" in myObject); // false

myObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "b" ); // false
```
-   `in 操作符会检查属性是否在对象及其[[prototype]] 原型链中。hasOwnProperty() 只会检查属性是否在某个对象中，不会检查 [[prototype]] 原型链。`
-   看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6] 的结果并不是你期待的 True，因为 [2, 4, 6] 这个数组中包含的属性名是 0、1、2，没有 4。
-   `propertyIsEnumerable(...) 会检查给定的属性名是否存在于对象中，而不是原型链中，并且满足 enumerable: true;`
-   `Object.keys(...) 会返回一个数组，包含所有可枚举属性，Object.getOwnPropertyNames(...)会返回一个数组，包含所有属性，无论他们是否可枚举。`
-   `in 与 hasOwnProperty(...) 的区别在于是否查找 [[prototype]] 原型链，而 Object.keys(...)、Object.getOwnPropertyNames(...)、propertyIsEnumerable(...)、hasOwnProperty() 都只会查找对象中是否直接包含某个属性。`

### 小结
1.     对象一共有两种语法：`定义(文字)形式和构造形式。`
```js
// 对象的文字语法大概是这样：

var myObj = {
    key: value
    // ...
};

// 构造形式大概是这样：

var myObj = new Object();
myObj.key = value;
```
-   **构造形式和文字形式生成的对象是一样的，唯一的区别在于，在文字声明中你可以添加多个键值对，但在构造形式中你必须逐个添加属性。**
2.   在 JavaScript 中，为什么 typeof null 会返回 object？
    -   因为不同的对象在底层都表示为二进制，在 JavaScript 中二进制前三位都是 0 的话会被判断为 object 类型，null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回 object。
3.  对象中属性访问的方式：
```js
var myObject = {
    a: 2
};

myObject.a; // 2

myObject["a"]; // 2
```
-   上述方式中，使用 `. 操作符被称为属性访问， [] 操作符被称为键访问。`

4.  `禁止扩展: 若想禁止一个对象添加新属性并且保留已有属性，可使用 `Object.preventExtensions(...)``
    -   `非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。`
5.  `密封：Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用。Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false。`
6.  `冻结：Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值。`
7.  `in 操作符会检查属性是否在对象及其[[prototype]] 原型链中。hasOwnProperty() 只会检查属性是否在某个对象中，不会检查 [[prototype]] 原型链。`
8.  `propertyIsEnumerable(...) 会检查给定的属性名是否存在于对象中，而不是原型链中，并且满足 enumerable: true;`
9.  `Object.keys(...) 会返回一个数组，包含所有可枚举属性，Object.getOwnPropertyNames(...)会返回一个数组，包含所有属性，无论他们是否可枚举。`
10. `in 与 hasOwnProperty(...) 的区别在于是否查找 [[prototype]] 原型链，而 Object.keys(...)、Object.getOwnPropertyNames(...)、propertyIsEnumerable(...)、hasOwnProperty() 都只会查找对象中是否直接包含某个属性。`


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
