import { AlertTriangle, ArrowRight, Clock3, Sparkles } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { AppTab } from '@/types';

interface PriorityItem {
    id: string;
    title: string;
    description: string;
    level: 'critical' | 'attention' | 'normal';
    module: string;
    actionLabel: string;
    actionTab: AppTab;
}

const levelMeta = {
    critical: {
        badge: 'danger',
        icon: AlertTriangle,
        iconClass: 'text-rose-500',
        containerClass: 'border-rose-100 bg-rose-50/60',
        label: 'Critico',
    },
    attention: {
        badge: 'warning',
        icon: Clock3,
        iconClass: 'text-amber-500',
        containerClass: 'border-amber-100 bg-amber-50/60',
        label: 'Atencao',
    },
    normal: {
        badge: 'primary',
        icon: Sparkles,
        iconClass: 'text-indigo-500',
        containerClass: 'border-indigo-100 bg-indigo-50/50',
        label: 'Planejado',
    },
} as const;

export default function PrioritiesCard({
    tasks,
    changeTab,
}: {
    tasks: PriorityItem[];
    changeTab: (tabId: AppTab) => void;
}) {
    return (
        <Card>
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Prioridades</h2>
                    <p className="mt-1 text-sm text-slate-500">O painel prioriza o que tende a gerar impacto imediato na rotina.</p>
                </div>
                <Badge variant={tasks.some((task) => task.level === 'critical') ? 'danger' : tasks.some((task) => task.level === 'attention') ? 'warning' : 'primary'}>
                    {tasks.length}
                </Badge>
            </div>

            <div className="space-y-3">
                {tasks.length ? (
                    tasks.map((task) => {
                        const meta = levelMeta[task.level];
                        const Icon = meta.icon;

                        return (
                            <div key={task.id} className={`rounded-2xl border px-4 py-4 transition-colors ${meta.containerClass}`}>
                                <div className="flex items-start gap-3">
                                    <div className={`mt-0.5 ${meta.iconClass}`}>
                                        <Icon size={18} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <Badge variant={meta.badge}>{meta.label}</Badge>
                                            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{task.module}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-800">{task.title}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-500">{task.description}</p>
                                        <button
                                            onClick={() => changeTab(task.actionTab)}
                                            className="mt-3 flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                                        >
                                            {task.actionLabel} <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-4">
                        <p className="text-sm font-medium text-emerald-800">Nenhuma pendencia critica no momento.</p>
                        <p className="mt-1 text-sm text-emerald-700">Use a agenda e o planejamento para manter esse ritmo organizado.</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => changeTab('agenda')}
                className="mt-4 w-full rounded-xl bg-indigo-50 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100"
            >
                Ver agenda completa
            </button>
        </Card>
    );
}
