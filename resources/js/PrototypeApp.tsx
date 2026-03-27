import { useEffect, useMemo, useState } from 'react';

import AppLayout from '@/Layouts/AppLayout';
import DashboardPage from '@/Pages/Dashboard/Index';
import StudentsPage from '@/Pages/Students/Index';
import ClassesPage from '@/Pages/Classes/Index';
import LessonPlansPage from '@/Pages/LessonPlans/Index';
import MaterialsPage from '@/Pages/Materials/Index';
import ActivitiesPage from '@/Pages/Activities/Index';
import AgendaPage from '@/Pages/Agenda/Index';
import ReportsPage from '@/Pages/Reports/Index';
import { useAppContext } from '@/hooks/useAppContext';
import { EducaProProvider } from '@/hooks/useEducaPro';
import { AppTab } from '@/types';

export default function PrototypeApp() {
    return (
        <EducaProProvider>
            <PrototypeShell />
        </EducaProProvider>
    );
}

function PrototypeShell() {
    const { appContext, currentUser, navigation } = useAppContext();
    const availableTabs = useMemo(() => navigation.map((item) => item.id), [navigation]);
    const [activeTab, setActiveTab] = useState<AppTab>(() => resolveInitialTab(availableTabs));
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!availableTabs.includes(activeTab)) {
            setActiveTab(availableTabs[0] ?? 'dashboard');
        }
    }, [activeTab, availableTabs]);

    const changeTab = (tabId: AppTab) => {
        if (!availableTabs.includes(tabId)) {
            return;
        }

        setActiveTab(tabId);
        syncTabQuery(tabId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardPage changeTab={changeTab} />;
            case 'alunos':
                return <StudentsPage />;
            case 'turmas':
                return <ClassesPage />;
            case 'planejamento':
                return <LessonPlansPage />;
            case 'materiais':
                return <MaterialsPage />;
            case 'atividades':
                return <ActivitiesPage />;
            case 'agenda':
                return <AgendaPage />;
            case 'desempenho':
                return <ReportsPage />;
            default:
                return <DashboardPage changeTab={changeTab} />;
        }
    };

    return (
        <AppLayout
            appName={appContext.productName}
            currentUser={currentUser}
            navigation={navigation}
            activeTab={activeTab}
            isMobileMenuOpen={isMobileMenuOpen}
            onChangeTab={changeTab}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
        >
            {renderContent()}
        </AppLayout>
    );
}

function resolveInitialTab(availableTabs: AppTab[]) {
    if (typeof window === 'undefined') {
        return availableTabs[0] ?? 'dashboard';
    }

    const queryTab = new URLSearchParams(window.location.search).get('tab') as AppTab | null;

    return queryTab && availableTabs.includes(queryTab) ? queryTab : availableTabs[0] ?? 'dashboard';
}

function syncTabQuery(tabId: AppTab) {
    if (typeof window === 'undefined') {
        return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    window.history.replaceState({}, '', url);
}
