'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/button';

export default function Home() {
    const router = useRouter();

    function toZustand() {
        router.push('/zustand_use_demo');
    }
    function toAPI() {
        router.push('/test_request');
    }
    function toAntd() {
        router.push('/antd_use');
    }
    function toVitest() {
        router.push('/test_vitest');
    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <h1 className="text-4xl font-bold">Next.js Project Template</h1>
            <div className="flex mt-10">
                <Button text={'Zustand Use'} click={toZustand} />
                <Button text={'API Request Use'} click={toAPI} />
                <Button text={'Antd Use'} click={toAntd} />
                <Button text={'Vitest'} click={toVitest} />
            </div>
        </div>
    );
}
