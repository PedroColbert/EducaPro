import { Edit2 } from 'lucide-react';

import Card from '@/Components/UI/Card';

export default function LessonPlanQuickEditor() {
    return (
        <Card className="h-full border-2 border-dashed bg-slate-50/50">
            <div className="flex h-full flex-col items-center justify-center py-10 text-center text-slate-500">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm">
                    <Edit2 size={24} className="text-indigo-400" />
                </div>
                <h3 className="mb-2 font-bold text-slate-700">Editor Rápido</h3>
                <p className="mb-6 px-4 text-sm">Selecione um plano de aula para editar seus detalhes, anexar materiais e registrar o homework.</p>
                <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:border-indigo-300">
                    Criar plano em branco
                </button>
            </div>
        </Card>
    );
}
