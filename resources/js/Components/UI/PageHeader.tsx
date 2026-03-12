import { ReactNode } from 'react';

export function PageHeader({
    title,
    description,
    actions,
}: {
    title: string;
    description: string;
    actions?: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600">EducaPro</p>
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
                    <p className="mt-1 max-w-2xl text-sm text-slate-500">{description}</p>
                </div>
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
        </div>
    );
}
