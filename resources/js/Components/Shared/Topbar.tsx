import { Calendar, Menu } from 'lucide-react';

import { AppTab, CurrentUser } from '@/types';

const tabLabels: Record<AppTab, string> = {
    dashboard: 'Dashboard',
    alunos: 'Estudantes',
    turmas: 'Turmas e grupos',
    planejamento: 'Planejamento',
    materiais: 'Recursos',
    atividades: 'Atividades',
    agenda: 'Agenda',
    desempenho: 'Relatorios',
};

export function Topbar({
    activeTab,
    currentUser,
    onOpenMobileMenu,
}: {
    activeTab: AppTab;
    currentUser: CurrentUser;
    onOpenMobileMenu: () => void;
}) {
    const currentDate = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden" onClick={onOpenMobileMenu}>
                    <Menu size={24} />
                </button>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Visao atual</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{tabLabels[activeTab]}</span>
                        <span className="hidden text-sm text-slate-500 sm:inline">{currentUser.organizationName ?? 'EducaPro'}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500 md:flex">
                    <Calendar size={16} />
                    <span className="capitalize">{currentDate}</span>
                </div>
                <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
                    {currentUser.role}
                </div>
            </div>
        </header>
    );
}
