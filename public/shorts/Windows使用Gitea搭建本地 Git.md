## `Windows 使用 Gitea 搭建本地 Git？`

### `Gitea 官网：https://docs.gitea.io/en-us/`

### `Gitea Github:https://github.com/go-gitea/gitea`

-   步骤一：

    -   安装 MySQL:
        -   最新版：`https://dev.mysql.com/downloads/installer/` 中的第二项下载
        -   之前的版本：点击`Looking for the latest GA version?` 查看：选择第二项 `5.7.36` 进行下载

-   步骤二：

    -   安装 Gitea:
        -   `https://github.com/go-gitea/gitea/releases/tag/v1.15.10` 中找到
            `gitea-1.15.10-gogit-windows-4.0-amd64.exe` 下载即可；

-   步骤三：

    1.  两个安装包都已经成功下载到本地，然后先安装 MySQL 服务，要想查看 mysql 是否成功安装到此电脑；
    1.  查看 mysql 是否安装成功;
    1.  `注：此过程中要设置 mysql 的密码，一定要记住密码，后面的使用会用到`
        -   方法一：
            -   `windows + r` 打开运行菜单：输入 `cmd` -> mysql --version
            -   如果有 mysql 的版本证明安装成功，如果没有安装失败
        -   方法二
            -   `windows + r` 打开运行菜单：输入 `serveices.msc` -> 然后查看有没有 `MySQL` 服务；
            -   如果有 mysql 的版本证明安装成功，如果没有安装失败
    1.  配置电脑的环境变量：
        1.  找到刚安装的 `MySQL` 的安装目录，然后拷贝其目录：`C:\Program Files\MySQL\MySQL Server 5.7\bin`
        1.  此电脑 -> 属性 -> 高级系统设置 -> 环境变量 -> 新建 -> 变量名（也可自定义）`MYSQL_HOME` ->
            变量值：`C:\Program Files\MySQL\MySQL Server 5.7\bin`
        1.  然后找到 `Path` -> 编辑 `Path` 输入 -> `%MYSQL_HOME%;` 即可；

-   步骤四：

    1.  `windows + r` 打开运行菜单：输入 `cmd` -> `mysql -u root -p` -> 输入安装 mysql 的密码
    1.  当 `cmd` 的前置命令端为: `mysql>` 时证明连接成功
    1.  接着输入 `SHOW DATABASES;` 查看 `mysql` 默认的数据库
    1.  然后新建一个数据库供我们 `Gitea` 使用, 可使用
        `CREATE DATABASE 数据库名称/(gitea:方便我们后续使用，不用更改)`, 当控制台出现
        `Query OK,1 row affected` 证明数据库创建成功
    1.  删除数据库可使用 `DROP DATABASE 数据库名称;` 即可 `Query OK,1 row affected` 即为删除成功；
    1.  现在可使用 `SHOW DATABASES;` 查看 `mysql` 的所有数据库，即可在终端中可以看到刚创建的数据库。

-   步骤五：

    1.  找到下载的 `gitea` 的安装包，然后找到 `.exe` 文件，然后双击打开即可运行；
    1.  在浏览器的地址栏中 `http://localhost:3000` 访问本地 `Gitea`;

-   步骤六：
    1.  数据库选择为 `MySQL` 然后输入刚设置的 `MySQL` 账号和密码，输入刚创建的 `mysql` 库，
        然后点击底部的 `立即安装`
    1.  然后会进入一个新的页面，注册一个账户，用于我们的 `Gitea` 账户，注册完成后即可自动登录，
        此时，就可以看到本地搭建的`Gitea`
    1.  我们创建组件和创建一个默认的窗口进行 `git` 的操作，即可成功
