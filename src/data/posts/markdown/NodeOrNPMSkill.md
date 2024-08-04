# NodeOrNPMSkill

1.  `npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.`
-   解决方法：
    1.  `window + r`: 输入 `cmd`
    2.  输入：`where npm`
    3.  copy path，go to folder to the path(去到对应路径下的文件夹下)
    4.  找到 `npm、npm.cmd`
    5.  两个文件通过记事本打开，找到两个文件的 `prefix -g` 修改为：`prefix --location=global`
    6.  重新启动终端即可

### 镜像源过期解决方法：
```bash
1. 切换镜像源：
    npm config set registry https://registry.npmmirror.com
    yarn config set registry https://registry.npmmirror.com
    pnpm config set registry https://registry.npmmirror.com

2. 刷新缓存
    npm config clean --force
    yarn config clean --force
    pnpm config clean --force

3.  解决下载报错问题：
    (1) Error: certificate has expired、CERT_HAS_EXPIRED
        yarn config set "strict-ssl" false -g
        npm config set "strict-ssl" false -g
        pnpm config set "strict-ssl" false -g
    (2) 解决pnpm下载 ERR_INVALID_THIS 问题：
        npm install -g pnpm
```

### 如何查看一个npm包的所有版本？
```bash
查看所有版本：pnpm view [packageName] versions

查看最新版本：pnpm view [packageName] version
```

### 如何安装指定的npm包版本？
```bash
pnpm i [packageName]@[版本号]
```

### 如何查看一个npm包的版本号？
```bash
查看所有版本：npm show [packageName] versions

查看最新版本：npm show [packageName] version
```

### 快速找到并打开 react 的文档
```bash
npm docs react
```

### 快速找到并打开 react 的仓库
```bash
npm repo react
```

### npm 如何删除不需要的包？
```sh
npm prune
pnpm prune
yarn prune
```
