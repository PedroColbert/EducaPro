import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const variants = {
    excellent: 'bg-emerald-100 text-emerald-700',
    good: 'bg-sky-100 text-sky-700',
    attention: 'bg-amber-100 text-amber-700',
    neutral: 'bg-slate-100 text-slate-600',
};

export function Badge({
    children,
    variant = 'neutral',
}: {
    children: ReactNode;
    variant?: keyof typeof variants;
}) {
    return <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-semibold', variants[variant])}>{children}</span>;
}
