# iOS 剪贴板图片高度异常问题及解决方案

## 问题背景

在移动端开发中，当用户复制并粘贴图片时，我们期望图片能够完整显示。然而，在 iOS 设备上会出现一个特殊问题：粘贴后的图片仅显示原高度的约 1% 左右（如下图），导致图片显示不完整。这个问题在 Android 设备上并不存在。 ![alt text](https://qncdn.mopic.mozigu.net/work/143/24/f6ac47c8bd284dd8/fa0f54603b2cb6bdc5daad6fd8e65b8.png)

## 问题现象

-   iOS 设备：图片高度被严重裁剪，只显示极小部分
-   Android 设备：图片显示正常，可以完整呈现
-   表现特征：即使设置了完整的内联样式，iOS 上依然存在此问题

## 原因分析

### 1. 样式设置问题

-   缺少明确的高度设置
-   iOS 和 Android 对未设置高度的图片处理机制不同

### 2. 图片优化属性影响

以下 HTML 图片属性可能导致渲染异常，导致复制过去只加载了少部分内容：

| 属性 | 说明 | 文档链接 |
| --- | --- | --- |
| decoding | 图片解码方式 | [MDN - decoding](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#decoding) |
| fetchpriority | 加载优先级 | [MDN - fetchpriority](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#fetchpriority) |
| loading | 加载策略 | [MDN - loading](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#loading) |

常见的属性配置组合：

```javascript
// 高性能配置
const highPerformanceConfig = {
    decoding: 'auto',
    fetchpriority: 'high',
    loading: 'eager',
};

// 低性能配置
const lowPerformanceConfig = {
    decoding: 'async',
    fetchpriority: 'low',
    loading: 'lazy',
};
```

## 解决方案

### 动态设置图片高度

```javascript
// 1. 封装一个图片显示组件，在组件加载时统一处理图片高度问题
/**
 * 获取获取图片高度
 * @param url 图片地址
 * @returns
 */
function getImgDimensions(url) {
    if (!url) return;
    return new Promise((resolve, reject) => {
        const img = new Image();
        // 注意这里的url如果带有缩略图参数的，需要去掉
        // 我这里使用的 七牛云 CDN 图片参数
        img.src = url.replace('?imageView2/2/w/750', '');
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            // 将获取的宽高，通过 data 属性绑定到 img 元素上
            this.dimension = { width, height };
            resolve({ width, height });
        };
        img.onerror = () => {
            reject(new Error('无法加载图片'));
        };
    });
}

// 2. 在复制方法中，针对于复制格式(html)做统一处理
/**
 * 格式化HTML节点字符串
 * @param htmlString HTML节点字符串
 * @returns
 */
function formatHtml(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    const imgNodes = doc.getElementsByTagName('img');
    for (let img of imgNodes) {
        // 通过获取 img 组件中 data-width 和 data-height 属性，设置 img 的宽高
        const width = img.getAttribute('data-width');
        const height = img.getAttribute('data-height');
        if (img.src) {
            // 只针对于 IOS 做处理
            if (systemUtils.isIOS()) {
                img.style.width = `${width}px`;
                img.style.height = `${height}px`;
            }
        }
    }

    return doc.body.innerHTML;
}
```

**优点：**

-   实现直接，容易理解

**缺点：**

-   固定高度导致图片手机端订阅号助手 App 变形
-   性能开销较大，需要加载图片获取尺寸

### 在 IOS 订阅号助手 APP 内图片为什么会变形？

1. IOS 和 Android 对于剪贴板格式中的图片处理存在差异
2. 图片变形问题是因为订阅号助手预览的问题，解决方法如下：
    - 解决方法如下：
        1. 点击右上角【保存】
        2. 退出当前编辑页面
        3. 从草稿列表页面重新刚才编辑的文章即可

<iframe
    width="560"
    height="315"
    src="https://qncdn.mopic.mozigu.net/work/143/24/67cdbec994264463/b2ec6977044fa0c032ffd4df52aad6ef.mp4"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>

## 总结

针对 iOS 剪贴板图片高度异常问题，可使用动态设置高度问题：

-   保持图片原始比例
-   实现简单，维护成本低
-   用户体验好（除 IOS 订阅号助手 App 外）
