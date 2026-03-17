import { Plus } from 'lucide-react';

import ClassCard from '@/Components/Features/Classes/ClassCard';
import { courseClasses } from '@/data/mockData';

export default function ClassesPage() {
    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Turmas</h1>
                    <p className="mt-1 text-slate-500">Gestão rápida das suas classes em andamento.</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                    <Plus size={16} /> Nova Turma
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courseClasses.map((courseClass) => (
                    <ClassCard key={courseClass.id} courseClass={courseClass} />
                ))}
            </div>
        </div>
    );
}
