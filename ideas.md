# yaolifeng.me

Personal Website

## 参考网站：

-   https://antfu.me/:
    -   [Github](https://github.com/antfu/antfu.me)
    -   [Official Website](https://antfu.me/)
-   https://hyoban.cc/:
    -   [Github](https://github.com/hyoban/hyoban.cc)
    -   [Official Website](https://hyoban.cc/)
-   https://fuxiaochen.com/:
    -   [Github](https://github.com/aifuxi/fuxiaochen)
    -   [Official Website](https://fuxiaochen.com/)
-   https://innei.in/
    -   [Github](https://github.com/Innei/Shiro)
    -   [Official Website](https://innei.in/)

### 目前想法

1.  首页参考 fuxiaocheng 主页
2.  其他页面参考 hyoban 页面
3.  文章直接写在 Github 文件中，得想一个及时同步文章得方案
4.  文章使用 Markdown 的语法
5.  主题参考 antfu 个人网站

### Ideas

我想开发一个个人主页项目，里面包含的主要功能有：个人主页，顶部导航栏，日常文章（文章列表，文章详情，一些主题可以参考 [Anthony Fu](https://antfu.me/) 的博客主题和代码样式等），代码片段，个人项目（项目分类列表等页面），你帮我调研一下有哪些好用，流行的库可以在个人主页上使用，注意对一些 npm 包可以选择一些轻量级同功能的，不要太大的，但是也不要那种流量很差的 npm 包，我想使用的主要技术栈是 Next.js，typescript 和一些 icon，css 等一些框架或库，可以参考 [Anthony Fu](https://antfu.me/) 的博客功能，但是我使用的技术栈不同，并且我想快速搭建起来，而不是手动从零开始，最好有一个符合我要求的模板。还有这个项目我想部署到免费的服务器上，比如 Vercel，netlify 或者更用好的平台，注意域名我想自定义为 yaolifeng.me, 还有一点关于文章、代码片段，和项目我想通过 markdown 形式，当我在本地运行某个命令可以直接将最新内容更新到线上这种形式，或者通过 github action 来更新也可以。你帮我调研一下

## 模板

-   https://github.com/hashicorp/next-mdx-remote

## 库或工具

### 1. **Next.js**

-   **描述**：React 框架，支持服务器端渲染和静态网站生成。
-   **安装**：
    ```sh
    npx create-next-app@latest
    ```

### 2. **TypeScript**

-   **描述**：JavaScript 的超集，添加了类型系统。
-   **安装**：
    ```sh
    npm install --save-dev typescript @types/react @types/node
    ```

### 3. **Styled Components 或 Emotion**

-   **描述**：CSS-in-JS 库，用于编写组件样式。
-   **安装**：
    ```sh
    npm install styled-components
    npm install @emotion/react @emotion/styled
    ```

### 4. **MDX**

-   **描述**：在 Markdown 文件中使用 React 组件。
-   **安装**：
    ```sh
    npm install @next/mdx @mdx-js/loader
    ```

### 5. **react-icons**

-   **描述**：流行的图标库，支持多种图标集。
-   **安装**：
    ```sh
    npm install react-icons
    ```

### 6. **gray-matter**

-   **描述**：解析 Markdown 文件中的 YAML Front Matter。
-   **安装**：
    ```sh
    npm install gray-matter
    ```

### 7. **remark**

-   **描述**：Markdown 解析和转换工具。
-   **安装**：
    ```sh
    npm install remark remark-html
    ```

### 8. **highlight.js**

-   描述：代码高亮库。
-   安装：

    ```sh
    npm install highlight.js
    ```
-   搜索索引：https://x.com/vikingmute/status/1817012925934240163
