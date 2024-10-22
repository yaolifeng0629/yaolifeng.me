## 快捷操作方式

### 1. 搜索：`双击 J`

### 2. 打开新的标签页：`ctrl + t`

### 3. 关闭当前标签页：`ctrl + w`

### 4. 进入下载内容标签页： `ctrl + j`

### 5. 关闭浏览器或所有标签页：`alt + F4`

### 6. 打开新的窗口：`ctrl + n`

### 7. 进入无痕模式：`ctrl + shift + n`

### 8. 跳转到指定标签页：`ctrl + 1 到 ctrl + 8`

### 9. 跳转到最后一个标签页： `ctrl + 9`

### 10. 打开三个点设置：`alt + f 或 alt + e`

### 11. 隐藏或显示书签栏： `ctrl + shift + b`

### 12. 打开书签管理器： `ctrl + shift + o`

### 13. 刷新当前标签页: `F5 或 ctrl + F5`

### 14. 打开历史记录： `ctrl + h`

### 15. 打开 chrome 任务管理器： `shift + esc`

### 16. 打开开发者工具： `F12 或 ctrl + shift + j`

### 17. 打开清除浏览数据选项： `ctrl + shift + delete`

### 18. 在新标签页中打开 Chrome 帮助中心： `F1`

### 19. 使用其他帐户登录或进入隐身模式： `ctrl + shift + m`

### 20. 打开控制台中的 Application 页面： `ctrl + shift + i`

### 21. 使用 chrome 自带浏览器网页截图:

1.  截取当前整个网页截图(相当于长截图)：`F12 -> 右上角三个点 -> run command -> 输入 screen -> capture full size screenshot`
2.  区域截图：`F12 -> 右上角三个点 -> run command -> 输入 screen -> capture area size screenshot`
3.  某一个节点：`F12 -> 右上角三个点 -> run command -> 输入 screen -> capture node size screenshot`
4.  屏幕截图：`F12 -> 右上角三个点 -> run command -> 输入 screen -> capture screenshot`

### 22. 刷新当前网页： `ctrl + r`

### 23. 网页搜索栏快速聚焦： `ctrl + l`

### 24. 快速打开搜索标签页：`ctrl + shift + a`

### 25. google 搜索小技巧：

1.  匹配多个关键字: `如果你搜索的内容包含多个关键词，中间可以用「空格」来分隔。当然有些技术同学喜欢用 「and」，效果差不多`
2.  匹配一个关键字： `如果搜索的多个关键词只需包含其中一个即可，可以使用 「竖线」，例如：“微观技术 |  Tom哥”`
3.  精确搜索： `我们可以采用 「双引号」将关键词包裹起来，这样搜索出来的就是包含完整这段话的页面`
4.  模糊搜索: `如果我们搜索时，忘了单词怎么写了，可以后面加「*」，比如：git comi*`
5.  排除干扰: `我们的搜索结果有很多内容是我们明确不想要的，我们可以对查询结果再做一层过滤。采用「减号」后面跟关键词`
    -   特别注意: 减号前面有空格，后面没有空格，直接拼接搜索词。
6.  限标题搜: `一般搜索时，只要文章中有这个关键词都能被搜出来，不管是标题还是正文。如果只想搜索标题含有这个关键词，可以在搜索词前面加个指令，比如   intitle:关键词，`
7.  限某网站搜: `通过这个格式：关键词 site:网站域名。比如：高并发 site:csdn.net，那等同在 CSDN 这个站点内搜索「高并发」关键词`
8.  搜索 pdf 文件: `如果你想定向搜索某一类型的文件，可以在搜索词后面拼接  filetype:pdf，比如：「“微博”  "高并发"  filetype:pdf」`
    -   其他类型的文件：
        1. filetype:ppt
        2. filetype:doc
9.  搜索图书：`如果你想搜索一本图书怎么办，指向性很强，可以使用「《》」，比如：搜索 《如何成为学习高手》`
10. 限定时间范围:
    -   `如果想在指定时间之后，可以在搜索词后面拼接 「after:2021」`
    -   `如果想在指定时间之前，后面拼接 「before:2021」`
    -   `如果想在一段时间区间内，后面拼接「in 2020….2021」`
11. 寻找替代网站: `想要知道与某个网站相关的网站还有哪些？可以使用 「related:网站」，比如  related:github.com`

### 或者 Google 版本

1.  在网址输入: chrome://version

### 开启 Google 并行下载功能

1.  网址输入: chrome://flags
2.  搜索：Parallel downloading
3.  启用 Enable

### 浏览器同步不及时问题？

-   方法一：
    1.  地址栏输入：chrome://sync-internals
    2.  中间那列中下方，点击“Stop Sync (Keep Data)”，之后点击“Request Start”
    3.  两个设备上的 Chrome 都进行一次这个操作
-   方法二：
    1.  地址栏输入：chrome://sync-internals
    2.  chrome://sync 点 Trigger GetUpdates
-   Tips: 如果不行的话，重启 chrome 再重复以上操作
