import { BookOpen, Calendar, Copy, Save } from 'lucide-react';

import Card from '@/Components/UI/Card';

export default function LessonPlanQuickEditor({
    children,
    title,
    subtitle,
    onDuplicate,
    onSave,
}: {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    onDuplicate: () => void;
    onSave: () => void;
}) {
    return (
        <Card className="h-full">
            <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">Editor rapido</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-800">{title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={onDuplicate} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                        <Copy size={16} />
                    </button>
                    <button onClick={onSave} className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                        <Save size={16} />
                    </button>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                    <Calendar size={14} /> Planejamento funcional
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2">
                    <BookOpen size={14} /> Materiais e homework
                </div>
            </div>
            {children}
        </Card>
    );
}
