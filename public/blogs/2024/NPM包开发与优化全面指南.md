# NPM 包开发与优化全面指南

## 1. 理解 NPM 包的结构

### 1.1 package.json 文件：包的核心

`package.json`文件是 NPM 包的中央配置，定义了包的各个方面，从基本元数据到复杂的发布配置。

```json
{
    "name": "my-awesome-package",
    "version": "1.0.0",
    "description": "一个令人惊叹的包",
    "main": "./dist/index.js",
    "module": "./dist/index.mjs",
    "types": "./dist/index.d.ts",
    "files": ["dist"],
    "scripts": {
        "build": "tsup src/index.ts --format cjs,esm --dts",
        "test": "jest"
    },
    "keywords": ["awesome", "package"],
    "author": "Your Name <you@example.com>",
    "license": "MIT",
    "dependencies": {
        "lodash": "^4.17.21"
    },
    "devDependencies": {
        "typescript": "^4.5.5",
        "tsup": "^5.11.13",
        "jest": "^27.4.7"
    }
}
```

让我们详细解析一些关键字段：

-   `name`和`version`：这两个字段组成了包在 NPM 注册表中的唯一标识符。
-   `main`，`module`和`types`：这些指定了不同模块系统和 TypeScript 支持的入口点。
-   `files`：这个数组指定了发布包时应该包含哪些文件和目录。
-   `scripts`：这些是常见任务（如构建和测试）的命令快捷方式。

### 1.2 理解包的入口点

现代 JavaScript 生态系统支持多种模块格式。您的包应该通过提供多个入口点来适应不同的环境。

1. **main**：主要入口点，通常用于 CommonJS (CJS)模块。
2. **module**：用于 ECMAScript (ESM)模块的入口点。
3. **browser**：用于浏览器环境的入口点。
4. **types**：TypeScript 类型声明的入口点。

以下是一个包结构的示例：

```tree
my-awesome-package/
├── src/
│   ├── index.ts
│   └── utils.ts
├── dist/
│   ├── index.js        (CJS构建)
│   ├── index.mjs       (ESM构建)
│   ├── index.d.ts      (TypeScript声明)
│   └── browser.js      (浏览器特定构建)
├── package.json
└── tsconfig.json
```

对应的`package.json`配置：

```json
{
    "name": "my-awesome-package",
    "version": "1.0.0",
    "main": "./dist/index.js",
    "module": "./dist/index.mjs",
    "browser": "./dist/browser.js",
    "types": "./dist/index.d.ts",
    "exports": {
        ".": {
            "require": "./dist/index.js",
            "import": "./dist/index.mjs",
            "types": "./dist/index.d.ts"
        }
    }
}
```

## 2. 深入理解模块格式

### 2.1 CommonJS (CJS)

CommonJS 是 Node.js 的传统模块格式。它使用`require()`进行导入，使用`module.exports`进行导出。

```javascript
// mathUtils.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract,
};

// main.js
const mathUtils = require('./mathUtils');
console.log(mathUtils.add(5, 3)); // 输出: 8
```

### 2.2 ECMAScript 模块 (ESM)

ESM 是 JavaScript 模块的现代标准，使用`import`和`export`语句。

```javascript
// mathUtils.mjs
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// main.mjs
import { add, subtract } from './mathUtils.mjs';
console.log(add(5, 3)); // 输出: 8
```

### 2.3 通用模块定义 (UMD)

UMD 是一种允许模块在多种环境（CommonJS、AMD、全局变量）中工作的模式。

```javascript
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // 浏览器全局变量
        factory((root.mathUtils = {}));
    }
})(typeof self !== 'undefined' ? self : this, function (exports) {
    exports.add = function (a, b) {
        return a + b;
    };
    exports.subtract = function (a, b) {
        return a - b;
    };
});
```

## 3. 高级包优化技术

### 3.1 Tree Shaking 和副作用

Tree shaking 是现代打包工具用来消除死代码的技术。要使您的包可以进行 tree shaking：

1. 使用 ES 模块
2. 避免副作用
3. 在`package.json`中使用`"sideEffects"`字段

```json
{
    "name": "my-utils",
    "version": "1.0.0",
    "sideEffects": false
}
```

如果某些文件确实有副作用：

```json
{
    "name": "my-utils",
    "version": "1.0.0",
    "sideEffects": ["./src/polyfills.js", "*.css"]
}
```

### 3.2 代码分割和动态导入

对于大型包，考虑使用代码分割，允许用户只导入他们需要的部分：

```javascript
// heavyFunction.js
export function heavyFunction() {
    // ... 一些计算密集型操作
}

// main.js
async function doHeavyWork() {
    const { heavyFunction } = await import('./heavyFunction.js');
    heavyFunction();
}
```

### 3.3 条件导出

使用条件导出为不同的环境或导入条件提供不同的入口点：

```json
{
    "name": "my-package",
    "exports": {
        ".": {
            "import": "./dist/index.mjs",
            "require": "./dist/index.cjs",
            "browser": "./dist/browser.js"
        },
        "./utils": {
            "import": "./dist/utils.mjs",
            "require": "./dist/utils.cjs"
        }
    }
}
```

## 4. 版本管理和发布

### 4.1 语义化版本控制 (SemVer)

语义化版本使用三部分版本号：主版本号.次版本号.修订号

-   主版本号：进行不兼容的 API 更改时
-   次版本号：以向后兼容的方式添加功能时
-   修订号：进行向后兼容的 bug 修复时

```bash
npm version patch -m "版本更新到 %s - 修复文档中的拼写错误"
npm version minor -m "版本更新到 %s - 添加新的实用函数"
npm version major -m "版本更新到 %s - 更改API结构"
```

### 4.2 预发布版本

对于预发布版本，使用带连字符的标签：

-   `latest`: 最新线上版本
-   `alpha`: 内部测试版本
-   `beta`: 公开测试版本
-   `rc`: 发行候选版本
    -   Tips: 可以将这些标识符添加到版本号中，同时也可以添加额外版本：如：`1.0.0-alpha.0` 和 `1.0.0-beta.1` 和 `1.0.0-rc.1`

```bash
npm version prerelease --preid=alpha
# 1.0.0 -> 1.0.1-alpha.0

npm version prerelease --preid=beta
# 1.0.1-alpha.0 -> 1.0.1-beta.0

npm version prerelease --preid=rc
# 1.0.1-beta.0 -> 1.0.1-rc.0
```

### 4.3 使用标签发布

使用标签发布不同版本或预发布版本：

```bash
npm publish --tag next
npm publish --tag beta
```

用户可以安装特定版本：

```bash
npm install my-package@next
npm install my-package@beta
```

## 5. 持续集成和部署 (CI/CD)

### 5.1 使用 GitHub Actions 进行自动发布

创建一个`.github/workflows/publish.yml`文件：

```yaml
name: 发布包

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
                  node-version: '14'
                  registry-url: 'https://registry.npmjs.org'
            - run: npm ci
            - run: npm test
            - run: npm run build
            - run: npm publish
              env:
                  NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}

    publish-gpr:
        needs: build
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-node@v2
              with:
                  node-version: '14'
                  registry-url: 'https://npm.pkg.github.com'
            - run: npm ci
            - run: npm publish
              env:
                  NODE_AUTH_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

这个工作流程将在您创建新版本时自动将您的包发布到 NPM 和 GitHub Packages。

### 5.2 自动化版本更新

您可以在 CI/CD 管道中自动化版本更新。以下是使用 GitHub Action 的示例：

```yaml
name: 更新版本

on:
    push:
        branches:
            - main

jobs:
    bump-version:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
              with:
                  fetch-depth: 0
            - uses: actions/setup-node@v2
              with:
                  node-version: '14'
            - name: 更新版本
              run: |
                  git config --local user.email "action@github.com"
                  git config --local user.name "GitHub Action"
                  npm version patch -m "更新版本到 %s [skip ci]"
            - name: 推送更改
              uses: ad-m/github-push-action@master
              with:
                  github_token: ${{ secrets.GITHUB_TOKEN }}
                  branch: ${{ github.ref }}
```

这个动作将在每次向主分支推送更改时自动更新包的修订版本号。

## 6. 包开发最佳实践

### 6.1 文档

良好的文档对于包的采用至关重要。考虑使用像 JSDoc 这样的工具进行内联文档：

```javascript
/**
 * 将两个数字相加。
 * @param {number} a - 第一个数字。
 * @param {number} b - 第二个数字。
 * @returns {number} a和b的和。
 */
function add(a, b) {
    return a + b;
}
```

### 6.2 测试

使用像 Jest 这样的框架实现全面的测试：

```javascript
// math.js
export function add(a, b) {
    return a + b;
}

// math.test.js
import { add } from './math';

test('1 + 2 应该等于 3', () => {
    expect(add(1, 2)).toBe(3);
});
```

### 6.3 代码检查和格式化

使用 ESLint 进行代码检查，使用 Prettier 进行代码格式化。以下是一个示例`.eslintrc.js`：

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // 在这里添加自定义规则
    },
};
```

以及一个`.prettierrc`文件：

```json
{
    "singleQuote": true,
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "printWidth": 100
}
```
