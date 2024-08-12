import React from 'react';

export default function Layout({ children }: React.PropsWithChildren) {
    console.log('children --->', children);
    return <>{children}</>;
}
