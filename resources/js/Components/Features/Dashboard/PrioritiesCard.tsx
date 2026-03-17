import { AlertTriangle, CheckCircle2 } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { Activity, AppTab } from '@/types';

export default function PrioritiesCard({
    tasks,
    changeTab,
}: {
    tasks: Activity[];
    changeTab: (tabId: AppTab) => void;
}) {
    return (
        <Card>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Prioridades</h2>
                <Badge variant="warning">3</Badge>
            </div>

            <div className="space-y-3">
                {tasks
                    .filter((task) => task.status === 'grading')
                    .map((task) => (
                        <div key={task.id} className="cursor-pointer rounded-xl border border-amber-100 bg-amber-50/50 p-3 transition-colors hover:bg-amber-50">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-amber-500">
                                    <AlertTriangle size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-800">Corrigir: {task.title}</p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {task.class} • Prazo: {task.deadline}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                <div className="cursor-pointer rounded-xl border border-transparent p-3 transition-colors hover:border-slate-100 hover:bg-slate-50">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-slate-400">
                            <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">Preparar aula: Modal Verbs</p>
                            <p className="mt-0.5 text-xs text-slate-500">Turma A2 • Amanhã</p>
                        </div>
                    </div>
                </div>
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
