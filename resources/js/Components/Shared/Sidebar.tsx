import { BookOpen, X } from 'lucide-react';

import SidebarItem from '@/Components/UI/SidebarItem';
import { AppTab, CurrentUser, NavigationItem } from '@/types';

interface SidebarProps {
    currentUser: CurrentUser;
    navigation: NavigationItem[];
    activeTab: AppTab;
    isMobileMenuOpen: boolean;
    onChangeTab: (tabId: AppTab) => void;
    onCloseMobileMenu: () => void;
}

export function Sidebar({
    currentUser,
    navigation,
    activeTab,
    isMobileMenuOpen,
    onChangeTab,
    onCloseMobileMenu,
}: SidebarProps) {
    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-in-out md:static ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
        >
            <div className="flex h-20 cursor-pointer items-center border-b border-slate-50 px-6" onClick={() => onChangeTab('dashboard')}>
                <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 shadow-md shadow-indigo-200">
                    <BookOpen size={18} className="text-white" />
                </div>
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">EducaPro</span>
                <button className="ml-auto text-slate-400 hover:text-slate-600 md:hidden" onClick={onCloseMobileMenu}>
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                <div className="mb-4 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Menu Principal</div>
                {navigation.map((item) => (
                    <SidebarItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeTab === item.id}
                        onClick={() => {
                            onChangeTab(item.id);
                            onCloseMobileMenu();
                        }}
                    />
                ))}
            </div>

            <div className="cursor-pointer border-t border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 font-bold text-indigo-700 ring-2 ring-white shadow-sm">
                        {currentUser.avatar}
                    </div>
                    <div className="overflow-hidden">
                        <p className="truncate text-sm font-bold text-slate-800">{currentUser.name}</p>
                        <p className="truncate text-xs text-slate-500">{currentUser.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
