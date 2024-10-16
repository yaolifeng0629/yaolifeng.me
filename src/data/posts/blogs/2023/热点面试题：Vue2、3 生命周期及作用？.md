## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，更多精彩内容敬请关注公众号最新消息。
## Vue2 的生命周期？

### 分类：

-   Vue 生命周期分为 8 个阶段：创建前后，载入前后，更新前后，销毁前后

| 生命周期      | 描述                               |
| ------------- | ---------------------------------- |
| beforeCreate  | 组件实例创建前                     |
| created       | 组件实例创建后                     |
| beforeMount   | 组件挂载前                         |
| mounted       | 组件挂载到实例上后                 |
| beforeUpdate  | 组件数据发生变化，更新前           |
| updated       | 组件数据更新后                     |
| beforeDestroy | 组件实例销毁前                     |
| destroyed     | 组件实例销毁后                     |
| activated     | keep-alive 缓存的组件激活时        |
| deactivated   | keep-alive 缓存的组件停用时调用    |
| errorCaptured | 捕获一个来自子孙组件的错误时被调用 |

### 作用/过程

-   **`beforeCreate -> created`**：初始化 `Vue` 实例
-   **`created`**:
1.  可调用 `methods` 中的方法
2.  可访问和修改 `data` 中的数据来触发响应式渲染 `dom`
3.  可调用 `computed` 和 `watch` 方法。
4.  但此时 `vm.$el` 还未创建。
-   **`create -> beforeMount`**:
1.  判断 `el` 是否存在，若不存在停止编译，直接调用 `vm.$mount(el)` 继续编译。
2.  编译优先级：`render -> template -> outerHTML`
-   **`beforeMount`**:
1.  可获取到 `vm.el`
2.  已完成 `DOM` 初始化，但还未挂载 `DOM`
-   **`beforeMount -> mounted`**: `vm.el` 已完成挂载，`vm.$el`生成的 `DOM` 已经替换了 `el` 上所对应的 `DOM`
-   **`mounted`**: `vm.el` 已完成 `DOM` 的挂载和渲染
-   **`beforeUpdate`**:
1.  `view` 层还没更新
2.  若在 `beforeUpdate` 中修改数据，不会触发当前方法
-   **`updated`**:
1.  完成了 `view` 层的更新
2.  若在 `updated` 中修改数据，会再次触发更新方法(`beforeUpdate, updated`)
-   **`beforeDestroy`**: `Vue`实例销毁前调用，此时实例的属性和方法仍可访问。
-   **`bestroyed`**:
1.  销毁 `Vue` 实例
2.  并没有清除 `DOM`，仅仅是销毁 `Vue` 实例

## Vue3 的生命周期？
### 生命周期函数
| 生命周期      | 描述                               |
| ------------- | ---------------------------------- |
| onBeforeMount   |   组件挂载前    |
| onMounted  |   组件挂载后    |
| onBeforeUpdate  |   组件更新前    |
| onUpdated   |  组件更新后     |
| onBeforeUnmount   |  组件实例卸载前     |
| onUnmounted   |   组件实例卸载后    |
| onErrorCaptured     |   捕获后代组件错误    |
| onRenderTracked     |  `Dev Only：仅在开发模式下可用` 组件渲染过程中追求响应式依赖时调用    |
| onRenderTriggered   |  调试钩子，依赖项触发了组件渲染时调用     |
| onActivated   |   组件实例是 `<KeepAlive>` 缓存树的一部分，当组件被`插入`到 DOM 中时调用    |
| onDeactivated     |  组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被`移除`时调用     |
| onServerPrefetch     |  异步方法，SSR 服务端渲染前     |

### 作用/过程
-   `onMounted()`: 注册一个回调函数，在组件挂载完成后执行。
```js
function onMounted(callback: () => void): void


// demo：通过模板引用访问一个元素：
<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
    el.value // <div>
})
</script>

<template>
    <div ref="el"></div>
</template>
```
-   `onUpdated()`：注册一个回调函数，在组件因为响应式状态变更而更新其 `DOM` 树之后调用。父组件的更新钩子将在其子组件的更新钩子之后调用。
```js
function onUpdated(callback: () => void): void



// demo:访问更新后的 DOM
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
    // 文本内容应该与当前的 `count.value` 一致
    console.log(document.getElementById('count').textContent)
})
</script>

<template>
    <button id="count" @click="count++">{{ count }}</button>
</template>
```
-   `onUnmounted()`：注册一个回调函数，在组件实例被卸载之后调用。
```js
function onUnmounted(callback: () => void): void



// demo
<script setup>
import { onMounted, onUnmounted } from 'vue'

let intervalId
onMounted(() => {
    intervalId = setInterval(() => {
        // ...
    })
})

onUnmounted(() => clearInterval(intervalId))
</script>
```

-   `onBeforeMount()`:注册一个钩子，在组件被挂载之前被调用。当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 `DOM` 节点。它即将首次执行 `DOM` 渲染过程。
```js
function onBeforeMount(callback: () => void): void
```

-   `onBeforeUpdate()`：注册一个钩子，在组件即将因为响应式状态变更而更新其 `DOM` 树之前调用。这个钩子可以用来在 Vue 更新 `DOM` 之前访问 `DOM` 状态。在这个钩子中更改状态也是安全的。
```js
function onBeforeUpdate(callback: () => void): void
```

-   `onBeforeUnmount()`：注册一个钩子，在组件实例被卸载之前调用。当这个钩子被调用时，组件实例依然还保有全部的功能。
```js
function onBeforeUnmount(callback: () => void): void
```

-   `onErrorCaptured()`: 注册一个钩子，在捕获了后代组件传递的错误时调用。
    -   错误可以从以下几个来源中捕获：
        -   组件渲染
        -   事件处理器
        -   生命周期钩子
        -   `setup()` 函数
        -   侦听器
        -   自定义指令钩子
        -   过渡钩子
这个钩子带有三个实参：错误对象、触发该错误的组件实例，以及一个说明错误来源类型的信息字符串。

你可以在 `errorCaptured()` 中更改组件状态来为用户显示一个错误状态。注意不要让错误状态再次渲染导致本次错误的内容，否则组件会陷入无限循环。

这个钩子可以通过返回 `false` 来阻止错误继续向上传递
```js
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
) => boolean | void
```

-   `onRenderTracked()`：`dev only`。注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。
```js
function onRenderTracked(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
}
```

-   `onRenderTriggered()`：注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。
```js
function onRenderTriggered(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
}
```

-   `onActivated()`: 注册一个回调函数，若组件实例是 `<KeepAlive> `缓存树的一部分，当组件被插入到 `DOM` 中时调用。
```js
function onActivated(callback: () => void): void
```

-   `onDeactivated()`：注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 `DOM` 中被移除时调用。
```js
function onDeactivated(callback: () => void): void
```

-   `onServerPrefetch()`: 注册一个异步函数，在组件实例在服务器上被渲染之前调用。
```js
function onServerPrefetch(callback: () => Promise<any>): void


// demo
<script setup>
import { ref, onServerPrefetch, onMounted } from 'vue'

const data = ref(null)

onServerPrefetch(async () => {
    // 组件作为初始请求的一部分被渲染
    // 在服务器上预抓取数据，因为它比在客户端上更快。
    data.value = await fetchOnServer(/* ... */)
})

onMounted(async () => {
    if (!data.value) {
        // 如果数据在挂载时为空值，这意味着该组件
        // 是在客户端动态渲染的。将转而执行
        // 另一个客户端侧的抓取请求
        data.value = await fetchOnClient(/* ... */)
    }
})
</script>
```
## 特殊字符描述：
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
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，一起快乐摸鱼和学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
