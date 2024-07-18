import StyledComponentsRegistry from '@/lib/registry';

import type { Metadata } from 'next';
import './globals.css';

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
            <body>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </body>
        </html>
    );
}
