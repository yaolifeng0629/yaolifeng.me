# 发布自己的 NPM 包

## 所需环境
1.  Node.js：下载安装最新稳定版本
2.  NPM：确保电脑上安装了 NPM（这是 NPM 预先安装的）
3.  NPM 账户：发布一个 NPM 包，需要注册一个 NPM 账户

### 步骤
1.  登录 npm 账户
```js
npm login

1. 输入用户名和密码和邮箱
2. 进入到 `https://www.npmjs.com/` 的
/**
 *  settings -> account -> profile ->
 *      Two-Factor Authentication(双重身份验证) ->
 *      start 2FA(启动2FA) ->
 *      input yourself account password ->
 *      input security key ->
 *      click add security key ->
 *      input your security key name ->
 *      wait for time ->
 *      input yourself computer password ->
 *      now automatic download one txt profile ->
 *      copy this profile content ->
 *      paste to cmd: one-time password
 */
```

-   如果你看到终端显示：`Loggen in as lakinduhewawasam on https://registry.npmjs.org/.` 证明你已经登录成功

2.  初始化 npm 包
```js
// 方式1：
    npm init // 此命令会要求你按步骤输入信息
// 方式2：
    npm init -y // 此命令会自动以你的文件夹为名创建一个 package.json 文件
```
-   执行上初始化后，根目录下会有一个 `package.json`
```js
// 这是初始化后的文件内容
{
    "name": "yourself folder name",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}

// 此时，需要根据需求修改配置项
{
    "name": "yourself folder name", // 包名
    "version": "1.0.0", // 版本号
    "description": "", // 版本描述
    "main": "index.js", // 入口文件
    "scripts": { // 执行脚本命令
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [], // 关键字：在npm上搜索的关键字
    "author": "", // 作者名
    "license": "ISC", // 许可证
    "repository": { // 目标源
        "type": "git",
        "url": "git+yourself npm package git address" // https://github.com/19980617/lc-npm-demo.git
    },
    "bugs": { // 反馈内容
        "url": "yourself npm package git issues url" // https://github.com/19980617/lc-npm-demo/issues
    },
    "homepage": "yourself npm package git readme url", // npm 包主页 https://github.com/19980617/lc-npm-demo#readme
    "devDependencies": { // dev-开发依赖
        "@babel/cli": "^7.18.6",
        "@babel/core": "^7.18.6",
        "@babel/preset-env": "^7.18.6",
        "eslint": "^8.19.0"
    }
}
```
3.  配置 ESlint
    1.  根目录下新建文件：`.eslintrc.yml`
    2.  复制内容如下
```js
env:
    browser: true
    es2021: true
    node: true
extends:
    - airbnb-base
parserOptions:
    ecmaVersion: latest
    sourceType: module
rules: {}
```

4.  配置Babel
    1.  在根目录下执行 `npm install --save-dev @babel/cli @babel/core @babel/preset-env`
    2.  在根目录下新建文件：`.babelrc`
```js
// {
//     "presets": [
//         [
//             "@babel/env",
//             {
//                 "targets": {
//                     "node": "current"
//                 }
//             }
//         ]
//     ],
//     "plugins": [
//         "@babel/plugin-proposal-class-properties",
//         "@babel/plugin-proposal-object-rest-spread"
//     ]
// }

{
    "presets": [
        [
            "@babel/preset-env"
        ]
    ]
}
```
4.  写代码(实例代码)
    1.  在根目录下新建文件夹：`lib\mudules`
    2.  新建文件：`number-functions.js、math-functions.js`
```js
// 此时项目目录为：
├── package-lock.json
├── package.json
├── .eslintrc.yml
├── .gitignore
└── lib
    └── modules
        ├── math-functions.js
        └── number-functions.js
```
-   number-functions.js内容如下：
```js
// module to compute odd and even numbers

/**
 * This function will be used to determine if a number if an even number.
 * @param {Number} number: Number to be tested
 * @returns {Boolean} A boolean to indicate if the number is even or not.
 */
export const isEven = number => number % 2 === 0;

/**
 * This function will be used to determine if a number if an odd number.
 * @param {Number} number: Number to be tested
 * @returns {Boolean} A boolean to indicate if the number is odd or not.
 */
export const isOdd = number => number % 2 !== 0;
```
-   math-functions.js内容如下：
```js
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
// module to perform mathematical operations

const startingPoint = 0;

/**
 * This method will accept an array of numbers and compute the sum of all the numbers.
 * @param {number[]} numbers - An array of numbers to be summed.
 * @returns {number} - The sum of all the numbers in the array.
 */
export const add = numbers => {
    return numbers.reduce((total, currentNumber) => total + currentNumber, startingPoint);
};

/**
 * This method will accept an array of numbers and substract each number from the next number in the array.
 * @param {number[]} numbers - An array of numbers to be substracted.
 * @returns {number} - The value computed.
 */
export const subtract = numbers => {
    return numbers.reduce((total, currentNumber) => total - currentNumber, startingPoint);
};
/**
 * This method will accept an array of numbers and multiply each number from the next number in the array.
 * @param {number[]} numbers - An array of numbers to be multiplied.
 * @returns {number} - The multiplied answer.
 */
export const multiply = numbers => {
    return numbers.reduce((total, currentNumber) => total * currentNumber, startingPoint + 1);
};
/**
 * This method will accept an array of numbers and divide each number from the next number in the array.
 * @param {number[]} numbers - An array of numbers to be divided.
 * @returns {number} - The divided answer.
 */
export const divide = numbers => {
    return numbers.reduce((total, currentNumber) => total / currentNumber, startingPoint + 1);
};
```
5.  新建入口文件
    1.  在根目录下新建文件 `index.js`
    2.  内容如下：
    ```js
        const { add, divide, subtract, multiply } = require('./lib/modules/math-functions');

        const { isEven, isOdd } = require('./lib/modules/number-functions');

        module.exports.add = add;
        module.exports.divide = divide;
        module.exports.subtract = subtract;
        module.exports.multiply = multiply;
        module.exports.isEven = isEven;
        module.exports.isOdd = isOdd;
    ```

6.  使用 babel 创建分发文件,根目录下执行 `npx babel package --out-dir dist`,此时，根目录下会心有一个名为 `dist` 文件夹，其中包含了以编译的 JavaScript 代码。

7.  链接包,在根目录下执行：`npm link`
8.  测试本地包
9.  创建一个 vue、react、node项目，使用 `npm link yourself package name`，然后就可以在该项目中测试本地包。
10. 发布 npm 包，在根目录下执行：`npm publish`，然后就可以在终端看到
![](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/npmpackage.png)
11. 此时已经发包成功，可使用 `npm install yourself npm package name`

### 如何使用babel分发文件
要使用Babel将你的包分发为可以在更多环境中运行的代码，你需要遵循以下步骤：

1. 首先，你需要安装Babel和一些必要的插件。你可以使用以下命令来安装：

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

2. 然后，你需要创建一个Babel配置文件`.babelrc`，并在其中指定你要使用的预设和插件。以下是一个基本的配置：

```json
{
  "presets": ["@babel/preset-env"]
}
```

这个配置会让Babel将你的代码转换为可以在大多数环境中运行的ES5代码。

3. 接下来，你可以使用Babel的CLI工具来编译你的代码。你可以在你的`package.json`文件中添加一个`build`脚本，如下所示：

```json
{
  "scripts": {
    "build": "babel src --out-dir dist"
  }
}
```

这个脚本会将`src`目录中的所有文件编译到`dist`目录中。

4. 最后，你可以运行以下命令来编译你的代码：

```bash
npm run build
```

现在，你的`dist`目录中应该包含了编译后的代码，你可以将这些代码分发给你的用户。

### 切换到 npmmirror 后发布 npm 包失败，如何解决？
-   https://blog.csdn.net/happy921212/article/details/135010133
