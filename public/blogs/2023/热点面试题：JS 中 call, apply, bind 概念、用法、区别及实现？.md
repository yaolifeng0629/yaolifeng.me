## 前言
>  极度投入，深度沉浸，边界清晰
>
>  前端小菜鸡一枚，分享的文章纯属个人见解，若有不正确或可待讨论点可随意评论，与各位同学一起学习~
>
>  欢迎关注 `『非同质前端札记』` 公众号 ，一起探索学习前端技术......
>
>  公众号回复 `加群` 或 `扫码`, 即可加入前端交流学习群，长期交流学习......
>
>  公众号回复 `加好友`，即可添加为好友

## 热点面试题：JS 中 call, apply, bind 概念、用法、区别及实现？
### 概念：
-   `function.call(thisArg, arg1, arg2, ...)`
-   `function.apply(thisArg, [arg1, arg2, ...])`
-   `function.bind(thisArg, arg1, arg2, ...)`
-   三者都是改变 `this` 指向，通过一个参数或多个参数来调用一个函数的。

### 用法：
```js
let obj = {
    name: "哈哈",
    sayName: function () {
        console.log("sayName", this.name);
        return this.name;
    },
    eat: function (food1, food2) {
        console.log("eat", food1, food2);
    },
};

let obj2 = {
    name: "是的",
};

obj.sayName.call(obj2); // sayName 是的
obj.eat.call(obj2, "鱼", "肉"); // eat 鱼 肉

obj.eat.apply(obj2, ["鱼", "肉"]); // e at 鱼 肉

obj.eat.bind(obj2, "鱼", "肉"); // 不会调用，需要一个结果来接收
let res = obj.eat.bind(obj2, "鱼", "肉");
res(); // eat 鱼 肉
```

### 区别：
-   call 与 bind 的区别?
    -   `call` 会直接调用，而 `bind` 会创建一个新的函数作为一个返回值进行调用, 而其余参数将作为新函数的参数，供调用时使用
-   call 与 apply 的区别？
    -   主要区别在第二个参数中，`call` 接受的是一个参数列表，也就是一个个参数，而 `apply` 接受的是一个包含多个参数的数组

### 实现：
-   `function.call(thisArg, arg1, arg2, ...)`
```js
Function.prototype.myCall = function (context, ...args) {
    // 条件判断，判断当前调用的对象是否为函数，
    if (Object.prototype.toString.call(this).slice(8, -1) != "Function")
        throw new Error("type error");
    // 判断传入上下文对象是否存在，如果不存在，则设置为 window
    if (!context || context === null) context = window;
    // 创建唯一的 key 值，作为构建的 context 内部方法名
    let fn = Symbol();
    // 将 this 指向调用的 call 函数
    context[fn] = this;
    // 执行函数并返回结果 === 把自身作为传入的 context 的方法进行调用
    return context[fn](...args);
};
let obj = {
    name: "哈哈",
    sayName: function () {
        console.log("sayName", this.name);
        return this.name;
    },
    eat: function (food1, food2) {
        console.log("eat", food1, food2);
    },
};
let obj2 = {
    name: "是的",
};
obj.sayName.myCall(obj2);
```

-   `function.apply(thisArg, [arg1, arg2, ...])`
```js
Function.prototype.MyApply = function (context, args) {
    // 条件判断，判断当前调用的对象是否为函数，
    if (Object.prototype.toString.call(this).slice(8, -1) != "Function")
        throw new Error("type error");
    // 判断传入上下文对象是否存在，如果不存在，则设置为 window
    if (!context || context === null) context = window;
    // 创建唯一的 key 值，作为构建的 context 内部方法名
    let fn = Symbol();
    // 将 this 指向调用的 call 函数
    context[fn] = this;
    // 执行函数并返回结果 === 把自身作为传入的 context 的方法进行调用
    return context[fn](...args);
};
let obj = {
    name: "哈哈",
    sayName: function () {
        console.log("sayName", this.name);
        return this.name;
    },
    eat: function (food1, food2) {
        console.log("eat", food1, food2);
    },
};
let obj2 = {
    name: "是的",
};
obj.sayName.MyApply(obj2, []);
```

-   `function.bind(thisArg, arg1, arg2, ...)`
```js
Function.prototype.myBind = function (context, ...args) {
    if (!context || context === null) {
        context = window;
    }
    // 创造唯一的key值  作为我们构造的context内部方法名
    let fn = Symbol();
    context[fn] = this;
    let _this = this;
    //  bind情况要复杂一点
    const result = function (...innerArgs) {
        // 第一种情况: 若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
        // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
        // this.__proto__ === result.prototype   //this instanceof result =>true
        // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
        if (this instanceof _this === true) {
            // 此时this指向指向result的实例  这时候不需要改变this指向
            this[fn] = _this;
            this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
        } else {
            // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
            context[fn](...[...args, ...innerArgs]);
        }
    };
    // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
    // 实现继承的方式: 使用Object.create
    result.prototype = Object.create(this.prototype);
    return result;
};
//用法如下
function Person(name, age) {
    console.log(name); //'我是参数传进来的name'
    console.log(age); //'我是参数传进来的age'
    console.log(this); //构造函数this指向实例对象
}
// 构造函数原型的方法
Person.prototype.say = function () {
    console.log(123);
};
let obj = {
    objName: "我是obj传进来的name",
    objAge: "我是obj传进来的age",
};
// 普通函数
function normalFun(name, age) {
    console.log(name); //'我是参数传进来的name'
    console.log(age); //'我是参数传进来的age'
    console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
    console.log(this.objName); //'我是obj传进来的name'
    console.log(this.objAge); //'我是obj传进来的age'
}
// 先测试作为构造函数调用
let bindFun = Person.myBind(obj, "我是参数传进来的name");
let a = new bindFun("我是参数传进来的age");
a.say(); //123
// 再测试作为普通函数调用
// let bindFun = normalFun.myBind(obj, '我是参数传进来的name')
//  bindFun('我是参数传进来的age')
```

## 文章特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`

## 往期回顾：
-   [热点面试题：Virtual DOM 相关问题？](https://mp.weixin.qq.com/s/s3BBhTH9g2OrtOpyJ4tzbQ)
-   [热点面试题：什么是粘包/半包问题，该如何解决？](https://mp.weixin.qq.com/s/SORAN1c0_Pntajvjl-jK4g)
-   [热点面试题：console.log()同异步问题？](https://mp.weixin.qq.com/s/9ewYuCazPaZhDHwrfIWxTQ)
-   [热点面试题：进程系列问题？](https://mp.weixin.qq.com/s/J5ayE5XJElBFzn38qo7ytQ)
-   [热点面试题：Node.js 中的垃圾回收机制？](https://mp.weixin.qq.com/s/Guku1ARej2ZHwnrbXxmJJA)
-   [热点面试题：简述 http3.0~http1.0 分别有什么改进？](https://mp.weixin.qq.com/s/LkOWiDj5O68T85-577_UPA)
-   [JavaScript中的AMD和CMD规范](https://mp.weixin.qq.com/s/LkOWiDj5O68T85-577_UPA)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)

## 最后：
-   欢迎关注 `『非同质前端札记』` 公众号 ，一起探索学习前端技术......
-   公众号回复 `加群` 或 `扫码`, 即可加入前端交流学习群，长期交流学习......
-   公众号回复 `加好友`，即可添加为好友
![](https://soo.run/13bdt)
