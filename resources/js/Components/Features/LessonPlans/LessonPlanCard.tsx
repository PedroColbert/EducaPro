import { Calendar, MoreVertical, Users } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { LessonPlan } from '@/types';

export default function LessonPlanCard({ plan }: { plan: LessonPlan }) {
    return (
        <Card className="group cursor-pointer transition-colors hover:border-indigo-200">
            <div className="flex items-start justify-between">
                <div>
                    <div className="mb-2 flex items-center gap-2">
                        <Badge variant={plan.status === 'completed' ? 'neutral' : plan.status === 'draft' ? 'warning' : 'primary'}>
                            {plan.status === 'completed' ? 'Concluído' : plan.status === 'draft' ? 'Rascunho' : 'Planejado'}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                            <Calendar size={12} /> {plan.date}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600">{plan.topic}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <Users size={14} /> {plan.class}
                    </p>
                </div>
                <button className="p-2 text-slate-400 hover:text-indigo-600">
                    <MoreVertical size={18} />
                </button>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Objetivo:</span> {plan.objectives}
                </p>
            </div>
        </Card>
    );
}
