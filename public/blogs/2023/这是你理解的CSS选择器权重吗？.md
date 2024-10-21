## 前言
>  极度投入，深度沉浸，边界清晰
>
>  前端小菜鸡一枚，分享的文章纯属个人见解，若有不正确或可待讨论点可随意评论，与各位同学一起学习~
>
>  欢迎关注 `『非同质前端札记』` 公众号 ，一起探索学习前端技术......
>
>  公众号回复 `加群` 或 `扫码`, 即可加入前端交流学习群，长期交流学习......
>
>  公众号回复 `加好友`，即可添加为好友

## 这是你理解的CSS选择器权重吗？
### CSS 选择器
| 选择器 | 格式 | 优先级权重 |
| :--- | :--- | :--- |
| id 选择器 | #id | 100 |
| 类选择器 | .classname | 10 |
| 属性选择器 | [title="one"] | 10 |
| 伪类选择器 | div:hover | 10 |
| 标签选择器 | div | 1 |
| 伪元素选择器 | input::after | 1 |
| 子选择器 |  ul>li | 0 |
| 后代选择器 |  li a | 0 |
| 通配符选择器 | * | 0 |

### CSS 选择器优先级
1.  !important 例外，优先级最高
2.  内联样式
3.  id 选择器
4.  类选择器，属性选择器，伪类选择器
5.  标签选择器，伪元素选择器
6.  子选择器，后代选择器，通配符选择器
-   参考 MDN：`https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity`

### 错误的说法
-   在学习过程中，你可能发现给选择器加权值的说法，`即 ID 选择器权值为 100，类选择器权值为 10，标签选择器权值为 1，当一个选择器由多个 ID 选择器、类选择器或标签选择器组成时，则将所有权值相加，然后再比较权值。`
-   这种说法其实是`有问题的`。
-   比如一个由 11 个类选择器组成的选择器和一个由 1 个 ID 选择器组成的选择器指向同一个标签，按理说 `110 > 100`，应该应用前者的样式，然而事实是应用后者的样式。
-   原因：选择器的权值不能进位。比如，11个类选择组成的选择器的总权值为 110， 但因为 `11 个均为类选择器，所以其实总权值最多不能超过100`，你可以理解为`99.99`，所以最终应用 id 选择器的样式。

### 选择器权重
-   W3C: 就是把 ID 选择器 当作 A ，把 类选择器、属性选择器、伪类选择器 当作 B ，把 类型选择器(标签选择器)、伪元素选择器 当作 C 再计算。
-   如果选择器是一个选择器列表，则累加。
```
*{} 是通配选择符，表示 (0,0,0)
ul li{} 有两个标签选择器，所以表示 (0,0,2)
ul ol li 有三个标签选择器，表示 (0,0,3)
ul ol li.red 有三个标签选择器和一个类选择器，所以表示 (0,1,3)
:not(em, strong#foo) 有一个ID 选择器和一个标签选择器，所以表示 (1,0,1)
......
```
-   参考 W3C: `https://www.w3.org/TR/selectors/#specificity`

### 例子
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            html,body{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .e {
                width: 200px;
                height: 200px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid gray;
                border-radius: 20px;
            }
            #id {
                color: blue;
            }
            /* #id => 100 */
            .f .t .th .fo .fi .s .se .ei .n .te .e h2{
                color: red;
            }
            /* .f .t .th .fo .fi .s .se .ei .n .te .e =>  99.99 */
            /* .f .t .th .fo .fi .s .se .ei .n .te .e h2 => 99.99 + 1 => 100.99*/
        </style>
    </head>
    <body>
        <div class="f">
            <div class="t">
                <div class="th">
                    <div class="fo">
                        <div class="fi">
                            <div class="s">
                                <div class="se">
                                    <div class="ei">
                                        <div class="n">
                                            <div class="te">
                                                <div class="e" id="id">
                                                    <h2>eleven</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
<!--
    举一反三：
        上述例子的原因说到了同级选择器的权重不会超过 100，那在后面再拼接一个标签选择器呢？

        /* .f .t .th .fo .fi .s .se .ei .n .te .e h2 => 99.99 + 1 => 100.99*/

        此时，11 个类选择器 + 标签选择器 的权重 > id 选择器，则应用 11 个类选择器 + 标签选择器 的样式
 -->
```
#### 各位看官如果分享的文字有给你增加一点小知识，给个赞再走吧~

## 文章特殊字符描述：
1. 问题标注 `Q:(question)`
2. 答案标注 `R:(result)`
3. 注意事项标准：`A:(attention matters)`
4. 详情描述标注：`D:(detail info)`
5. 总结标注：`S:(summary)`
6. 分析标注：`Ana:(analysis)`
7. 提示标注：`T:(tips)`

## 往期回顾：
-   [热点面试题：Virtual DOM 相关问题？](https://mp.weixin.qq.com/s/s3BBhTH9g2OrtOpyJ4tzbQ)
-   [热点面试题：什么是粘包/半包问题，该如何解决？](https://mp.weixin.qq.com/s/SORAN1c0_Pntajvjl-jK4g)
-   [热点面试题：console.log()同异步问题？](https://mp.weixin.qq.com/s/9ewYuCazPaZhDHwrfIWxTQ)
-   [热点面试题：进程系列问题？](https://mp.weixin.qq.com/s/J5ayE5XJElBFzn38qo7ytQ)
-   [热点面试题：Node.js 中的垃圾回收机制？](https://mp.weixin.qq.com/s/Guku1ARej2ZHwnrbXxmJJA)
-   [热点面试题：简述 http3.0~http1.0 分别有什么改进？](https://mp.weixin.qq.com/s/LkOWiDj5O68T85-577_UPA)
-   [JavaScript中的AMD和CMD规范](https://mp.weixin.qq.com/s/LkOWiDj5O68T85-577_UPA)
-   [Vue数据监听Object.definedProperty()方法的实现](https://mp.weixin.qq.com/s/1inW5dSZv26eJTC39REMdg)

## 最后：
-   欢迎关注 `『非同质前端札记』` 公众号 ，一起探索学习前端技术......
-   公众号回复 `加群` 或 `扫码`, 即可加入前端交流学习群，长期交流学习......
-   公众号回复 `加好友`，即可添加为好友
![](https://soo.run/13bdt)
