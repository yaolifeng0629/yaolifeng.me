## Monorepo 和 Pnpm

### Monorepo 简介

-   Monorepo 是一种项目开发与策略管理的策略模式，它代表着 "单一代码仓库（Monolithic Repository）"

### 为什么项目需要使用 Monorepo？

-   如果有多个项目，并且在多个项目中有着复用组件和复用逻辑。

### 使用 Monorepo 的好处

-   代码复用：多个仓库都会用到的组件、工具函数、类型声明、样式等，可以放到 common 子包中，
-   独立构建和部署：每个子包都是一个独立的项目，有自己的 package.json 文件，独立安装依赖、独立端口和本地启动、独立测试、独立构建和部署，互不影响
-   降低切换成本：由于只有单一仓库，clone 代码、切换分支、安装依赖比较方便，不用在不同文件夹之间切换。
-   节约磁盘空间：pnpm 天然具备 monorepo 能力，支持全局依赖管理，所有子包之间共享依赖，节约磁盘空间。
-   方便提交 PR：由于是单仓库，增加新组件或给组件增加新特性，只需要提交一个 MR、编写一次 MR 描述、关联一次需求/缺陷单。
-   方便代码检视：一个完整的特性只需要统一在一个 MR 中检视，不用在多个仓库/多个 MR 之间切换。
-   灵活便于扩展：后续增加新的工程只需要在 packages 下增加一个子包，不需要申请新的代码仓库，也降低后续仓库维护成本，比如：配置保护分支 / GitHub Actions / 仓库标签等。

### Monorepo (单仓多模块) 开发模式

-   回归单体管理：它允许在一个代码仓库中管理多个项目，组件或服务，提供更好的代码共享和重用性。
-   优点：
    -   保留了多仓库的主要优势
    -   管理所有项目，版本控制更容易一致，降低了不同项目之间的版本冲突
    -   可统一项目的构建和部署流程，降低了配置和维护多个项目需要的工作量
    -   代码复用
    -   模块独立管理
    -   分工明确，业务场景独立
    -   代码耦合度降低
-   缺点

    -   随着时间推移，导致构建时间较长，管理起来较麻烦
    -   项目颗粒度的权限管理较为困难
        -   如何解决？
            -   使用代码所有权文件：使用如 CODEOWNERS 文件（Github 等平台支持）来指定某个目录和文件的所有者。当这些文件或目录被修改时，需要指定的所有者批准更改。
            -   分支策略：通过分支严格管理不同级别的开发人员可以访问和修改的分支，合并的权限。
            -   使用 web hooks：在对应的文件发生修改时，执行脚本来给所有者通知并检查。
            -   第三方工具：Gitlab 和 Bitbucket 提供了更细颗粒度的权限控制设置。

-   为什么组件库项目会选用 Monorepo 模式？
    -   components: 作为组件库的主要代码，实现各个 UI 组件的核心逻辑。
    -   shared: 主要存放各种杂七杂八的工具方法。
    -   theme: 实现组件库的主题样式定制方案。
    -   cli: 实现组件库模板脚手架的命令行工具。
    -   docs: 组件库的示例 demo 与使用文档。
    -   playground: 组件库的在线编辑、演示应用。
        -   S：模块划分的越清晰，复用时的灵活性、可操作性就越强，每个独立模块产物的体积也会越轻量。

### Pnpm 在 Monorepo 中使用

-   我们项目中有一个 main 应用，在 web 文件夹下还有一个 react 应用和 vue 应用，我们可以用 pnpm 对依赖进行统一管理
    ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728288728.webp)

1.  安装

```sh
# 安装
npm i pnpm -g

# 检验是否安装成功
pnpm -v
```

3.  在根目录 pnpm 初始化生成 package.json

```sh
pnpm init
```

4.  配置工作空间, 新建 pnpm-workspace.yaml 文件
5.  配置 pnpm-workspace.yaml 文件
6.  安装项目依赖，在根目录运行如下命令，一键为所有项目安装依赖

```sh
pnpm i
```

![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728288692.webp) 7. 暴露公用方法，创建 common 文件夹及 index.ts
![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728288865.webp) 8. 在 common 文件夹中运行 pnpm init 初始化

```sh
pnpm init
```

9. 在 pnpm-workspace.yaml 文件中添加 common 文件夹
   ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728288916.webp)

```sh

```

10. 在 common 下编写 index.ts 文件暴露方法
    ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728288968.webp)

```js
export const hello = () => {
    console.log("hello");
};
```

11. 根目录运行 pnpm -F main-project add common 将 common 里的方法暴露给 main-project

-   这里的-F 是--filter 的简写，用于过滤指定的 package，用法 pnpm --filter

```sh
pnpm -F main-project add common
```

12. 在 vue 和 react 项目页面中引入公共方法
    ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728289054.webp)
13. 启动项目

```sh
pnpm -F  main-project dev
```

![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728289198.webp)

### Pnpm 常用命令

```sh
#安装软件包及其依赖的任何软件包 如果workspace有配置会优先从workspace安装
pnpm add <pkg>
#安装项目所有依赖
pnpm install
#更新软件包的最新版本
pnpm update
#移除项目依赖
pnpm remove
#运行脚本
pnpm run
#创建一个 package.json 文件
pnpm init
#以一个树形结构输出所有的已安装package的版本及其依赖
pnpm list
```

-   为指定模块安装外部依赖
    -   例如：为 A 包安装 lodash
    ```sh
    // 为 a 包安装 lodash
    pnpm --filter a i -S lodash // 生产依赖
    pnpm --filter a i -D lodash // 开发依赖
    ```
-   指定内部模块之间的相互依赖
    -   例如：为 a 包安装内部依赖 b。
    ```sh
    // 指定 a 模块依赖于 b 模块
    pnpm --filter a i -S b
    ```
    -   pnpm workspace 对内部依赖关系的表示不同于外部，它自己约定了一套 [Workspace 协议 (workspace:)](https://pnpm.io/zh/workspaces#workspace-%E5%8D%8F%E8%AE%AE-workspace)。
    ```json
    {
        "name": "a",
        // ...
        "dependencies": {
            "b": "workspace:^"
        }
    }
    ```
    -   在实际发布 npm 包时，workspace:^ 会被替换成内部模块 b 的对应版本号(对应 package.json 中的 version 字段)。替换规律如下所示：
    ```json
    {
        "dependencies": {
            "a": "workspace:*", // 固定版本依赖，被转换成 x.x.x
            "b": "workspace:~", // minor 版本依赖，将被转换成 ~x.x.x
            "c": "workspace:^" // major 版本依赖，将被转换成 ^x.x.x
        }
    }
    ```

#### 现有项目改造成 Monorepo 的步骤

1.  创建子包
    -   第一步就是在根目录创建 packages 目录，增加项目子包，比如项目叫：portal

```sh
root
├── packages
|  └── portal
|     ├── ... // 项目文件和目录
```

2.  现有项目文件放进子包里
    -   把现有工程的 src / public / package.json / vite.config.ts / tsconfig.xx.json / index.html / README.md 等项目启动和构建相关的目录和文件全部剪切到 packages/portal 目录中

```sh
root
├── packages
|  └── portal
|     ├── index.html
|     ├── package-lock.json
|     ├── package.json
|     ├── public
|     ├── README.md
|     ├── src
|     ├── tsconfig.app.json
|     ├── tsconfig.json
|     ├── tsconfig.node.json
|     └── vite.config.ts
```

3.  配置 pnpm-workspace.yaml
    -   根目录创建 pnpm-workspace.yaml 文件。

```yaml
packages:
    - packages/**
```

4.  配置 package.json
    -   项目原来的 package.json 属于子包，需要放到 portal 子包中。
    -   项目根目录需要创建一个新的 package.json 文件。

```sh
{
  "name": "root",
  "private": true
}
```

5.  改造前后目录结构对比
    ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728290477.webp)

6.  验证本地启动和构建命令

```sh
执行 pnpm i 安装依赖

执行 pnpm -F portal dev 本地启动

执行 pnpm -F portal build 项目构建

如果以上命令都正常，说明本次 Monorepo 改造成功！
```

7.  增加便捷命令
    -   将本地启动命令放到根目录的 packages.json scripts 中，方便启动。

```diff
{
  "name": "root",
  "private": true,
+  "scripts": {
+    "dev": "pnpm -F portal dev",
+    "build": "pnpm -F portal build",
+    "preview": "pnpm -F portal preview"
+  }
}
```

-   后续启动项目：pnpm dev
-   构建项目：pnpm build

8.  增加一个新项目 admin - 在 packages 目录下执行 npm create vite admin，选择 React 框架。
    ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728290619.webp)

```sh
执行 pnpm i 安装依赖
执行 pnpm -F admin dev 本地启动 admin 新项目
执行 pnpm -F admin build 构建 admin 新项目
```

-   两个项目同时启动了。
    ![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640_1728290691.webp)

-   实现了 portal / admin 两个项目分开启动、分开构建、分开管理依赖、分开测试，互不影响，而且 portal 是 Vue 技术栈，admin 是 React 技术栈。
-   可以在根目录的 package.json scripts 增加对应的便捷命令。

```diff
{
  "name": "root",
  "private": true,
  "scripts": {
    "dev": "pnpm -F portal dev",
    "build": "pnpm -F portal build",
    "preview": "pnpm -F portal preview",
+    "dev:admin": "pnpm -F portal dev",
+    "build:admin": "pnpm -F portal build",
+    "preview:admin": "pnpm -F portal preview"
  }
}
```

```sh
root
├── package.json
├── packages
|  ├── admin
|  |  ├── eslint.config.js
|  |  ├── index.html
|  |  ├── package.json
|  |  ├── public
|  |  ├── README.md
|  |  ├── src
|  |  ├── tsconfig.app.json
|  |  ├── tsconfig.json
|  |  ├── tsconfig.node.json
|  |  └── vite.config.ts
|  └── portal
|     ├── index.html
|     ├── package-lock.json
|     ├── package.json
|     ├── public
|     ├── README.md
|     ├── src
|     ├── tsconfig.app.json
|     ├── tsconfig.json
|     ├── tsconfig.node.json
|     └── vite.config.ts
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

-   如果有些逻辑 portal / admin 都用到了，我们可以新加一个子包：common
-   然后在 portal / admin 中引入 common。

```sh
pnpm -F portal i common
pnpm -F admin i common
```
