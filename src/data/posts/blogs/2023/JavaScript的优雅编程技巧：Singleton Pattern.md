## JavaScript 的优雅编程技巧：Singleton Pattern

### 定义

-   `单例模式：保证一个类仅有一个实例，并提供一个访问的全局访问点。`

### 特点

1.  `仅有一个实例对象`
2.  `全局都可访问该实例`
3.  主动实例化
4.  延迟实例化

### 类似单例模式的使用实践

1.  jQuery, lodash, moment ....
2.  电商中的购物车(因为一个用户只有一个购物车)
3.  Vue 或 React 中全局状态管理(Vuex、Redux、Pinia)
4.  全局组件

### 关键步骤及实现

-   关键步骤：`实现一个标准的单例模式其实就是用一个变量来表示是否已经为当前类创建过实例化对象，若创建过，在下次获取或创建实例时直接返回之前创建的实例化对象即可`。
-   如下代码：可称为：`简单版 单例模式`

```js
var CreateStr = function (str) {
    this.str = str;
    this.instance = null;
};

CreateStr.prototype.getStr = function () {
    console.log(this.str);
};

CreateStr.getInstance = function (str) {
    if (!this.instance) {
        this.instance = new CreateStr(str);
    }
    return this.instance;
};

var a = CreateStr.getInstance('s1');
var b = CreateStr.getInstance('s2');
console.log('a ------>', a); // CreateStr { name: 's1', instance: null }
console.log('b ------>', b); // CreateStr { name: 's1', instance: null }
a.getStr(); //  s1
b.getStr(); //  s1
console.log(a === b); // true
```

-   以上通过构造函数的方式来创建有一个问题，这个类不具有透明性（调用者并不知道这是一个单例类），因为这里使用的是 Person.getInstance 的方法来获取的实例化对象。
-   改进后：可称为：`透明版 单例模式`

```js
var CreateStr = (function () {
    var instance = null;

    return function (str) {
        if (instance) {
            return instance;
        }
        this.str = str;
        return (instance = this);
    };
})();

CreateStr.prototype.getStr = function () {
    console.log(this.str);
};

let a = new CreateStr('s1');
let b = new CreateStr('s2');

console.log('a ------>', a); // { str: 's1' }
console.log('b ------>', b); // { str: 's1' }
a.getStr(); //  s1
b.getStr(); //  s1
console.log(a === b); // true
```

-   通过以上的改进方式，主要目的是使用 new 操作符来获取单列对象。
-   但以上代码还有一个问题，就是当我们需要创建很多个字符串时，要让这个单例类变成一个可产生多个实例的类，所有我们要将管理单例的操作和对象创建的操作分离开来。
-   再次改进后：可称为：`代理版 单例模式`

```js
function CreateStr(str) {
    this.str = str;
    this.getStr();
}

CreateStr.prototype.getStr = function () {
    console.log(this.str);
};

var ProxyObj = (function () {
    var instance = null;
    return function (str) {
        if (!instance) {
            instance = new CreateStr(str);
        }
        return instance;
    };
})();

var a = new ProxyObj('s1');
var b = new ProxyObj('s2');
console.log('a ------>', a); // CreateStr { str: 's1' }
console.log('b ------>', b); // CreateStr { str: 's1' }
a.getStr(); //  s1
b.getStr(); //  s1
console.log('b ------>', a === b); // true
```

### 适用场景

1.  全局缓存管理器
2.  消息总线
3.  购物车
4.  全局状态管理
5.  全局事件管理器

### 优缺点

-   优点：
    1.  全局访问和单一实例：因为全局仅有一个实例对象，所以对单例的多个实例化都会得到的同一个实例，这就可以确保所有的对象都可访问一个实例。
    2.  节省资源：因为全局仅有一个实例对象，所以可节约系统资源，避免频繁创建和销毁对象，造成系统性能的浪费
-   缺点：
    1.  违反单一职责原则：单例模式往往负责创建和管理实例，可能会导致职责过重
    2.  紧密耦合：引入了全局访问，使代码过度依赖，难以维护和测试

#### Tip: 文章部分内容参考于`曾探`大佬的《JavaScript 设计模式与开发实践》。文章仅做个人学习总结和知识汇总
