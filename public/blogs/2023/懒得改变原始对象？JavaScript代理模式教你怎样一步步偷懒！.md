## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 懒得改变原始对象？JavaScript代理模式教你怎样一步步偷懒！

### 何为代理模式
-   例如，你想预约一家公司的董事长会面，按照正常流程，你只能通过先联系他的秘书，然后跟他的秘书预约时间，约好时间后你们两个才能会面。(也就是说，代理模式的关键是有个中间者来协调你与对方之间的事情，只能通过中间者将事情转达给另一方)。
![Alt text](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/1266557bf0a5/image.png)

### 代理模式的应用
-   在 Web 开发中，我们通常会在网站或程序中用到图片，当某张图片过大时或网络不佳时，图片区域就是显示一段空白或者直接没有显示(没有设置图片区域高度，待图片加载完成后才会完成自适应图片高度来进行 layout)。友好的做法是在真正的图片还未加载完成时图片区域显示一个loading占位符。
-   如下代码：
```js
var createImg = (function () {
    var imgNode = document.createElement("img");
    document.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        },
    };
})();

var proxyImg = (function () {
    var img = new Image();
    img.onload = function () {
        createImg.setSrc(this.src);
    };
    return {
        setSrc: function (src) {
            createImg.setSrc("loading.gif");
            img.src = src;
        },
    };
})();

proxyImg.setSrc("bg.jpg");
```

### 代理的意义
-   可能会有人疑惑，为什么一个图片预加载功能，非要使用什么模式来实现，不适用照样也能实现啊，如下：
```js
var createImg = (function () {
    var imgNode = document.createElement("img");
    document.appendChild(imgNode);

    var img = new Image();
    img.onload = function () {
        imgNode.src = img.src;
    };

    return {
        setSrc: function (src) {
            imgNode.src = "loading.gif";
            img.src = src;
        },
    };
})();

createImg.setSrc("bg.jpg");
```
-   为了说明为什么要使用代理模式的意义，我们必须引入一个面向对象的设计原则——单一职责原则，单一职责原则指的是：`对于一个类而言，应该仅有一个引起它改变的入口`。如果一个对象承担了很多职责，那这个对象将变得很臃肿,那引起它变化的原因可能会有很多个。如果一个对象承担的职责过多，就等于把这些职责耦合在了一起，这种耦合会导致代码很脆弱和低内聚的设计。
-   在面向对象的程序设计中，大多数情况下，若违反其他任何原则，同时将违反开放-封闭原则。

### 代理合并请求数据
-   比如有一个定时任务，会每个一段时间要往数据库中存储一些数据，如果当有新数据进来时，就调用存储数据的接口，这样既浪费性能，代码的执行效率也不会太高。那要求我们写一个
-   可参考如下：
```js
// 真实对象类 - 用于存储数据
class Storage {
    constructor() {
        this.data = [];
    }

    storeData(data) {
        // 模拟存储数据的操作
        console.log(`Storing data: ${data}`);
        this.data.push(data);
    }

    displayData() {
        console.log("Stored data:", this.data);
    }
}

// 代理对象类 - 延迟存储操作
class ProxyStorage {
    constructor() {
        this.storage = new Storage();
        this.pendingData = [];
        this.timer = null;
        this.delay = 5000; // 定时存储的延迟时间设定为5秒
    }

    storeData(data) {
        this.pendingData.push(data);
        this.scheduleStorage();
    }

    scheduleStorage() {
        if (!this.timer) {
            this.timer = setTimeout(() => {
                this.flushPendingData();
                this.timer = null;
            }, this.delay);
        }
    }

    flushPendingData() {
        this.pendingData.forEach((data) => {
            this.storage.storeData(data);
        });
        this.pendingData = [];
    }

    displayData() {
        this.storage.displayData();
    }
}

// 使用代理对象进行数据存储
const proxyStorage = new ProxyStorage();

// 模拟数据产生
function generateData() {
    const data = Math.random(); // 这里使用随机数作为数据示例
    // 将数据添加到带存储的数据队列中，并启动定时器来延迟存储操作。当在延迟时间内再次调用 storeData 时，则会每次更新带存储的数据队列数据。当定时器触发时，代理对象则会调用 Storage 对象的存储方法，将所有带存储的数据存储起来。
    proxyStorage.storeData(data);
}

// 调用 generateData() 来模拟产生数据
// 在某一个时间段内连续产生数据，但实际触发存储的时间是延迟了的
setInterval(generateData, 1000);

// 模拟数据存储结束后，手动调用 displayData() 显示已存储的数据
setTimeout(() => {
    proxyStorage.displayData();
}, 15000); // 这里设定15秒后结束数据存储并展示存储结果
```
-   上面我们实现了基本的数据定时存储功能，但并不完整，如果我们想再加一个暂停，重新开始，停止的逻辑，那如何编写呢？
-   如下：
```js
// 真实对象类 - 用于存储数据
class Storage {
    constructor() {
        this.data = [];
    }

    storeData(data) {
        // 模拟存储数据的操作
        console.log(`Storing data: ${data}`);
        this.data.push(data);
    }

    displayData() {
        console.log("Stored data:", this.data);
    }
}

// 代理对象类 - 延迟存储操作和定时暂停
class ProxyStorage {
    constructor() {
        this.storage = new Storage();
        this.pendingData = [];
        this.timer = null;
        this.delay = 5000; // 定时存储的延迟时间设定为5秒
        this.paused = false; // 初始状态为未暂停
    }

    storeData(data) {
        this.pendingData.push(data);
        this.scheduleStorage();
    }

    scheduleStorage() {
        if (!this.paused && !this.timer) {
            this.timer = setTimeout(() => {
                this.flushPendingData();
                this.timer = null;
            }, this.delay);
        }
    }

    flushPendingData() {
        this.pendingData.forEach((data) => {
            this.storage.storeData(data);
        });
        this.pendingData = [];
    }

    pause() {
        this.paused = true;
        clearTimeout(this.timer);
        this.timer = null;
    }

    restart() {
        this.paused = false;
        this.scheduleStorage();
    }

    stop() {
        this.pause();
        this.pendingData = [];
    }

    displayData() {
        this.storage.displayData();
    }
}

// 使用代理对象进行数据存储
const proxyStorage = new ProxyStorage();

// 模拟数据产生
function generateData() {
    const data = Math.random(); // 这里使用随机数作为数据示例
    proxyStorage.storeData(data);
}

// 调用 generateData() 来模拟产生数据
// 在某一个时间段内连续产生数据，但实际触发存储的时间是延迟了的
const intervalId = setInterval(generateData, 1000);

// 模拟数据存储进行一段时间后，停止定时器并清空待存储的数据
setTimeout(() => {
    // proxyStorage.stop();
    proxyStorage.pause();
    console.log("Timer stopped and pending data cleared");
}, 8000); // 这里设定8秒后停止定时器和清空待存储的数据

// 模拟数据存储结束后，手动调用 displayData() 显示已存储的数据
setTimeout(() => {
    proxyStorage.displayData();
}, 15000); // 这里设定15秒后结束数据存储并展示存储结果

// 模拟数据存储恢复定时器
setTimeout(() => {
    proxyStorage.restart();
    console.log("Timer restarted");
    clearInterval(intervalId);
}, 20000); // 这里设定20秒后恢复定时器
```

### 缓存代理
-   在为了一些开销较大的运算结果和接口请求时，我们需要使用缓存代理来进行优化，为防止重复的请求造成性能浪费。
-   题目如下：
-   通过代理对象来实现对电影信息的缓存
    1.  创建一个真实对象 MovieService，其中包含一个方法 getMovie(id) 用于获取电影信息。模拟返回一些电影数据。
    2.  创建一个代理对象 CachedMovieServiceProxy，通过代理对象实现对电影信息的缓存。
    3.  代理对象内部维护一个缓存对象 cache，在第一次请求时将电影信息存入缓存，并在后续请求时直接从缓存中获取。
    4.  当调用代理对象的 getMovie(id) 方法时，如果缓存中存在对应的电影信息，则直接返回缓存数据；否则，调用真实对象的 getMovie(id) 方法获取电影信息，并将结果存入缓存。
-   示例输入和输出：
```js
// input：
const movieServiceProxy = new CachedMovieServiceProxy();

console.log(movieServiceProxy.getMovie(1)); // 输出电影信息并缓存
console.log(movieServiceProxy.getMovie(2)); // 输出电影信息并缓存
console.log(movieServiceProxy.getMovie(1)); // 从缓存中输出电影信息


// output：
// Fetching movie with id 1 from the database...
// Caching movie with id 1...
{ id: 1, title: "Movie A", director: "Director A" }

// Fetching movie with id 2 from the database...
// Caching movie with id 2...
{ id: 2, title: "Movie B", director: "Director B" }

// Retrieving movie with id 1 from cache...
{ id: 1, title: "Movie A", director: "Director A" }
```
-   实现如下：
```js
// 真实对象类 - 电影服务
class MovieService {
    constructor() {
        // 模拟电影数据
        this.movies = [
            { id: 1, title: "Movie A", director: "Director A" },
            { id: 2, title: "Movie B", director: "Director B" },
            { id: 3, title: "Movie C", director: "Director C" },
        ];
    }

    // 获取电影信息
    getMovie(id) {
        console.log(`Fetching movie with id ${id} from the database...`);
        // 模拟从数据库获取电影信息的操作
        const movie = this.movies.find((movie) => movie.id === id);
        return movie;
    }
}

// 代理对象类 - 缓存代理
class CachedMovieServiceProxy {
    constructor() {
        this.movieService = new MovieService();
        this.cache = {};
    }

    // 获取电影信息（代理方法）
    getMovie(id) {
        if (this.cache[id]) {
            // 如果缓存中有对应的电影信息，则直接返回缓存数据
            console.log(`Retrieving movie with id ${id} from cache...`);
            return this.cache[id];
        } else {
            // 否则，调用真实对象的方法获取电影信息，并将结果存入缓存
            const movie = this.movieService.getMovie(id);
            console.log(`Caching movie with id ${id}...`);
            this.cache[id] = movie;
            return movie;
        }
    }
}

// 使用代理对象获取电影信息
const movieServiceProxy = new CachedMovieServiceProxy();

console.log(movieServiceProxy.getMovie(1)); // 第一次请求，从真实对象获取并缓存
console.log(movieServiceProxy.getMovie(2)); // 第二次请求，从真实对象获取并缓存
console.log(movieServiceProxy.getMovie(1)); // 第三次请求，从缓存中获取
```

### 代理模式的优缺点
-   优点：
    1.  控制访问/增加安全性：可通过代理对象对真实对象的访问进行控制，增加了对真实对象的保护
    2.  延迟初始化：将高开销的操作延迟到真正需要的时候，可优化一些性能
    3.  封装性：可隐藏对象的复杂性，只需要与代理对象打交道即可
-   缺点：
    1.  增加复杂性：虽然代理模式可分离关注点，但同时也增加了代码的复杂性，因为需要创建和管理代理对象
    2.  透明性问题：虽然透明性是一个优点，但如果过度使用，可能导致代码难以理解和调试。
    3.  性能开销：代理对象需要拦截所有对原始对象的访问，这会导致一些性能开销。

### 代理模式的适用场景
1.  访问控制：可用于限制对对象的访问，例如来控制对一些敏感数据的访问。
2.  虚拟代理：对一个对象需要从网络上加载大量的数据时，可使用虚拟代理来优化，在需要时再加载数据。
3.  保护代理：由于代理模式可以控制对真实对象的访问，因此可以保护代理。
4.  缓存代理：可用于实现一个高度重用，并且这个操作很好使的情况。
5.  智能引用代理：当需要在访问对象时需要执行一些额外的操作时，可使用智能引用代理。
6.  日志记录：可用于在调用真实对象的方法前后进行日志记录，包括参数，返回结果等信息，便于调试和排查问题。

###### Tip: 文章部分内容参考于`曾探`大佬的《JavaScript 设计模式与开发实践》。文章仅做个人学习总结和知识汇总

## 特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`
## 往期推荐：
-   [this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（一）](https://mp.weixin.qq.com/s/MWWd5xVNCccgVoBtSnbDzA)
-   [this 之谜揭底：从浅入深理解 JavaScript 中的 this 关键字（二）](https://mp.weixin.qq.com/s/7uGjOgaZVG3CgdF_ql9j8g)
-   [理论+实践：从原型链到继承模式，掌握 Object 的精髓(一)](https://mp.weixin.qq.com/s/bIRQLHOFJnhF10RCG-eSKg)
-   [理论+实践：从原型链到继承模式，掌握 Object 的精髓(二)](https://mp.weixin.qq.com/s/ZTfybLBAswv8xcYtDRIwzQ)
-   [JavaScript 实践+理论(总结篇)：作用域、闭包、this、对象原型](https://mp.weixin.qq.com/s/rrwqk5wDGMEi4Uae8uDdqg)
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
