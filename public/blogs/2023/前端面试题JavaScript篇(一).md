## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 必知必会的JavaScript前端面试题篇(一)，不看后悔！

### 1. 对 this 对象的理解？

-   定义：在执行上下文中的一个属性，它指向最后一次调用这个属性或方法的对象。通常有四种情况来判断。
-   严格模式中使用 `use strict`

1.函数调用模式：当一个函数不是一个对象的属性时，直接作为函数来调用时， 严格模式下指向 undefined, 非严格模式下，this 指向全局对象。
```js
// 严格模式
'use strict';
var name = 'window';
var doSth = function () {
    console.log(typeof this === 'undefined');
    console.log(this.name);
};
doSth(); // true，// 报错，因为this是undefined
// 非严格模式
let name2 = 'window2';
let doSth2 = function () {
    console.log(this === window);
    console.log(this.name2);
};
doSth2(); // true, undefined
```
2.方法调用模式：如果一个函数作为一个对象的方法来调用时，this 指向当前这个对象
```js
var name = 'window';
var doSth = function () {
    console.log(this.name);
};
var student = {
    name: 'lc',
    doSth: doSth,
    other: {
        name: 'other',
        doSth: doSth,
    },
};
student.doSth(); // 'lc'
student.other.doSth(); // 'other'
// 用call类比则为：
student.doSth.call(student);
// 用call类比则为：
student.other.doSth.call(student.other);
```
3.构造器调用模式：如果一个函数通过 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
```js
var Obj = function (p) {
    this.p = p;
};
var o = new Obj('Hello World!');
o.p; // "Hello World!"
```
4.apply, call, bind 模式：显示更改 this 指向，严格模式下，指向绑定的第一个参数，非严格模式下，null 和 undefined 指向全局对象（浏览器中是 window），其余指向被 new Object() 包裹的对象。
        -   apply: apply(this 绑定的对象，参数数组) `func.apply(thisValue, [arg1, arg2, ...])`
```js
function f(x, y) {
    console.log(x + y);
}
f.call(null, 1, 1); // 2
f.apply(null, [1, 1]); // 2
```
-   call: call(this 绑定的对象，一个个参数) `func.call(thisValue, arg1, arg2, ...)`

```js
var doSth = function (name) {
    console.log(this);
    console.log(name);
};
doSth.call(2, 'lc'); // Number{2}, 'lc'
var doSth2 = function (name) {
    'use strict';
    console.log(this);
    console.log(name);
};
doSth2.call(2, 'lc'); // 2, 'lc'
```

-   bind: bind(this 绑定的对象) `func.bind(thisValue)`

```js
var counter = {
    count: 0,
    inc: function () {
        this.count++;
    },
};
var obj = {
    count: 100,
};
var func = counter.inc.bind(obj);
func();
obj.count; // 101
// eg2：
var add = function (x, y) {
    return x * this.m + y * this.n;
};
var obj = {
    m: 2,
    n: 2,
};
var newAdd = add.bind(obj, 5);
newAdd(5); // 20
```
-   箭头函数：不会使用以上原则，而是根据当前作用域来决定 this, 也就是说箭头函数会继承外层函数，调用的 this 绑定，没有外层函数，则是指向全局（浏览器中是 window）。
-   优先级：`构造器模式 > apply, call, bind > 方法调用模式 > 函数调用模式`

### 2. 在地址栏中输入网址，按下回车网页发生了什么？

1.  `解析 URL`: 分析所使用的协议和请求资源的路径
2.  `缓存判断`：判断当前请求资源是否存在缓存中，如果在缓存中且没有失效，直接返回，否则向服务器发起请求。
3.  `DNS 解析`：从 URL 中解析出 IP 地址，然后判断本地是否有缓存，有则使用，没有则向本地 DNS 服务器发起请求，先判断是否存在缓存，没有则向跟域名服务器发起请求，最终获得域名 IP 地址后，本地 DNS 服务器再将这个 IP 返回给用户。
4.  `获取 MAC 地址`：获取到 IP 地址后，数据传输还需目的主机的 MAC 地址，应用层下发数据给传输层，TCP 协议会执行端口号和目的端口号，然后下发数据给网络层。
5.  `TCP 三次握手`：首先客户端向服务器发送一个 SYN 连接请求报文段和一个随机序号，服务端接收到请求后向服务器端发送一个 SYN ACK 报文段，确认连接请求，并且也向客户端发送一个随机序号。客户端接收服务器的确认应答后，进入连接建立的状态，同时向服务器也发送一个 ACK 确认报文段，服务器端接收到确认后，也进入连接建立状态，此时双方的连接就建立起来了。
6.  `HTTPS 握手`：如果使用的是 HTTPS 协议，在通信前还存在 TLS 的一个四次握手的过程。首先由客户端向服务器端发送使用的协议的版本号、一个随机数和可以使用的加密方法。服务器端收到后，确认加密的方法，也向客户端发送一个随机数和自己的数字证书。客户端收到后，首先检查数字证书是否有效，如果有效，则再生成一个随机数，并使用证书中的公钥对随机数加密，然后发送给服务器端，并且还会提供一个前面所有内容的 hash 值供服务器端检验。服务器端接收后，使用自己的私钥对数据解密，同时向客户端发送一个前面所有内容的 hash 值供客户端检验。这个时候双方都有了三个随机数，按照之前所约定的加密方法，使用这三个随机数生成一把秘钥，以后双方通信前，就使用这个秘钥对数据进行加密后再传输。
7.  `返回数据`：当页面请求发送到服务器端后，服务器端会返回一个 html 文件作为响应，浏览器接收到响应后，开始对 html 文件进行解析，开始页面的渲染过程。
8.  `页面渲染`: 浏览器首先会根据 html 文件构建 DOM 树，根据解析到的 css 文件构建 CSSOM 树，如果遇到 script 标签，则判端是否含有 defer 或者 async 属性，要不然 script 的加载和执行会造成页面的渲染的阻塞。当 DOM 树和 CSSOM 树建立好后，根据它们来构建渲染树。渲染树构建好后，会根据渲染树来进行布局。布局完成后，最后调用 paint 方法对页面进行绘制。这个时候整个页面就显示出来了。
9.  `TCP四次挥手`: 最后一步是 TCP 断开连接的四次挥手过程。若客户端认为数据发送完成，则它需要向服务端发送连接释放请求。服务端收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表明客户端到服务端的连接已经释放，不再接收客户端发的数据了。但是因为 TCP 连接是双向的，所以服务端仍旧可以发送数据给客户端。服务端如果此时还有没发完的数据会继续发送，完毕后会向客户端发送连接释放请求，然后服务端便进入 LAST-ACK 状态。客户端收到释放请求后，向服务端发送确认应答，此时客户端进入 TIME-WAIT 状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有服务端的重发请求的话，就进入 CLOSED 状态。当服务端收到确认应答后，也便进入 CLOSED 状态。

-   S：
    1.  解析 url: 例如协议，域名，端口，路径，参数等
    2.  缓存判断：根据 url 先判断本地 DNS 服务器中是否有该 url 的 IP 地址，如果有，则直接使用，如果没有，则请求服务器
    3.  获取 IP 地址：根据域名去 DNS 服务器查询对应的 IP 地址
    4.  获取 mac 地址：因为数据传输需要主机的 mac 地址
    5.  TCP 三次握手：主要的过程就是与服务器建立连接
    6.  HTTPS 握手：如果协议是 https，还需要一个四次握手的过程，主要是判断版本号、数字证书和 hash 值是否有效，因为后续是通过这三个的加密数据进行传输的
    7.  服务器响应处理并返回数据
    8.  浏览器解析成可执行的文件并渲染
    9.  TCP 四次挥手：TCP 断开链接的一个过程，若客户端认为数据已经传输完成的后，客户端会发送一个释放请求给服务器，然后 TCP 会进入 CLOSE_WAIT 状态，这个状态最大会持续 2MSL(2 倍的最长报文段寿命,通常 1MSL 为 2 分钟也就是 120s,则 2MSL 时间大概为 4 分钟 240s) 时间，如果这个时间段客户端没有再向服务器发送请求，则会进入 CLOSE 状态。

### 3. 对象创建的方式有哪些？

1.工厂模式：通过一个函数来封装创建对象的过程。只是简单的封装了复用代码，没有建立起对象与类型之间的关系。

```js
// 工厂函数 通过改变参数多次使用
function Person(name, age) {
    const obj = {};
    obj.name = name;
    obj.age = age;
    return obj;
}

const person = Person('dz', 23);
const person1 = Person('dz1', 24);
console.log(person instanceof Person); // -> false
console.log(person1.__proto__ == person.__proto_); // -> false
```

2.构造函数模式：通过 new 关键字来创建。但会造成不必要的函数对象的创建。因为在 js 中函数也是一个对象，因此如果对象属性中如果包含函数的话，那就会每次都新建一个对象，浪费了不必要的内存空间，因为在函数中所有的实例都可以通用的。

```js
// 内置构造函数创建对象
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayname = () => {
        console.log(this.name);
    };
}

const p1 = new Person('dz', 23);
const p2 = new Person('dz1', 24);
console.log(p1 instanceof Person, p2 instanceof Person); // --> true true
```

3.原型模式：因为每一个函数都有一个 prototype 属性，这个属性是一个对象，它包含了通过构造函数创建的所有实例都能共享的属性和方法。

```js
function Person() {}
Person.prototype.name = 'Nike';
Person.prototype.age = 20;
Person.prototype.jbo = 'teacher';
Person.prototype.sayName = function () {
    alert(this.name);
};
var person1 = new Person();
person1.sayName();
```

4.构造函数 + 原型模式：每个实例拥有自己的属性和方法, 以及共享相同的方法, 用的较多一种模式

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayname = () => {
    console.log(this.name);
};

const p1 = new Person('dz', 23);
const p2 = new Person('dz1', 24);
console.log(p1.name, p2.name); // dz dz1
```

5.动态原型模式：这一种模式将原型方法赋值的创建过程移动到了构造函数的内部，通过对属性是否存在的判断，可以实现仅在第一次调用函数时对原型对象赋值一次的效果。这一种方式很好地对上面的混合模式进行了封装。

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
    if (typeof this.sayname != 'function') {
        Person.prototype.sayname = () => {
            console.log(this.name);
        };
    }
}
const p1 = new Person('dz', 23);
console.log(p1.sayname); // -> dz
```

6.寄生构造函数模式：
    -   基本思想：这一种模式和工厂模式的实现基本相同。它主要是基于一个已有的类型，在实例化时对实例化的对象进行扩展。这样既不用修改原来的构造函数，也达到了扩展对象的目的。它的一个缺点和工厂模式一样，无法实现对象的识别。

```js
function SpecialArray() {
    var array = new Array();
    array.push.apply(array, arguments);
    array.toPipedString = function () {
        return this.join('|');
    };
    return array;
}
var colors = new SpecialArray('red', 'green', 'pink');
alert(colors.toPipedString()); // red|green|pink
alert(colors instanceof SpecialArray); // false
```

7.class 创建对象：constructor 是构造方法,类似构造函数, 定义这个方法里面的内容都是实例自身的属性和方法, 不会被其他实例共享, 而写在外面的 sayname 表示原型上的方法, 是会被共享的。

```js
class Person {
    constructor(name, age) { // constructor构造函数
        this.name = name
        this.age  = age
    }

    sayname() { //原型上的
        console.log(this.name)
    }

    static sayAge() {
        console.log(this.age)
    }
}

const per = new Person('dz', 23)
per.sayname() // -> dz
Person.sayAge() // 23


// static 表示静态，加了static的函数不会挂载到prototype 上,而是挂载到 class类 上, 类似于:
Promise.resolve(...)
Math.max(...)
```

### 4. javascript 为什么要进行变量提升，它导致了什么问题？

-   无论是函数还是变量在那个位置上声明，都会被提升到函数之前，可保证变量声明前可访问而不会报错

-   变量提升的本质：js 引擎在代码执行前有一个解析的过程，会创建一个执行上下文，初始化一些代码执行所需要的参数。当访问一个变量时，会在当前执行上下文的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参，所有函数和变量声明，这个对象是在代码解析的时候创建的。

-   代码执行过程：

    1.  解析阶段：JS 会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为 undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出 this、arguments 和函数的参数。
        -   全局上下文：变量定义，函数声明
        -   函数上下文：变量定义，函数声明，this，arguments
    2.  执行阶段：按照代码顺序执行

-   为什么要进行变量提升？
    1.  提高性能：在代码执行前，会进行语法检查和预编译，这个操作只会执行一次，这么做就是为了提高性能，如果没有这一步，则每次执行代码前都必须重新编译一下变量和函数，这是没有必要的，因为变量和函数的代码基本不会改变，解析一遍就够了。
    2.  容错性更好：
```js
a = 1;
var a;
console.log(a);
```
-   总结：

    -   解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
    -   声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行

-   导致的问题：

```js
var tmp = new Date();
function fn() {
    console.log(tmp);
    if (false) {
        var tmp = 'hello world';
    }
}
fn(); // undefined
// 在这个函数中，原本是要打印出外层的tmp变量，但是因为变量提升的问题，内层定义的tmp被提到函数内部的最顶部，相当于覆盖了外层的tmp，所以打印结果为undefined。
```

```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 2000);
} // 3 3 3
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 2000);
} // 0 1 2

// 由于遍历时定义的i会变量提升成为一个全局变量，在函数结束之后不会被销毁，所以，一直修改的是之前的定义的全局变量，所以第一个输出三次 3, 第二个输出 0 1 2。
// 在 for 循环中，let 声明的变量会存在一个块级作用域的概念，使用 let 声明的迭代变量时，js 引擎会在后台为每一个迭代循环声明一个新的迭代变量，因此每次使用的 i 都是不同的。
```
### 5. var, let, const 的区别？

| **区别**                  | **var** | **let** | **const** |
| ------------------------- | ------- | ------- | --------- |
| 是否有块级作用域`{} 包裹` | ❌      | ✔️      | ✔️        |
| 是否存在变量提升          | ✔️      | ❌      | ❌        |
| 是否添加全局属性          | ✔️      | ❌      | ❌        |
| 能否重复声明变量          | ✔️      | ❌      | ❌        |
| 是否存在暂时性死区        | ❌      | ✔️      | ✔️        |
| 是否必须设置初始值        | ❌      | ❌      | ✔️        |
| 能否改变指针指向          | ✔️      | ✔️      | ❌        |

-   暂时性死区：在使用 let、const 命令声明变量之前，该变量都是不可用的。


## 特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`
## 往期推荐：
-   [前端面试实录HTML篇](https://mp.weixin.qq.com/s/1OCKVhbDhx9jS4KoPinccw)
-   [前端面试实录CSS篇](https://mp.weixin.qq.com/s/Lpe_0f_t6TKbo9bfi5fNKw)
-   [JS 如何判断一个元素是否在可视区域内？](https://mp.weixin.qq.com/s/2swYyWAGhOxLZHL40QRt2w)
-   [Vue2、3 生命周期及作用？](https://mp.weixin.qq.com/s/_1ZVSI63e39jaL8PhXRd3w)
-   [排序算法：QuickSort](https://mp.weixin.qq.com/s/w2BCeVf52UrP1JgMvaOoKw)
-   [箭头函数与普通函数的区别？](https://mp.weixin.qq.com/s/o-6DpwxL-k7dQsf5J8dA9w)
-   [这是你理解的CSS选择器权重吗？](https://mp.weixin.qq.com/s/6W3dcwcsBURGxYD9AeBeWA)
-   [JS 中 call, apply, bind 概念、用法、区别及实现？](https://mp.weixin.qq.com/s/v9eYEpwpzXazXm7pLTkDhw)
-   [常用位运算方法？](https://mp.weixin.qq.com/s/gn4sBeM6luE_b6jaAZOgyQ)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)
-   [为什么 0.1+ 0.2 != 0.3，如何让其相等？](https://mp.weixin.qq.com/s/wsXtNGpNl6NrickR6_7ePw)
-   [聊聊对 this 的理解？](https://mp.weixin.qq.com/s/w_RV1AUwXsW2fSHCfxXD2A)
-   [JavaScript 为什么要进行变量提升，它导致了什么问题？](https://mp.weixin.qq.com/s/mBBUVF7mrPt4ik1f4dBPrQ)
## 最后：
-   欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，一起快乐摸鱼和学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
