import { CheckSquare, Clock } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { AppTab, TodayClass } from '@/types';

export default function TodayClasses({
    classes,
    changeTab,
}: {
    classes: TodayClass[];
    changeTab: (tabId: AppTab) => void;
}) {
    return (
        <Card className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800">Aulas de Hoje</h2>
                <button onClick={() => changeTab('agenda')} className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Ver agenda completa
                </button>
            </div>

            <div className="space-y-6">
                {classes.map((cls, index) => (
                    <div key={cls.id} className="relative flex gap-4">
                        {index !== classes.length - 1 ? <div className="absolute bottom-[-24px] left-6 top-10 w-px bg-slate-200" /> : null}

                        <div className="w-12 pt-1 text-right">
                            <span className="block text-xs font-semibold text-slate-500">{cls.time.split(' - ')[0]}</span>
                        </div>

                        <div
                            className={`z-10 mt-2 h-3 w-3 rounded-full ${
                                cls.status === 'completed'
                                    ? 'bg-slate-300 ring-4 ring-slate-100'
                                    : cls.status === 'current'
                                      ? 'bg-indigo-600 ring-4 ring-indigo-100'
                                      : 'border-2 border-slate-300 bg-white'
                            }`}
                        />

                        <div
                            className={`flex-1 rounded-2xl border p-4 ${
                                cls.status === 'current' ? 'border-indigo-100 bg-indigo-50/50' : 'border-slate-100 bg-white'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className={`font-semibold ${cls.status === 'current' ? 'text-indigo-900' : 'text-slate-800'}`}>{cls.name}</h3>
                                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                        <Clock size={14} /> {cls.time} • {cls.room}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    {cls.status === 'current' ? <Badge variant="primary">Em andamento</Badge> : null}
                                    {cls.status === 'completed' ? <Badge variant="success">Concluída</Badge> : null}
                                    {cls.status === 'current' ? (
                                        <button className="mt-1 flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
                                            <CheckSquare size={14} /> Registrar Presença
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
