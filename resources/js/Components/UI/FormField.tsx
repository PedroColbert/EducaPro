import { PropsWithChildren } from 'react';

export function FormField({ label, children }: PropsWithChildren<{ label: string }>) {
    return (
        <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            {children}
        </label>
    );
}
