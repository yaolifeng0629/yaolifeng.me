import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

// import { showErrorToast, showSuccessToast } from "@/components/ui/toast";
export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const toSlug = (s: string) => {
    if (!s) {
        return '';
    }

    return slugify(s, {
        lower: true,
    });
};

export const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(text?.trim())
            .then(() => {
                // showSuccessToast("已复制到粘贴板");
            })
            .catch((error) => {
                // showErrorToast(error as string);
            });
    } else {
        // 以下代码来自：https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
        // 隐藏此输入框
        textarea.style.position = 'fixed';
        textarea.style.clip = 'rect(0 0 0 0)';
        textarea.style.top = '10px';
        // 赋值，手动去除首尾空白字符
        textarea.value = text?.trim();
        // 选中
        textarea.select();
        // 复制
        document.execCommand('copy', true);
        // showSuccessToast('已复制到粘贴板');
        // 移除输入框
        document.body.removeChild(textarea);
    }
};

export const isBrowser = () => {
    // 代码来自：https://ahooks.js.org/zh-CN/guide/blog/ssr
    /* eslint-disable @typescript-eslint/prefer-optional-chain */
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

dayjs.extend(relativeTime);

export const toFromNow = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').fromNow();
};

export const toSlashDateString = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').format('YYYY年M月D日 dddd HH:mm:ss');
};

export const prettyDate = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').format('YYYY年 M月 D日');
};

export const prettyDateWithWeekday = (date: number | Date) => {
    return dayjs(date).locale('zh-cn').format('YYYY 年 M 月 D 日，dddd');
};
