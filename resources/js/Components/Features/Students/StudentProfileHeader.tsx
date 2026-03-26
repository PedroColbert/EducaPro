import { ArrowLeft, BookOpen, CheckCircle2, Edit2, MessageSquare, Users } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import { studentStatusMeta } from '@/data/mockData';
import { Student } from '@/types';

export default function StudentProfileHeader({
    student,
    classLabel,
    onBack,
    onEdit,
}: {
    student: Student;
    classLabel: string;
    onBack: () => void;
    onEdit: () => void;
}) {
    return (
        <>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600">
                <ArrowLeft size={16} /> Voltar para lista de alunos
            </button>

            <div className="relative flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:flex-row md:items-center">
                <div className="absolute right-0 top-0 -z-10 h-64 w-64 rounded-bl-full bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50" />

                <div className={`flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold shadow-md ring-4 ring-white ${student.color}`}>
                    {student.initials}
                </div>

                <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-slate-800">{student.name}</h1>
                        <Badge variant={studentStatusMeta[student.status].badge}>{studentStatusMeta[student.status].label}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1.5">
                            <Users size={16} className="text-slate-400" /> {classLabel}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <BookOpen size={16} className="text-slate-400" /> Nivel {student.level}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CheckCircle2 size={16} className="text-slate-400" /> {student.age} anos
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex gap-3 md:mt-0">
                    <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                        <MessageSquare size={16} /> Mensagem
                    </button>
                    <button onClick={onEdit} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700">
                        <Edit2 size={16} /> Editar Perfil
                    </button>
                </div>
            </div>
        </>
    );
}
