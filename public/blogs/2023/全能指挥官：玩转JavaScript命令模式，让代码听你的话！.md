## 前言
>   系列首发于公众号[『非同质前端札记』](https://mp.weixin.qq.com/s?__biz=MzkyOTI2MzE0MQ==&mid=2247485576&idx=1&sn=5ddfe93f427f05f5d126dead859d0dc8&chksm=c20d73c2f57afad4bbea380dfa1bcc15367a4cc06bf5dd0603100e8bd7bb317009fa65442cdb&token=1071012447&lang=zh_CN#rd) ，若不想错过更多精彩内容，请“星标”一下，敬请关注公众号最新消息。
## 全能指挥官：玩转JavaScript命令模式，让代码听你的话！

### 命令模式的含义
-   命令模式指的是一个执行某些特定的指令。
-   命令模式的示例 demo:
```js
// 命令接口
class Command {
    execute() {}
}

// 具体命令：打开文档
class OpenDocumentCommand extends Command {
    constructor(document) {
        super();
        this.document = document;
    }

    // 执行打开文档命令
    execute() {
        this.document.open();
    }
}

// 具体命令：保存文档
class SaveDocumentCommand extends Command {
    constructor(document) {
        super();
        this.document = document;
    }

    // 执行保存文档命令
    execute() {
        this.document.save();
    }
}

// 接收者：文档
class Document {
    open() {
        console.log("打开文档");
    }

    save() {
        console.log("保存文档");
    }
}

// 调用者：按钮
class Button {
    constructor(command) {
        this.command = command;
    }

    // 点击按钮执行命令
    click() {
        this.command.execute();
    }
}

// 使用示例
const document = new Document();

// 创建打开文档命令并关联文档对象
const openCommand = new OpenDocumentCommand(document);
// 创建保存文档命令并关联文档对象
const saveCommand = new SaveDocumentCommand(document);

// 创建按钮并关联打开文档命令
const openButton = new Button(openCommand);
// 创建按钮并关联保存文档命令
const saveButton = new Button(saveCommand);

// 点击按钮执行命令
openButton.click(); // 打开文档
saveButton.click(); // 保存文档
```

### 命令模式的特点
-   在命令模式中，Command 对象拥有更长的生命周期。还支持撤销，排队等操作。而设计模式的主题总是会把不变的事物和变化的事物分离出来，命令模式也不例外。

### JavaScript 中的命令模式
-   所谓的命令模式，就是给对象的某个方法取一个 execute 的名字，引入 command 对象和 receiver 这两个无中生有的角色无非是把简单的事情复杂化了。
-   命令模式的由来，其实是回调(callback)函数的一个面向对象的替代品。

### 宏命令
-   宏命令是一组命令的集合，可通过宏命令的方式，可一次执行一批命令。

### 完整版demo:
```js
// 命令接口
class Command {
    execute() {}
    undo() {}
    redo() {}
}

// 具体命令：打开文档
class OpenDocumentCommand extends Command {
    constructor(document) {
        super();
        this.document = document;
    }

    execute() {
        this.document.open();
    }

    undo() {
        this.document.close();
    }

    redo() {
        this.execute();
    }
}

// 具体命令：保存文档
class SaveDocumentCommand extends Command {
    constructor(document) {
        super();
        this.document = document;
    }

    execute() {
        this.document.save();
    }

    undo() {
        // 撤销保存操作，恢复文档到上一个保存点或初始状态
        this.document.restore();
    }

    redo() {
        this.execute();
    }
}

// 接收者：文档
class Document {
    constructor(name) {
        this.name = name;
        this.content = "";
        this.savedContent = "";
    }

    open() {
        console.log(`打开文档：${this.name}`);
    }

    close() {
        console.log(`关闭文档：${this.name}`);
    }

    save() {
        this.savedContent = this.content;
        console.log(`保存文档：${this.name}`);
    }

    restore() {
        this.content = this.savedContent;
        console.log(`恢复文档：${this.name}`);
    }

    setContent(content) {
        this.content = content;
        console.log(`设置文档内容：${this.name}`);
    }

    getContent() {
        return this.content;
    }
}

// 调用者：按钮
class Button {
    constructor() {
        this.commandQueue = [];
        this.undoStack = [];
        this.redoStack = [];
    }

    // 将命令加入队列
    addToQueue(command) {
        this.commandQueue.push(command);
    }

    // 执行队列中的命令
    executeQueue() {
        console.log("执行命令队列：");
        while (this.commandQueue.length > 0) {
            const command = this.commandQueue.shift();
            command.execute();
            this.undoStack.push(command);
        }
    }

    // 撤销上一次执行的命令
    undo() {
        if (this.undoStack.length === 0) {
            console.log("没有可撤销的命令");
            return;
        }

        const command = this.undoStack.pop();
        command.undo();
        this.redoStack.push(command);
        console.log("撤销上一次命令");
    }

    // 重做上一次撤销的命令
    redo() {
        if (this.redoStack.length === 0) {
            console.log("没有可重做的命令");
            return;
        }

        const command = this.redoStack.pop();
        command.redo();
        this.undoStack.push(command);
        console.log("重做上一次撤销的命令");
    }
}

// 使用示例
const document = new Document("example.txt");

// 创建按钮
const button = new Button();

// 创建打开文档命令并关联文档对象
const openCommand = new OpenDocumentCommand(document);
// 创建保存文档命令并关联文档对象
const saveCommand = new SaveDocumentCommand(document);

// 将命令加入队列
button.addToQueue(openCommand);
button.addToQueue(saveCommand);

// 执行命令队列
button.executeQueue();

// 撤销命令
button.undo();

// 重做命令
button.redo();
```
-   在这个示例中，我们首先定义了命令接口Command，其中包含execute、undo和redo方法。然后创建了两个具体的命令类OpenDocumentCommand和SaveDocumentCommand，它们分别实现了命令的执行、撤销和重做操作。
-   接着，我们定义了文档类Document作为接收者，其中包含了打开文档、关闭文档、保存文档和恢复文档的操作。
-   然后，我们创建了调用者类Button，它包含命令队列、撤销栈和重做栈的管理。通过addToQueue方法将命令加入队列，executeQueue方法执行队列中的命令，undo方法撤销上一次执行的命令，redo方法重做上一次撤销的命令。
-   在示例的最后，我们创建了文档对象、按钮对象，并关联了打开文档和保存文档命令。然后将命令加入队列，执行命令队列，撤销命令，重做命令。

### 命令模式的优缺点
-   优点：
    1.  解耦发送者和接收者：命令模式通过将请求封装为命令对象，将发送者和接收者解耦。发送者只需要知道如何触摸命令，而不需要关心具体的接收者和执行操作。
    2.  易扩展：由于命令模式将请求封装成了独立的命令对象，因此添加一个命令只需要实现一个新的命令的类，不需要修改原有的代码结构
    3.  支持队列化和延迟执行：命令模式将多个命令对象组合成一个命令队列(宏命令)，实现批量执行和撤销操作。也可以实现延迟执行，将命令对象存储起来，在需要的时候在执行。
    4.  支持撤销和重做：通过保存命令的执行历史，可实现撤销和重做操作，对于用户操作的回退和恢复非常有用。
    5.  支持日志和记录：可记录命令的执行日志，用于系统的跟踪和调试。
-   缺点：
    1.  增加了类的数量：随着引入命令模式的增加，会导致类的数量增加，增加代码的复杂性。
    2.  命令执行效率降低：由于将命令模式需要封装成对象，因此会增加一定的执行开销，对于性能要求较高的场景可能会有影响。


### 命令模式的适用场景
1.  撤销和重做
2.  异步任务处理：若在后台处理数据或执行长时间运行的操作。
3.  日志记录和系统操作记录
4.  队列和调度任务：可将命令对象添加到队列中，然后按照队列中的顺序依次执行。


### 命令模式的最佳实践
1.  封装命令：将每个操作封装为独立的命令对象
2.  使用接口和抽象类：定义一个接口和抽象类来表示命令对象，以确保命令对象具有抑制的方法和属性
3.  参数化命令：在命令对象中传递参数，使命令对象能够执行不同的操作
4.  解耦调用者和接收者：调用者只需要知道如何触发命令，而不需要了解命令的具体实现。
5.  支持的撤销操作
6.  宏命令
7.  单一职责原则：每个命令对象应该只负责一个具体的操作或请求，这样可以确保命令对象的职责清晰，代码结构清晰。
8.  代码的灵活性和可扩展性

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
