import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';

interface ChildItem {
    id: number;
    name: string;
    level: string;
    status: string;
    relationshipLabel?: string | null;
    classNames: string[];
}

export default function ChildSwitcher({
    students,
    selectedStudentId,
}: {
    students: ChildItem[];
    selectedStudentId: number | null;
}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {students.map((student) => (
                <Link key={student.id} href={`/family?student=${student.id}`}>
                    <Card className={`h-full transition-all ${selectedStudentId === student.id ? 'border-indigo-200 bg-indigo-50/60 shadow-md shadow-indigo-100' : 'hover:border-indigo-100'}`}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-lg font-bold text-slate-900">{student.name}</p>
                                <p className="mt-1 text-sm text-slate-500">{student.level}</p>
                            </div>
                            <Badge variant={student.status === 'attention' ? 'warning' : 'success'}>
                                {student.relationshipLabel ?? 'Responsavel'}
                            </Badge>
                        </div>
                        <p className="mt-4 text-sm text-slate-600">{student.classNames.join(', ') || 'Sem grupo vinculado no momento'}</p>
                        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-indigo-600">
                            Abrir painel deste filho <ChevronRight size={15} />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
