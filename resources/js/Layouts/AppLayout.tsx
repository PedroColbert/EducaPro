import { PropsWithChildren } from 'react';

import { Sidebar } from '@/Components/Shared/Sidebar';
import { Topbar } from '@/Components/Shared/Topbar';
import { AppTab, CurrentUser, NavigationItem } from '@/types';

interface AppLayoutProps extends PropsWithChildren {
    currentUser: CurrentUser;
    navigation: NavigationItem[];
    activeTab: AppTab;
    isMobileMenuOpen: boolean;
    onChangeTab: (tabId: AppTab) => void;
    onOpenMobileMenu: () => void;
    onCloseMobileMenu: () => void;
}

export default function AppLayout({
    currentUser,
    navigation,
    activeTab,
    isMobileMenuOpen,
    onChangeTab,
    onOpenMobileMenu,
    onCloseMobileMenu,
    children,
}: AppLayoutProps) {
    return (
        <div className="flex h-screen bg-[#f8fafc] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {isMobileMenuOpen ? (
                <div className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden" onClick={onCloseMobileMenu} />
            ) : null}

            <Sidebar
                currentUser={currentUser}
                navigation={navigation}
                activeTab={activeTab}
                isMobileMenuOpen={isMobileMenuOpen}
                onChangeTab={onChangeTab}
                onCloseMobileMenu={onCloseMobileMenu}
            />

            <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                <Topbar onOpenMobileMenu={onOpenMobileMenu} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl pb-10">{children}</div>
                </main>
            </div>
        </div>
    );
}
