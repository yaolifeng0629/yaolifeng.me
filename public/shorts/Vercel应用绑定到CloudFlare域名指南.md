## Vercel 应用绑定 CloudFlare 域名指南

-   如何通过 CloudFlare 反向代理的方式绑定域名，为 Vercel 项目享受 CDN 加速。

### 操作步骤

1.  进入`账户主页`
2.  选择要操作的域名
    ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-1.png)
3.  左侧点击 `DNS` -> `记录`
    ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-2.png)
4.  点击 `添加记录`
    1.  添加两条 CNAME 记录，分别将根域名和 www 子域名指向 cname.vercel-dns.com 1. 根域名：你注册的域名，比如我这里的：`indietools.work` 2. www 子域名：名称直接填写 www 即可
        -   操作详情：https://indiehackertools.net/blog/integrate-vercel-project-with-cloudflare-domain
            ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-3.png)
    2.  再回到 Vercel 中，进入到对应的项目，选择 `Domain`，输入`根域名`后点击`添加`
        ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-4.png)
        1. 我一般先添加一条 A 记录，选择后，你会看到一个记录：
           ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-5.png)
           ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-6.png)
        2. 此时回到 Cloudflare 中，选择类型 A，名称输入`@`, IPV4 输入：76.76.21.21(注意，这里的 IPV4 地址，要与刚才 Vercel 上的 A 记录 IP 地址保持一样)，然后点击 `保存记录`
        3. 回到 Vercel 中，点击 `Refresh` 即可配置成功
5.  配置 SSL 加密规则
    ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-7.png)
    ![alt text](https://ims-oss.us.kg/shorts/vercel-cf-8.png)

### 其他

-   [Vercel 应用绑定 CloudFlare 域名指南](https://indiehackertools.net/blog/integrate-vercel-project-with-cloudflare-domain)
-   [Vercel 应用绑定自己的域名](https://blog.csdn.net/weixin_45987569/article/details/137107704)
