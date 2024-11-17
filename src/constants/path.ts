import { NICKNAME } from '.';

export const PATHS = {
    /** ************* SITE ****************** */
    SITE_HOME: '/',
    SITE_BLOG: '/blog',
    SITE_SNIPPET: '/shorts',
    SITE_PROJECT: '/projects',
    SITE_ABOUT: '/about',
    SITEMAP: '/sitemap.xml',
};

export const PATHS_MAP: Record<string, string> = {
    /** ************* SITE ****************** */
    [PATHS.SITE_HOME]: '首页',
    [PATHS.SITE_BLOG]: '博客',
    [PATHS.SITE_SNIPPET]: '片段',
    [PATHS.SITE_PROJECT]: '项目',
    [PATHS.SITE_ABOUT]: '关于',
    [PATHS.SITEMAP]: '站点地图'
};

export const PATH_DESCRIPTION_MAP: Record<string, string> = {
    /** ************* SITE ****************** */
    [PATHS.SITE_HOME]: '首页',
    [PATHS.SITE_BLOG]: '这里记录了我的想法、文章，希望和大家一起交流～',
    [PATHS.SITE_SNIPPET]: '多是一些零零碎碎的片段，通常是代码片段',
    [PATHS.SITE_ABOUT]: `叮～ 你有一份关于${NICKNAME}的简介，请查收～`,
};
