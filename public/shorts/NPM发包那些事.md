# NPM 发包那些事

## 普遍的发包方式

-   一般情况下我们只需要关心 `package.json` 的四个字段：`main, module, bowser, types(或 typings)`.

### `main, module`

-   一般情况下一个 NPM 包就只有一个导出入口，用户一下两种方式导入:
    1. `import { useEffect } from 'React' `
    2. `import useTools from 'useTools'`

```json
{
    "name": "foo",
    "main": "./dist/index.js"
}
```

-   当同时有 `CJS` 和 `ESM` 模块时，可以再添加一个 `module` 字段用于优先指定 `ESM` 模块的解析入口。
-   注意：`main` 字段不代表着只有 `CJS` 模块独有，只是 `ESM` 模块会优先解析 `module` 字段。

```json
{
    "name": "foo",
    "main": "./dist/index.cjs.js",
    "module": "./dist/index.esm.js"
}
```

### browser

-   主要用于指定当前模块在不同环境（浏览器环境，Node.js 环境）下应该使用那个模块，让当前的 NPM 包能够同时支持 Node.js 和浏览器环境。

```json
{
    "main": "./lib/index.js",
    "browser": "./lib/browser.js"
}

// 在当前配置下，浏览器环境下会使用 browser.js，在 Node.js 环境下会使用 index.js
```

-   但最新的 Node.js 更推荐使用 `exports` 字段，如下：

```json
{
    "exports": {
        "browser": "./browser.js",
        "node": "./index.js"
    }
}
```

### types

-   如果当前的 NPM 包是由 TypeScript 写的，那一般会添加额外的 `types` 或 `typings` 字段，该字段的类型文件会再用户导入相应的 NPM 包时自动加载，为用户提供类型提示。

```json
{
    "name": "foo",
    "main": "./dist/index.cjs.js",
    "module": "./dist/index.esm.js",
    "types": "./dist/index.d.ts"
}
```

### NPM 发包的优化项

#### 使用 Bundleless 模式

对 ESM 和 CJS 模块使用 Bundleless 模式，只在需要 UMD 模块时使用 Bundle 模式。

```json
{
    "type": "module",
    "exports": {
        ".": {
            "import": "./dist/esm/index.js",
            "require": "./dist/cjs/index.js"
        }
    }
}
```

#### 实现子路径导出

使用 `exports` 字段允许用户按需引入模块。

```json
{
    "exports": {
        ".": "./index.js",
        "./utils": "./utils.js"
    }
}
```

#### 提供 esm 和 cjs 两种模块格式

```json
// package.json
{
    "name": "my-data-lib",
    "main": "./dist/cjs/index.js",
    "module": "./dist/esm/index.js",
    "exports": {
        ".": {
            "require": "./dist/cjs/index.js",
            "import": "./dist/esm/index.js"
        }
    }
}
```

#### 区分开发和发布配置

使用 `publishConfig` 分离开发和发布时的入口文件。

```json
{
    "main": "src/index.js",
    "publishConfig": {
        "main": "dist/index.js"
    }
}
```

#### 遵循 Semver 规范
[官网](https://semver.org/lang/zh-CN/)

使用语义化版本管理。

```bash
npm version patch(修订号)  # 1.0.0 -> 1.0.1
npm version minor(次版本号)  # 1.0.1 -> 1.1.0
npm version major(主版本号)  # 1.1.0 -> 2.0.0
```
-   扩展：
    -   对现有 API 进行不兼容更改u，增加主版本号(major), 重置次版本号(minor)和修定号(patch) 为 0
    -   增加新功能，但保证了向后兼容性, 增加次版本号(minor), 重置修定号(patch) 为 0
    -   修复错误和优化, 增加修定好(patch), 不改变主版本号和次版本号。
-   除了版本号外，还有一些标识符:
    -   `latest`: 最新线上版本
    -   `alpha`: 内部测试版本
    -   `beta`: 公开测试版本
    -   `rc`: 发行候选版本
        -   Tips: 可以将这些标识符添加到版本号中，同时也可以添加额外版本：如：`1.0.0-alpha.0` 和 `1.0.0-beta.1` 和 `1.0.0-rc.1`
        -   同时，也可以在安装时执行不同的版本，例如 `pnpm install xxx@beta` 或 `pnpm install xxx@alpha`

#### 使用 Dist-tag

使用 dist-tag 标识不同的发布状态。

```bash
npm publish --tag beta
npm install mypackage@beta
```

#### 使用云构建

确保构建环境纯净，提高发布效率。

```yaml
# .github/workflows/publish.yml
name: Publish Package
on:
    release:
        types: [created]
jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v2
              with:
                  node-version: "14"
            - run: npm ci
            - run: npm test
            - run: npm run build
            - run: npm publish
              env:
                  NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```
