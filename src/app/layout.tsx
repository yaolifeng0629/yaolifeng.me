import StyledComponentsRegistry from '@/lib/registry';

import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
    title: 'yaolifeng.me',
    description: 'yaolifeng.me'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className="dark">
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    );
}
