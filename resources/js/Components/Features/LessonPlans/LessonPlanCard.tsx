import { Calendar, Copy, MoreVertical, Users } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { lessonPlanStatusMeta } from '@/data/mockData';
import { LessonPlan } from '@/types';

export default function LessonPlanCard({
    plan,
    classLabel,
    onSelect,
    onDuplicate,
}: {
    plan: LessonPlan;
    classLabel: string;
    onSelect: () => void;
    onDuplicate: () => void;
}) {
    const meta = lessonPlanStatusMeta[plan.status];

    return (
        <Card className="group cursor-pointer transition-colors hover:border-indigo-200" onClick={onSelect}>
            <div className="flex items-start justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <Badge variant={meta.badge}>{meta.label}</Badge>
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                            <Calendar size={12} /> {new Date(plan.date).toLocaleDateString('pt-BR')}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600">{plan.topic}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <Users size={14} /> {classLabel}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="rounded-full p-2 text-slate-400 hover:text-indigo-600" onClick={(event) => { event.stopPropagation(); onDuplicate(); }}>
                        <Copy size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-indigo-600">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Objetivos:</span> {plan.objectives.join(', ')}
                </p>
            </div>
        </Card>
    );
}
