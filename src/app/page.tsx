'use client';

import React, { useMemo } from'react';

import { HeroSection } from '@/components/home';
import IntroScrollMouse from '@/components/intro-scroll-mouse';

export default function Home() {
    const memoizedHeroSection = useMemo(() => <HeroSection />, []);
    const memoizedIntroScrollMouse = useMemo(() => <IntroScrollMouse />, []);

    return (
        <div className="relative grid h-[calc(100vh-70px)] place-content-center">
            {memoizedHeroSection}
            <div className="absolute inset-x-0 bottom-8 grid place-content-center md:bottom-12">
                {memoizedIntroScrollMouse}
            </div>
        </div>
    );
}
