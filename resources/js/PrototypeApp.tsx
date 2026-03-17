import { useState } from 'react';

import AppLayout from '@/Layouts/AppLayout';
import DashboardPage from '@/Pages/Dashboard/Index';
import StudentsPage from '@/Pages/Students/Index';
import ClassesPage from '@/Pages/Classes/Index';
import LessonPlansPage from '@/Pages/LessonPlans/Index';
import MaterialsPage from '@/Pages/Materials/Index';
import ActivitiesPage from '@/Pages/Activities/Index';
import AgendaPage from '@/Pages/Agenda/Index';
import { currentUser, navigation } from '@/data/mockData';
import { AppTab } from '@/types';

export default function PrototypeApp() {
    const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const changeTab = (tabId: AppTab) => {
        setActiveTab(tabId);
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
            default:
                return <DashboardPage changeTab={changeTab} />;
        }
    };

    return (
        <AppLayout
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
