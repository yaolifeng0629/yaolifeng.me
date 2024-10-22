## `Node.js 中 require 加载器的原理？`

### `node模块化的实现？`

-   node 是自带模块化机制的，每个文件是一个单独的模块，并且遵循的是 commonjs 规范，也就是使用
    require 方式导入模块，通过 module.exports 导出模块

-   node 模块的运行机制也很简单，就是再每一个模块外层包裹一层函数，有了函数的包裹就可以实现代码
    间的作用域隔离。

-   eg:

```js
console.log(window);

(function (exports, require, module, __filename, __dirname) { console.log(window);
ReferenceError: window is not defined
    at Object.<anonymous> (/Users/choice/Desktop/node/main.js:1:75)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:742:12)
    at startup (internal/bootstrap/node.js:279:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:752:3))
```

-   在模块系统中，每个文件就是一个模块，每个模块外面会自动套一个函数，并且定义了导出方式
    module.exports 或 exports，同时也定义 require

```js
let moduleA = (funciton(){
    module.exports = Promise;
    return module.exports;
})()
```

### `require 加载模块？`

-   require 依赖 node 中的 fs 模块来加载模块文件，fs.readFile 读取到的是一个字符串。
-   在 js 中可以 shiyong `eval、new Function` 的方式将一个字符串转换为 js 代码来执行。

```js
// eval
const name = 'ylf';
const str = 'const a = 123; console.log(name)';
eval(str); // ylf

/**
 * new Function
 * 定义：new Funcition 接受一个要执行的字符串，返回一个新函数，调用这个新函数字符串就会执行。如果
 *  这个函数需要传递参数，可在 new Function 的时候一次传入参数，最后传入要执行的字符串。
 */
const b = 3;
const str = 'let a  = 1; return a + b;';
const fun = new Function('b', str);
console.log(fun(b, str)); // 4
```

-   可以看到 eval 和 Function 实例化都可以用来执行 javascript 字符串，似乎他们都可以来实现 require 模块加载。不过在 node 中并没有选用他们来实现模块化，原因也很简单因为他们都有一个致命的问题，就是都容易被不属于他们的变量所影响。

-   如下 str 字符串中并没有定义 a，但是确可以使用上面定义的 a 变量，这显然是不对的，在模块化机制中，str 字符串应该具有自身独立的运行空间，自身不存在的变量是不可以直接使用的。

```js
const a = 1;

const str = 'console.log(a)';

eval(str);

const func = new Function(str);
func();
```

-   node 存在一个 vm 虚拟环境的概念，用来运行额外的 js 文件，他可以保证 javascript 执行的独立性，不会被外部所影响。

#### `vm 内置模块`

```js
// 引入vm模块， 不需要安装，node 自建模块
const vm = require('vm');
const hello = 'yd';
const str = 'console.log(hello)';
wm.runInThisContext(str); // 报错
```

### `require 代码实现`

-   path 模块
    -   basename: 基础路径，有文件路径就不是基础路径，基础路径为 `1.js`
    -   extname：获取扩展名
    -   dirname: 父级路径
    -   join：拼接路径
    -   resolve：当前文件的绝对路径，注意末尾不要加 `/`

```js
const path = require('path', 's');
console.log(path.basename('1.js'));
console.log(path.extname('2.txt'));
console.log(path.dirname('2.txt'));
console.log(path.join('a/b/c', 'd/e/f')); // a/b/c/d/e/
console.log(path.resolve('2.txt'));
```

-   fs 模块
    -   用于操作文件或文件夹，例如文件的读写，新增，删除等，常用方法有 readFile 和 readFileSync , 分别是异步读取和同步读取文件
    -   fs.access：判断文件是否存在，node10 提供

```js
// 基本
const fs = require('fs');
const buffer = fs.readFileSync('./name.txt', 'utf8'); // 如果不传入编码，出来的是二进制
console.log(buffer);

// fs.access
try {
	fs.accessSync('./name.txt');
} catch (e) {
	// 文件不存在
}
```

### `实现 require 模块加载器`

-   首先导入依赖的模块 path，fs, vm, 并且创建一个 Require 函数，这个函数接收一个 modulePath 参数，表示要导入的文件路径。

```js
// 导入依赖
const path = require('path'); // 路径操作
const fs = require('fs'); // 文件读取
const vm = require('vm'); // 文件执行

// 定义导入类，参数为模块路径
function Require(modulePath) {
    ...
}
```

-   在 Require 中获取到模块的绝对路径，方便使用 fs 加载模块，这里读取模块内容我们使用 new Module 来抽象，
    使用 tryModuleLoad 来加载模块内容，Module 和 tryModuleLoad 我们稍后实现，Require 的返回值应该是模块的内容，
    也就是 module.exports。

```js
// 定义导入类，参数为模块路径
function Require(modulePath) {
	// 获取当前要加载的绝对路径
	let absPathname = path.resolve(__dirname, modulePath);
	// 创建模块，新建Module实例
	const module = new Module(absPathname);
	// 加载当前模块
	tryModuleLoad(module);
	// 返回exports对象
	return module.exports;
}
```

-   Module 的实现很简单，就是给模块创建一个 exports 对象，tryModuleLoad 执行的时候将内容加入到 exports 中，id 就是模块的绝对路径。

```js
// 定义模块, 添加文件id标识和exports属性
function Module(id) {
	this.id = id;
	// 读取到的文件内容会放在exports中
	this.exports = {};
}
```

-   我们给 Module 挂载静态属性 wrapper，里面定义一下这个函数的字符串，wrapper 是一个数组，数组的第一个元素就是
    函数的参数部分，其中有 exports，module. Require，**dirname, **filename, 都是我们模块中常用的全局变量。
    注意这里传入的 Require 参数是我们自己定义的 Require。
-   第二个参数就是函数的结束部分。两部分都是字符串，使用的时候我们将他们包裹在模块的字符串外部就可以了。

```js
Module.wrapper = ['(function(exports, module, Require, __dirname, __filename) {', '})'];
```

-   \_extensions 用于针对不同的模块扩展名使用不同的加载方式，比如 JSON 和 javascript 加载方式肯定是不同的。
    JSON 使用 JSON.parse 来运行。

-   javascript 使用 vm.runInThisContext 来运行，可以看到 fs.readFileSync 传入的是 module.id 也就是我们 Module
    定义时候 id 存储的是模块的绝对路径，读取到的 content 是一个字符串，我们使用 Module.wrapper 来包裹一下就相当
    于在这个模块外部又包裹了一个函数，也就实现了私有作用域。

-   使用 call 来执行 fn 函数，第一个参数改变运行的 this 我们传入 module.exports，后面的参数就是函数外面包裹参数
    exports, module, Require, **dirname, **filename

```js
Module._extensions = {
	'.js'(module) {
		const content = fs.readFileSync(module.id, 'utf8');
		const fnStr = Module.wrapper[0] + content + Module.wrapper[1];
		const fn = vm.runInThisContext(fnStr);
		fn.call(module.exports, module.exports, module, Require, _filename, _dirname);
	},
	'.json'(module) {
		const json = fs.readFileSync(module.id, 'utf8');
		module.exports = JSON.parse(json); // 把文件的结果放在exports属性上
	},
};
```

-   tryModuleLoad 函数接收的是模块对象，通过 path.extname 来获取模块的后缀名，然后使用 Module.\_extensions 来加载模块。

```js
// 定义模块加载方法
function tryModuleLoad(module) {
	// 获取扩展名
	const extension = path.extname(module.id);
	// 通过后缀加载当前模块
	Module._extensions[extension](module);
}
```

-   Require 加载机制我们基本就写完了，我们来重新看一下。Require 加载模块的时候传入模块名称，在 Require
    方法中使用 path.resolve(\_\_dirname, modulePath)获取到文件的绝对路径。然后通过 new Module 实例化的方式
    创建 module 对象，将模块的绝对路径存储在 module 的 id 属性中，在 module 中创建 exports 属性为一个 json 对象。

-   使用 tryModuleLoad 方法去加载模块，tryModuleLoad 中使用 path.extname 获取到文件的扩展名，然后根据扩展
    名来执行对应的模块加载机制。

-   最终将加载到的模块挂载 module.exports 中。tryModuleLoad 执行完毕之后 module.exports 已经存在了，
    直接返回就可以了。

```js
// 导入依赖
const path = require('path'); // 路径操作
const fs = require('fs'); // 文件读取
const vm = require('vm'); // 文件执行

// 定义导入类，参数为模块路径
function Require(modulePath) {
	// 获取当前要加载的绝对路径
	let absPathname = path.resolve(__dirname, modulePath);
	// 创建模块，新建Module实例
	const module = new Module(absPathname);
	// 加载当前模块
	tryModuleLoad(module);
	// 返回exports对象
	return module.exports;
}
// 定义模块, 添加文件id标识和exports属性
function Module(id) {
	this.id = id;
	// 读取到的文件内容会放在exports中
	this.exports = {};
}
// 定义包裹模块内容的函数
Module.wrapper = ['(function(exports, module, Require, __dirname, __filename) {', '})'];
// 定义扩展名，不同的扩展名，加载方式不同，实现js和json
Module._extensions = {
	'.js'(module) {
		const content = fs.readFileSync(module.id, 'utf8');
		const fnStr = Module.wrapper[0] + content + Module.wrapper[1];
		const fn = vm.runInThisContext(fnStr);
		fn.call(module.exports, module.exports, module, Require, _filename, _dirname);
	},
	'.json'(module) {
		const json = fs.readFileSync(module.id, 'utf8');
		module.exports = JSON.parse(json); // 把文件的结果放在exports属性上
	},
};
// 定义模块加载方法
function tryModuleLoad(module) {
	// 获取扩展名
	const extension = path.extname(module.id);
	// 通过后缀加载当前模块
	Module._extensions[extension](module);
}
```

### `给模块添加缓存？`

-   添加缓存也比较简单，就是文件加载的时候将文件放入缓存在，再去加载模块时先看缓存中是否存在，
    如果存在直接使用，如果不存在再去重新嘉爱，加载之后再放入缓存。

```js
// 定义导入类，参数为模块路径
function Require(modulePath) {
	// 获取当前要加载的绝对路径
	let absPathname = path.resolve(__dirname, modulePath);
	// 从缓存中读取，如果存在，直接返回结果
	if (Module._cache[absPathname]) {
		return Module._cache[absPathname].exports;
	}
	// 尝试加载当前模块
	tryModuleLoad(module);
	// 创建模块，新建Module实例
	const module = new Module(absPathname);
	// 添加缓存
	Module._cache[absPathname] = module;
	// 加载当前模块
	tryModuleLoad(module);
	// 返回exports对象
	return module.exports;
}
```

### `自动补全路径？`

-   自动给模块添加后缀名，实现省略后缀名加载模块，其实也就是如果文件没有后缀名的时候遍历一下所有的后缀名看一下文件是否存在。

```js
// 定义导入类，参数为模块路径
function Require(modulePath) {
	// 获取当前要加载的绝对路径
	let absPathname = path.resolve(__dirname, modulePath);
	// 获取所有后缀名
	const extNames = Object.keys(Module._extensions);
	let index = 0;
	// 存储原始文件路径
	const oldPath = absPathname;
	function findExt(absPathname) {
		if (index === extNames.length) {
			return throw new Error('文件不存在');
		}
		try {
			fs.accessSync(absPathname);
			return absPathname;
		} catch (e) {
			const ext = extNames[index++];
			findExt(oldPath + ext);
		}
	}
	// 递归追加后缀名，判断文件是否存在
	absPathname = findExt(absPathname);
	// 从缓存中读取，如果存在，直接返回结果
	if (Module._cache[absPathname]) {
		return Module._cache[absPathname].exports;
	}
	// 尝试加载当前模块
	tryModuleLoad(module);
	// 创建模块，新建Module实例
	const module = new Module(absPathname);
	// 添加缓存
	Module._cache[absPathname] = module;
	// 加载当前模块
	tryModuleLoad(module);
	// 返回exports对象
	return module.exports;
}
```

### `分析实现步骤`

1.  导入相关模块，创建一个 Require 方法。

2.  抽离通过 Module.\_load 方法，用于加载模块。

3.  Module.resolveFilename 根据相对路径，转换成绝对路径。

4.  缓存模块 Module.\_cache，同一个模块不要重复加载，提升性能。

5.  创建模块 id: 保存的内容是 exports = {}相当于 this。

6.  利用 tryModuleLoad(module, filename) 尝试加载模块。

7.  Module.\_extensions 使用读取文件。

8.  Module.wrap: 把读取到的 js 包裹一个函数。

9.  将拿到的字符串使用 runInThisContext 运行字符串。

10. 让字符串执行并将 this 改编成 exports。
