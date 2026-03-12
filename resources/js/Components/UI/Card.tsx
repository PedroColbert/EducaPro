import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
    return (
        <section className={cn('rounded-3xl border border-white/65 bg-white/88 p-5 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur', className)}>
            {children}
        </section>
    );
}
