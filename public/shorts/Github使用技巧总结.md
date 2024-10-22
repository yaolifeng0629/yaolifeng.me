### `github 查看代码：`

1.  方法一：在 github 后面输入 1s `github1s.com`,可将代码在 vscode 中进行打开；
2.  方法二：按 `.` 键即可
3.  方法三：在 github 的全部链接前加入 `gitpod.com/#`

### `如何修复github无法访问问题？`

1. `https://github.com/521xueweihan/GitHub520` 拷贝最新的 DNS 记录
2. 本地打开：`C:\Windows\System32\drivers\etc` 下的 `hosts` 文件
3. 最后粘贴 `github` 上赋值的 DNS 记录值
4. `window + R` 输入：`ipconfig/flushdns` 刷新本地 IP
5. 重新访问 github

### `使用 t 键快速搜素文件`

1. 打开 https://github.com/lodash/lodash
2. 按 T 键
3. 输入 add.test.js（任何你想搜索的文件名）。
4. 点击跳转，查看文件内容

### `查看快捷键列表`

-   `shift + `

##### 方法一：`【3分钟成为GitHub开源项目贡献者】 https://www.bilibili.com/video/BV1Fs4y1C7kS/?share_source=copy_web&vd_source=d42554f47179de3a2556b0e175436937`

1.  先 fork 一份到自己的仓库
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-2.png)
2.  在提交代码前 sync 仓库的最新代码
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-3.png)
3.  在本地做好对应的修改，然后提交代码
4.  然后再对应的文件目录下，upload 自己的代码文件，然后添加对应的 commit 记录
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-4.png)
5.  然后回到仓库首页，点击 Contribute 创建一个 pull request，添加对应的 commit 记录
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-6.png)
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-7.png)
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-8.png)
6.  确认提交，等待仓库管理员合并
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-9.png)

##### 方法二：`https://juejin.cn/post/7021727244124962846?searchId=20240227225852CFB0D285411DA59A5803`

1.  fork 一份仓库的代码到自己的 repositories
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-14.png)
2.  git clone 到本地
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-15.png)
3.  克隆到本地后，在当前项目的根目录下执行 `git remote -v` 查看自己是否与远程仓库建立了连接
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-16.png)

-   可以看到，已经建立连接，接下来还需要与上游建立连接，这里上游指的是一开始 fork 的那个项目源，即 element-plus。

4.  与上游，也就是主仓库建立连接，执行 `git remote add upstream https://github.com/element-plus/element-plus.git`

-   此时，我们再输入 git remote -v，就可以看到本地已经和远程仓库以及上游建立了连接。
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-17.png)

5.  时刻同步最新代码：git fetch upstream `branchName`
6.  编写代码...
7.  执行提交代码的操作，commit 记录参考之前的 pull request
    -   (1) push 时需要提交到远程仓库的主分支：git push origin `branchName`
8.  打开自己仓库 fork 的 repositories，点击 Pull Requests 选项
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-10.png)
9.  创建一个 New pull request
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-11.png)
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-12.png)

-   最后等管理员合并即可，合并后是 All checks have passed
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-13.png)

10. 至此，一个 pr 的流程也就结束啦。

##### 方法三：`https://juejin.cn/post/6872554265718554637?searchId=20240227225852CFB0D285411DA59A5803`

1.  fork 一份仓库的代码到自己的 repositories
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-14.png)
2.  git clone 到本地
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-15.png)
3.  创建功能/特性分支

```bash
git checkout -b `新特性分支名: fix-npe-issue`
```

4.  编写 pr 代码...
5.  将更改提交到特性分支

```bash
git add <filename> / git add .
git commit -m "xxxx"
```

6.  将特性分支推到你 fork 的仓库

```shell
git push origin fix-npe-issue
```

7.  打开自己仓库 fork 的 repositories，点击 Pull Requests 选项
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-10.png)
8.  创建一个 New pull request
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-11.png)
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-12.png)
9.  将主存储库作为上游添加到克隆仓库中

-   你克隆的存储库已链接到 fork 后仓库了，为了使 fork 的仓库与主仓库保持同步，因为还有其他开发人员还一直将其代码合并到主存储库中，你需要通过在克隆的仓库中添加主仓库作为上游（upstream）来连接它们。

```shell
git remote add upstream git@github.com:google/guava.git
```

-   使用以下命令验证上游设置是否正确：git remote -v
    ![alt text](https://cdn.jsdelivr.net/gh/yaolifeng0629/oss@main/images/image-17.png)

10. 从上游更新你 fork 仓库的 master 分支

-   设置上游后，你可以提取其他开发人员在主仓库中所做的更改，这将更新本地计算机上的克隆仓库：

```shell
git pull upstream master
```

11. 将主分支 push 到你的 fork 仓库

-   一旦你在你的本地机器上有了所有的更新，你将需要把它们推送到你的 fork 后的仓库中，使其与主仓库同步。

```shell
git push origin master
```

12. 删除特性分支(可选)

-   特性合并到主仓库后，便不再需要它，可以将其删除：

```bash
git branch -d fix-npe-issue
```

-   你还可以从 fork 的仓库中删除远程分支：

```bash
git push origin --delete fix-npe-issue
```
