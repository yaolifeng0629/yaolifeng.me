import React from 'react';

/**
 * React Hook 版本的移动端检测，支持响应式和 SSR
 * @param breakpoint 移动端断点，默认为 768px
 * @returns boolean
 */
export const useIsMobile = (breakpoint = 768): boolean => {
    const [isMobile, setIsMobile] = React.useState<boolean>(false);
    const [hasMounted, setHasMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setHasMounted(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        // 初始检查
        checkMobile();

        // 添加窗口大小变化监听
        window.addEventListener('resize', checkMobile);

        // 清理监听器
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    // 在服务器端或组件挂载前返回默认值
    if (!hasMounted) {
        return false;
    }

    return isMobile;
};

// 如果你需要在组件外部使用，可以添加这个工具函数
export const getIsMobile = (breakpoint = 768): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= breakpoint;
};
