import { ReactNode } from 'react';

import { Card } from './Card';

export function StatCard({ label, value, hint, icon }: { label: string; value: string; hint: string; icon?: ReactNode }) {
    return (
        <Card className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <div className="rounded-2xl bg-teal-50 p-2 text-teal-700">{icon ?? <span>•</span>}</div>
            </div>
            <div>
                <p className="text-3xl font-semibold text-slate-900">{value}</p>
                <p className="mt-1 text-sm text-slate-500">{hint}</p>
            </div>
        </Card>
    );
}
