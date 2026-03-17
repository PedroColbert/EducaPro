import { ChevronRight } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { Student } from '@/types';

export default function StudentTable({
    students,
    onSelectStudent,
}: {
    students: Student[];
    onSelectStudent: (student: Student) => void;
}) {
    return (
        <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Aluno</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Turma</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Nível</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Frequência</th>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student.id} className="group cursor-pointer transition-colors hover:bg-slate-50/80" onClick={() => onSelectStudent(student)}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm ${student.color}`}>
                                            {student.initials}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-800 transition-colors group-hover:text-indigo-600">{student.name}</p>
                                            <p className="text-xs text-slate-500">{student.age} anos</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{student.class}</td>
                                <td className="px-6 py-4">
                                    <Badge>{student.level}</Badge>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-700">{student.attendance}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={student.status === 'Excelente' || student.status === 'Ótimo' ? 'success' : student.status === 'Atenção' ? 'danger' : 'warning'}>
                                        {student.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="flex w-full items-center justify-end gap-1 text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                                        Ver perfil <ChevronRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
