'use client';

import React from 'react';

import { useFavicon } from 'ahooks';

import { ImageAssets } from '@/constants';

export const Favicon = () => {
    const [url, setUrl] = React.useState<string>(ImageAssets.logoDark);
    useFavicon(url);

    React.useEffect(() => {
        setUrl(ImageAssets.logoLight);
    }, []);

    return null;
};
