## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 前言
-   在上篇文章中, 我们说了作用域一共分为两种：`词法作用域`和`动态作用域`，而这篇文章我们一起来学习 `动态作用域`。

## 动态作用域
-   动态作用域似乎有着很好的理由让作用域作为一个在运行时就被动态确定的形式，而不是在写代码时进行静态确定的形式。
-   考虑一下代码：
```js
function foo() {
    console.log(a); // 2
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;
bar();
```
-   在上述代码中，词法作用域让 foo() 中的 a 通过 RHS 引用到了全局作用域中的 a, 因此输出 2;
-   `在动态作用域中，它并不关心函数和作用域是如何声明以及在何处声明的，只关心他们从何处调用的`。换句话说，`作用域链是基于调用栈的，而不是代码中的作用域嵌套的。`
-   如果 JavaScript 具有动态作用域，理论上，上述代码 foo() 中的 a 输出 3; 因为 foo() 是在 bar() 中调用的，

-   **为什么会这样？**
    -   因为当 foo() 无法找到 a 的变量引用是，会顺着调用栈在调用 foo() 的地方查找 a，而不是在嵌套的词法作用域链中向上查找。由于 foo() 是在 bar() 中调用的，引擎会检查 bar() 的作用域，并找到值为 3 的变量 a。
-   是不是很奇怪？
    -   但这其实是因为你可能只写过基于词法作用域的代码，因此对动态作用域感到陌生。如果你只用基于动态作用域的语言写过代码，就会觉得很自然的，而词法作用域看上去才怪怪的。
-   `事实上 JavaScript 并不具有动态作用域，它只有词法作用域`。`但 this 机制的存在在某种程度上很像动态作用域。`


### 词法作用域与动态作用域的区别？
-   动态作用域其实是 JavaScript 另一个重要机制 this 的表亲
-   词法作用域是在书写代码或定义时确定的
-   动态作用域是在运行时确定的。(this 也是)
-   词法作用域关注函数在何处声明
-   动态作用域关注函数从何处调用
-   其实在 JavaScript 中的作用域大多为词法作用域。
-   作用域链是基于调用栈的，而不是代码中的作用域嵌套的

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
