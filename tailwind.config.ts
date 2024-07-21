import { addDynamicIconSelectors } from '@iconify/tailwind';
import { fontFamily } from 'tailwindcss/defaultTheme';

import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        theme: {
            screens: {
                sm: '640px',
                // => @media (min-width: 640px) { ... }

                md: '768px',
                // => @media (min-width: 768px) { ... }

                lg: '1024px',
                // => @media (min-width: 1024px) { ... }

                // 基础版心
                wrapper: '1200px',

                xl: '1280px',
                // => @media (min-width: 1280px) { ... }

                '2xl': '1440px'
                // => @media (min-width: 1440px) { ... }
            },
            debugScreens: {
                position: ['bottom', 'right'],
                ignore: ['dark']
            },
            extend: {
                colors: {
                    border: 'hsl(var(--border))',
                    input: 'hsl(var(--input))',
                    ring: 'hsl(var(--ring))',
                    background: 'hsl(var(--background))',
                    foreground: 'hsl(var(--foreground))',
                    primary: {
                        DEFAULT: 'hsl(var(--primary))',
                        foreground: 'hsl(var(--primary-foreground))'
                    }
                },
                borderRadius: {
                    lg: `var(--radius)`,
                    md: `calc(var(--radius) - 2px)`,
                    sm: 'calc(var(--radius) - 4px)'
                },
                fontFamily: {
                    sans: [...fontFamily.sans],
                    mono: [...fontFamily.mono]
                },
                keyframes: {
                    'accordion-down': {
                        from: { height: '0' },
                        to: { height: 'var(--radix-accordion-content-height)' }
                    },
                    'accordion-up': {
                        from: { height: 'var(--radix-accordion-content-height)' },
                        to: { height: '0' }
                    },
                    'cursor-blink': {
                        '50%': { borderColor: 'transparent' }
                    },
                    'intro-scroll': {
                        '0%': {
                            transform: 'translateY(0)',
                            opacity: '0'
                        },
                        '20%': {
                            transform: 'translateY(2px)',
                            opacity: '1'
                        },
                        '100%': {
                            transform: 'translateY(8px)',
                            opacity: '0'
                        }
                    }
                },
                animation: {
                    'accordion-down': 'accordion-down 0.2s ease-out',
                    'accordion-up': 'accordion-up 0.2s ease-out',
                    // 光标闪烁动画
                    'cursor-blink': 'cursor-blink 0.6s step-end infinite alternate',
                    'intro-scroll': 'intro-scroll 3s ease infinite'
                }
            }
        }
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/typography'),
        // 开发模式下加载显示屏幕大小的插件
        // process.env.NODE_ENV === 'development' && require('tailwindcss-debug-screens'),
        // Iconify plugin
        addDynamicIconSelectors(),
        // 动画插件
        require('tailwindcss-animated')
    ]
};
export default config;
