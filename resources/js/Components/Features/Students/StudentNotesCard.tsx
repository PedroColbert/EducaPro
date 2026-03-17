import { Edit2 } from 'lucide-react';

import Card from '@/Components/UI/Card';
import { Student } from '@/types';

export default function StudentNotesCard({ student }: { student: Student }) {
    return (
        <Card className="border-amber-100 bg-amber-50/50">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800">Observações Pedagógicas</h2>
                <button className="p-1 text-indigo-600 hover:text-indigo-700">
                    <Edit2 size={14} />
                </button>
            </div>
            <p className="text-sm italic leading-relaxed text-slate-700">"{student.notes}"</p>
        </Card>
    );
}
