import { FileText, Folder, Plus, TrendingUp } from 'lucide-react';

import Card from '@/Components/UI/Card';
import { AppTab } from '@/types';

export default function QuickActions({ changeTab }: { changeTab: (tabId: AppTab) => void }) {
    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Acesso Rápido</h2>
            <div className="grid grid-cols-2 gap-3">
                <button onClick={() => changeTab('turmas')} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 p-4 text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700">
                    <Plus size={20} className="text-indigo-500" />
                    <span className="text-xs font-medium">Fazer Chamada</span>
                </button>
                <button onClick={() => changeTab('atividades')} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 p-4 text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700">
                    <FileText size={20} className="text-emerald-500" />
                    <span className="text-xs font-medium">Corrigir Tarefas</span>
                </button>
                <button onClick={() => changeTab('materiais')} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 p-4 text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700">
                    <Folder size={20} className="text-blue-500" />
                    <span className="text-xs font-medium">Materiais</span>
                </button>
                <button onClick={() => changeTab('desempenho')} className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 p-4 text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-700">
                    <TrendingUp size={20} className="text-rose-500" />
                    <span className="text-xs font-medium">Relatórios</span>
                </button>
            </div>
        </Card>
    );
}
