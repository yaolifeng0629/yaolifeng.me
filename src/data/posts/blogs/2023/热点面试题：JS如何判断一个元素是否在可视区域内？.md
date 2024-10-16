## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，更多精彩内容敬请关注公众号最新消息。
## JS 如何判断一个元素是否在可视区域内？
-   方法一：`offsetTop、scrollTop`
-   方法二：`getBoundingClientRect()`
-   方法三：`Intersection Observer`

### 方法一：offsetTop、scrollTop
```js
// 公式
el.offsetTop - document.documentElement.scrollTop <= viewPortHeight;

// 代码实现
function isInViewPortOfOne(el) {
    // viewPortHeight 兼容所有浏览器写法
    const viewPortHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    const offsetTop = el.offsetTop;
    const scrollTop = document.documentElement.scrollTop;
    const top = offsetTop - scrollTop;
    return top <= viewPortHeight;
}
```

### 方法二：getBoundingClientRect
    -   返回值是一个 DOMRect 对象，拥有 left, top, right, bottom, x, y, width, 和 height 属性

```js
const target = document.querySelector(".target");
const clientRect = target.getBoundingClientRect();
console.log(clientRect);

// {
//   bottom: 556.21875,
//   height: 393.59375,
//   left: 333,
//   right: 1017,
//   top: 162.625,
//   width: 684
// }

// A:
// 如果一个元素在视窗之内的话，那么它一定满足下面四个条件：

// top 大于等于 0
// left 大于等于 0
// bottom 小于等于视窗高度
// right 小于等于视窗宽度

// 代码实现
function isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight =
        window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left } = element.getBoundingClientRect();

    return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
```

### 方法三：Intersection Observer
    -   Intersection Observer 即重叠观察者，从这个命名就可以看出它用于判断两个元素是否重叠，因为不用进行事件的监听，性能方面相比 getBoundingClientRect 会好很多
    -   使用步骤主要分为两步：创建观察者和传入被观察者

```js
// 第一步：创建观察者
const options = {
    // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
    // 1 表示完全被包含
    threshold: 1.0,
    root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
};

const callback = (entries, observer) => { ....}

const observer = new IntersectionObserver(callback, options);

// 通过new IntersectionObserver创建了观察者 observer，传入的参数 callback 在重叠比例超过 threshold 时会被执行`
// 上段代码中被省略的 callback
const callback = function(entries, observer) {
    entries.forEach(entry => {
        entry.time;               // 触发的时间
        entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
        entry.boundingClientRect; // 被观察者的位置举行
        entry.intersectionRect;   // 重叠区域的位置矩形
        entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
        entry.target;             // 被观察者
    });
};




// 第二步：传入被观察者
const target = document.querySelector('.target');
observer.observe(target);
```
### 完整代码
-   前两种方法
```js
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js" integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Document</title>
    <style>
        .container {
            display: flex;
            flex-wrap: wrap;
        }

        .target {
            margin: 5px;
            width: 20px;
            height: 20px;
            background: red;
        }
    </style>
</head>

<body>
    <div class="container"></div>
</body>

</html>
<script>
    (() => {
        const $container = $(".container");
        function createTargets() {
            const htmlString = new Array(10000).fill('<div class="target"></div>').join("")
            $container.html(htmlString)
        }
        createTargets();
        const $targets = $(".target");
        function isInViewPort(el){
            //方法1
            // const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            // const offsetTop = el.offsetTop;
            // const scollTop = document.documentElement.scrollTop;
            // return offsetTop-scollTop <= viewPortHeight

            // 方法2
            const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            const viewPortWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            const {top,right,left,bottom} = el.getBoundingClientRect();
            return top >= 0 && left >= 0 && bottom <= viewPortHeight && right <= viewPortWidth
        }

        //事件监听
        $(window).on("scroll",()=>{
            console.log("scroll!!");
            $targets.each((index,element)=>{
                if(isInViewPort(element)){
                    $(element).css("background-color","blue")
                }
            })
        })
    })();
</script>
```

-   第三种方法
```js
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .test {
            width: 200px;
            height: 1000px;
            background: orange;
        }

        .box {
            width: 150px;
            height: 150px;
            margin: 50px;
            background: red;
        }

        #sta {
            position: fixed;
            left: 40%;
            top: 40%;
            width: 200px;
            height: 100px;
            background: greenyellow;
        }
    </style>
</head>

<body>
    <div class="test">test</div>
    <div class="box">box</div>
    <div id="sta">初始化</div>
</body>

</html>
<script>
    (() => {
        var status_node=document.querySelector("#sta");
        const box = document.querySelector('.box');
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((item) => {
                if (item.isIntersecting) {
                    box.innerText = '进入可视区域';
                    status_node.innerText = '进入可视区域';
                    console.log('进入可视区域');
                }else{
                    box.innerText = '出去了';
                    status_node.innerText = '出去了';
                }
            })
        });
        intersectionObserver.observe(box);
    })();
</script>
```

## 特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`
## 往期推荐：
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
-   公众号回复 [加群](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) 或 [扫码](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd), 即可加入前端交流学习群，一起快乐摸鱼和学习......
-   公众号回复 [加好友](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd)，即可添加为好友
![](https://soo.run/13bdt)
