'use client';

import React, { useEffect } from 'react';

import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

// Assuming there's a context or a higher-order component that properly manages the lifecycle of `serverStyleSheet`
const serverStyleSheet = new ServerStyleSheet();

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
    useServerInsertedHTML(() => {
        const styles = serverStyleSheet.getStyleElement();
        // This might be moved to a more appropriate place for cleanup
        return <>{styles}</>;
    }, []);

    useEffect(() => {
        // Cleanup function for client-side only
        return () => {
            serverStyleSheet.seal();
        };
    }, []);

    if (typeof window !== 'undefined') return <>{children}</>;

    return <StyleSheetManager sheet={serverStyleSheet.instance}>{children}</StyleSheetManager>;
}
