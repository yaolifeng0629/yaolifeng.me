# Next.js 中为什么 App Router 可能是未来，但 Pages Router 仍然重要？

Next.js 作为一个强大的 React 框架，为开发者提供了两种路由系统：App Router 和 Pages Router。这两种路由系统各有特色，适用于不同的场景。本文将深入探讨这两种路由系统的区别、优缺点和使用场景，帮助你做出最佳选择。

## App Router：新一代的路由革命

App Router 是 Next.js 13 引入的新路由系统，它使用 `app` 目录来组织路由，带来了许多令人兴奋的新特性。

### 优点：

1. **React 服务器组件支持**：这是一个游戏规则改变者，允许在服务器端渲染复杂组件，大大提升了性能。

2. **灵活的布局系统**：通过嵌套布局，你可以更容易地创建复杂的页面结构。

3. **内置加载 UI 和错误处理**：提供了更好的用户体验，无需额外配置。

4. **性能优化**：得益于服务器组件和其他优化，App Router 通常能提供更好的性能。

5. **并行路由**：允许在同一布局中同时渲染多个页面。

### 缺点：

1. **学习曲线较陡**：对于习惯了传统 React 开发的人来说，可能需要一些时间来适应。

2. **第三方库兼容性**：一些老旧的库可能不兼容新的服务器组件模式。

3. **仍在发展中**：作为较新的技术，可能会有一些未知的问题或变化。

## Pages Router：经典可靠的选择

Pages Router 是 Next.js 的传统路由系统，使用 `pages` 目录来组织路由。它仍然是许多项目的首选，特别是对于较老的 Next.js 版本。

### 优点：

1. **简单易上手**：对于初学者来说，学习曲线相对平缓。

2. **文件系统路由直观**：路由结构与文件结构一一对应，易于理解和管理。

3. **丰富的社区资源**：由于使用时间较长，有大量的教程、示例和第三方库支持。

4. **稳定性高**：经过多年的使用和优化，bug 较少，表现稳定。

### 缺点：

1. **不支持 React 服务器组件**：无法利用这一新特性带来的性能提升。

2. **布局系统相对简单**：实现复杂布局可能需要更多的代码和配置。

3. **数据获取方法较为固定**：主要依赖 `getServerSideProps` 和 `getStaticProps`，灵活性较低。

## 实战对比：博客页面实现

让我们通过一个简单的博客页面来对比这两种路由系统的实现方式：

### Pages Router 实现

```jsx
// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post({ post }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://api.example.com/posts/${params.id}`);
    const post = await res.json();
    return { props: { post } };
}

export async function getStaticPaths() {
    const res = await fetch('https://api.example.com/posts');
    const posts = await res.json();

    const paths = posts.map(post => ({
        params: { id: post.id.toString() },
    }));

    return { paths, fallback: true };
}
```

在这个例子中，我们使用 `getStaticProps` 和 `getStaticPaths` 来实现静态生成。这是 Pages Router 的典型用法，适合内容不经常变化的博客文章。

### App Router 实现

```jsx
// app/posts/[id]/page.js
import { notFound } from 'next/navigation';

async function getPost(id) {
    const res = await fetch(`https://api.example.com/posts/${id}`);
    if (!res.ok) return undefined;
    return res.json();
}

export default async function Post({ params }) {
    const post = await getPost(params.id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
}
```

App Router 的实现更加简洁。这里我们直接在组件中进行异步数据获取，这得益于 React 服务器组件的支持。同时，我们使用 `notFound` 函数来处理文章不存在的情况，这是 App Router 提供的内置错误处理机制之一。

## 如何选择？

选择 App Router 还是 Pages Router，没有绝对的对错。以下是一些建议：

1. **项目规模和复杂度**：对于大型、复杂的项目，App Router 的灵活性和性能优势可能更有吸引力。

2. **团队熟悉度**：如果团队对 Next.js 较为陌生，可能从 Pages Router 开始更容易上手。

3. **性能需求**：如果项目对性能有较高要求，App Router 的服务器组件可能是更好的选择。

4. **项目时间线**：对于需要快速开发的项目，Pages Router 可能更适合，因为学习成本较低。

5. **未来展望**：考虑到 Next.js 的发展方向，长期来看，掌握 App Router 可能更有优势。

## 个人经验分享

作为一个初使用 Next.js 的开发者，我最初对 App Router 也感到困惑。但是，当我开始处理复杂的布局和需要优化性能的场景时，App Router 的优势就显现出来了。

例如，在一个需要频繁更新的数据密集型应用中，App Router 的服务器组件让我能够在服务器端处理大部分数据逻辑，显著减少了传输到客户端的 JavaScript 数量，提升了应用的整体性能。

然而，对于一些简单的项目或者时间紧迫的情况，我仍然会选择 Pages Router。它简单直接，能让我快速搭建原型并上线。

## 结论

App Router 和 Pages Router 各有千秋，选择哪一个取决于你的具体需求和场景。

我的建议是：不要害怕尝试新事物。即使你现在使用的是 Pages Router，也值得花些时间了解 App Router。

毕竟，技术在不断进步，保持学习才能不被淘汰。

记住，技术只是工具，真正重要的是解决问题和创造价值。选择最适合你的工具，才能事半功倍。

## 结语

上次写了一个用于批量清理无用仓库的工具，如果感兴趣那就去看看 😊

[介绍文章](https://mp.weixin.qq.com/s/t7lgc6b7xJiNhfm5vWo5-A)： https://mp.weixin.qq.com/s/t7lgc6b7xJiNhfm5vWo5-A

[GitHub 仓库地址](https://github.com/yaolifeng0629/del-repos)： https://github.com/yaolifeng0629/del-repos

如果你觉得这个工具对你有所帮助，请不要忘记给我的 GitHub 仓库点个 Star！你的支持是我前进的动力！

感谢阅读，我们下次再见！

![](https://qncdn.mopic.mozigu.net/f/o0enm5lqh2rbsqbopel/126660174a84/Snipaste_2023-09-08_10-32-47.png)
