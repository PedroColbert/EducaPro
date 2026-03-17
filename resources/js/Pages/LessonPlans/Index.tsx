import { Plus } from 'lucide-react';

import LessonPlanCard from '@/Components/Features/LessonPlans/LessonPlanCard';
import LessonPlanQuickEditor from '@/Components/Features/LessonPlans/LessonPlanQuickEditor';
import { lessonPlans } from '@/data/mockData';

export default function LessonPlansPage() {
    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Plano de Aulas</h1>
                    <p className="mt-1 text-slate-500">Organize seus conteúdos e materiais para as próximas aulas.</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                    <Plus size={18} /> Novo Plano
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    {lessonPlans.map((plan) => (
                        <LessonPlanCard key={plan.id} plan={plan} />
                    ))}
                </div>
                <LessonPlanQuickEditor />
            </div>
        </div>
    );
}
