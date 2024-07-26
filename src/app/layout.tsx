import { Console } from '@/components/console';
import { Favicon } from '@/components/favicon';
import { Navbar } from '@/components/navbar';

import StyledComponentsRegistry from '@/lib/registry';

import type { Metadata } from 'next';
import '@/styles/global.css';

export const metadata: Metadata = {
    title: '姚利锋',
    description: '姚利锋'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <StyledComponentsRegistry>
                    <Navbar />
                    <main className="min-h-[calc(100vh-160px)]">{children}</main>
                    <Favicon />
                    <Console />
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
