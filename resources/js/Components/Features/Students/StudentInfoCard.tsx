import { AlertCircle } from 'lucide-react';

import Card from '@/Components/UI/Card';
import { Student } from '@/types';

export default function StudentInfoCard({ student }: { student: Student }) {
    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Informacoes</h2>
            <div className="space-y-4">
                <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Frequencia</p>
                    <p className="flex items-center gap-2 text-lg font-bold text-slate-800">
                        {student.attendanceRate}%
                        {student.attendanceRate < 75 ? <AlertCircle size={16} className="text-rose-500" /> : null}
                    </p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Email de contato</p>
                    <p className="text-sm text-slate-700">{student.email}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">Telefone</p>
                    <p className="text-sm text-slate-700">{student.phone}</p>
                </div>
            </div>
        </Card>
    );
}
