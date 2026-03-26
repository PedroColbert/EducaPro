import { AlertCircle, CheckCircle2 } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { Activity } from '@/types';

export default function StudentTasksCard({
    tasks,
}: {
    tasks: { activity: Activity; statusLabel: string; grade: string; isLate: boolean }[];
}) {
    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Ultimas tarefas</h2>
            <div className="space-y-3">
                {tasks.length ? (
                    tasks.map((task) => (
                        <div
                            key={task.activity.id}
                            className={`flex items-center justify-between rounded-xl border p-3 ${
                                task.isLate ? 'border-rose-100 bg-rose-50/30' : 'border-slate-100 bg-slate-50/50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {task.isLate ? <AlertCircle size={18} className="text-rose-500" /> : <CheckCircle2 size={18} className="text-emerald-500" />}
                                <div>
                                    <p className="text-sm font-medium text-slate-700">{task.activity.title}</p>
                                    <p className={`text-xs ${task.isLate ? 'text-rose-500' : 'text-slate-500'}`}>{task.statusLabel}</p>
                                </div>
                            </div>
                            {task.grade ? <Badge variant="success">Nota: {task.grade}</Badge> : <Badge variant={task.isLate ? 'danger' : 'warning'}>{task.isLate ? 'Pendente' : 'Em revisao'}</Badge>}
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-slate-500">Nenhuma tarefa recente para este aluno.</p>
                )}
            </div>
        </Card>
    );
}
