## 前言
>  欢迎关注 [『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 公众号 ，一起探索学习前端技术......
>
>  前端小菜鸡一枚，分享的文章纯属个人见解，若有不正确或可待讨论点可随意评论，与各位同学一起学习~

## JavaScript 为什么要进行变量提升，它导致了什么问题？
-   无论是函数还是变量在那个位置上声明，都会被提升到函数之前，可保证变量声明前可访问而不会报错

-   变量提升的本质：js 引擎在代码执行前有一个解析的过程，会创建一个执行上下文，初始化一些代码执行所需要的参数。当访问一个变量时，会在当前执行上下文的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参，所有函数和变量声明，这个对象是在代码解析的时候创建的。

### 代码执行过程：
1.  解析阶段：JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出this、arguments和函数的参数。
    -   全局上下文：变量定义，函数声明
    -   函数上下文：变量定义，函数声明，this，arguments
2.  执行阶段：按照代码顺序执行

### 为什么要进行变量提升？
1.  提高性能：在代码执行前，会进行语法检查和预编译，这个操作只会执行一次，这么做就是为了提高性能，如果没有这一步，则每次执行代码前都必须重新编译一下变量和函数，这是没有必要的，因为变量和函数的代码基本不会改变，解析一遍就够了。
2.  容错性更好
```js
a = 1;
var a;

console.log(a); // 1
```
### S(总结):
-   解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
-   声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行

### 导致的问题：
```js
var tmp = new Date();

function fn(){
    console.log(tmp);
    if(false){
        var tmp = 'hello world';
    }
}

fn();  // undefined

/**
 * 在这个函数中，原本是要打印出外层的tmp变量，但是因为变量提升的问题，
 * 内层定义的tmp被提到函数内部的最顶部，相当于覆盖了外层的tmp，所以打印结果为undefined。
 */
```
```js
for (var i = 0; i < 3; i++){
    setTimeout(() => {
        console.log(i);
    }, 2000);
} // 3 3 3

for (let i = 0; i < 3; i++){
    setTimeout(() => {
        console.log(i);
    }, 2000);
} // 0 1 2

/**
 * 由于遍历时定义的i会变量提升成为一个全局变量，在函数结束之后不会被销毁，
 * 所以，一直修改的是之前的定义的全局变量，所以第一个输出三次 3, 第二个输出 0 1 2。
 */

/**
 * 在 for 循环中，let 声明的变量会存在一个块级作用域的概念，使用 let 声明的迭代变量时，
 * js 引擎会在后台为每一个迭代循环声明一个新的迭代变量，因此每次使用的 i 都是不同的。
 */
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
