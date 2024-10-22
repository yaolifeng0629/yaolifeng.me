### `5.请求方式：`

-   get requestParams
-   put requestHeader
-   get 请求:请求参数放在请求头里面
-   post requestParams
-   put requestBody
-   post 请求：请求参数方法请求体里面

### `11.npm 发包流程：`

1.  （1）npm init 或 npm init -y
2.  （2）创建 js 包
3.  （3）第一次发包： npm adduser -> input: username、password、email
4.  （4）npm public 12.小程序要全局使用的组件可以在 app.json 文件中引用即可；

### `13.Object 对象取值的方式：`

```js
    1.  obj.a -> value
    2.  obj["a"] -> value
```

### `14.销毁某个实例的方法：`

`eg = null`

### `15.js 方法后面紧跟一个()的作用：`

-   代表立即执行此函数，也就是自调用的含义；

### `16.搜素引擎（掘金插件）：`

1.  点击地址搜素栏
2.  按住 shift + ？键，可以使用百度进行搜素
3.  点击 tap 键：可以切换搜索引擎的方式

### `19.新建表的时候：`

-   增加 create_time 字段，id 字段；

### `20.以后每次授权的用户信息保存在 ‘用户表’当中或本地存储中，按需使用即可；`

### `21.订阅消息：`

```js
/**
    1.  Cloud.openid.subscribeMessage.send({
            touser: ‘推送的 openid’
            page： ‘点击推送进入的页面路径（绝对路径）’
            data: {
                {{things1:DATA}}
            }，
            templateId: ‘订阅消息模板 ID’
        })
    2.  在 config.json 中进行配置：
        "permissions": {
        "openapi": [
            "templateMessage.send"
        ]
    }
    */
```

### `22.引入和暴露方式：`

```js
/**
    1.  export 导入: export {errorFun,throttle};
    import {errorFun,throttle} from '../../util/util';

    2.  export default errorFun;
    import errorFun from '../../util/util';

    3.  module.exports {error:errorFun，throttle};
    let errorFun = require('../../util/util');
    */
```

### `23.数组操作或字符串操作多使用 es6 语法，或将数据处理成自己想要的数据类型；`

### `24.js 页面不要注册太多 data 变量，如果没在 wxml 页面使用的，可以绑定到 this 上；`

### `25.如果有多个条件且执行逻辑相同，可以使用循环的方式来实现；`

### `26.新建表的时候考虑以后的需求变更能否满足或多功能性；`

### `28.用户信息把用户的所用信息都保存；`

### `29.小程序订阅消息需要在 config.json 中配置：`

```js
    {
        "permissions": {
            "openapi": [
                "templateMessage.send"
            ]
        }
    }
```

### `30.yarn install 的简写方式：yarn`

### `32.整体的统一命名要有规范：`

-   例如在开发新的项目中可以把一些变量命名规则和方法命名规则制定好；
-   在复杂逻辑出要添加注释：可以采用 JODC 注释方式；
-   一些逻辑可以进行空行分割，让代码更简洁明了；

### `33.函数可以使用 jsDoc 的方式来添加注释：更简洁，明了；`

### `34.如果业务中遇到有些数据是比较固定的，可以使用 localStorage 来进行缓存，（要记得设置过期时间：普遍为几小时等）；`

### `38.写样式是：要记得写`

```css
\* {
    margin: 0;
    padding: 0;
}
```

-   在写小程序开始之前定义要要全局使用的样式，不要在每个页面中写多余的样式代码；

### `39.H5 或者小程序要添加网络判断`

```js
// H5：
window.addEventListener('online', () => {
    // 网络由异常到正常时触发
});
window.addEventListener('offline', () => {
    // 网络由正常常到异常时触发
});
// minapp:
wx.onNetworkStatusChange(res => {
    console.log(res.isConnected); // true false
    console.log(res.networkType); // 3G 4G
});
```

### `40.查看某一个属性兼容性：https://caniuse.com/`

### `41.如果当前遇到或其他的方法可以实现效果：`

-   可以考虑是自己不要手写，尽量提高工作效率；可以使用第三方的工具库或者工具来进行完成；

1.  `dayjs:Day.js` 是一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间。
2.  `lodash:Lodash` 是一个一致性、模块化、高性能的 JavaScript 实用工具库，处理字符串、数组、对象，函
    数，实用函数
3.  `d3js:D3` 是最流行的数据可视化库，使用 Web 标准，并利用现代浏览器的强大功能，使数据
    栩栩如生

### `42.涉及图片上传，必需添加的逻辑：`

1.  先对当前图片进行校验，判断当前图片是否过大；（2）如果图片过大做逻辑处理；

### `43.在编写云函数或者在函数中判断添加 try...catch {}`

### `44.工具大集合`

1.  console 美化控制台：`npm install figlet`
2.  解码工具：`https://smalldev.tools/ `
3.  web 和移动项目的高级插画：`https://storytale.io/`
4.  高质量的 svg 和 png 插图： `https://undraw.co/`
5.  404 免费插图：`https://error404.fun/`
6.  正则生成器：`https://ihateregex.io/`
7.  代码美化格式工具：`https://carbon.now.sh/`
8.  css3 动画生成代码工具：`https://animista.net/`
9.  公众号编写文章：`https://yibanbianji.com/?utm=baidu_qxq2&kword=%CE%A2%D0%C5%B9%AB%D6%DA%BA%C5%B6%FE%CE%AC%C2%EB%D4%F5%C3%B4%C9%FA%B3%C9&bd_vid=10796501980713393318`

### `45.把一些逻辑处理能放在后端处理就放在后端处理，前端处理有些会有很大的问题、有请求的限制、处理出错率等问题。如果是后端处理可以提高效率、速度、避免出现一些问题。`

### `46.在敲代码时能使用简写方式就使用简写方式，提高工作效率和质量；`

### `47.js 简写方式、引用、复制`

```js
let arr = [1, 5, 1, 5, 12, 1, 21, 2];
let arr = [].concat(arr);

/**
    1. 创建新变量
    2. 确定其数据类型
    3. 赋值给新的变量
*/

console.log(arr); // > [1,5,1,5,12,1,21,2]

let obj = { name: 'zhangsan' };
let newObj = new Object(obj.name);
console.log(newObj);
```

### `48.不知道的 markdown 语法：`

-   删除线：`~~世界是平坦的。~~ ` 任务列表：

-   [x] Write the press release
-   [ ] Update the website
-   [ ] Contact the media

-   使用 emjoy 表情：去露营了！ :tent: 很快回来。真好笑！ :joy:

-   图片链接：[![weibo-logo]](http://weibo.com/linpiaochen)

-   锚点：[回到顶部](#readme)

-   start 历史：[![Star History Chart](https://api.star-history.com/svg?repos=guodongxiaren/README&type=Date)](https://star-history.com/#guodongxiaren/README&Date)

### `49.调用方法简写：`

```js
let obj = {
    a: 1,
    b: function () {
        console.log('b中的method');
    }
};
obj['b'](); // >  b中的method
obj.b(); // >  b中的method
```

### `50.css3图片适配属性`

1.  `object-fit 属性可接受如下值：`
    -   参数：
    -   `fill`
        -   默认值。调整替换后的内容大小，以填充元素的内容框。如有必要，将拉伸或挤压物体以适应该对象。
    -   `contain`
        -   缩放替换后的内容以保持其纵横比，同时将其放入元素的内容框。
    -   `cover`
        -   调整替换内容的大小，以在填充元素的整个内容框时保持其长宽比。该对象将被裁剪以适应。
    -   `none`
        -   不对替换的内容调整大小。
    -   `scale-down`
        -   调整内容大小就像没有指定内容或包含内容一样（将导致较小的具体对象尺寸）

### `51.css3实现一个textarea:`

-   `resize:`
    -   `none` 用户无法调整元素的尺寸。
    -   `both` 用户可调整元素的高度和宽度。
    -   `horizontal` 用户可调整元素的宽度。
    -   `vertical` 用户可调整元素的高度。

### `52.css3实现图片滑动顶层展示遮罩层`

`https://www.w3school.com.cn/css/css3_images.asp`

### `53.定义变量：`

```css
:root {
    --blue: #6495ed;
    --white: #faf0e6;
}

body {
    background-color: var(--blue);
}
```

### `js 中 new map()、 new set()的区别？`

-   `new map()` 用来存储一组键值对集合，有很快的查找速度；
-   `new set()` 用来存储值的集合，且存储的值都是唯一的，可自动去重；

### `H5中运行一个页面后，当前的页面的js方法会绑定到windows上，可以在windows上调试页面方法`

### `Math()方法：`

-   `Math.abs(x) ` 返回数的绝对值
-   `Math.ceil(x) ` 向上取整
-   `Math.floor(x)` 乡下取整
-   `Math.max(x,y)` 返回 x,y 的最大值
-   `Math.min(x,y)` 返回 x,y 的最小值
-   `Math.round(x)` 返回数的四舍五入最接近的整数

### `一个数字的.toString(x): x-> 代表要转换为几进制`

### `cmd命令查看一个软件的安装路径: where + 软件名: eg：where + node`

### `JavaScript中的位运算符（32位操作符）`

1. & And 如果每一位都是 1，返回 1，否则返回 0
2. | Or 如果有一位为 1，则返回 1，否则返回 0

### `Bug监控工具`

-   Fundebug: `https://www.fundebug.com/` 腾讯云：前端性能监控

### `markdown如何更改字体颜色`

```html
<font face="黑体">我是黑体字</font> <font face="微软雅黑">我是微软雅黑</font> <font face="STCAIYUN">我是华文彩云</font>
<font color="#0099ff" size="12" face="黑体">黑体</font> <font color="#00ffff" size="3">null</font>
<font color="gray" size="5">gray</font>
```

### `gitee如何创建发行版`

1. 进入仓库主页面
2. 右边创建发行版，填写发行版信息即可

### `Mini版实现`

-   mini-vue
-   mini-react
-   mini-webpack
-   mini-lauguage
-   mini 编译器造轮子实现每个过程的原理

### `学习需要注意的点？`

1. 多从视频入手
2. 报课，跟着老师的步伐走
3. 学习一门课程，从官网入手
4. 可以看书扩展自己的知识面

### `简历（主要以1-2页为主）`：

1. 不要写长句，主要以短句为主
2. 简介明了
3. 不要写期望薪资，和到岗时间
4. 技能项：主要写技术栈（可以加粗），写了解的尽量用一两天时间去实践一下
5. 若语句相同，要统一
6. 项目描述：背景、描述职责，不要写，写过那些页面
7. 可以写 code review
8. 管理能力突出，工程化能力突出
9. 实现出的 mini 版应用
10. 项目的亮点要多发现，多在简历中体现
11. 描述时多使用专业性语言，注意技术词的大小写
12. 不要写具体的优化的时间，尽量以百分比展示

### `命名一套属于自己的代码规范：可查看腾讯代码规范、百度规范、京东规范`

-   京东：`https://guide.aotu.io/`
-   腾讯：`https://tgideas.qq.com/doc/index.html`
-   百度：`https://github.com/ecomfe/spec/blob/master/README.md`
-   谷歌：`http://zh-google-styleguide.readthedocs.org/en/latest/google-cpp-styleguide/`
-   阿里：`https://github.com/airbnb/javascript`
-   网易：`http://nec.netease.com/standard`

### `图片可以使用F3进行预览`

### `小程序的button类型open-data属性可以绑定data进行传值`

### `在公众号的推文中可以使用带参形式进入页面，页面在onLoad(options)中进行处理`

### `关于Chrome浏览器删除console控制台快捷键：Ctrl + L`

### `搜素引擎：字符串在线生成工具`

### `实用 console 方法`

-   可使用 `console.time()` 和 `console.timeEnd()`;
-   `console.time()` 相当于开启一个计时器
-   `console.timeEnd()` 相当于关闭一个计时器
-   也可以对 `console.time()` 和 `console.timeEnd()` 方法传值

```js
console.time('timer1');
setTimeout(() => {
    let res = console.timeEnd('timer1');
    console.log(res);
}, 1000);
```

-   `console.timeLog()` 打印当前计时器的当前时间

```js
console.time('timer');

setTimeout(() => {
    console.timeLog('timer');
    setTimeout(() => {
        console.timeLog('timer');
    }, 2000);
}, 1000);

// timer: 1002.80224609375 ms
// timer: 3008.044189453125 ms
```

-   `console.count()` 计数器，统计打印次数
-   `console.countReset()` 重置计数器
-   `console.table()` 打印成表格，
    1. `console.table()` 方法有两个参数第一个参数是需要打印的对象第二个参数是需要打印的表格的标题，
       这里就是数组对象的属性值。
    ```js
    const users = [
        {
            first_name: 'Harcourt',
            last_name: 'Huckerbe',
            gender: 'Male',
            city: 'Linchen',
            birth_country: 'China'
        },
        {
            first_name: 'Allyn',
            last_name: 'McEttigen',
            gender: 'Male',
            city: 'Ambelókipoi',
            birth_country: 'Greece'
        },
        {
            first_name: 'Sandor',
            last_name: 'Degg',
            gender: 'Male',
            city: 'Mthatha',
            birth_country: 'South Africa'
        }
    ];
    console.table(users, ['first_name', 'last_name', 'city']);
    ```
    2. 除此之外，还可以使用 `console.table()` 来打印数组元素：
    ```js
    const app = ['facebook', 'google', 'twitter'];
    console.table(app);
    ```
    -   `console.table()` 只能处理最多 1000 行
    -   `console.trace()` 方法可以用于打印当前执行的代码在堆栈中的调用路径, 有利于开发人员进行调试
    -   `console.dir()` 方法可以在控制台中显示指定 JavaScript 对象的属性，并通过类似文件树样式的交互
        列表显示
    -   `console.dirxml()` 方法用于显示一个明确的 XML/HTML 元素的包括所有后代元素的交互树
    -   `console.memory` 是 `console` 对象的一个属性，而不是一个方法。它可以用来查看当前内存的使用情
        况，如果使用过多的 `console.log()` 会占用较多的内存，导致浏览器出现卡顿情况。

### `快速获取网页的Navagation Timing 指标情况`

```js
window.addEventListener('load', event => {
    // 查询网页Navigation Timing 指标
    setTimeout(() => {
        const timing = window.performance.timing;
        console.log('DNS查询耗时：', timing.domainLookupEnd - timing.domainLookupStart);
        console.log('TCP链接耗时：', timing.connectEnd - timing.connectStart);
        console.log('request耗时：', timing.responseEnd - timing.responseStart);
        console.log('解析DOM树耗时：', timing.domComplete - timing.domInteractive);
        console.log('白屏时间：', timing.domLoading - timing.fetchStart);
        console.log('domready时间：', timing.domContentLoadedEventEnd - timing.fetchStart);
        console.log('onload时间：', timing.loadEventEnd - timing.fetchStart);
    }, 0);
});
```

### `vue脚手架基于UI界面创建项目？vue ui`

### `README文档如何添加对应的英文文档？`

1.  创建仓库时添加 Readme 文档
2.  打开 Readme 文档，在顶部输入 `[English](README.en.md) | [中文](README.md)`

### `if else 代码块如果 if 或 else 块中的代码只有一行，可不写 {}`

### `console.trace() 可输出一个堆栈跟踪`

### 如何解决 node 环境下打印 ReferenceError: window is not defined 问题?

1.  cmd 全局安装`npm install -g jsdom`
2.  js 文件写入：

```js
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
window = dom.window;
document = window.document;
```

### production 如何禁用所有 console.log？

1.  安装插件：
    `yarn add babel-plugin-transform-remove-console -D`
2.  babel 配置：
    ```js
    // 项目在发布时需要用到的 babel 插件数组
    const proPlugins = [];
    // 如果当前是development开发环境或者是production生产环境，则使用去掉 console 的插件
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
        proPlugins.push('transform-remove-console');
    }
    module.exports = {
        presets: ['@vue/cli-plugin-babel/preset'],
        plugins: [...proPlugins]
    };
    ```

### 微信 H5 分享不生效原因？

-   因为微信机制问题，所以配置 H5 分享会出现不生效情况。需按照以下情况进行操作：
    1.  配置好分享信息
    2.  发布到 dev 后 prod, 然后点击【收藏】按钮
    3.  关掉当前页面
    4.  从微信收藏中打开，然后刷新当前页面
    5.  然后再次分享（如果分享出去时配置信息不对或不显示，再次进入页面，刷新分享即可）

### H5，小程序，企业微信如何打通？

-   何为打通：不管用户是从上述三者中哪一个入口进入的，都可以通过唯一的身份信息来获取用户的唯一性。
    ![Alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image.png)

### 配置了 babel.config.js 如何删除 babel 的缓存？

```sh
npx babel --clear-cache

yarn babel --clear-cache
```

### 黑白匣子？

-   黑匣子：了解 input 和 out，但不清楚匣子里面的内容
-   白匣子：了解 input 和 out, 并且还清楚匣子里面的内容

### 如何调试原生 Nodejs?

-   https://code.visualstudio.com/docs/nodejs/nodejs-tutorial#_debug-your-express-app

### Microsoft 学习官网？

-   https://learn.microsoft.com/zh-cn/docs/

### 如何在 Github 中做贡献？

-   https://www.youtube.com/watch?v=dLRA1lffWBw
-   开源指南：https://opensource.guide/
-   https://www.youtube.com/watch?v=CML6vfKjQss

### 如何规范化定义函数形参？

```js
let obj = {
    name: 'John Doe',
    content: {
        type: 'text',
        value: 'Hello, World!'
    }
};

function test(
    info = {
        name: '',
        content: {
            type: '',
            value: ''
        }
    }
) {
    console.log('info --->', info);
}

test(obj);
```

### 如何强制统一 node.js 的版本？

-   在项目的 package.json 文件中，可以使用 engines 字段来指定所需的 Node 版本。在该字段中，我们可以定义一个范围或者具体的版本号来限制 Node 的版本。

```json
// 指定特定版本号
"engines": {
  "node": "14.17.0"
}

// 范围符号：表示项目需要Node版本大于等于12.0.0且小于16.0.0。
"engines": {
  "node": ">=12.0.0 <16.0.0"
}

// 波浪线符号：表示项目需要Node版本为14.17.x
"engines": { "node": "~14.17.0" }

// 插入符号：表示项目需要Node版本为14.x.x
"engines": { "node": "^14.17.0" }
```

-   潜在问题：使用 npm install 时，engines 字段不会起任何作用？
    -   换 yarn 安装 依赖，就可以生效了。
-   如何导致的这个问题呢？
    -   这是因为，在 package.json 中配置的 engines 只是建议，默认不开启严格版本校验，只会给出提示，需要手动开启严格模式。
    -   如何解决呢？
        -   在项目根目录下，.npmrc 中添加 engine-strict = true 才会起作用，配置完成后，再执行 npm install 就可以起作用了。

```js
# .npmrc
engine-strict = true
```

```js
npm ERR! code ENOTSUP
npm ERR! notsup Unsupported engine for react_antd_admin_template@1.0.0: wanted: {"node":"14.17.5","npm":"6.14.14"} (current: {"node":"16.18.1","npm":"8.19.2"})
npm ERR! notsup Not compatible with your version of node/npm: react_antd_admin_template@1.0.0
npm ERR! notsup Not compatible with your version of node/npm: react_antd_admin_template@1.0.0
npm ERR! notsup Required: {"node":"14.17.5","npm":"6.14.14"}
npm ERR! notsup Actual:   {"node":"16.18.1","npm":"8.19.2"}
```

-   **潜在问题：通过以上方式来强制达到 node 版本一致，比较麻烦。如果不符合要求，需要开发人员手动切换制定版本，太麻烦。如何解决呢？**
-   我们可以创建一个 `.nvmrc` 文件，来制定 node 版本：

```js
# .nvmrc
v14.17.5
```

-   此时，执行 nvm use 自动就切换到项目执行的 Node 版本。
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/640.png)
-   .nvmrc 文件是一个存放指定 Node 版本的配置文件，可以告诉项目的成员应该使用哪个 Node 版本来运行项目。
-   如果我们没有安装对应版本的 Node ，执行时也会提示没有安装
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/641.png)

### npm run serve 的查找规则?

1. 查找命令：首页 `npm` 会基于当前项目的目录的 `node_modules/.bin` 目录下超窄是否存在 `vue-cli-service`
2. 查找全局安装：如果在项目的 `node_modules/.bin` 中没有找到 `vue-cli-service`, 则 `npm` 会继续在全局 `node_modules/.bin` 目录下查找 `<script>` 对应的可执行文件。
3. 执行命令：找到 `vue-cli-service` 后，`npm` 执行该命令。

-   也就说会完整的查找路径为：`./node_modules/.bin/vue-cli-service serve`

### npm scripts 命令注入机制

-   执行 `npm run serve` 时，`npm` 实际上会将项目的 `node_modules/.bin` 目录添加到系统的环境变量的 `PATH` 中，这个目录包含了大部分通过 `npm install` 安装的可执行文件，其中也包括了 `vue-cli-service`
-   这样一来，系统就可以在全局范围内找到 `vue-cli-service` 命令，不用再命令行中执行完整的路径。

### 全局安装

1. 当某个包被全局安装时，其可执行文件会被被放在全局的 `node_modules/.bin` 目录下。

### vue 的组件如何自己嵌套自己？

让我们逐步实现这个功能：

1. 修改 user-detail 组件：

首先，我们需要给 user-detail 组件添加一个 name 属性，这样它就可以递归地引用自己：

```vue
<script>
export default {
    name: 'UserDetail'
    // ... 其他代码保持不变
};
</script>
```

2. 修改 showPromoterInfo 方法：

在 user-detail 组件的 methods 中，修改 showPromoterInfo 方法：

```javascript
methods: {
  // ... 其他方法保持不变

  showPromoterInfo(unionid) {
    if (!unionid) {
      this.$message.warning('推广员 ID 不存在');
      return;
    }

    // 创建一个新的 UserDetail 组件实例
    const PromoterDetailComponent = this.$options.components.UserDetail;
    const instance = new PromoterDetailComponent({
      propsData: {
        // 如果需要传递一些特定的 props，可以在这里添加
      }
    });

    // 挂载组件
    const vm = instance.$mount();
    document.body.appendChild(vm.$el);

    // 调用 show 方法并传入 unionid
    vm.show(unionid);

    // 监听关闭事件
    vm.$once('close', () => {
      document.body.removeChild(vm.$el);
      vm.$destroy();
    });
  },

},
```

3. 确保 UserDetail 组件被正确导入和注册：

在 user-detail 组件的 script 部分，确保组件被正确导入和注册：

```vue
<script>
export default {
    name: 'UserDetail',
    components: {
        UserDetail: () => import('./UserDetail.vue') // 使用动态导入来避免循环依赖
    }
    // ... 其他代码保持不变
};
</script>
```
