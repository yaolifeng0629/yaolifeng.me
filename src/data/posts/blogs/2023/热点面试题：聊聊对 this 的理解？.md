## 前言
>  欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
>
>  前端小菜鸡一枚，分享的文章纯属个人见解，若有不正确或可待讨论点可随意评论，与各位同学一起学习~

## 聊聊对 this 对象的理解？

### 定义
-   在执行上下文中的一个属性，它指向最后一次调用这个属性或方法的对象。通常有四种情况来判断。

### 四种情况如下
**1.  函数调用模式**：当一个函数不是一个对象的属性时，直接作为函数来调用时， 严格模式下指向 `undefined`, 非严格模式下，`this` 指向全局对象。

```js
// 严格模式
"use strict";
var name = "window";
var doSth = function () {
    console.log(typeof this === "undefined");
    console.log(this.name);
};
doSth(); // true，// 报错，因为this是undefined

// 非严格模式
let name2 = "window2";
let doSth2 = function () {
    console.log(this === window);
    console.log(this.name2);
};
doSth2(); // true, undefined
```

**2.  方法调用模式**：如果一个函数作为一个对象的方法来调用时，`this` 指向当前这个对象

```js
var name = "window";
var doSth = function () {
    console.log(this.name);
};
var student = {
    name: "lc",
    doSth: doSth,
    other: {
        name: "other",
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

**3.  构造器调用模式**：如果一个函数通过 `new` 调用时，函数执行前会新创建一个对象，`this` 指向这个新创建的对象。

```js
var Obj = function (p) {
    this.p = p;
};

var o = new Obj("Hello World!");
o.p; // "Hello World!"
```

**4.  apply, call, bind 模式**：显式更改 `this` 指向，严格模式下，指向绑定的第一个参数，非严格模式下，`null` 和 `undefined` 指向全局对象（浏览器中是 `window`），其余指向被 `new Object()` 包裹的对象。

-   `aplly`: apply(`this` 绑定的对象，参数数组) `func.apply(thisValue, [arg1, arg2, ...])`

```js
function f(x, y) {
    console.log(x + y);
}

f.call(null, 1, 1); // 2
f.apply(null, [1, 1]); // 2
```

-   `call`: call(`this` 绑定的对象，一个个参数) `func.call(thisValue, arg1, arg2, ...)`

```js
var doSth = function (name) {
    console.log(this);
    console.log(name);
};
doSth.call(2, "lc"); // Number{2}, 'lc'
var doSth2 = function (name) {
    "use strict";
    console.log(this);
    console.log(name);
};
doSth2.call(2, "lc"); // 2, 'lc'
```

-   `bind`: bind(`this` 绑定的对象) `func.bind(thisValue)`

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

### 箭头函数规则
-   不会使用以上原则，而是根据当前作用域来决定 `this`, 也就是说箭头函数会继承外层函数，调用的 `this` 绑定，没有外层函数，则是指向全局（浏览器中是 `window`）。

### this 优先级
-   `构造器模式 > apply, call, bind > 方法调用模式 > 函数调用模式`

## 文章特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`

## 往期回顾：
-   [热点面试题：浏览器和Node的宏任务和微任务？](https://mp.weixin.qq.com/s/U3fgBOtvc9_MbJbMA_Pdqw)
-   [这是你理解的CSS选择器权重吗？](https://mp.weixin.qq.com/s/6W3dcwcsBURGxYD9AeBeWA)
-   [热点面试题：JS 中 call, apply, bind 概念、用法、区别及实现？](https://mp.weixin.qq.com/s/v9eYEpwpzXazXm7pLTkDhw)
-   [热点面试题： 常用位运算方法？](https://mp.weixin.qq.com/s/gn4sBeM6luE_b6jaAZOgyQ)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)
-   [热点面试题：Virtual DOM 相关问题？](https://mp.weixin.qq.com/s/s3BBhTH9g2OrtOpyJ4tzbQ)
-   [热点面试题： Array中有哪些非破坏性方法？](https://mp.weixin.qq.com/s/a0gd3wQ-bqYpDVfFGJP8Ew)
-   [热点面试题：协商缓存和强缓存的理解及区别？](https://mp.weixin.qq.com/s/Zht9WL8mzW7-uOi49vcgzQ)
## 最后：
-   欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，长期交流学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
