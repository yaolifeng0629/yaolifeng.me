## 别再被坑了! JavaScript类型检测的最佳实践

在 JavaScript 中,我们经常需要判断一个变量的类型。这个需求在编程中非常常见,因为不同类型的数据会影响到我们的代码逻辑。

JavaScript 提供了几种方法来检测数据类型,每种方法都有自己的优缺点。

## `Object.prototype.toString.call()`

这是最万能的方法。它可以准确识别所有的 JavaScript 内置类型,包括基本类型和复杂类型。不管你给它传什么数据,它都能给出一个统一格式的字符串,告诉你这个数据到底是什么类型。

它的原理是调用对象内部的 `[[Class]]` 属性。这个属性是只读的,不能被改写,所以非常可靠。

优点:

-   识别范围广,基本类型和复杂类型都能识别
-   不会受到对象自身的 `toString()` 方法的影响
-   返回结果格式统一,方便解析

缺点:

-   写起来比较啰嗦
-   如果是自定义类型,只能得到 `[object Object]`,不能进一步区分类型

```javascript
function detectType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

console.log(detectType(123)); // 'number'
console.log(detectType('abc')); // 'string'
console.log(detectType(true)); // 'boolean'
console.log(detectType(null)); // 'null'
console.log(detectType(undefined)); // 'undefined'
console.log(detectType([])); // 'array'
console.log(detectType({})); // 'object'
console.log(detectType(function () {})); // 'function'
console.log(detectType(new Date())); // 'date'
console.log(detectType(new RegExp())); // 'regexp'
console.log(detectType(new Error())); // 'error'
```

## `typeof`

这个运算符最常用,写起来简单。它可以识别基本类型和函数,但对复杂类型的识别能力有限。

优点:

-   使用简单
-   可以识别基本类型和函数

缺点:

-   无法区分数组和普通对象
-   `typeof null` 的结果是 `'object'`
-   无法识别内置对象类型,如 `Date`、`RegExp` 等

```javascript
console.log(typeof 123); // 'number'
console.log(typeof 'abc'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object' (这是一个历史遗留的 bug)
console.log(typeof []); // 'object'
console.log(typeof {}); // 'object'
console.log(typeof function () {}); // 'function'
```

## `instanceof`

`instanceof` 运算符用于测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置。

优点:

-   可以检查对象是否属于特定的类或构造函数

缺点:

-   只能检查对象类型,不能检查基本类型
-   要识别多种类型,需要多次调用

```javascript
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function () {} instanceof Function); // true
console.log(new Date() instanceof Date); // true
console.log(new RegExp() instanceof RegExp); // true
console.log(new Error() instanceof Error); // true

console.log(123 instanceof Number); // false
console.log('abc' instanceof String); // false
console.log(true instanceof Boolean); // false
```

## `constructor`

`constructor` 是对象的一个属性,指向创建该对象的构造函数。可以用它来判断对象的类型。

优点:

-   可以识别大多数对象类型,包括自定义类型

缺点:

-   如果对象的 `constructor` 属性被修改,会得到错误结果
-   `null` 和 `undefined` 没有 `constructor` 属性

```javascript
console.log((123).constructor === Number); // true
console.log('abc'.constructor === String); // true
console.log(true.constructor === Boolean); // true
console.log([].constructor === Array); // true
console.log({}.constructor === Object); // true
console.log(function () {}.constructor === Function); // true
console.log(new Date().constructor === Date); // true
console.log(new RegExp().constructor === RegExp); // true
console.log(new Error().constructor === Error); // true
```

## 总结

如果需要全面准确的类型识别,`Object.prototype.toString.call()` 是最佳选择。
如果只需要简单区分基本类型,`typeof` 就足够了。
如果要检查对象是否属于特定类型,可以用 `instanceof`。

在实际应用中,我们可以根据具体需求选择合适的方法。

## 结语

上次我开发了一个工具，可以批量清理无用的仓库。如果你感兴趣，可以去看看哦！😊

[介绍文章](https://mp.weixin.qq.com/s/t7lgc6b7xJiNhfm5vWo5-A)： https://mp.weixin.qq.com/s/t7lgc6b7xJiNhfm5vWo5-A

[GitHub 仓库地址](https://github.com/yaolifeng0629/del-repos)： https://github.com/yaolife ng0629/del-repos

如果你觉得这个工具对你有所帮助，请不要忘记给我的 GitHub 仓库 **点个 Star** ⭐！你的支持是我前进的动力！

感谢阅读，我们下次再见！

![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126660174a84/Snipaste_2023-09-08_10-32-47.png)
