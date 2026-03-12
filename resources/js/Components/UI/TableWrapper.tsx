import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export function TableWrapper({ children, className }: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn('overflow-hidden rounded-3xl border border-slate-200 bg-white', className)}>
            <div className="overflow-x-auto">{children}</div>
        </div>
    );
}
