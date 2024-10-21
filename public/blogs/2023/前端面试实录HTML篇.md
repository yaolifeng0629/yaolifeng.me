## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，更多精彩内容敬请关注公众号最新消息。
## 前端面试实录HTML篇
### 1. HTML5 有哪些更新？
1.  引入了语义化标签：
    -   `header`: 头部元素
    -   `section`: 中间元素
    -   `footer`: 底部元素
    -   `nav`: 导航区域
    -   `aside`: 侧边栏区域
    -   `article`:内容元素
    -   `process`: 进度条
    -   `bdo`: 定义文字方向
    -   `sub`: 下标
    -   `sup`: 上标
    -   `pre`: 预格式化文本
2.  媒体标签：
    -   `audio`: 音频标签
    -   `video`: 视频标签
    -   `source`: 格式源标签
3.  `input` 标签的扩展：
    -   属性扩展：
        -   `placeholder`: 默认提示文本
        -   `autofocus`: 自动聚焦
        -   `required`: 必填项
    -   `type` 属性扩展：
        -   `date`: 日期选择框
        -   `color`: 颜色选择器
        -   `button`: 按钮
        -   `radio`: 单选框
        -   `checkbox`: 复选框
        -   `range`: 滑块
4.  `history API`:
    -   `history.go()`: 跳转某个页面(URL)/上个页面(-1)/下个页面(1)
    -   `history.back()`: 返回上个页面
    -   `history.forward()`: 跳转下个页面
    -   `history.pushstate()`: 添加 `history` 栈
    -   `history.replacestate()`: 替换 `history` 栈
5.  数据存储：
    -   `localStorage`：永久性存储
    -   `sessionStorage`：会话存储

### 2. 对 HTML 语义化的理解？
-   一句话：正确的标签做正确的事。
-   优点：
    1.  对机器友好：更便于解析和爬虫，有利于 `SEO`
    2.  对开发者友好：增强了代码可读性，结构更加清晰，便于开发和维护

### 3. 行内元素有哪些？块级元素有哪些？空元素有哪些？
-   行内元素：`a,b,span,img,input,select,strong`
-   块级元素：`div,ul,ol,li,dl,dt,dd,h1~h6,p`
-   空元素：(即没有内容的 HTML 元素，在开始标签中关闭的，也就是没有闭合标签)
    -   `<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`、`<area>`、`<source>`

### 4. iframe 的优缺点？
-   定义：`iframe` 会创建包含另一个文档的内联框架，可将另一个 `HTML` 页面嵌入到页面中。
-   优点：
    1.  可用来加载速度较慢的内容(如广告)
    2.  使用脚本并行下载
    3.  实现跨子域通信
-   缺点：
    1.  会阻塞主页面的 `onload` 时间
    2.  无法被一些搜索引擎识别到
    3.  会产生较多页面，不便于管理

### 5. DOCYPE(文档类型) 的作用？
-   定义：一种标准通过标记语言文档类型声明，本质就是告诉浏览器(解析器)以什么样的文档类型来解析文档。有不同的渲染模式，他们对 CSS 代码和 JavaScript 代码解析不同，必须写在文档的第一行。
-   分类：(混杂模式，标准模式，准标准模式，超级标准模式)
    -   `CSS1Compat`: 标准模式(`strick mode`)：使用 W3C 的标准来解析渲染页面，在浏览器中，会以最高标准呈现页面
    -   `BackCompat`: 怪异模式(也称混杂模式, `Quick mode`): 浏览器使用自己的模式来解析渲染页面，在当前模式中，页面会以一种比较宽松向后兼容的方式显示。
-   `<!DOCTYPE html>`：告诉浏览器使用 W3C 的标准来解析渲染页面，以最高的标准呈现页面。

### 6. src 与 href 的区别？
-   src 和 href 都是用来引用外部资源的
-   区别：
    -   `src`: 表示对资源的引用，所引用的内容会嵌入到当前标签所在位置中，也就是会将引用的资源下载应用到内容中。当浏览器解析到它的时候，会暂停其他资源的处理，直到该资源加载——编译——执行完毕。一般情况下 js 脚本放在页面的最底部
    -   `href`: 表示超文本引用，指向一些网络资源，会建立当前站点建立链接关系。当浏览器解析到他们所引用的资源时，不会停止其他资源的处理，而是会并行下载。常用在 `a, link` 等标签上。

### 7. script 标签中 defer 和 async 的区别？
-   字面含义：`defer`: 延迟 `async`: 异步
-   普通情况：如果没有 `defer` 或 `async`，当浏览器遇到 js 脚本会立即加载——编译——执行，会阻塞后面的逻辑。
    `<script src="example.js"></script>`
-   添加 `defer` 或 `async`：
    -   有 `defer`: 加载其他文档和 js 脚本会同时进行的，但在此过程中 js 脚本是不执行的，只加载。js 脚本的执行会在加载解析完所有的元素后才会执行。
        `<script defer src="example.js"></script>`
    -   有 async: 加载其他文档和 js 脚本会同时进行，但在此过程中，js 脚本会并行加载——编译——执行的。
        `<script async src="example.js"></script>`
-   区别：
    -   在于 js 脚本加载完成后何时执行，`defer` 不会在加载后立即执行，而 `async` 会在加载后立即执行。`defer` 符合是最接近我们对于 js 脚本执行的理解
    -   如果有添加多个 `defer` 属性的 js 脚本，他们会按照加载顺序执行，而 `async`，他们只要加载完成后就会立刻执行
-   相同点：
    -   在加载这块是相同的，都是异步加载的

### 8. 常用的 meta 标签的属性有哪些？
-   `meta`: 描述网页文档的属性，比如网页的作者，网页描述，关键词等
```html
<!-- charset 文档的编码类型 -->
<meta charset="UTF-8" >

<!-- keywords 网页关键词 -->
<meta name="keywords" content="关键词" />

<!-- description 网页描述 -->
<meta name="description" content="页面描述内容" />

<!-- refresh, 页面重定向和刷新 -->
<meta http-equiv="refresh" content="0;url=" />

<!-- viewport 适配移动端，控制视口大小和比例 -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

### 9. tile 与 h1 的区别？b 与 strong 的区别？i 与 em 的区别？
-   `title` 与 `h1` 的区别：
    -   `title` 属性更侧重于网站的信息，显示在网页标题上，告诉搜索引擎和用户此网站是做什么的。而 `h1` 显示在内容上，`title` 标签比 `h1` 标签更重要一些。
-   `b` 与 `strong` 的区别：
    -   `strong` 标签有语义，起到加重语气及强调的地方，而 `b` 标签没有，`b` 标签只是简单的加粗标签
-   `i` 与 `em` 的区别：
    -   `em` 标签有语义，表示一般的强调文本，对搜索引擎更友好。而 `i` 标签仅仅表示样式上的斜体。


## 特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`
## 往期推荐：
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
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，一起快乐摸鱼和学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
