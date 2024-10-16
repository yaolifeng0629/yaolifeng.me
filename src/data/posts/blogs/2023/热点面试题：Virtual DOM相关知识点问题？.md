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

## 热点面试题：Virtual DOM 相关问题？
### 什么是 Virtual DOM？
-   VDOM 是对真实 DOM 的一种映射，本身是一个 JS 对象，包含了标签名(tag), 属性(attrs)，子元素(children)。

### VDOM 是如何修改真实 DOM？
-   VDOM 是与真实 DOM 的 JS 对象，如果改变了某个元素的状态，首先会在 VDOM 上进行改变，而不是直接去操作真实 DOM，当有新的修改发生时，新的 VDOM 与 旧的 VDOM 进行比较得到差异，然后将差异映射到真实 DOM 上，达到修改真实 DOM 的效果。

### VDOM 如何生成？如何成为真实 DOM？
-   vue 中通过模板编译器(template compiler) 编译为渲染函数(render), 在挂载(mount) 过程中调用渲染函数(render)，此时返回的对象就是 VDOM。但这并不是真实 DOM，要通过 patchVnode() 方法转换为真实 DOM。

### Vue 中为什么要才使用 VDOM？
1.  为了解耦 HTML 的依赖，不在依赖 HTML compiler 进行模板编译
2.  VDOM 更减少不必要的重绘和回流
3.  解决 View 与 Status 的同步问题
4.  VDOM 的跟踪变化
5.  提高项目的可维护性
6.  VDM 把渲染过程抽象化了，使组件的抽象能力得到的提升
7.  可跨平台：SSR, Weex，同构渲染

### VDOM 的中 diff 算法？
-   主要实现方法是：递归 + 双指针
-   在前端中，很少存在跨层级移动 DOM Element, 所以 VDOM 只会对同一个层级的元素进行比对，才使用深度优先遍历的方法，来记录差异。

###  VDOM 的作用是什么？
1.  维护 View 和 Status 的状态
2.  能在复杂的情况下提升 Rendering Performance
3.  跨平台(Cross Platform)
    1.  浏览器端渲染 DOM
    2.  服务端渲染 SSR：Nuxt.js，Next.js
    3.  原生应用：Weex，React native
    4.  小程序：mpvue，uni-app

### VDOM 的优点？
1.  有效减少真实 DOM 的操作次数，提高性能
2.  VDOM 不会引起回流和重绘
3.  方便跨平台

### VDOM 的缺点？
1.  无法进行极致优化
2.  在首次 render 大量 DOM 时，多了一层 VDOM 的计算

### 关于 VDOM 的库？
1.  Snabbdom
    -   vue2 内用的 VDOM 就是改造后 Sanbbdom
    -   可通过模块进行开发
    -   使用 TypeScript 开发
    -   最快的 VDOM 之一
2.  virtual-dom

## 文章特殊字符描述：
1. 问题标注 `Q(question)`
2. 答案标注 `R(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`

## 往期回顾：
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
