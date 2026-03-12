import { PropsWithChildren } from 'react';

export function ModalShell({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <div className="mt-4">{children}</div>
        </div>
    );
}
