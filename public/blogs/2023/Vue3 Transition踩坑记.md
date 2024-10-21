## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
##  Vue3 Transition 踩坑记
### 背景
-   我本来想尝试新版本的特性，结果踩了个大坑。在这里分享一下我的经验，希望能让大家少走弯路

### 上代码
```vue
<template>
    <!-- 错误写法 -->
    <Transition><!-- xxxx --></Transition>
</template>

<script setup></script>
```
-   上述代码错误信息：
![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/12664258fc70/error_popup1.png)
![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/12664258fc70/control_error.png)

-   有趣的是，[官方文档](https://cn.vuejs.org/guide/built-ins/transition.html) 中并没有提到 `Transition` 子元素不能包含注释。

### 踩坑历程
1.  第一步：看到 `Cannot read properties of undefined (reading 'loc')`，习惯性(`Uncaught (in promise) ReferenceError: xxxxx is not defined`) 地在本地 `Transition.vue` 页面中寻找 `loc` 变量，结果没有找到。然后我在全局查找，还是没有找到 `loc` 变量。(其实这一步是多余的，因为错误信息 `[plugin:vite:vue] Cannot read properties of undefined (reading 'loc')`，并不是由于本地文件没有 `loc` 变量导致的，而是因为源码内部插件报的错误。)
2.  第二步：[查看源码 `warnTransitionChildren.ts`](https://github.com/vuejs/core/blob/f924bd68bc2bcb8e920e83134450658e7c55929b/packages/compiler-dom/src/transforms/warnTransitionChildren.ts#L24)。
    -   编译前
    ![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/1266425908a8/01.png)
    -   编译后
    ![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126642590902/source_compiler_dist.png)
    -   查看源码得知，`Transition` 组件内必须包含 `一个元素`或 `只有一个根元素的组件` 且不能是注释, 才能通过运行时编译。
3.  第三步：尝试修改。在 `Transition` 组件里包含一个元素，发现它通过了。
    ![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126642590b04/success.png)
![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126642591bbe/Snipaste_2023-04-09_10-02-09.png)

4.  第四步: [看单测源码 `warnTransitionChildren.spec.ts`](https://github.com/vuejs/core/blob/f924bd68bc2bcb8e920e83134450658e7c55929b/packages/compiler-dom/__tests__/transforms/warnTransitionChildren.spec.ts)，对于喜欢深入了解的同学可以看一下。

### 总结
1.  `Transition` 组件 `子元素不能包含注释`，这会导致无法通过运行时编译，导致组件不能正确渲染。`(我踩了半小时的坑，不要跟我一样)`
2.  模板编译中，`Transition` 子元素不允许多个组件或元素，否则编译不通过，根据单测源码得知，如果需要多个分支，可以使用 `v-if, v-if-else` 来确定具体分支。
3.  `Transition` 子元素的组件中可以包含注释，但是不要包含太多，不然会影响渲染效率。

>   希望大家能从我的经验中获得一些收获，避免重复踩坑。


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
