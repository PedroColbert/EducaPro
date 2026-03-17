import { BookOpen, Calendar, CheckSquare, Folder, MoreVertical, Users } from 'lucide-react';

import Card from '@/Components/UI/Card';
import { CourseClass } from '@/types';

export default function ClassCard({ courseClass }: { courseClass: CourseClass }) {
    return (
        <Card className="group flex flex-col">
            <div className="mb-4 flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-600">{courseClass.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <Calendar size={14} /> {courseClass.schedule}
                    </p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={20} />
                </button>
            </div>

            <div className="mb-6 flex flex-col gap-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <span className="flex items-center gap-1.5 text-slate-600">
                        <Users size={16} className="text-indigo-500" /> Alunos
                    </span>
                    <span className="font-bold text-slate-800">{courseClass.students}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <span className="flex items-center gap-1.5 text-slate-600">
                        <BookOpen size={16} className="text-emerald-500" /> Próximo Tópico
                    </span>
                    <span className="max-w-[120px] truncate font-medium text-slate-700">{courseClass.nextTopic}</span>
                </div>
            </div>

            <div className="mt-auto">
                <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-500">Progresso do Semestre</span>
                    <span className="font-bold text-indigo-600">{courseClass.progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-indigo-500 transition-all duration-1000" style={{ width: `${courseClass.progress}%` }} />
                </div>
            </div>

            <div className="mt-6 flex gap-2 border-t border-slate-100 pt-5">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-50 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100">
                    <CheckSquare size={16} /> Chamada
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">
                    <Folder size={16} /> Detalhes
                </button>
            </div>
        </Card>
    );
}
