import { Console } from '@/components/console';
import { Favicon } from '@/components/favicon';
import { Navbar } from '@/components/navbar';
import Particles from '@/components/particles';

import StyledComponentsRegistry from '@/lib/registry';

import type { Metadata } from 'next';
import "@/styles/global.css";

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
            <body className="flex flex-col items-center">
                <StyledComponentsRegistry>
                    <Navbar />
                    <main className="relative z-10 min-h-[calc(100vh-160px)] w-screen max-w-screen-md 2xl:max-w-7xl md:px-10">
                        {children}
                    </main>
                    <Favicon />
                    <Console />
                    {/* <Particles
                        className="fixed inset-0 z-[1]"
                        quantity={100}
                        staticity={50}
                        ease={50}
                    /> */}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
