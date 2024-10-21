# JavaScript中的包装类型详解

-   在 JavaScript 中，我们有基本类型和对象类型两种数据类型。
-   基本类型包括 `String`，`Number`，`Boolean`，`null`，`undefined` 和 `Symbol`。然而，当我们需要在这些基本类型上调用方法时，就需要用到 JavaScript 的包装类型。

## 什么是包装类型？

-   包装类型是 JavaScript 中的一种特殊对象，它们将基本类型的值“包装”在对象中，使我们能够在基本类型上调用方法。JavaScript 提供了三种包装类型：`String`，`Number` 和 `Boolean`。

-   例如，当我们在一个字符串上调用方法时，JavaScript 会临时将其转换（或者说“包装”）为一个对象，这样就可以调用方法了。

```javascript
var str = 'hello';
console.log(str.toUpperCase()); // 输出 "HELLO"
```

-   在这个例子中，`str` 是一个字符串基本类型，但我们可以在它上面调用 `toUpperCase` 方法。这是因为 JavaScript 在后台临时将 `str` 包装成了一个 `String` 对象，然后在这个对象上调用了 `toUpperCase` 方法。

## 包装类型的特性

-   值得注意的是，这种包装只是临时的，调用方法后，基本类型值会恢复到原来的状态。这就是所谓的包装类型。

-   此外，虽然 `null` 和 `undefined` 也是基本类型，但它们没有对应的包装类型，也没有可以调用的方法。

## 包装类型的注意事项

-   虽然包装类型在 JavaScript 中非常有用，但在使用时也需要注意一些问题。例如，虽然 `Boolean` 对象是一个包装类型，但它在布尔上下文中总是被视为 `true`，无论它包装的值是 `true` 还是 `false`。这可能会导致一些意想不到的结果。

```javascript
var bool = new Boolean(false);
if (bool) {
    console.log('run?'); // 会进到 if 条件里面吗？
}
```

-   在这个例子中，`bool` 是一个 `Boolean` 对象，其包装的值为 `false`。然而，因为 `bool` 是一个对象，所以在 `if` 语句中，它被视为 `true`，所以 `console.log` 语句总是会执行。所以打印出 `run?`。

-   总的来说，包装类型是 JavaScript 中一个重要的概念，它让我们能够在基本类型上调用方法，极大地增强了 JavaScript 的灵活性和功能性。然而，在使用时，我们也需要注意它的一些特性和潜在问题。

## 面试题
-   有可能会是面试题，先看以下代码：

```js
var a = new Boolean(false);
if (!a) {
    console.log('run?'); // 会进到 if 条件里面吗？
}
```

-   看了上面关于包装类型的介绍，那会执行到 if 里面吗？
    -   不会
-   为什么呢？

```js
// 个人的解析过程：
1. var a = new Boolean(false); 之后，a 的值为 [Boolean: false]
2. 将 a 转换为包装类型，执行 Object(a) 后值为 [Boolean: false]
3. 因为在 if 语句中的判断条件都会转换为 boolean 再进行判断，那再进行 boolean 值的转换, !!Object(a) 后值为 true
4. 而在 if 语句中的条件是取反 a，则 if 条件不成立，则 if 中的语句不执行
```

-   原因：
    1.  在 JavaScript 中，有两种类型的布尔值：基本类型的布尔值`（true 或 false）`和 `Boolean` 对象（通过 `new Boolean()` 创建的，它是一个包装对象，可以包装一个布尔值，但它本身是一个对象）。
    2.  在 JavaScript 中，所有的对象（包括 `Boolean` 对象）在布尔上下文中都被视为 `true`，无论它们包装的值是 `true` 还是 `false`。
    3.  这就是为什么 if 语句中的 `!a` 不会执行的原因，因为 `a` 是一个 `Boolean` 对象，即使它包装的值是 `false`，在布尔上下文中也被视为 `true`，所以 `!a` 的结果是 `false`。
