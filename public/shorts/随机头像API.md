## 随机头像

### type
```js
/**
 * 替换 type 的为
    *  male：男
    *  female：女
    *  human：人类
    *  identicon：标识
    *  initials：缩写
    *  bottts：机器人
    *  avataaars：头像
    *  jdenticon：图形
    *  gridy：女性
    *  micah：插图

 * 替换 svg 的为
    *  png
    *  jpg
    *  gif
    *  svg
 */
```
### url = 'https://avatars.dicebear.com/api/${type}/:seed.${svg}'

### params:
```js
/***
    radius: 圆角
        type: integer
        min: 0
        max: 50
    flip: 翻动
        default: false
        type: boolean
    dataUri: 数据Uri
        default: false
        type: boolean
    rotate: 旋转
        type: integer
        min: 0
        max: 360
    scale: 缩放
        type: integer
        min: 0
        max: 200
    translateX: 缩放
        type: integer
        min: -100
        max: 100
    translateY: 缩放
        type: integer
        min: -100
        max: 100
    size: 大小
        type: integer
        min: 1
    backgroundColor: 背景色
        type: string
 */
```
