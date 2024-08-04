'use client';

import { HeroSection } from '@/components/home';
import IntroScrollMouse from '@/components/intro-scroll-mouse';

export default function Home() {
    return (
        <div className="relative grid h-[calc(100vh-70px)] place-content-center">
            <HeroSection />
            <div className="absolute inset-x-0 bottom-8 grid place-content-center md:bottom-12">
                <IntroScrollMouse />
            </div>
        </div>
    );
}
