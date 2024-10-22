### `3.npm 创建`

-   packjson -> npm init -y 一直回车（always enter） npm init 每一步配置 （every setop config）

### `4.单个 js 文件可以使用 node 运行：`

-   node fileName 即可；
-   nodemon fileName;
-   node 文件热更新 （node file hot update）

### `6.vscode 使用 bash 方式打开终端：`

1.  （1）vscode -> set -> terminal.integrated.shell.windows -> open settings.json
2.  （2）找到（find）->“terminal.integrated.shell.windows”-> 清湖修改（fix）git bash path

### `35.vscode配置：`

1.  Scode 显示或隐藏空格符：
    1. 设置：搜索设置：renderControlCharacters 勾选选择框，显示 tap
    2. renderWhitespace：选择 all 显示空格
2.  全部折叠：ctrl + capsLock
3.  拆分编辑器： ctrl + \
4.  关闭编辑器： ctrl + w 、ctrl + f4
5.  关闭终端: ctrl + `
6.  偷看葵花宝典：ctrl + f10
7.  拆分终端：ctrl + shift + 5
8.  滚动到底部：ctrl + end
9.  滚动到顶部：ctrl + home
10. 单步调试：F11
11. 单步跳出：shift + F11
12. 单步跳过：F10
13. 断开连接：shift + F10
14. 继续：F5
15. 开始调试: F5
16. 重启：ctrl + shift + F5
17. vscode 快速查找一个方法和字段: ctrl + D 、ctrl + F：回车键即可
18. 一键保存未保存的所有文件: 设置 -> 首选项 -> autosave -> Auto Save（onFocusChange）
19. 快速切换左右分屏编辑器：alt + LeftArr、alt+ RightArr
20. 快速打开设置：ctrl + ,
21. vscode 可以使用 Ctrl + G 可以快速定位到哪一行
22. vscode 设置隐藏文件的显示和隐藏： 设置 -> 搜索 EXCLUDE 删除后缀文件或添加后缀文件
23. 快速打开搜索当前项目文件的搜索框： ctrl + p
24. 快速打开 vscode 自带配置信息：ctlr + shift + p
25. 快速关闭当前面板：ctrl + j
26. 打开最近的历史浏览记录：ctrl + tab
27. 快速浏览 vscode 文件：alt + 滚轮
28. 快速导航到某一行：
    1.  ctrl + p -> : 行数
    2.  ctrl + g
29. 选择当前行：ctrl + l
30. 快速向下扩充空间：ctrl + BottomArr、TopArr
31. 快速拆分编辑器：ctrl + alt + left、right 方向
32. 快速打开以当前编辑器的新窗口：ctrl + q
33. 快速聚焦到第一个编辑器：ctrl + 1
34. 快速合并多行代码到一行：设置 -> 键盘快捷方式 -> 合并行 -> alt + shift + j
35. 快速定位到当前文件在资源管理器中位置： ctrl + q
36. 快捷打开最近文件：alt + f => r
37. 快捷打开文件夹：alt + f => f
38. 快捷打开文件: alt + f => o
39. 快捷打开扩展：ctrl + shift + x
40. 快捷打开运行：ctrl + shift + d
41. 快速切换项目: ctrl + R 或 alt + f + r
42. 光标多选行：ctrl + alt + top,bottom 方向
43. 快捷选择某个单词：ctrl + d
44. 快捷打开最近文件目录：ctrl + e
45. 快捷聚焦到资源管理器：ctrl + u
46. 快速切换在当前单词、句子开头/结尾： ctrl + left、right
47. 快捷聚焦到左右编辑器：alt + left、right,
48. 快速匹配操作：ctrl + f / ctrl + h, 点击 正则表达式匹配(`.*`的标识)
    -   删除空白行输入：`^\s*(?=\r?$)\n`、`^\s*\n`、`^\s*$\r?\n?`
    -   删除全部注释：`\/\*[\s\S]*\*\/|\/\/.*`


### `vscode统计代码量？ VS Code counter`

1. ctrl+ shift + p
2. counter

### `cmd或者vscode如何生成目录树？`

1. `npm install tree-node-cli` 局部安装
2. `npm install -g tree-node-cli` 全局安装
3. tree -L 2 -I "node_modules" -> 忽略 node_modules 文件夹下的所有内容，把其他文件生成 tree（目录树
   ）
4. 用法： -V，——version 输出版本号 -a，——All -files 打印所有文件，包括隐藏文件。 ——dirs-first 列出文
   件之前的目录。 -d，——dirs-only 只列出目录。 -I，——exclude [patterns]排除匹配模式的文件。|分离交替
   模式。将整个模式用双引号括起来。如。“node_modules |报道”。 -L，——Max -depth <n>目录树的最大显示深
   度。 -r，——reverse 按字母倒序对输出进行排序。 -F，——tail -斜杠为目录添加一个'/' -h，——help 输出使
   用信息

### `生成项目目录树？`

```js
  project-tree
  ├─ .git
  ├─ .gitignore
  ├─ .vscodeignore
  ├─ images
  ├─ node_modules
  ├─ src
  │ ├─ config.ts
  │ ├─ index.ts
  │ └─ utils.ts
  ├─ tsconfig.json
  ├─ tslint.json
  └─ webpack.config.js
```

### `Vscode生成？`

1. 安装插件：`project-tree`
2. 按 `ctrl + shift + p` 或 `F1` ，输入 `Project Tree` 回车
3. 点击要生成目录的项目，回车
4. 将项目目录生成并存储到 README.md 中

### `vscode 新建文件或文件夹？`

1.  安装 `File Util` 插件
2.  新建文件：`ctrl + shift + p`：`new file`
3.  在资源中输入文件名：即可
4.  新建文件夹：`ctrl + shift + p`: `new folder`

### `vscode 快捷键，如何自定义代码片段？`

[自定义代码片段](./%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5.md)

### `vscode 如何解决启动慢的情况：设置 -> exclude -> 文本编辑器 -> 文本 -> file:exclude 中添加 node_modules`

### `vscode同时编辑多行，插入递增数字，递减数字，递增字母，递减字母`

1. 安装 Increment Selection

-   搜 vscode 搜索 Increment Selection 安装
-   ![在这里插入图片描述](https://img-blog.csdnimg.cn/80ec4b0e96094f14ba6f80213de457b6.png)

2.  递增数字，递减数字

-   2.1 快捷键顺序（从零递增）

    1.  shift+alt+鼠标左键–选中多行。
    2.  ctrl+alt+i

-   2.2 快捷键顺序（从任意数字开始递增）

    1.  shift+alt+鼠标左键–选中多行。
    2.  输入任意数字，shift+ctrl+→ 键选中数字
    3.  ctrl+alt+i

-   2.3 递减数字同理，区别在于从下往上选中（光标定位第 10 行，shift+alt+鼠标左键–选中第一行即可递减）
    -   ![请添加图片描述](https://img-blog.csdnimg.cn/1edec987b66f49b5abfb7d0e85dc0b6a.gif)

3.  递增字母，递减字母
    -   与递增递减数字同理，预先输入字母即可
    -   ![请添加图片描述](https://img-blog.csdnimg.cn/e415273ad3464ee8a9ff5315bf85ccc5.gif)

### `vscode 滚动闪烁问题`

-   设置： `Smooth Scrolling` 打开编辑器和终端动画滚动

### `vscode` 在当前终端中打开，默认情况下没有快捷键，但可以设置？

-   vscode 打开：keybindings.json

```js
{
  "key": "ctrl+t",
  "command": "openInTerminal",
  "when": "filesExplorerFocus"
}
```

### `修改 vscode 中的终端UI？`

-   https://code.visualstudio.com/docs/terminal/appearance

### `vscode 官网 及文档、博客等？`

-   https://code.visualstudio.com/

### `cd` 命令扩展

1.  快速进入或推出两级目录：`cd ../..`
2.  快速进入系统根目录：`cd $wordspaceRoot`

### `Github Copilot 使用技巧`

-   打开聊天试图快捷键

    1.  `ctrl + alt + i`: 打开聊天试图
    2.  `ctrl + l`: 清除聊天试图
    3.  `ctrl + Down`: 将键盘焦点移动到聊天视图输入框
    4.  `ctrl + i`: 调出 Copilot 内联聊天
    5.  `ctrl + shift + i`: 快速与 Copilot 聊天

-   代理和斜杠命令

    -   **代理**
        1.  `@workspace`: 基于你工作区代码的上下文，找到相关的文件或类
        2.  `@vscode`: 了解 vscode 编辑器本身的命令和功能
        3.  `@terminal`: 关于集成终端外壳及其内容的上下文
    -   **斜杠**
        -   **tips: 查看可用的代理和斜杠命令，请键入 `/` 以查看列表。**
        1.  `@workspace /explain`: 逐步解释所选代码的工作原理。
        2.  `@workspace /fix`：建议对所选代码中的 bug 进行修复。
        3.  `@workspace /new`：基于自然语言描述创建新项目。
        4.  `@workspace /newNotebook`：根据您的描述创建一个新的 MysterYter Notebook。
        5.  `@workspace /tests`：为所选代码生成单元测试。
        6.  `@vscode /API`：关于 VS Code 扩展开发的问题。
        7.  `@terminal`：解释如何在集成终端中做一些事情。
        8.  `/help`：打印关于 GitHub Copilot 的一般帮助。
        9.  `/clear`：清除会话。

-   如何移动 chat 的面板：可将 chat 面板拖放到任何地方

### 命令面板？

![Alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-1.png)

### 快速显示文件的错误和警告？

-   快捷键：
    -   ctrl + shift + m
    -   F8
    -   shift + F8

### Console.log 格式化输出内容?

| 占位符   | 描述        |
| -------- | ----------- |
| %c       | 颜色        |
| %s       | 字符串      |
| %d / %i  | 浮点数      |
| %o / /%O | object 对象 |

### VScode 如何让只有一层文件夹的内容也按 tree 展示？

1.  打开 setting
2.  搜索：explorer: compact folders
3.  关闭该功能即可。
