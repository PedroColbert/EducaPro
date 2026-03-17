import { Plus } from 'lucide-react';

import PrioritiesCard from '@/Components/Features/Dashboard/PrioritiesCard';
import QuickActions from '@/Components/Features/Dashboard/QuickActions';
import SummaryMetrics from '@/Components/Features/Dashboard/SummaryMetrics';
import TodayClasses from '@/Components/Features/Dashboard/TodayClasses';
import { activities, currentUser, summaryMetrics, todayClasses } from '@/data/mockData';
import { AppTab } from '@/types';

export default function DashboardPage({ changeTab }: { changeTab: (tabId: AppTab) => void }) {
    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Bom dia, {currentUser.name.split(' ')[0]}! 👋</h1>
                    <p className="mt-1 text-slate-500">Aqui está o resumo do seu dia escolar hoje.</p>
                </div>
                <button
                    onClick={() => changeTab('planejamento')}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700"
                >
                    <Plus size={18} />
                    <span>Novo Plano de Aula</span>
                </button>
            </div>

            <SummaryMetrics metrics={summaryMetrics} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <TodayClasses classes={todayClasses} changeTab={changeTab} />
                <div className="space-y-6">
                    <QuickActions changeTab={changeTab} />
                    <PrioritiesCard tasks={activities} changeTab={changeTab} />
                </div>
            </div>
        </div>
    );
}
