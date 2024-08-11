import React from 'react';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-w-screen-wrapper h-full place-content-center px-4">
            <h1 className="uppercase tracking-widest text-gray-500">404 | Not Found</h1>
            <Link
                href="/"
                className="tracking-widest inline-block rounded bg-background py-3 font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-background mt-8 cursor-pointer"
            >
                Back Home Page
            </Link>
        </div>
    );
}
