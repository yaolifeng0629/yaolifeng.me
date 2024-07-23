'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/lib/utils';

const labelVariants = cva(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>;

export function Label({ className, ...props }: LabelProps) {
    return <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />;
}
