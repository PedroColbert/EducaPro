import { LucideIcon } from 'lucide-react';

import Card from '@/Components/UI/Card';

export default function GuardianMetricCard({
    icon: Icon,
    title,
    value,
    description,
    tone = 'indigo',
}: {
    icon: LucideIcon;
    title: string;
    value: string;
    description: string;
    tone?: 'indigo' | 'emerald' | 'amber';
}) {
    const toneMap = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
    } as const;

    return (
        <Card className="flex items-start gap-4">
            <div className={`rounded-2xl p-3 ${toneMap[tone]}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
        </Card>
    );
}
