### `17.git 命令扩展：`

```js
/**
     git branch -D <branch_name> 删除分支

        将最新提交打标签 git tag v1.0
        将指定commit打标签 git tag v0.9 4ab025
        查看打标签 git tag
        查看与某标签之间的差距 git show v0.9

    添加远程分支
    git remote add origin git@github.com:su37josephxia/hello-git.git

        查看
        git remote -v

        本地新加一个新的远程库upstream git remote add upstream https://github.com/vuejs/vue-next
        从远程仓库拉去代码 git fetch upstream
        切换分支 git chekout master
        合并远程分支 git merge upstream/master

    撤销当前所有的更改
        git restore

    分支创建与合并
        1. `git branch -a` 查看当前项目所有的分支
        2. `git checkout branchName` 切换分支
        3. `git checkout -b  branchName` 创建并切换分支
        4. `git rebase master` 讲master上的更改更新到当前分支
        5. `git branch -d branchName` 删除分支
        6. `git merge branchName` 合并分支

    查看当前git用户邮箱
        git config user.email
    */
```

### `18.npm 切换镜像：`

1.  查看镜像：`npm get registry`
2.  设置淘宝镜像命令：`npm config set registry http://registry.npm.taobao.org/`
3.  原始镜像：`https://registry.npmjs.org/`
4.  切换原始镜像：`npm config set registry https://registry.npmjs.org/`
5.  淘宝镜像： `http://registry.npm.taobao.org/`
6.  切换到官方淘宝镜像：`npm config set registry http://www.npmjs.org`
7.  `nrm` 切换镜像源
8.  `npm config list` 查看 npm 的镜像源

9.  查看一下当前源 yarn config get registry
10. 切换为淘宝源 yarn config set registry https://registry.npm.taobao.org
11. 或者切换为自带的 yarn config set registry https://registry.yarnpkg.com

12. 全局安装: `npm install -g nrm`
13. 查看可切换的镜像源: `nrm ls` (\* 表示正在使用的镜像源)

```js
    * npm -------- https://registry.npmjs.org/
      yarn ------- https://registry.yarnpkg.com/
      cnpm ------- http://r.cnpmjs.org/
      taobao ----- https://registry.npm.taobao.org/
      nj --------- https://registry.nodejitsu.com/
      npmMirror -- https://skimdb.npmjs.com/registry/
      edunpm ----- http://registry.enpmjs.org/
```

3. 切换淘宝镜像源：`nrm use taobao` （7） 全局删除，`rimraf`
1. 下载：`cnpm install -g rimraf`
1. 删除文件：`rimraf xxxx`

### `31.git 提交规范：`

-   type：commit 类型
-   feat:新功能、新特性
-   fix:修改 bug
-   perf:更改代码，以提高性能
-   refactor:代码重构（重构，在不影响代码内部行为，功能下的代码修改）
-   docs:文档修改
-   style:代码格式修改，注意不是 css 修改（例如分号修改）
-   test:测试用例新增、修改
-   build:影响项目构建或依赖项修改
-   revert:恢复上一次提交 ci:持续集成相关文件修改
-   chore:其他文件修改（不在上述类型中的修改）
-   release:发布新版本
-   workflow:工作流相关文件修改
    -   1.scope:commit 影响的范围：比如:route,component,utils,build...
    -   2.subject:commit 的概述
    -   3.body:commit 具体修改内容，可以分为多行
    -   4.footer:一些备注，通常是 breaking change 或修改的 bug 的链接

### `cmd 查看下载源`

`npm install -g nrm` `nrm ls -> list`

### git 如何将同一个仓库同时提交到 github 和 gitee 上？

1.  在 github 上新建一个仓库
2.  在 gitee 上将 github 的仓库导入，此时需要管分支，因为是从 github 上导入的仓库，此时只有一个仓库
3.  打开 .git 文件夹下的 config 文件，按照以下进行配置

```js
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
    # Github
    url = git@github.com:yaolifeng0629/Foreign-advanced-level.git

    # Gitee
	url = https://gitee.com/yaolifeng0529/Foreign-advanced-level.git
	fetch = +refs/heads/*:refs/remotes/origin/*

[branch "main"]
	remote = origin
	merge = refs/heads/main
```

### 如何撤销最近的已经合并的某次提交?

1. 查看提交历史,找到最新的合并提交

```bash
$ git log
commit c3d2e9a4e2a1e285ff4d8f06e01d4e3f19b532ea (HEAD -> master)
Author: Hanmeimei <hanmeimei@example.com>
Date:   Fri Jun 30 15:26:43 2023 +0800

    Incorrect merge commit

commit 3e5fb8a7b631eb6492ef32e28a813084d4d3de2b
Author: Lilei <Lilei@example.com>
Date:   Thu Jun 29 18:20:56 2023 +0800

    Correct commit
...
```

2.  使用 git revert 命令撤销合并提交,Git 将自动创建一个新的提交，撤销错误的合并提交。

```bash
$ git revert c3d2e9a4e2a1e285ff4d8f06e01d4e3f19b532ea
```

3.  使用 git log 或 git show 命令验证新的提交历史，确认错误的变更已经被撤销。

```bash
$ git log
commit b254d0f063b4ab4e7b78fb42015e0c55e0e98712 (HEAD -> master)
Author: Hanmeimei <hanmeimei@example.com>
Date:   Fri Jun 30 15:46:28 2023 +0800

    Revert "Incorrect merge commit"

    This reverts commit c3d2e9a4e2a1e285ff4d8f06e01d4e3f19b532ea.

commit 3e5fb8a7b631eb6492ef32e28a813084d4d3de2b
Author: Lilei <lilei@example.com>
Date:   Thu Jun 29 18:20:56 2023 +0800

    Correct commit

...
```

### 如何撤销最近的已经合并的多次提交?

1.  首先使用 git log 命令查看提交历史，找到要回滚的哈希值。

```bash
$ git log
commit c5b890eee2edf9a353ec6bba0543e41d2529a8f8 (HEAD -> master)
Author: Hanmeimei <hanmeimei@example.com>
Date:   Mon Jul 3 15:12:10 2023 +0800

    Incorrect merge commit

commit 82bcf43083a4dc8c87091ebde4dd5374f0c6e274
Author: Hanmeimei <hanmeimei@example.com>
Date:   Mon Jul 3 15:11:54 2023 +0800

    Incorrect merge commit2

commit 60a52b00d0ee2703156231e209e8aad115919aee
Author: Hanmeimei <hanmeimei@example.com>
Date:   Mon Jun 26 06:32:35 2023 +0000

    Correct commit

...
```

2.  使用 git reset 命令撤销合并提交，并创建一个新的提交来还原到正确的状态。

```bash
$ git reset --soft 60a52b00d0ee2703156231e209e8aad115919aee // 暂存区
$ git reset --hard 60a52b00d0ee2703156231e209e8aad115919aee // HEAD 指向此次提交记录
$ git push origin HEAD --force // 强制推送远端
```

-   注意：此次提交之后的修改不做任何保留，git status 查看工作区是没有记录的。

3.  最后，使用 git log 或 git show 命令验证提交历史，确认错误的变更已经被撤销。

```bash
$ git log
commit 60a52b00d0ee2703156231e209e8aad115919aee (HEAD -> master)
Author: Hanmeimei <hanmeimei@example.com>
Date:   Mon Jun 26 06:32:35 2023 +0000

    Correct commit

...
```

-   如果出现了误删，可以用以下办法来恢复：

```bash
$ git reset --hard 82bcf43083a4dc8c87091ebde4dd5374f0c6e274 // 误删的哈希值

 HEAD is now at 82bcf4308 feat: Incorrect merge commit2

$ git push origin HEAD --force // 强制推送远端
```

### 如何撤销中间合并某一个提交?

1.  首先使用 git log 命令查看提交历史，并找到要撤销的中间合并提交。

```bash
$ git log
commit 3e5fb8a7b631eb6492ef32e28a813084d4d3de2b (HEAD -> master)
Author: Lilei <lilei@example.com>
Date:   Wed Jun 21 12:00:00 2023 +0000

    Correct commit

commit a1b2c3d4e5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0
Author: Hanmeimei <hanmeimei@example.com>
Date:   Fri Jun 18 12:00:00 2023 +0000

    Incorrect merge commit

...
```

2.  然后使用 git revert 命令撤销合并提交，并创建一个新的提交来还原到正确的状态。

```bash
$ git revert a1b2c3d4e5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0
```

3.  最后使用 git log 或 git show 命令验证新的提交历史，确认错误的变更已经被撤销。

```bash
$ git log
commit b254d0f063b4ab4e7b78fb42015e0c55e0e98712 (HEAD -> master)
Author: Hanmeimei <hanmeimei@example.com>
Date:   Mon Jun 28 12:10:00 2023 +0000

    Revert "Incorrect merge commit"

    This reverts commit a1b2c3d4e5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0.

commit 3e5fb8a7b631eb6492ef32e28a813084d4d3de2b
Author: Lilei <lilei@example.com>
Date:   Wed Jun 21 12:00:00 2023 +0000

    Correct commit

commit a1b2c3d4e5f6a7b8c9d0e1f2g3h4i5j6k7l8m9n0
Author: Hanmeimei <hanmeimei@example.com>
Date:   Fri Jun 18 12:00:00 2023 +0000

    Incorrect merge commit

...
```

-   可以看到之前的提交仍会保留在 git log 中，而此次撤销会做为一次新的提交（Revert "Incorrect merge commit"）。

### 如何切换到别人的 pr 分支修改东西?

-   确保本地是干净的，可以先用 git stash 存起来，等你改完之后再 git stash pop 出来
-   命令式:

```bash
1.  git checkout pr/[userName]/[pr id]
    比如 git checkout pr/liudewa888/260

2.  然后就是正常的 git add & git commit

3.  push时: git push [userName] HEAD:对应的分支名称
    比如 git push Wecle HEAD:feat/locate-the-current-course-card
```

-   可视化操作:

1.  vscode 下载: GitHub Pull Requests 插件
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/微信图片_20240420170233.png)
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/微信图片_20240420170254.png)

### 如何在 pr 分支拉取最上游的最新代码?

```bash
git pull origin main

# or

git pull origin upstream
```

-   `git fetch upstream`: 这个命令用于从你 fork 的原始仓库（通常称为 upstream）获取最新的历史记录和分支信息，但不立即合并到你的本地分支。
-   `git pull origin main`: 这个命令用于从你自己的远程仓库（通常是 origin）获取最新的历史记录和分支信息，并且立即合并到你的当前本地分支。

### 如何还原本地修改或添加的某个文件？

-   如何只删除某个文件呢？

```shell
git clean -f -e '!'untracked_file.txt
```

    -   因为以上命令会永久删除文件，如何想进一步确定，可以执行

    ```bash
    git clean -n -e '!'untracked_file.txt
    ```

-   如何删除全部未跟踪的文件或目录？

1.  运行 git clean 命令, 以确保列出的文件是你确实想要删除的：

```bash
git clean -n
```

2.  以确保列出的文件是你确实想要删除的：

```bash
# 只删除文件
git clean -f

# 删除文件和目录
git clean -fd
```

### 克隆超时如何解决？

Failed to connect to github.com port 443 : Timed out

解决方法：

1.本地开启一个“学术网络”代理

2.配置 git 代理

# 注意修改成自己的 IP 和端口号

```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

如果想取消代理，执行以下命令：

# 取消代理

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

# 查看代理

```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

### git 如何忽略空白差异？

1. **切换到正确的分支**:

    - 确保你在你的新建仓库的主分支上，准备合并技术总监的代码。

    ```bash
    git checkout main
    ```

2. **复制技术总监的代码到你的仓库中**:

    - 将技术总监的代码直接复制到你的项目目录中，覆盖掉现有的文件。

3. **处理空白差异**:

    - 使用 Git 的 `--ignore-all-space` 选项来忽略所有的空白差异，进行一次合并。

    ```bash
    git add -A
    git commit -m "Integrate technical director's latest changes"
    git diff --ignore-all-space
    ```

4. **应用补丁忽略空白差异**:

    - 如果你有一个补丁文件，可以使用以下命令来应用补丁，并忽略所有空白差异。

    ```bash
    git apply --ignore-whitespace your_patch_file.patch
    ```

5. **配置 Git 忽略空白差异**:
    - 配置 Git 忽略所有空白差异，可以全局设置，也可以在本地仓库设置。
    ```bash
    git config --global apply.ignorewhitespace true
    ```

### git 如何显示当前所在的分支名？

```bash
git branch --show-current
```

或者你也可以使用以下命令：

```bash
git rev-parse --abbrev-ref HEAD
```

### 线上代码库如何恢复到某个commit记录？
```bash
# 1. 查看提交记录
git log

# 2. 回退到指定commit记录
git reset --hard <commit_id>

# 3. 强制推送
git push origin <branch_name> --force
```
