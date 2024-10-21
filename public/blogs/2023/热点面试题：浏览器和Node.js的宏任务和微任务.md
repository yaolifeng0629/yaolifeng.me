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

## 热点面试题：浏览器和Node的宏任务和微任务？
### 浏览器中的宏任务和微任务？
-   宏任务：`script中的代码，setTimeout, setInterval, I/O, UI render`
-   微任务：`promise(async/await), Object.observe, MutationObserver`

### Node 中的宏任务和微任务？
-   宏任务：`setTimeout,setInterval,setImmediate,script 整体代码， I/O 操作`
-   微任务：`process.nextTick，new Promise().then()`

### 浏览器与Node中的宏任务和微任务的区别是什么？
-   node 环境下的 setTimeout 会依次执行，而浏览器是一个一个分开的
-   浏览器端：在每执行一次宏任务前，会将微任务队列全部清空

### 案例
```js
// eg1:
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

console.log(7);

// 同步任务：
    // console.log(1);
    // console.log(7);
// 宏任务：
    // setTimeout(() => console.log(2));
    // setTimeout(() => console.log(6));
    // setTimeout(() => console.log(4)))
// 微任务：
    // Promise.resolve().then(() => console.log(3));
    // Promise.resolve().then(() => setTimeout(() => console.log(4)));
    // Promise.resolve().then(() => console.log(5));

/**
 * 结果：1 7 3 5 2 6 4
 * 解析：
 * 第一轮开始：
 *  1. 同步任务 console.log(1); => 1
 *  2. 遇到宏任务，加入宏任务队列
 *  3. 遇到微任务，加入微任务队列
 *  4. 遇到微任务，加入微任务队列
 *  5. 遇到微任务，加入微任务队列
 *  6. 遇到宏任务，加入宏任务队列
 *  7. 同步任务 console.log(7); => 7
    宏任务：
        setTimeout(() => console.log(2));
        setTimeout(() => console.log(6));
    微任务：
        Promise.resolve().then(() => console.log(3));
        Promise.resolve().then(() => setTimeout(() => console.log(4)));
        Promise.resolve().then(() => console.log(5));
 * 第一轮结果： 1 7


 * 第二轮开始：
 *  1. 执行微任务，取出队列中的第一项：console.log(3)); => 3
 *  2. 执行微任务，取出队列中的第二项，此时遇到宏任务 setTimeout(() => console.log(4)) 加入到宏任务队列
 *  3. 执行微任务，取出队列中的第三项：console.log(5)); => 5
 *  4. 此时微任务队列为空，执行宏任务队列第一项：setTimeout(() => console.log(2)); => 2
 *  5. 此时微任务队列为空，执行宏任务队列第二项：setTimeout(() => console.log(6)); => 6
 *  6. 此时微任务队列为空，执行宏任务队列第三项：setTimeout(() => console.log(4)); => 4
 *  7. 此时所有任务执行完，返回结果
    宏任务：
        setTimeout(() => console.log(2));
        setTimeout(() => console.log(6));
        setTimeout(() => console.log(4));
    微任务：
        empty
 * 第二轮结果：1 7 3 5 2 6 4

    最终结果：1 7 3 5 2 6 4
 */




// eg2:
setImmediate(function A() {
    console.log(10);
    setImmediate(function B() {
        console.log(11);
    });
});

console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

Promise.resolve().then(() => console.log(5));

setTimeout(() => console.log(6));

process.nextTick(function A() {
    console.log(8);
    process.nextTick(function B() {
        console.log(9);
    });
});

console.log(7);

/**
 * 过程省略.....
 */
// 1 7 8 9 3 5 2 6 4 10 11
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
