import { AlertTriangle, Calendar, CheckCircle2, Clock, Users } from 'lucide-react';

import { Activity } from '@/types';

export default function ActivityCard({ activity }: { activity: Activity }) {
    const icon =
        activity.status === 'grading' ? (
            <AlertTriangle size={18} />
        ) : activity.status === 'completed' ? (
            <CheckCircle2 size={18} />
        ) : (
            <Clock size={18} />
        );

    const iconClasses =
        activity.status === 'grading'
            ? 'bg-amber-100 text-amber-600'
            : activity.status === 'completed'
              ? 'bg-emerald-100 text-emerald-600'
              : 'bg-slate-100 text-slate-500';

    return (
        <div className="group flex flex-col items-start justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-indigo-200 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
                <div className={`mt-1 rounded-full p-2 ${iconClasses}`}>{icon}</div>
                <div>
                    <h3 className="font-bold text-slate-800">{activity.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                            <Users size={14} /> {activity.class}
                        </span>
                        <span className="flex items-center gap-1">
                            <Calendar size={14} /> Prazo: {activity.deadline}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex w-full items-center gap-6 sm:mt-0 sm:w-auto">
                <div className="flex-1 text-right sm:flex-none">
                    <p className="text-sm font-medium text-slate-700">
                        {activity.submitted} / {activity.total}
                    </p>
                    <p className="text-xs text-slate-500">Entregues</p>
                </div>
                <button
                    className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                        activity.status === 'grading'
                            ? 'border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                >
                    {activity.status === 'grading' ? 'Corrigir Agora' : 'Ver Detalhes'}
                </button>
            </div>
        </div>
    );
}
