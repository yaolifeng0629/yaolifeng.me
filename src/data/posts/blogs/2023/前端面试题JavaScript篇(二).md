## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 必知必会的JavaScript前端面试题篇(二)，不看后悔！

### 1. JavaScript 有哪些数据类型以及它们的区别？
-   js 一共有八种数据类型，分别是: `Undefined, Null, Boolean, Number, String, Object, Symbol, BigInt`
-   其中 `Symbol, BigInt` 是 ES6 中新增的数据类型：
    -   `Symbol`: 代表唯一的数据类型，主要为了解决全局变量冲突的问题
    -   `BigInt`: 数字类型，此格式可表示任意精度格式的整数，可超时 `Number` 类型标的整数范围。
-   其余数据类型可分为 `原始数据类型` 和 `引用数据类型`
    -   原始数据类型 -> 栈 -> `Undefined、Null、Boolean、Number、String`
    -   引用数据类型 -> 堆 -> `Object、Array、Function`
    -   不同点：`存储位置不同`
        -   原始数据类型存在栈(stack) 中，占据空间小，大小固定，属于被频繁使用的数据
        -   引用数据类型存在堆(heap) 中，占据空间大， 大小不固定，引用数据类型在栈中存储了指针，该指针指向数据的内存地址。当解释器寻找引用的值时，会首先检索当前数据在栈中的地址，获取地址后然后从堆中获取数据。
        -   存储方式不同：基本数据类型存在栈(stack)中，而引用数据类型存在堆(heap)中
        -   复制方式不同：将一个基本数据类型变量赋值给另一个变量时，会复制这个值的副本，而引用类型变量赋值给另一个变量时，复制的对象在内存中的指针，而不是对象本身，修改一方，另一方也会发生改变

### 2. 数据类型检测的方式有哪些？
-   方法: `typeof(), instanceof(), constructor(), Object.prototype.toString.call()`
    -   typeof(): 除了 `Array, Function, Null` 都可以正确判断数据类型
    -   instanceof(): 判断其在原型链中能否找到该类型的原型，只能正确判断引用数据类型，而不能判断基本数据类型。
    -   constructor: 有两个作用，一是判断数据的类型，二是对象实例通过 `constructor` 对象来访问它的构造函数。注意：如果是创建一个新对象来改变它的原型，`constructor` 就不能用来判断其数据类型了。
    -   Object.prototype.toString.call()：使用对象原型方法 toString 来判断数据类型。

### 3. undefined 与 null 的区别？
-   undefined: 表示未定义，可能有值也可能没值，表示还没有赋值
-   null: 代表空值，空引用

### 4. 为什么 0.1 + 0.2 != 0.3，如何让其相等？
-   为什么不相等？
```js
let n1 = 0.1,
    n2 = 0.2;
console.log(n1 + n2); // 0.30000000000000004
```
-   这里得到的不是想要的结果，要想等于 0.3，就要把它进行转化：
```js
(n1 + n2).toFixed(2); // 注意，toFixed为四舍五入
```
-   计算机都是二进制的方式存储数据，所以计算机在计算 0.1 + 0.2 时，实际上是计算两个数的二进制的和，0.1(0.000110011001.... 1001 一直重复)，0.2(0.0011001100110011.... 0011 一直重复)，这两个数的二进制都是无限循环的数。
-   一般我们认为数字包括整数和小数，但是在 JavaScript 中只有一种数字类型：Number，它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数。在二进制科学表示法中，双精度浮点数的小数部分最多只能保留 52 位，再加上前面的 1，其实就是保留 53 位有效数字，剩余的需要舍去，遵从“0 舍 1 入”的原则。
-   根据这个原则，0.1 和 0.2 的二进制数相加，再转化为十进制数就是：`0.30000000000000004`。
-   如何让其相等？
    -   一个直接的解决方法就是设置一个误差范围，通常称为“机器精度”。对 JavaScript 来说，这个值通常为 2-52，在 ES6 中，提供了`Number.EPSILON`属性，而它的值就是 2-52，只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为 0.1+0.2 ===0.3

```js
function numberOperation(arg1, arg2) {
    return Math.abs(arg1 - arg2) < Number.EPSILON;
}
console.log(numberOperation(0.1 + 0.2, 0.3)); // true
```

### 5. 如果 new 一个箭头函数会怎么样？
-   会报 JS 错误：`TypeError: FunctionName is not a constructor`, 表示当前函数不是一个构造函数，不能通过 new 关键字来创建实例。
-   箭头函数：ES6 中提出的，它既没有 prototype, 也没有自己的 this，更不能使用 arguments 参数，所以不能 new 一个箭头函数
-   new 的过程：
    1.  创建一个新对象
    2.  让新对象的 **__proto__** 指向构造函数的 prototype
    3.  让构造函数的 this 指向新对象
    4.  返回新的对象
-   所以，在第二，三步，箭头函数是没有办法执行的

### 6. 数组有那么原生方法？
-   尾部操作：pop()-删除, push()-添加
-   首部操作：shift()-删除, unshift()-添加
-   排序操作：reverse()-倒序，sort()-排序
-   拼接操作：concat()
-   截取操作：slice()-不包含结束下标
-   插入操作：splice()-截取操作包含结束下包
-   查询操作：indexOf()-从前向后查询，lastIndexOf()-从后向前查询,都是返回下标
-   迭代操作：every()-每一项都满足条件，some()-有一项满足条件，filter()-过滤，map()-迭代,forEach()-迭代
-   归并操作：reduce()-从左向右，reduceRight()-从右向左

### 7. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?
-   原因：
    -   `arguments` 是一个对象，他的属性是从 0 开始依次递增的数字，还有 `callee: 通过它可以调用函数自身` 和 `length` 等属性，与数组类似，但是没有数组常见的一些方法，例如 `forEach, reduce`, 所以叫他们类数组。
-   如何遍历？
1.使用 call 和 apply 和 bind 方法

```js
Array.prototype.forEach.call(arguments, (a) => console.log(a));
Array.prototype.forEach.apply(arrayLike, [
    (item, index) => {
        console.log(item);
    },
]);
Array.prototype.forEach.bind(arrayLike)((item, index) => {
    console.log(item);
});
```
2.使用 Array.from() 方法将类数组转为数组

```js
const arrArgs = Array.from(arguments);
arrArgs.forEach((item) => console.log(item));
```
3.使用 Array API

```js
Array.apply(null, arrayLike);
Array.prototype.concat.apply([], arrayLike);
Array.prototype.slice.call(arrayLike);
Array.prototype.map.call(arrayLike, (x) => x);
Array.prototype.filter.call(arrayLike, (x) => 1);
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
