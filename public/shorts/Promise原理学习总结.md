# 手写 Promise 原理，最通俗易懂版！！！

### `前言`

大家好，这篇文章是我这段时间看到把`Promise 以最通俗的话` 讲的很清楚的一篇文章，我也是重新学习了`Promise原理`，文章内容大多借鉴原创。

```javascript

	let p1 = new Promise((resolve, reject) => {
	 resolve('成功');
	 reject('失败');
	});
	console.log(p1);

	let p2 = new Promise((resolve, reject) => {
	 reject('失败');
	 resolve('成功');
	});
	console.log(p2);

	let p3 = new Promise((resolve, reject) => {
	 throw('报错');
	});
	console.log(p3);

	p1: Promise {<fulfilled>: '成功'}
	 [[Prototype]]: Promise
	 [[PromiseState]]: "fulfilled"
	 [[PromiseResult]]: "成功"

	p2: Promise {<rejected>: "失败"}
	 [[Prototype]]: Promise
	 [[PromiseState]]: "rejected"
	 [[PromiseResult]]: "失败"

	p3: Promise {<rejected>: "报错"}
	 [[Prototype]]: Promise
	 [[PromiseState]]: "rejected"
	 [[PromiseResult]]: "报错"

```

---

四个知识点：

1、执行`resolve`，Promise 状态会变成`fulfilled`；

2、执行`reject`，Promise 状态会变成`rejected`；

3、Promise 只以`第一次`为准，第一次成功就永久为`fulfilled`，第一次失败就永远的状态为`rejected`；

4、Promise 中有`throw`的话，相当于执行了`reject`；

---

### 1、实现 resolve 和 reject

**注意：Promise 的初始状态是 pending 状态**

1、这里很重要的一步是`resolve和reject要绑定this`，为什么要绑定`this`呢？

-   这是为了 resolve 和 reject 的`this指向`永远指向当前的`MyPromise实例（自定义实例）`，防止随着函数的执行环境的改变而改变；

```javascript
class MyPromise {
	constructor(executor) {
		// 初始值
		this.initValue();

		// 初始化this指向
		this.initBind();

		// 执行传过来的函数
		executor(this.resolve, this.reject);
	}

	initValue() {
		// 初始化值
		this.PromiseResult = null; // 终值
		this.PromiseState = 'pending'; // 状态
	}

	initBind() {
		// 初始化this
		this.resolve = this.resolve.bind(this);
		this.reject = this.reject.bind(this);
	}

	resolve(value) {
		// 如果执行resolve，状态变成fulfilled
		this.PromiseState = 'fulfilled';
		// 终值为传进来的值
		this.PromiseResult = value;
	}

	reject(reason) {
		// 如果不执行reject，状态变为rejected
		this.PromieState = 'rejected';
		// 终值为传进来的reason
		this.PromiseResult = reason;
	}
}
```

测试 MyPromise

```javascript
	cosnt test1 = new MyPromise((resovle,reject) => {
		resolve('成功');
	})
	console.log(test1);
	//  MyPromise {PromiseState: 'fulfilled', PromiseResult: '成功'}

	cosnt test2 = new MyPromise((resovle,reject) => {
		resolve('失败');
	})
	console.log(test2);
	//  MyPromise {PromiseState: 'rejected', PromiseResult: '失败'}
```

### 2、状态不可变

上面的代码是有问题的，上面问题呢？看下面的代码：

```javascript
	cosnt test1 = new MyPromise((resovle,reject) => {
		resolve('成功');
		reject('失败');
	})
	console.log(test1);
	// MyPromise {PromiseState: 'rejected', PromiseResult: '失败'}
```

-   正确的状态是`fulfilled`，结果是`成功`，这里`明显没有以第一次为准`。
-   上面说了，Promise 只以`第一次为准`，第一次成功就为`fulfilled`，第一次失败就永远状态为`rejected`，具体的流程呢？下面是关于这个流程的图：
    1.  Promise 有三种状态
        -   `pending`：等待中，也就是初始状态
        -   `fulfilled`：成功状态
        -   `rejected`：失败状态
-   这时状态一旦从`pending`变为`fulfilled或者rejected`，那么次 Promise 实例的状态就定死了。

![截屏2021-08-01 下午12.33.10.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c9636d819ef4bc78af95fb80c9a7be4~tplv-k3u1fbpfcp-watermark.awebp)

解决问题也会容易，加个判断条件就可以：

```javascript
	resolve(value) {
        // state是不可变的
+       if (this.PromiseState !== 'pending') return;
        // 如果执行resolve，状态变为fulfilled
        this.PromiseState = 'fulfilled';
        // 终值为传进来的值
        this.PromiseResult = value;
    }

    reject(reason) {
        // state是不可变的
+        if (this.PromiseState !== 'pending') return;
        // 如果执行reject，状态变为rejected
        this.PromiseState = 'rejected';
        // 终值为传进来的reason
        this.PromiseResult = reason;
    }

```

再次测试 MyPromise：

```javascript
const test1 = new MyPromise((resolve, reject) => {
	// 只以第一次为准
	resolve('成功');
	reject('失败');
});

console.log(test1);
// MyPromise { PromiseState: 'fulfilled', PromiseResult: '成功' }
```

### 3、throw

![截屏2021-08-01 下午12.57.17.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa2e17b24a124dadba540e86350f1302~tplv-k3u1fbpfcp-watermark.awebp)
Promise 中有`throw`的话，就相当于执行了`reject`。这就要使用`try catch`了。

```javascript
+        try {
            // 执行传进来的函数
            executor(this.resolve, this.reject)
+        } catch (e) {
            // 捕捉到错误直接执行reject
+            this.reject(e)
+        }
```

看看效果：

```javascript
const test3 = new MyPromise((resolve, reject) => {
	throw '失败';
});

console.log(test3);
// MyPromise { PromiseState: 'rejected', PromiseResult: '失败' }
```

#### > then

咱们平时使用 then 方法是这么用的：

```javascript
/上面代码是精简版，不利于我们阅读，大家可以参考精简版下面这段代码/;

// 马上输出 ”成功“
const p1 = new Promise((resolve, reject) => {
	resolve('成功');
}).then(
	res => console.log(res),
	err => console.log(err)
);

const p1 = new Promise((resolve, reject) => {
	resolve('成功');
}).then(
	res => {
		console.log(res);
	},
	err => {
		console.log(err);
	}
);

// 1秒后输出 ”失败“
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('失败');
	}, 1000);
}).then(
	res => console.log(res),
	err => console.log(err)
);

const p2 = new Promise((resovle, reject) => {
	setTimeout(() => {
		reject('失败');
	}, 1000);
}).then(
	res => {
		console.log(res);
	},
	err => {
		console.log(err);
	}
);

// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => 2 * res,
		err => console.log(err)
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);

const p3 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => {
			return 2 * res;
		},
		err => {
			console.log(err);
		}
	)
	.then(
		res => {
			console.log(res);
		},
		err => {
			console.log(err);
		}
	);
```

---

总结点如下:

-   `then`接受两个回调，一个是`成功回调`，一个是`失败回调`。
-   当 Promise 中的状态为`fulfilled`执行`成功回调`，为`rejected`执行`失败回调`。
-   如 resolve 或 reject 在定时器中，`则定时器结束后再执行then`。
-   then 执行`链式调用`，下一次 then 执行`受上一次then返回值的影响`。

---

接下来我们一步一步来实现

**1、实现 then**

```javascript
		then(onFulfilled, onRejected) {
			// 接收两个回调 onFulfilled, onRejected

			// 参数校验，确保一定是函数
			onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
			onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

			if (this.PromiseState === 'fulfilled') {
				// 如果当前为成功状态，执行第一个回调
				onFulfilled(this.PromiseResult)
			} else if (this.PromiseState === 'rejected') {
				// 如果当前为失败状态，执行第二哥回调
				onRejected(this.PromiseResult)
			}
		}
```

测试一下：

```javascript
/上面代码是精简版，不利于我们阅读，大家可以参考精简版下面这段代码/;

// 输出 ”成功“
const test = new MyPromise((resolve, reject) => {
	resolve('成功');
}).then(
	res => console.log(res),
	err => console.log(err)
);

const test = new MyPromise((resolve, reject) => {
	resolve('成功');
}).then(
	res => {
		console.log(res);
	},
	err => {
		console.log(err);
	}
);
```

**2.定时器情况**
上面的方法实现了`then`的基本功能，那如果是`定时器`该怎么办呢？

```javascript
/上面代码是精简版，不利于我们阅读，大家可以参考精简版下面这段代码/;

// 1秒后输出 ”成功“
const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('失败');
	}, 1000);
}).then(
	res => console.log(res),
	err => console.log(err)
);

const test = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		reject('失败');
	}, 1000);
}).then(
	res => {
		console.log(res);
	},
	err => {
		console.log(err);
	}
);
```

我们不能确保 1s 后才执行 then 函数，但是我们可以保证 1s 后再执行 then 里面的回调，可能这里大家有点懵，下面同样用一张图来解释：
![截屏2021-08-01 下午9.05.24.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ba5a2544b1144548cdc63362fa27d23~tplv-k3u1fbpfcp-watermark.awebp)

也就是在这 1s 的时间内，我们可以先把 then 里面的两个回调保存起来，然后等到 1s 过后，执行 resolve 或者 reject，然后再去判断状态，并且判断要去执行刚刚保存的两个回调中的那一个回调。

此时，问题就来了，我们怎么知道当前 1s 还没走完甚至还没开始走呢？其实很好判断，只有状态是`pending`，那就证明定时器还没跑完，以为如果定时器跑完的话，那状态肯定就不是`pending`，而是`fulfilled或者rejected`。

那还有一个问题，那我们用什么来保存这些回调呢？建议大家使用`数组`，因为一个 promise 实例可能会`多次then`，用数组把一个一个都保存起来。

```javascript

	initValue() {
        // 初始化值
        this.PromiseResult = null // 终值
        this.PromiseState = 'pending' // 状态
+        this.onFulfilledCallbacks = [] // 保存成功回调
+        this.onRejectedCallbacks = [] // 保存失败回调
    }

    resolve(value) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执行resolve，状态变为fulfilled
        this.PromiseState = 'fulfilled'
        // 终值为传进来的值
        this.PromiseResult = value
        // 执行保存的成功回调
+        while (this.onFulfilledCallbacks.length) {
+            this.onFulfilledCallbacks.shift()(this.PromiseResult)
+        }
    }

    reject(reason) {
        // state是不可变的
        if (this.PromiseState !== 'pending') return
        // 如果执行reject，状态变为rejected
        this.PromiseState = 'rejected'
        // 终值为传进来的reason
        this.PromiseResult = reason
        // 执行保存的失败回调
+        while (this.onRejectedCallbacks.length) {
+            this.onRejectedCallbacks.shift()(this.PromiseResult)
+        }
    }

    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        if (this.PromiseState === 'fulfilled') {
            // 如果当前为成功状态，执行第一个回调
            onFulfilled(this.PromiseResult)
        } else if (this.PromiseState === 'rejected') {
            // 如果当前为失败状态，执行第二哥回调
            onRejected(this.PromiseResult)
+        } else if (this.PromiseState === 'pending') {
+            // 如果状态为待定状态，暂时保存两个回调
+            this.onFulfilledCallbacks.push(onFulfilled.bind(this))
+            this.onRejectedCallbacks.push(onRejected.bind(this))
+        }
    }
```

写完代码，我们来测试一下，看看效果：

```javascript
const test2 = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('成功'); // 1秒后输出 成功
		// resolve('成功') // 1秒后输出 失败
	}, 1000);
}).then(
	res => console.log(res),
	err => console.log(err)
);

const test = new MyPromise((resolve, reject) => {
	setTimeout(() => {
		resolve('成功'); // 1秒后输出 成功
		// resolve('成功') // 1秒后输出 失败
	}, 1000);
}).then(
	res => {
		console.log(res);
	},
	err => {
		console.log(err);
	}
);
```

**3、链式调用**

then 执行`链式调用 `，下一次 then 执行`受上一次then返回值的影响`，大家可以看下面这个例子：

```javascript
// 链式调用 输出 200
const p3 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => 2 * res,
		err => console.log(err)
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);

const p3 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => {
			return 2 * res;
		},
		err => {
			console.log(err);
		}
	)
	.then(
		res => {
			console.log(res);
		},
		err => {
			console.log(err);
		}
	);

// 链式调用 输出300
const p4 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => new Promise((resolve, reject) => resolve(3 * res)),
		err => console.log(err)
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);

const p4 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => {
			return new Promise((resolve, reject) => {
				resolve(3 * res);
			});
		},
		err => {
			console.log(err);
		}
	)
	.then(
		res => {
			console.log(res);
		},
		err => {
			console.log(err);
		}
	);
```

---

从上面的例子中，可以得到下面几个知识点：

-   then 方法本身会返回一个新的 Promise 对象。
-   如果返回值是 promise 对象，返回值为成功，新 promise 也就是成功。
-   如果返回值是 promise 对象，返回值为失败，新 promise 也就是失败。
-   如果返回值非 promise 对象，新 promise 对象就是成功，值为此返回值。

---

大家都知道 then 是 promise 上的方法，那如何实现 then 完还能再次 then 呢？很简单，then 执行后会返回一个`promise对象`就行了，就能保证 then 完还能继续执行 then：
![截屏2021-08-01 下午9.06.02.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62a3c3afcf0a4262a1a7e52231c34dbc~tplv-k3u1fbpfcp-watermark.awebp)

实现代码：

```javascript
	then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled, onRejected

        // 参数校验，确保一定是函数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }


        var thenPromise = new MyPromise((resolve, reject) => {

            const resolvePromise = cb => {
                try {
                    const x = cb(this.PromiseResult)
                    if (x === thenPromise) {
                        // 不能返回自身哦
                        throw new Error('不能返回自身。。。')
                    }
                    if (x instanceof MyPromise) {
                        // 如果返回值是Promise
                        // 如果返回值是promise对象，返回值为成功，新promise就是成功
                        // 如果返回值是promise对象，返回值为失败，新promise就是失败
                        // 谁知道返回的promise是失败成功？只有then知道
                        x.then(resolve, reject)
                    } else {
                        // 非Promise就直接成功
                        resolve(x)
                    }
                } catch (err) {
                    // 处理报错
                    reject(err)
                }
            }

            if (this.PromiseState === 'fulfilled') {
                // 如果当前为成功状态，执行第一个回调
                resolvePromise(onFulfilled)
            } else if (this.PromiseState === 'rejected') {
                // 如果当前为失败状态，执行第二个回调
                resolvePromise(onRejected)
            } else if (this.PromiseState === 'pending') {
                // 如果状态为待定状态，暂时保存两个回调
                // 如果状态为待定状态，暂时保存两个回调
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
            }
        })

        // 返回这个包装的Promise
        return thenPromise

    }
```

测试一下，看一下效果：

```javascript
/上面代码是精简版，不利于我们阅读，大家可以参考精简版下面这段代码/;

const test3 = new MyPromise((resolve, reject) => {
	resolve(100); // 输出 状态：成功 值： 200
	// reject(100) // 输出 状态：失败 值：300
})
	.then(
		res => 2 * res,
		err => 3 * err
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);

const test3 = new Promise((resolve, reject) => {
	resolve(100);
})
	.then(
		res => {
			new Promise((resolve, reject) => {
				reject(2 * res);
			});
		},
		err => {
			new Promise((resolve, reject) => {
				resolve(2 * res);
			});
		}
	)
	.then(
		res => {
			console.log(111, res);
		},
		err => {
			console.log(222, err);
		}
	);

const test4 = new MyPromise((resolve, reject) => {
	resolve(100); // 输出 状态：失败 值：200
	// reject(100) // 输出 状态：成功 值：300
	// 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
})
	.then(
		res => new MyPromise((resolve, reject) => reject(2 * res)),
		err => new MyPromise((resolve, reject) => resolve(2 * res))
	)
	.then(
		res => console.log(res),
		err => console.log(err)
	);

const test5 = new Promise((resolve, reject) => {
	// resolve(100);
	reject(100);
})
	.then(
		res => {
			return 2 * res;
		},
		err => {
			return 3 * err;
		}
	)
	.then(
		res => {
			console.log(res);
		},
		err => {
			console.log(err);
		}
	);
```

### 4、微任务

看过`js执行机制`的兄弟都知道，then 方法是`微任务`，啥叫微任务呢？其实不知道也不要紧，我通过下面例子让你知道：

```javascript

	const p = new Promise((resolve, reject) => {
		resolve(1)
	}).then(res => console.log(res), err => console.log(err))

	console.log(2)

	输出顺序是 2 1

	const p = new Promise((resolve, reject) => {
		resolve(1);
	}).then(
		res => {
			console.log(res);
		},
		err => {
			console.log(err);
		}
	)
	console.log(2);

	// 输出值：2 1

```

为啥不是 1 2 呢？因为 then 是个微任务啊。。。同样，我们也要给我们的 MyPromise 加上这个特性(我这里使用定时器，大家别介意哈).

只需要让`resolvePromise函数`异步执行就可以了

```javascript
const resolvePromise = cb => {
	setTimeout(() => {
		try {
			const x = cb(this.PromiseResult);
			if (x === thenPromise) {
				// 不能返回自身哦
				throw new Error('不能返回自身。。。');
			}
			if (x instanceof MyPromise) {
				// 如果返回值是Promise
				// 如果返回值是promise对象，返回值为成功，新promise就是成功
				// 如果返回值是promise对象，返回值为失败，新promise就是失败
				// 谁知道返回的promise是失败成功？只有then知道
				x.then(resolve, reject);
			} else {
				// 非Promise就直接成功
				resolve(x);
			}
		} catch (err) {
			// 处理报错
			reject(err);
		}
	});
};
```

测试一下：

```javascript
	const test4 = new MyPromise((resolve, reject) => {
		resolve(1)
	}).then(res => console.log(res), err => console.log(err))

	console.log(2)

	输出顺序 2 1


	const p = new Promise((resolve, reject) => {
		resolve(1);
	}).then(
		res => {
			console.log(res);
		},
		err => {
			console.log(err);
		}
	)
	console.log(2);

	// 输出值：2 1
```

#### > Promise 的其他方法

##### `all`

-   接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
-   如果所有 Promise 都成功，则返回成功结果数组
-   如果有一个 Promise 失败，则返回这个失败结果

```javascript
	static all(promises) {
        const result = []
        let count = 0
        return new MyPromise((resolve, reject) => {
            const addData = (index, value) => {
                result[index] = value
                count++
                if (count === promises.length) resolve(result)
            }
            promises.forEach((promise, index) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData(index, res)
                    }, err => reject(err))
                } else {
                    addData(index, promise)
                }
            })
        })
    }
```

##### `race`

-   接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
-   哪个 Promise 最快得到结果，就返回那个结果，无论成功失败

```javascript
	 static race(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(promise)
                }
            })
        })
    }
```

#### `allSettled`

-   接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
-   把每一个 Promise 的结果，集合成数组，返回

```javascript

	static allSettled(promises) {
        return new Promise((resolve, reject) => {
            const res = []
            let count = 0
            const addData = (status, value, i) => {
                res[i] = {
                    status,
                    value
                }
                count++
                if (count === promises.length) {
                    resolve(res)
                }
            }
            promises.forEach((promise, i) => {
                if (promise instanceof MyPromise) {
                    promise.then(res => {
                        addData('fulfilled', res, i)
                    }, err => {
                        addData('rejected', err, i)
                    })
                } else {
                    addData('fulfilled', promise, i)
                }
            })
        })
    }

```

#### `any`

any 与 all 相反

-   接收一个 Promise 数组，数组中如有非 Promise 项，则此项当做成功
-   如果有一个 Promise 成功，则返回这个成功结果
-   如果所有 Promise 都失败，则报错

```javascript

	static any(promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            promises.forEach((promise) => {
                promise.then(val => {
                    resolve(val)
                }, err => {
                    count++
                    if (count === promises.length) {
                        reject(new AggregateError('All promises were rejected'))
                    }
                })
            })
        })
    }
}
```
### Promise 递归调用
```js
// 错误代码
let count = 0;
const promise2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    })
};

const promiseFunction = () => {
    return new Promise((resolve, reject) => {
        promise2().then(() => {
            if (count < 6) {
                count += 1;
                return promiseFunction();
            } else {
                resolve(`Count reached 6, resolving promise.`);
            }
        })
    });
};

promiseFunction().then(message => {
    console.log(message);
});


// 这样写在 promiseFunction().then 的回调中是一直拿不到 message 信息的。
```
```js
// 方法一：resolve(promiseFunction()) 则表示你在 resolve 方法里传入 promiseFunction() 的结果
let count = 0;
const promise2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    })
};

const promiseFunction = () => {
    return new Promise((resolve, reject) => {
        promise2().then(() => {
            if (count < 6) {
                count += 1;
+                resolve(promiseFunction());
            } else {
                resolve(`Count reached 6, resolving promise.`);
            }
        })
    });
};

promiseFunction().then(message => {
    console.log(message);
});

// 方法二:
let count = 0;

const promise2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
};

const promiseFunction = () => {
    return promise2().then(() => {
        if (count < 6) {
            count += 1;
            // 这里需要返回 Promise 对象，否则外部的 then 方法无法接收到内部的 resolve 值。
            return promiseFunction();
        } else {
            return `Count reached 6, resolving promise.`;
        }
    });
};

promiseFunction().then(message => {
    console.log(message);
});


// 方法三：promiseFunction().then(resolve) 表示你先执行 promiseFunction()，然后在它的结果上调用 then 方法。
let count = 0;

const promise2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
};

const promiseFunction = () => {
    return promise2().then(() => {
        if (count < 6) {
            count += 1;
            // 这里需要返回 Promise 对象，否则外部的 then 方法无法接收到内部的 resolve 值。
            promiseFunction().then(resolve);
        } else {
            return `Count reached 6, resolving promise.`;
        }
    });
};

promiseFunction().then(message => {
    console.log(message);
});
```
