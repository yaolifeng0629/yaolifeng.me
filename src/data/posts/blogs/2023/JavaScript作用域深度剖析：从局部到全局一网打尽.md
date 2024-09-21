## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## JavaScript作用域深度剖析：从局部到全局一网打尽

### 1.1 编译原理
-   `JavaScript` 事实上是一门`编译语言`。
-   在传统编译语言中，一段源代码执行前会经历三个步骤:
    1.  分词/词法分析(Tokenizing/Lexing)
```js
var a = 2;
// 分解后：
var、a、=、2、;
// 空格是否会被当做词法单元，取决于空格在这门语言中是否具有意义。
```
-   期间经过两个过程：分词(tokenizing)和词法分析(Lexing) 、两者的主要差别在于词法单元的识别是通过`有状态`还是`无状态`的方式进行的。
2.  解析/语法分析(Parsing)
    -   这个过程就是将词法单元流(数组)转换为一个由元素逐级嵌套组成的代表了程序语法结构的树，这个树被称为["抽象语法树"](https://astexplorer.net/#/gist/9d656c1598280587257076140e988f4d/latest)。(Abstract Syntax Tree, AST)。
3.  代码生成
    -   将 AST 转换为可执行代码的过程被称为代码生成。也就是说有某种方法将 var a = 2; 的 AST 转换为一组机器指令，用来创建一个叫做 a 的变量(包含分配内存等)，将一个值储存于 a 中。
-   比起其他编译过程只有这三个步骤的语言的编译器，JavaScript 引擎要复杂得多，在语法分析和代码生成阶段有着特定的步骤来对比运行性能进行优化，包括对冗余元素进行优化等。
-   `简单来说，任何 JavaScript 代码片段在执行前都要进行编译(通常就在执行前)`


### 1.2 理解作用域

#### 1.2.1 演员表
-   `引擎`：从头到尾负责整个 JavaScript 程序的编译及执行过程。
-   `编译器`：引擎的好朋友之一，负责语法分析及代码生成等脏活累活。
-   `作用域`：引擎的另一个好朋友，负责收集并维护由所有声明的标识符(变量)组成的一系列查询，并实行一套严格的规则，确定当前执行的代码对这些标识符的访问权限。

#### 1.2.2 对话
-   `var a = 2;` 这段代码是一句声明。但会经过编译器和引擎的处理来进行。
-   S: 变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量(如果之前没有声明过)，然后在运行时引擎会在作用域中查找该便令，如果能够找到就会对它进行赋值。

#### 1.2.3 编译器有话说
-   编译器在编译过程中的第二步中生成了代码，引擎执行它时，会通过查找变量 a 来判断他是否已声明过。查找的过程由作用域进行协助，但是引擎执行怎样的查找会影响最终的查找结果。
-   引擎常使用的查询类型为：`LHS和RHS`
    -   `LHS: 赋值操作的目标是谁`
    -   `RHS: 谁是赋值操作的源头`

#### 1.2.5
```js
function foo(a) {
    var b = a;
    return a + b;
}
var c = foo(2);


// 对话：
1. 声明 var c
2. 对 c 进行 LHS
3. 对 foo(2) 进行 RHS
4. function foo(a) 期间会进行 a = 2, 对 a 进行 LHS
5. 声明 var b
6. 对 b 进行 LHS
7. 对 a 进行 RHS
8. return a + b; 分别对 a、b 进行 RHS


// 答案：
1. 所有的 LHS(一共有3处)
    1. c =..;
    2. a = 2(隐士变量分配)
    3. b = ..

2. 所有的 RHS (一共有4处)
    1. foo(2..
    2. = a;
    3. a..
    4. .. b
```

### 1.3 作用域嵌套
-   `作用域是根据名称查找变量的一套规则`。
-   `当一个块或函数嵌套在另一个块或函数中时，就会发生作用域的嵌套`。因此在当前作用域中无法找到某个变量时，引擎就会在外层作用域中继续查找，直到找到该变量，或抵达最外层的作用域(也就是全局作用域)为止。
```js
// 非严格模式下
function foo(a) {
    console.log(a + b);
}
var a = 2;
foo(2); // 4


// 严格模式下：
function foo(a) {
    console.log(a + b);
}
var a = 2;
foo(2); // 4
```
-   遍历嵌套作用域链的规则：`引擎会从当前的执行作用域中开始查找变量，如果找不到就会向上一级中继续查找。当抵达最外层的全局作用域时，无论找到还是没找到，查找的过程都会停止。`
-   例子：
    ![](https://s1.locimg.com/2023/05/14/b597a08253954.png)
    -   整个建筑代表程序中的嵌套作用域链，第一层楼代表当前的执行作用域，也就是你所处的位置。建筑的顶层代表全局作用域。
    -   引擎查找的方式：LHS 和 RHS 引用会先在当前楼层中进行查找，如果没找到，就会坐电梯前往上一层楼楼，如果还是没找到就会继续上下，以此类推。一旦达到了顶层(全局作用域), 可能找到你了你所需的变量，也可能没找到，但无论如何查找过程都会停止。

### 1.4 异常
-   为什么区分 LHS 与 RHS 是一种重要的事？
    -   因为在变量还未声明(在任何作用域中都无法找到该变量)的情况下，引擎的这两种查询行为是不一样的。
```js
// 非严格模式下:
function foo(a) {
    console.log(a + b);
    b = a;
}
foo(2); // 4


// 严格模式下：
'use strict';
function foo(a) {
    console.log(a + b);
    b = a;
}
foo(2); // ReferenceError: b is not defined
```
-   上述代码引擎行为：
-   非严格模式下：
    1.  第一次对 b(.. + b) 进行 RHS 查询时未找到该变量，也就是说，这是一个"未声明" 的变量，因为在任何相关的作用域都无法找到它。
    2.  第二次对 b(b = ..) 进行 LHS 查询时，如果在顶层(全局作用域)中也没找到该变量，就会在全局作用域中隐式地创建一个该名称的变量，并将其返回给引擎。
    3.  ......
-   严格模式下：
    1.  第一次对 b(.. + b) 进行 RHS 查询时未找到该变量，也就是说，这是一个"未声明" 的变量，因为在任何相关的作用域都无法找到它，直接抛出 '`ReferenceError`'。
    2.  ......
-   **非严格模式下引擎查找规则**：
    1.  当引擎执行 RHS 查询在所有嵌套的作用域中找不到所需的变量，引擎就会抛出 `ReferenceError` 异常。
    2.   当引擎执行 LHS 查询时，如果在顶层作用域中也无法找到该变量，全局作用域就会创建一个该名称的变量，并将其返回给引擎(非严格模式下)。
-   **严格模式下引擎查找规则**：
    1.  ES5 引入了 `"严格模式"(use strict)`，在行为上有很多不同，其中一个不同的行为就是`严格模式下禁止自动或隐式地创建全局变量`。因此在严格模式中引擎执行 LHS 查询失败时，并不会创建一个全局变量，而是直接抛出一个 `ReferenceError`。
    2.  如果 RHS 找到了一个变量，但尝试对这个变量进行一些不合理的操作时，比如对一个非函数类型的值进行函数调用，或者引用 `null` 或 `undefined` 类型的之中属性，那引擎则会抛出另外一种类型的异常 `TypeError。`
-   `ReferenceError` 同作用域判断失败相关，而 `TypeError` 代表作用域判别成功了，但对结果的操作是非法或不合理的。

### 1.5 小结
1.  作用域是根据名称查找变量的一套规则。
2.  引擎常使用的查询类型为：`LHS 和 RHS`
    -   `LHS: 赋值操作的目标是谁`
        -   `= 操作符`在调用函数时的形参会导致关联作用的赋值操作。也就是说 foo (a, b, c...), 都会有 a = xxx, b = xxx, c = xxx ...... 的行为。
    -   `RHS: 谁是赋值操作的源头`
3.  **非严格模式下引擎查找规则**：
    1.  当引擎执行 RHS 查询在所有嵌套的作用域中找不到所需的变量，引擎就会抛出 `ReferenceError` 异常。
    2.   当引擎执行 LHS 查询时，如果在顶层作用域中也无法找到该变量，全局作用域就会创建一个该名称的变量，并将其返回给引擎(非严格模式下)。
4.  **严格模式下引擎查找规则**：
    1.  ES5 引入了 `"严格模式"(use strict)`，在行为上有很多不同，其中一个不同的行为就是`严格模式下禁止自动或隐式地创建全局变量`。因此在严格模式中引擎执行 LHS 查询失败时，并不会创建一个全局变量，而是直接抛出一个 `ReferenceError`。
    2.  如果 RHS 找到了一个变量，但尝试对这个变量进行一些不合理的操作时，比如对一个非函数类型的值进行函数调用，或者引用 `null` 或 `undefined` 类型的之中属性，那引擎则会抛出另外一种类型的异常 `TypeError。`
5.  `ReferenceError` 同作用域判断失败相关，而 `TypeError` 代表作用域判别成功了，但对结果的操作是非法或不合理的。


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
