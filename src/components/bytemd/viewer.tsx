'use client';

import React, { useMemo } from 'react';

import { Viewer } from '@bytemd/react';

import { plugins, sanitize } from './config';

type BytemdViewerProps = {
    body: string;
};

export const BytemdViewer = ({ body }: BytemdViewerProps) => {
    const memoizedViewer = useMemo(() => (
        <Viewer value={body} plugins={plugins} sanitize={sanitize} />
    ), [body]);

    return memoizedViewer;
};
