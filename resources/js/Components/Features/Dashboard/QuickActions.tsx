import { Calendar, FileText, Folder, Plus, TrendingUp, Users } from 'lucide-react';

import Card from '@/Components/UI/Card';
import { useAppContext } from '@/hooks/useAppContext';
import { AppTab } from '@/types';

export default function QuickActions({ changeTab }: { changeTab: (tabId: AppTab) => void }) {
    const { appContext } = useAppContext();
    const actions = getQuickActions(appContext.profile);

    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Acesso rapido</h2>
            <div className="grid grid-cols-2 gap-3">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <button
                            key={action.label}
                            onClick={() => changeTab(action.tab)}
                            className={`flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-50 p-4 text-slate-700 transition-colors ${action.hoverClass}`}
                        >
                            <Icon size={20} className={action.iconClass} />
                            <span className="text-xs font-medium">{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </Card>
    );
}

function getQuickActions(profile: string | null) {
    if (profile === 'admin') {
        return [
            { tab: 'alunos' as const, label: 'Ver estudantes', icon: Users, iconClass: 'text-indigo-500', hoverClass: 'hover:bg-indigo-50 hover:text-indigo-700' },
            { tab: 'turmas' as const, label: 'Ver turmas', icon: Calendar, iconClass: 'text-emerald-500', hoverClass: 'hover:bg-emerald-50 hover:text-emerald-700' },
            { tab: 'agenda' as const, label: 'Agenda escolar', icon: Folder, iconClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50 hover:text-blue-700' },
            { tab: 'desempenho' as const, label: 'Relatorios', icon: TrendingUp, iconClass: 'text-rose-500', hoverClass: 'hover:bg-rose-50 hover:text-rose-700' },
        ];
    }

    if (profile === 'coordinator') {
        return [
            { tab: 'alunos' as const, label: 'Apoio a alunos', icon: Users, iconClass: 'text-indigo-500', hoverClass: 'hover:bg-indigo-50 hover:text-indigo-700' },
            { tab: 'planejamento' as const, label: 'Revisar planos', icon: Calendar, iconClass: 'text-emerald-500', hoverClass: 'hover:bg-emerald-50 hover:text-emerald-700' },
            { tab: 'atividades' as const, label: 'Acompanhar tarefas', icon: FileText, iconClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50 hover:text-blue-700' },
            { tab: 'desempenho' as const, label: 'Relatorios', icon: TrendingUp, iconClass: 'text-rose-500', hoverClass: 'hover:bg-rose-50 hover:text-rose-700' },
        ];
    }

    return [
        { tab: 'turmas' as const, label: 'Fazer chamada', icon: Plus, iconClass: 'text-indigo-500', hoverClass: 'hover:bg-indigo-50 hover:text-indigo-700' },
        { tab: 'atividades' as const, label: 'Corrigir tarefas', icon: FileText, iconClass: 'text-emerald-500', hoverClass: 'hover:bg-emerald-50 hover:text-emerald-700' },
        { tab: 'materiais' as const, label: 'Materiais', icon: Folder, iconClass: 'text-blue-500', hoverClass: 'hover:bg-blue-50 hover:text-blue-700' },
        { tab: 'desempenho' as const, label: 'Relatorios', icon: TrendingUp, iconClass: 'text-rose-500', hoverClass: 'hover:bg-rose-50 hover:text-rose-700' },
    ];
}
