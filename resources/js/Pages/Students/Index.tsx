import { useState } from 'react';
import { Filter, Search } from 'lucide-react';

import StudentInfoCard from '@/Components/Features/Students/StudentInfoCard';
import StudentNotesCard from '@/Components/Features/Students/StudentNotesCard';
import StudentPerformanceCard from '@/Components/Features/Students/StudentPerformanceCard';
import StudentProfileHeader from '@/Components/Features/Students/StudentProfileHeader';
import StudentTable from '@/Components/Features/Students/StudentTable';
import StudentTasksCard from '@/Components/Features/Students/StudentTasksCard';
import { students } from '@/data/mockData';
import { Student } from '@/types';

export default function StudentsPage() {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    if (selectedStudent) {
        return (
            <div className="animate-in space-y-6 fade-in slide-in-from-bottom-4 duration-500">
                <StudentProfileHeader student={selectedStudent} onBack={() => setSelectedStudent(null)} />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6">
                        <StudentInfoCard student={selectedStudent} />
                        <StudentNotesCard student={selectedStudent} />
                    </div>

                    <div className="space-y-6 lg:col-span-2">
                        <StudentPerformanceCard student={selectedStudent} />
                        <StudentTasksCard />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Alunos</h1>
                    <p className="mt-1 text-slate-500">Gerencie e acompanhe o desempenho dos seus alunos.</p>
                </div>
                <div className="flex w-full gap-3 sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar aluno..."
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>
                    <button className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition-colors hover:bg-slate-50">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <StudentTable students={students} onSelectStudent={setSelectedStudent} />
        </div>
    );
}
