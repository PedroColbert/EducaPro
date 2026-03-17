import { AlertCircle } from 'lucide-react';

import Card from '@/Components/UI/Card';
import { Student } from '@/types';

export default function StudentInfoCard({ student }: { student: Student }) {
    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Informações</h2>
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Frequência</p>
                    <p className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        {student.attendance}
                        {parseInt(student.attendance, 10) < 75 ? <AlertCircle size={16} className="text-rose-500" /> : null}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Contato do Responsável</p>
                    <p className="text-sm text-slate-700">{student.email}</p>
                </div>
            </div>
        </Card>
    );
}
