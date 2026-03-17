import { Plus } from 'lucide-react';

import Card from '@/Components/UI/Card';
import ActivityCard from '@/Components/Features/Activities/ActivityCard';
import { activities } from '@/data/mockData';

export default function ActivitiesPage() {
    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Atividades & Homework</h1>
                    <p className="mt-1 text-slate-500">Gerencie tarefas, correções e feedbacks dos alunos.</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                    <Plus size={18} /> Nova Atividade
                </button>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="flex overflow-x-auto border-b border-slate-100">
                    {['Todas', 'Para Corrigir (1)', 'Pendentes de Entrega (2)', 'Concluídas (1)'].map((tab, index) => (
                        <button
                            key={tab}
                            className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium ${
                                index === 0 ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 p-6">
                    {activities.map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
            </Card>
        </div>
    );
}
