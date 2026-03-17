import { ReactNode } from 'react';

const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    danger: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
    primary: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20',
    neutral: 'border border-slate-200 bg-slate-50 text-slate-600',
};

export default function Badge({
    children,
    variant = 'default',
}: {
    children: ReactNode;
    variant?: keyof typeof variants;
}) {
    return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant]}`}>{children}</span>;
}
