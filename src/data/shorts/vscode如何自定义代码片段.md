---
created: 2022-09-17T18:05:14 (UTC +08:00)
tags: [感叹号加tab键]
source: https://blog.csdn.net/m0_56991207/article/details/125697024
author:
---

# (34条消息) vscode中，感叹号以及感叹号+Tab键无法生成html骨架的解决方法*我不是胖球球的博客-CSDN博客*感叹号加tab键

> ## Excerpt
>
> Vscode刚刚更新，emment这个扩展可能取消了用感叹号“！”自动生成html模板的功能，也默认关闭了按**`!+Tab**`自动生成html模板的功能。

---

[vscode](https://so.csdn.net/so/search?q=vscode&spm=1001.2101.3001.7020)中，感叹号 ！+ 回车 无法生成html骨架的解决方法：

> 方法1. 文件——>首选项——>配置代码片段——>新增代码片段——>输入html1（若已存在则输入html2，或html3，喜欢写几就写几），出现如下文件：

![在这里插入图片描述](https://img-blog.csdnimg.cn/8303b1aab28e4e5cae13e19c1166735e.png)

用以下这段代码替换掉绿色的内容即可：

```
{
"h5 sample": {
"prefix": "!",
"body": [
"<!DOCTYPE html>",
"<html lang=\"zh-CN\">\n",
"<head>",
"\t<meta charset=\"UTF-8\">",
"\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,minimal-ui:ios\">",
"\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
"\t<title>Document</title>",
"\t<link rel=\"stylesheet\" href=\"$1\">",
"\t<script src=\"$2\"></script>",
"</head>\n",
"<body>\n$3",
"</body>\n",
"</html>"
],
"description": "The full sample code - html5."
}
}
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/4150f1fc849b47a69be14dfd92979645.png) **解释一下原因**：“_prefix": "!_”，表示你想要用哪个快捷键来生成html骨架，之所以英文感叹号无法生成html，就是因为Vscode刚刚更新，emment这个扩展可能取消了用感叹号“！”自动生成html模板的功能，也默认关闭了按\*\*`!+Tab**`自动生成html模板的功能。（具体为什么无法识别，本宝宝表示也不知道，嘿嘿）

```
"prefix": "!",  // 生成html骨架的快捷键
```

那么肯定会有好奇宝宝会问，我不想用感叹号，我能不能自己设置其他字母呢？当然可以！比如你女朋友叫刘美丽，你想用字母 l 来作为你生成html骨架的快捷键，我们来尝试一下：

```
{
"h5 sample": {
"prefix": "l", // 快捷键设置为英文字母l
"body": [
"<!DOCTYPE html>",
"<html lang=\"zh-CN\">\n",
"<head>",
"\t<meta charset=\"UTF-8\">",
"\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,minimal-ui:ios\">",
"\t<meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
"\t<title>Document</title>",
"\t<link rel=\"stylesheet\" href=\"$1\">",
"\t<script src=\"$2\"></script>",
"</head>\n",
"<body>\n$3",
"</body>\n",
"</html>"
],
"description": "The full sample code - html5."
}
}
```

输入字母l，出现以下提示： ![在这里插入图片描述](https://img-blog.csdnimg.cn/96dfb981437c49a38a4f7aa3e0f4c551.png) 回车键潇洒一敲，perfect！！！ ![在这里插入图片描述](https://img-blog.csdnimg.cn/278841fc67b541a9a158817728d3b22b.png)

> 方法2：设置——搜索emmet——找到：“Trigger Expansion On Tab” 打开就好了。然后就能用感叹号 ！+tab自动生成html模板，记得实践一下哦！

![在这里插入图片描述](https://img-blog.csdnimg.cn/9f85519a1016403d9a323da0723fcd47.png)

> 方法3：设置——搜索emmet Abbreviation，像下图一样设置就ok，然后在html文件中直接输入html，然后会提示html：5，选择这个回车也就可以自动生成html模板了~

![在这里插入图片描述](https://img-blog.csdnimg.cn/75b83d6489e647849550199f6162e36c.png) ![在这里插入图片描述](https://img-blog.csdnimg.cn/660f114c888044b090d08bca325599b8.png)
