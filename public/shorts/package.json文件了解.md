### `package.json`

### `示例`

-   使用 `create-reate-app` 初始化一个项目，其 `package.json` 配置如下:

```json
{
	"name": "my-app",
	"version": "0.1.0",
	"private": true,
	"dependencies": {
		"@testing-library/jest-dom": "^5.14.1",
		"@testing-library/react": "^11.2.7",
		"@testing-library/user-event": "^12.8.3",
		"react": "^17.0.2",
		"react-dom": "^17.0.2",
		"react-scripts": "4.0.3",
		"web-vitals": "^1.1.2"
	},
	"scripts": {
		"start": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject"
	},
	"eslintConfig": {
		"extends": ["react-app", "react-app/jest"]
	},
	"browserslist": {
		"production": [">0.2%", "not dead", "not op_mini all"],
		"development": ["last 1 chrome version", "last 1 firefox version", "last 1 safari version"]
	}
}
```

-   `package.json` 常见配置如下：
    [pageage.json](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/packagejson.png)

### `必须属性`

-   `package.json` 必需字段 `name` 和 `version`，如果没有这两个字段，是没有办法执行 `npm install` 命令。
    -   `name`: 文件名称
    -   `version`：版本号

1. `name` 属性

-   `name` 属性注意事项：
    -   长度 <= 214 个字符
    -   不能以 `.` 和 `_` 开头
    -   不能包含大写字母（因为当软件包在 npm 上发布时，会基于此属性获得自己的 url，所以不能包含非 url 安全字符（non-url-safe））
    -   名称可以作为参数被传入 `require('')`, 用来导入模块，所以应当尽可能的剪短，语义化
    -   名称不能和其他模块的名称重复，可以使用 `npm view <package-name>` 进行查询，如果重复就会提示 404, 不重复显示当前包的详情。

2.  `version` 属性

-   项目的版本号，是一个字符串， 在每次项目更改后，即将发布时，都要去同步去更改项目的版本号，
-   `version` 属性注意事项：

    -   遵循语义化 2.0.0 规范，格式为： `[主版本号.次版本号.修订号]`，通常情况下， 修改主版本号是做了大的功能性修改，修辞次版本号是新增了新功能，修改修订号就是修复了一些 bug
    -   如果某个版本的改动较大，出现不稳定的情况，可以在版本号后面添加一个 `-` 号链接点分割的标识符和版本编译信息：内部版本(alpha),公测版本(beta),候选版本(rc: release candiate)

-   查看包的版本信息

```js
// 查看最新版本
npm view react version
// 查看 react 的所有版本
npm view react versions
```

### `描述信息`

1.  `description`：描述项目包，为一个字符串，可让其他开发者在 npm 搜索中发现我们的项目包

```js
// npm 命令
npm info <package-name>
```

2.  `keywords`：字符串数组，表示当前项目的关键词，用来增加项目包的曝光率，

[keywords](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/keywords.png)

3.  `author`：项目包的作者，有两种值类型：对象和字符串

    -   字符串: `"author": "CUGGZ <xxxxx@xx.com> (https://juejin.cn/user/3544481220801815)"`
    -   对象：

        ```js
        "author": {
        "name" : "CUGGZ",
        "email" : "xxxxx@xx.com",
        "url" : "https://juejin.cn/user/3544481220801815"
        }
        ```

4.  `contributors`：表示项目包的贡献者，值是一个数组

```js
// 方式一：
"contributors": [
  "CUGGZ0 <xxxxx@xx.com> (https://juejin.cn/user/3544481220801815)",
  "CUGGZ1 <xxxxx@xx.com> (https://juejin.cn/user/3544481220801815)"
 ]
// 方式二：
"contributors": [
  {
   "name" : "CUGGZ0",
   "email" : "xxxxx@xx.com",
   "url" : "https://juejin.cn/user/3544481220801815"
 },
  {
   "name" : "CUGGZ1",
   "email" : "xxxxx@xx.com",
   "url" : "https://juejin.cn/user/3544481220801815"
 }
 ]
```

5.  `homepage`：表示项目包的主页地址，值是一个字符串。

```js
// npm 命令
npm home <package-name>
```

6.  `repository`: 表示项目包的仓库地址，值有两种类型：对象和字符串

    -   字符串：`"repository": "https://github.com/facebook/react.git"`
    -   对象：

    ```js
    "repository": {
        "type": "git",
        "url": "https://github.com/facebook/react.git"
    }
    ```

```js
// npm 命令
npm repo <package-name>
```

7.  `bugs`：表示项目提交问题的地址，值是一个对象，可以添加提交问题的地址和反馈的邮箱

```js
"bugs": {
  "url" : "https://github.com/facebook/react/issues",
  "email" : "xxxxx@xx.com"
}
// npm 命令
npm bugs <package-name>
```

### `依赖配置`

-   通常情况下，一个项目可能会依赖一个或多个外部的依赖包，会将他们分配当下面五个属性中:
    `dependencies、devDependencies、peerDependencies、boundledDependencies、optionalDependencies`

1.  `dependencies`: 表示项目在生产环境中的依赖包

```js
npm install <package-name>
yarn add <package-name>
```

-   当安装依赖时使用 `--save 或 -S`，也会将新安装的依赖包写入 `dependencies` 属性，值是一个对象，对象是由模块名和对应的版本要求组成，表示依赖的模块以及版本范围

```js
"dependencies": {
   "react": "^17.0.2",
   "react-dom": "^17.0.2",
   "react-scripts": "4.0.3",
},
```

```js
npm install --save <package-name>
//
npm install -S <package-name>
```

2.  `devDependencies`：表示项目在开发阶段所需的依赖包，用于辅助开发，与 `dependencies` 不同的是，他们只需要安装在开发设备上，而无需在生产环境中运行代码，当打包上线不需要这些依赖包，所以
    可以把这些依赖添加到 `devDependencies` 中，本地的 `npm install` 会进行管理，但不会安装到
    生产环境中。

```js
npm install --save-dev <package-name>
yarn add --dev <package-name>
//
npm install -D <package-name>
yarn add -D <package-name>
```

3.  `peerDependencies`: 表示供插件指定其所需要的主工具的版本

-   我们的项目和所依赖的模块，都会同时依赖另一个模块，但所依赖的版本不
    一样，比如，我们的项目依赖 A 模块和 B 模块的 1.0 版，而 A 模块本身又依赖 B 模块的 2.0 版。大多数情况下，这不是问题，B 模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。

-   最典型的场景就是插件，比如 A 模块是 B 模块的插件。用户安装的 B 模块是 1.0 版本，但是 A 插件只能和 2.0 版本的 B 模块一起使用。这时，用户要是将 1.0 版本的 B 的实例传给 A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果 A 和 B 一起安装，那么 B 必须是 2.0 模块。

```js
"name": "chai-as-promised",
"peerDependencies": {
   "chai": "1.x"
}
```

-   上面代码指定在安装 chai-as-promised 模块时，主程序 chai 必须一起安装，而且 chai 的版本必须是 1.x。如果项目指定的依赖是 chai 的 2.0 版本，就会报错。

-   需要注意，从 npm 3.0 版开始，peerDependencies 不再会默认安装了。

4.  `optionalDependencies`：如果在找不到包和安装包运行失败时，npm 仍然会继续运行，则可以将包放在 `optionalDependencies` 对象中，`optionalDependencies` 对象中的包会覆盖 `dependencies`
    中的包，所以只需要在一个地方进行设置即可。

-   需要注意：由于 `optionalDependencies` 中的依赖可能会安装失败，所以要做异常处理，否则当获取这个依赖时，如果获取不到就会报错。

5.  `bundledDependencies`: 值是一个数组，数组中可以指定一些模块，这些模块将在这个包发布时一起打包。

-   `bundledDependencies` 数组中的值必须在 `dependencies、devDependencies` 中声明过的包才可。

6.  `engines`：对项目中所需的 npm 包和 nodejs 版本有特殊要求可以在 `engines` 字段中进行说明,值
    是一个对象。

```js
"engines": {
 "node": ">=8.10.3 <12.13.0",
  "npm": ">=6.9.0"
}
```

-   注：`engines` 字段中的值只是起到了一个说明的作用，不会要求用户安装的版本必须一致，并且也不会影响依赖包的安装。

### `脚本配置`

1.  `scirpts`: `package.json` 中内置的脚本入口，是键值对的形式，key 为可执行的命令，可以通过 `npm run cmd` 来执行命令，除了运行基本的 script 命令，还可以结合 pre 和 post 完成前置和后续操作。

```js
"scripts":{
    "dev": "node index.js",
    "predev": "node beforeIndex.js",
    "postdev": "node afterIndex.js",
}
```

-   配置简单的 `scripts` 属性，可以定义一些常见的操作命令。

```js
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "test": "npm run unit",
    "lint": "eslint --ext .js,.vue src test/unit",
    "build": "node build/build.js"
}
```

2. `config`：用来配置 `scripts` 运行时的配置参数

```js
"config": {
    "port": 3000
}
```

-   如果运行 `npm run start`，则 port 字段会映射为 `npm_package_config_port` 环境变量中：

```js
console.log(process.env.npm_package_config_port); // => 3000
// 修改 port 值
npm config set foo:port 3001
```

### `文件目录`

1.  `main`:执行加载的入口文件，在 `Browser` 和 `Node` 环境中都可以使用。值类型为一个字符串

```js
"main":"./src/index.js"
```

2.  `Browser`：可以定义 npm 包在 browser 环境下的入口文件，如果 npm 包只在 web 端使用，并且严禁
    在 server 端使用，使用 browser 来定义入口文件。

```js
"browser": "./src/index.js"
```

3.  `module`: 可以定义 npm 包的 ESM 规范的入口文件， browser 和 node 环境都可以使用。如果 npm 包导出的是 ESM 规范的包，使用 module 来定义入口文件。

```js
"module":"./src/index.mjs"
//  .js 文件是 CommonJS 规范的语法(rquire('xxx'))
//  .mjs 文件是 ESM 规范的语法(import 'xxx')
```

4.  `bin`： 指定各个内部命令对应的可执行文件的位置。

```js
"bin":{
    "someTool": "./bin/someTool.js",
}
```

-   简写

```js
scripts:{
    start: './node_modules/bin/someTool.js build',
}

// 简写
scripts：{
    start: 'someTool build'
}
```

5.  `files`: 值是一个数组，用来描述当把 npm 包作为依赖包安装时需要说明的文件列表。当 npm 包发布时， files 指定的文件会被推送到 npm 服务器上，如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交。

```js
"fiels":[
    "LICENSE",
    "Readme.md",
    "index.js",
    "lib/"
]
```

-   如果有不想提交的文件，可以在项目根目录新建一个 `.npmignore` 文件

```js
// node_modules
// .vscode;
// build
// .DS_store;
```

6.  `man`：是 Linux 中的帮助指令

```js
"man":{
    "./man/npm-access.1"
    "./man/npm-audit.1"
}
```

7.  `directories`: 用来规范项目的目录,`nodejs` 模块是基于 `CommonJS` 模块化实现的，需要严格遵守 `CommonJS` 规范
    -   bin: 存放可执行二进制文件的目录
    -   lib: 存放 js 代码的目录
    -   doc：存放文档的目录
    -   test：存放单元测试用例代码的目录
        ...

```js
"directories": {
    "bin": "./bin",
    "lib": "./lib",
    "doc": "./doc",
    "test" "./test",
    "man": "./man"
},
```

### `发布配置`

1.  `private`: 用来防止我们意外将私有库发布到 npm 服务器上，只需要将该字段设置为 true

```js
"private": true

```

2.  `preferGlobal`: 表示当前用户不应该把模块安装为全局模块，如果设置为 true 就会现实警告。并不会真正防止用户进行局部的安装，只是对用户进行提示，防止产生误解。

```js
"preferGlobal": true
```

3.  `publishConfig`: 用于设置发布是一些配置项的集合。如果不想模块被默认标记为最新，或者不想发布到
    公共仓库，可以在这里配置 tag 或仓库地址。可参考 `npm-config`

```js
"private": true,
"publishConfig": {
    "tag": "1.1.0",
    "registry": "https://registry.npmjs.org/",
    "access": "public"
}
```

4.  `os`：可以让我们设置 npm 包可以在什么操作系统下使用

```js
// 适用的操作系统
"os": ["linux"]
// 禁用的操作系统
"os": ["!win32"]
```

5.  `cpu`: 与 `os` 配置类似，用 CPU 可以更准确的限制用户安装环境。

```js
// 适用的cpu
'cpu'[('x64', 'AMD64')];
// 禁用的cpu
'cpu'[('!arm', '!mips')];
```

6.  `license`: 指定软件的开源协议，表述了其他人获得代码后拥有的权利，可以对代码进行那些操作，并且
    那些操作是禁止的。

-   `MIT`:只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。
-   `Apache`：类似于 MIT ，同时还包含了贡献者向用户提供专利授权相关的条款。
-   `GPL`：修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。

```js
"license": "MIT"
```

### `第三方配置`

1.  `typings`：用来指定 TypeScript 的入口文件

```js
"typings": "types/index.d.ts"
```

2.  `eslintConfig`: `eslint` 的配置可以写在单独的文件 `.eslintrc.json` 中，也可以写在 `package.json` 的 `eslintConfig` 中.

```js
"eslintConfig": {
      "root": true,
      "env": {
        "node": true
      },
      "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
      ],
      "rules": {},
      "parserOptions": {
        "parser": "babel-eslint"
     },
}
```

3.  `babel`: 用来指定 Babel 的编译配置

```js
"babel": {
    "presets": ["@babel/preset-env"],
    "plugins": [...]
}
```

4.  `unpkg`: 让 npm 上所有文件都开启 `cdn` 服务，该 `cdn` 服务有 `unpkg` 提供。

```js
"unpkg": "dist/vue.js"
```

5.  `lint-staged`：是一个在 Git 暂存文件上运行 linters 的工具，配置后每次修改一个文件即可给所有文件执行一次 lint 检查，通常配合 gitHooks 一起使用。

```js
"lint-staged": {
    "*.js": [
    "eslint --fix",
        "git add"
    ]
}
```

6.  `gitHooks`:gitHooks 用来定义一个钩子，在提交（commit）之前执行 ESlint 检查。在执行 lint 命令后，会自动修复暂存区的文件。修复之后的文件并不会存储在暂存区，所以需要用 git add 命令将修复后的文件重新加入暂存区。在执行 pre-commit 命令之后，如果没有错误，就会执行 git commit 命令。

```js
"gitHooks": {
    "pre-commit": "lint-staged"
}
```

7.  `browserlist`:字段用来告知支持哪些浏览器及版本。Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。

```js
"browserslist": {
    "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
    ],
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
    ]
}
```
