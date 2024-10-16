## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 探究 JavaScript 前端热点面试题(三)：让你在面试中游刃有余！

### 1. 什么是 BOM 和 DOM？

-   DOM：文档对象模型，指把文档当做了一个对象，这个对象中包含了处理网页的方法和接口
-   BOM：浏览器对象模型，把浏览器当成了一个对象，这个对象主要定义了与浏览器交互的方法和接口，BOM 的核心是 window, 而 window 具有双重角色，既是通过 js 调用浏览器窗口的一个接口，也是一个 Global 对象。这也就意味着在网页中定义的任何对象，变量和函数，都会作为全局对象的一个属性或方法存在。

### 2. for...in 和 for...of 的区别？

-   for...of 是 ES6 新增的遍历方式，可遍历数组和对象等。for...in 是 ES3 出现的。
-   对于数组来说：for in 和 for of 都可以循环数组，for…in 输出数组的索引 index。for...of 输出数组每一项的值。
-   对于对象来说：for in 可以遍历对象，for of 不能遍历对象，只能遍历带有 iterator 接口的，例如 Set,Map,String,Array

-   总结：
    1.  for...in 主要遍历对象，不适用于遍历数组。for...of 可用来遍历数组，类数组，字符串，Set, Map 以及 Generator 对象。
    2.  主要区别在于他们的迭代方式不同

### 3. ajax, axios, fetch 的区别？

-   ajax: 一个 JavaScript 技术，内部基于 XHRHttpRequest 来实现
-   axios: 一个请求框架，也是基于 XHRHttpRequest 封装和 promise 对象，支持同步和异步，提供了较多方法
-   fetch: 一个原生请求 API，基于 Promise 来实现
-   ajax 没有自动转换数据类型的机制，而 axios 和 fetch 支持自动将返回的数据转换为 JSON 数据格式或其他类型

-   ajax: 一种创建交互式网页的开发技术，可做到无需重新加载整个网页的情况下，更新部分网页，也叫局部更新。
    -   缺点：
        1.  原生支持 XHR，但 XHR 架构不清晰
        2.  不符合分离原则
        3.  配置和调用费用混乱，基于事件的异步模型处理不友好
-   axios: 一个基于 promise 的 HTTP 库，可用在浏览器和 node.js 中。

    -   特点：
        1.  浏览器端发起 XMLHttpRequests 请求
        2.  node 端发起 http 请求
        3.  支持 promise API
        4.  监听请求和返回
        5.  取消请求
        6.  自动转换 json 数据
        7.  客户端抵御 XSRF 攻击

-   fetch: 不是基于 ajax 的封装，而是原生 js, 没有使用 XMLHttpRequests 对象
    -   优点：
        1.  语法简洁，更加语义化
        2.  基于 promise 实现，支持 async/await
        3.  更加底层，API 丰富
        4.  脱离 XMLHttpRequest
    -   缺点：
        1.  只对网络请求报错，对 400，500 都当做成功的请求，不会进行 reject 处理，只有网络错误导致请求错误，才会被 reject。
        2.  默认不携带 cookie, 不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
        3.  没有办法检测请求的进度，而 XHR 可以。

### 4. 常见的位运算？

-   判断一个数的奇偶性
    -   奇数：返回 1
    -   偶数：返回 0

```js
console.log(7 & 1); // 1
console.log(8 & 1); // 0
```

-   向下取整

```js
// 不能对负数取整
console.log(~~11.71); // 11
console.log(11.71 >> 0); // 11
console.log(11.71 << 0); // 11
console.log(11.71 | 0); // 11
console.log(6.83 >>> 0); // 6
```

-   取中间值

```js
console.log(12 >> 1); // 6
```

-   判断一个数是否等于目标数

```js
let a = 4654;

// 如何和目标数相等，则等于 0，否则等于其他数
if (a ^ 1171) {
    // 不等于的情况
    console.log(12);
} else {
    // 等于的情况
    console.log(34);
}
```

-   判断一个数是不是 2 的整数次幂, 如果是 0,则说明这个数是 2 的整数次幂

```js
n & (n - 1);
// 是 0 则是 2 的整数次幂，不是则返回其他数
console.log(16 & (16 - 1)); // 0
console.log(15 & (15 - 1));
```

-   判断一个值是否存在

```js
// before
if (arr.indexOf(item) > -1) {
    // code
}

// 按位非：item 将会转换为 string 类型进行查找
if (~arr.indexOf(item)) {
    // code
}
```

-   求一个数的相反数

```js
// 求负数的相反数
console.log(~-n + 1); // n
// 求正数的相反数
console.log(~n + 1); // -n
```

-   求一个数的倍数

```js
console.log(8 << 1); // 16
console.log(7 << 1); // 14
```

-   求一个数的平方

```js
console.log(2 << 2); // 8
```

-   求一个数的立方

```js
console.log(2 << 4); // 16
```

### 5. 模块化 ESM, CMJ？
参考：`https://juejin.cn/post/6938581764432461854`

-   CMJ: 使用 `module.exports` 导出变量和函数，可导出任意类型的值，使用 `require` 来导入
    -   导出：`module.exports、exports`

```js
// 导出一个对象
module.exports = {
    name: '蛙人',
    age: 24,
    sex: 'male',
};
// 导出任意值
module.exports.name = '蛙人';
module.exports.sex = null;
module.exports.age = undefined;
// 直接导出，省略 module 关键字
exports.name = '蛙人';
exports.sex = 'male';
exports = {
    name: '蛙人',
};
```

-   导入：

```js
// 直接导入
let data = require('./index.js');
let { name, age } = require('./index.js');
console.log(data); // { name: "蛙人", age: 24 }
console.log(name, age); // 蛙人，24
// 动态导入
let lists = ['./index.js', './config.js'];
lists.forEach(url => require(url)); // 动态导入
if (lists.length) {
    require(lists[0]); // 动态导入
}
```

-   导入值的变化：CommonJs 导入的值是拷贝的，所以可以修改拷贝值，但这会引起变量污染，一不小心就重名。

```js
// index.js
let num = 0;
module.exports = {
    num,
    add() {},
};
let { num, add } = require('./index.js');
console.log(num); // 0
add();
console.log(num); // 0
num = 10;
```

ESM：导出分两种：单个导出 `export`，默认导出 `export default`, 导入使用 `import...from`

-   导出：

```js
// 导出变量
export const name = "蛙人"
export const age = 24
// 导出函数也可以
export function fn() {}
export const test = () => {}
// 如果有多个的话
const name = "蛙人"
const sex = "male"
export { name, sex }
// 混合导出
export const name = "蛙人"
export const age = 24
export default {
    fn() {}，
    msg: "hello 蛙人"
}
```

-   导入：

```js
// index,js
export const name = '蛙人';
export const age = 24;
import { name, age } from './index.js';
console.log(name, age); // "蛙人" 24
// 如果里面全是单个导出，我们就想全部直接导入则可以这样写
import * as all from './index.js';
console.log(all); // {name: "蛙人", age: 24}
// 混合导入
// index,js
export const name = '蛙人';
export const age = 24;
export default {
    msg: '蛙人',
};
// index2.js
import msg, { name, age } from './index.js';
// 起别名
import { default as all, name, age } from './index.js';
console.log(msg); // { msg: "蛙人" }
```

-   导入值的变化：export 导出的值是值的引用，并且内部有映射关系，这是 export 关键字的作用。而且导入的值，不能进行修改也就是只读状态。

```js
// index.js
export let num = 0;
export function add() {
    ++num;
}
import { num, add } from './index.js';
console.log(num); // 0
add();
console.log(num); // 1
num = 10; // 抛出错误
// ESM 中的 import 在文件最顶部，不可动态加载
```

-   区别：
    -   CMJ:
        1.  可动态加载，代码发生在运行时
        2.  可混合导出
        3.  导出的值是拷贝，可修改导出的值。
    -   ESM:
        1.  ESM 是静态的，不可以动态导入，只能声明在文件最顶部
        2.  可混合导出，单个导出，默认导出，完全不受影响
        3.  导出的值之间存在映射关系，所有值都只是可读的，不可修改。

### 6. forEach 与 map 方法的区别？

-   相同点：
    1.  都是用来遍历数组的
    2.  都支持三个参数: item 当前每一项, index 索引值, arr 原数组
-   不同点：
    1.  forEach 对每一个元素都执行操作，会改变原数组，没有返回值
    2.  map 不改变原数组，返回一个新数组
    3.  总的速度来说，map 的速度优先于 forEach，性能上来说：for > forEach > map


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
