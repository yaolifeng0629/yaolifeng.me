# 配置命令

```sh
code "$HOME/.bashrc"
```

### 当前工作区路径

```sh
export PS1='~ \[\033[33m\]\W\n$ '
```

### 当前工作区完整路径

```sh
export PS1='~\[\033[33m\]\w\[\033[0m\]\n\$'
```

### 最完整的路径

```sh
PS1='\[\033]0;$TITLEPREFIX:$PWD\007\]\n\[\033[32m\]\u@\h \[\033[35m\]$MSYSTEM\[\033[0m\] \[\033[33m\]\w\[\033[0m\]\n\$'
```

### @CUSTOM_PREFIX：自定义的前缀

```sh
PS1='@CUSTOM_PREFIX \[\033]0;$TITLEPREFIX:$PWD\007\]\n\[\033[32m\]\u@\h \[\033[35m\]$MSYSTEM\[\033[0m\] \[\033[33m\]\w\[\033[0m\]\n\$'
```

### 其他参数
```sh
\u: 电脑名 账户名
\h: 电脑型号 DESKTOP-LT1LQPR
\u@\h: 账户名 DESKTOP-LT1LQPR
\W：当前工作区的文件夹名
$MSYSTEM：当前系统位数 MINGW64
```
### 其他

```sh
# \033[32m\]\u@\h \[\033[35m\]$MSYSTEM\[\033[0m\]: 账户名@DESKTOP-LT1LQPR MINGW64

# [\033[32m\]~\[\033[35m\]]: [~]中 [] 显示紫色，~ 显示绿色

# \[\033[33m\]\w\[\033[0m\]\n\$：当前工作区项目的绝对路径
```
