## 前言
>  欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
>
>  前端小菜鸡一枚，分享的文章纯属个人见解，若有不正确或可待讨论点可随意评论，与各位同学一起学习~

## 排序算法 Quick Sort

### 原理

-   快速排序在每一轮挑选一个基准元素，并让其他比基准元素大的元素移到数列的一遍，比基准元素小的元素移动数列的另一边，从而把数列拆解成两部分。
-   时间复杂度为：O(n log n)
-   每一轮的比较和交换，需要把数组的全部元素都遍历一遍，时间复杂度为 O(n),这样的遍历需要多少轮呢？假如元素个数为 n，那么平均情况下需要 log n 轮。

### 基准元素的选择

-   基准元素: pivot，在分治过程中，以基准元素为中心，把他的元素移动到他的左右两边。
-   可使用随机选择一个元素作为基准元素，让基准元素和数列首元素交换位置。这样可以有效地将数列分成两个部分，但是也有极小的几率会选择数列的最大值和最小值，会影响分治的效果。
-   时间复杂度为：O(n log n),最坏情况为：O(n²)

### 元素的交换

-   选定好基准元素后，后面就是把小于基准元素的交换到基准元素的一遍，把大于基准元素的元素都交换到基准元素的另一边。
-   可使用的方法：
    1.  双边循环法
    2.  单边循环法
-   双边循环法：选择一个基准元素，并设置两个指针 left 和 right，指向最左或最右的连个元素。
    ![](../../../Leet_code/assets/quickSort.png)
    -   执行循环，从 right 指针开始，让指针指向的元素跟基准元素做比较，如果大于或等于 pivot,则指针向移动，如果小于 pivot，则 right 指针停止移动，切换到 left 指针。

### 单边循环法

-   单边循环法：首先选定基准元素 pivot，同时，设置一个 mark 指针指向数列的起始位置，这个 mark 指针代表小于基准元素的区域边界。如果遍历到的元素大于基准元素，就继续往后遍历。如果遍历到的元素小于基准元素，把 mark 的指针右移一位，因为小于 pivot 的区域边界增大了。第二让最新遍历到的元素和 mark 指针所在的位置的元素交换位置。因为最新遍历到的元素属于小于 pivot 的区域。

```js
Array.prototype.quickSort = function () {
    // 递归函数
    let rec = (arr) => {
        // 边界条件
        if (arr.length <= 1) return arr;
        // 分区数组
        let left = [];
        let right = [];
        // 基准元素
        let mid = arr[0];
        // 循环遍历
        for (let i = 1; i < arr.length; i++) {
            // 比基准小的元素放在基准前面 left，否则放在基准后面 right
            if (arr[i] < mid) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        // 递归调用两遍的子数组
        return [...rec(left), mid, ...rec(right)];
    };
    // 初始化递归函数
    let res = rec(this);
    res.forEach((item, index) => {
        this[index] = item;
    });
};

let arr = [98, 4, 6, 84, 42, 8674, 434, 56, 465];
arr.quickSort();
console.log(arr);
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
-   [热点面试题：浏览器和Node的宏任务和微任务？](https://mp.weixin.qq.com/s/U3fgBOtvc9_MbJbMA_Pdqw)
-   [这是你理解的CSS选择器权重吗？](https://mp.weixin.qq.com/s/6W3dcwcsBURGxYD9AeBeWA)
-   [热点面试题：JS 中 call, apply, bind 概念、用法、区别及实现？](https://mp.weixin.qq.com/s/v9eYEpwpzXazXm7pLTkDhw)
-   [热点面试题： 常用位运算方法？](https://mp.weixin.qq.com/s/gn4sBeM6luE_b6jaAZOgyQ)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)
-   [热点面试题：Virtual DOM 相关问题？](https://mp.weixin.qq.com/s/s3BBhTH9g2OrtOpyJ4tzbQ)
-   [热点面试题： Array中有哪些非破坏性方法？](https://mp.weixin.qq.com/s/a0gd3wQ-bqYpDVfFGJP8Ew)
-   [热点面试题：协商缓存和强缓存的理解及区别？](https://mp.weixin.qq.com/s/Zht9WL8mzW7-uOi49vcgzQ)
## 最后：
-   欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，长期交流学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
