import { PropsWithChildren } from 'react';

export function SectionContainer({ title, subtitle, children }: PropsWithChildren<{ title: string; subtitle?: string }>) {
    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
            </div>
            {children}
        </section>
    );
}
