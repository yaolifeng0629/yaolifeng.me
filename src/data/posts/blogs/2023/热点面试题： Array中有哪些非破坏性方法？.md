## 前言
>  极度投入，深度沉浸，边界清晰
>
>  前端小菜鸡一枚，分享的文章纯属个人见解，若有不正确或可待讨论点可随意评论，与各位同学一起学习~
>
>  欢迎关注 `『非同质前端札记』` 公众号 ，一起探索学习前端技术......
>
>  公众号回复 `加群` 或 `扫码`, 即可加入前端交流学习群，长期交流学习......
>
>  公众号回复 `加好友`，即可添加为好友

## Array中有哪些非破坏性方法？

-   **非破坏性方法**：调用的时不会改变原始的数组：例如：`filter、some、map、find、join、concat、forEach、every、reduce、flat、slice`
-   **破坏性方法**：与破坏性方法相反，例如：`sort、reverse、splice、push、pop、shift、unshift`
-   **新的数组非破坏性方法**：`toSorted、toReversed、with、toSpliced`

### 1. toSorted()

-   用法：

```js
const array = ['c', 'o', 'n', 'a', 'r', 'd', 'l', 'i'];
const result = array.toSorted();
console.log(result); //  ['a', 'c', 'd', 'i', 'l', 'n', 'o', 'r']
console.log(array); // ['c', 'o', 'n', 'a', 'r', 'd', 'l', 'i']
```

-   实现：

```js
/**
 * 测试
 */
const arr = [1, 5, 8, 1, 5, 1, 8, 1, 8, 4, 31, 8, 4, 48, 751, 81, 1, 5, 7, 1, 5, 3, 5];
if (!Array.prototype.toSorted) {
    Array.prototype.toSorted = function (compareFn) {
        return this.slice().sort(compareFn);
    };
}
let res = arr.toSorted((a, b) => a - b);
console.log(1111, res); // [1, 1, 1,  1,  1,  1,   3, 4,4, 5, 5,  5,  5,  5,   7, 8,8, 8, 8, 31, 48, 81, 751 ]

// 实现
/**
 * compareFn：排序的方法:
 *  例如：
 *  升序：(a, b) => a - b
 *  降序：(a, b) => b - a
 */
if (!Array.prototype.toSorted) {
    Array.prototype.toSorted = function (compareFn) {
        return this.slice().sort(compareFn);
    };
}
```

### 2. toReversed()

-   用法：

```js
const array = ['c', 'o', 'n', 'a', 'r', 'd', 'l', 'i'];
const result = array.toReversed();
console.log(result); //  ['i', 'l', 'd', 'r', 'a', 'n', 'o', 'c']
console.log(array); // ['c', 'o', 'n', 'a', 'r', 'd', 'l', 'i']
```

-   实现：

```js
/**
 * 测试
 */
const arr = [1, 5, 8, 1, 5, 1, 8, 1, 8, 4, 31, 8, 4, 48, 751, 81, 1, 5, 7, 1, 5, 3, 5];
if (!Array.prototype.toReversed) {
    Array.prototype.toReversed = function () {
        return this.slice().reverse();
    };
}
let res = arr.toReversed();
console.log(1111, res); // [5,  3, 5, 1,  7, 5, 1, 81,751, 48, 4, 8, 31, 4, 8,  1,8,  1, 5, 1,  8, 5, 1 ]

// 实现
if (!Array.prototype.toReversed) {
    Array.prototype.toReversed = function () {
        return this.slice().reverse();
    };
}
```

### 3. with()

-   用法：`array[index] = value`

```js
const array = ['c', 'o', 'n', 'a', 'r', 'd', 'l', 'i'];
const result = array.with(0, 'ConardLi');
console.log(result); //  ['ConardLi', 'o', 'n', 'a', 'r', 'd', 'l', 'i'];
console.log(array); // ['c', 'o', 'n', 'a', 'r', 'd', 'l', 'i']
```

-   实现:

```js
/**
 * 测试
 */
const arr = [1, 5, 8, 1, 5, 1, 8];
if (!Array.prototype.with) {
    Array.prototype.with = function (index, value) {
        const copy = this.slice();
        copy[index] = value;
        return copy;
    };
}
let res = arr.with(4, 'xxx');
console.log(1111, res); // [1, 5, 8, 1, 5, 'xxx', 1, 8,]
console.log(2222, arr); // [1, 5, 8, 1, 5, 1, 8,]

// 实现
if (!Array.prototype.with) {
    Array.prototype.with = function (index, value) {
        const copy = this.slice();
        copy[index] = value;
        return copy;
    };
}
```

### 4. toSpliced()

-   用法：

```js
    .toSpliced(start, deleteCount, ...items)

-   它从 start 开始删除 deleteCount 个元素 ；
-   然后把 items 插入到被删除的位置；
-   最后返回已删除的元素。

const array = [1, 2, 3, 4, 5, 6];
const result = array.splice(1, 2, 0);
console.log(result); //  [2, 3]
console.log(array);  // [1, 0, 4, 5, 6]
```

-   实现：

```js
/**
 * 测试
 */
const arr = [1, 5, 8, 1, 5, 1, 8];
if (!Array.prototype.toSpliced) {
    Array.prototype.toSpliced = function (start, deleteCount, ...items) {
        const copy = this.slice();
        copy.splice(start, deleteCount, ...items);
        return copy;
    };
}
let res = arr.toSpliced(1, 2, 0); // [ 1, 0, 1, 5, 1, 8 ]
console.log(1111, res);

// 实现
if (!Array.prototype.toSpliced) {
    Array.prototype.toSpliced = function (start, deleteCount, ...items) {
        const copy = this.slice();
        copy.splice(start, deleteCount, ...items);
        return copy;
    };
}
```

## 文章特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`

## 往期回顾：
-   [热点面试题：Virtual DOM 相关问题？](https://mp.weixin.qq.com/s/s3BBhTH9g2OrtOpyJ4tzbQ)
-   [热点面试题：什么是粘包/半包问题，该如何解决？](https://mp.weixin.qq.com/s/SORAN1c0_Pntajvjl-jK4g)
-   [热点面试题：console.log()同异步问题？](https://mp.weixin.qq.com/s/9ewYuCazPaZhDHwrfIWxTQ)
-   [热点面试题：进程系列问题？](https://mp.weixin.qq.com/s/J5ayE5XJElBFzn38qo7ytQ)
-   [热点面试题：Node.js 中的垃圾回收机制？](https://mp.weixin.qq.com/s/Guku1ARej2ZHwnrbXxmJJA)
-   [热点面试题：简述 http3.0~http1.0 分别有什么改进？](https://mp.weixin.qq.com/s/LkOWiDj5O68T85-577_UPA)
-   [JavaScript中的AMD和CMD规范](https://mp.weixin.qq.com/s/LkOWiDj5O68T85-577_UPA)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)

## 最后：
-   欢迎关注 `『非同质前端札记』` 公众号 ，一起探索学习前端技术......
-   公众号回复 `加群` 或 `扫码`, 即可加入前端交流学习群，长期交流学习......
-   公众号回复 `加好友`，即可添加为好友
![](https://soo.run/13bdt)
