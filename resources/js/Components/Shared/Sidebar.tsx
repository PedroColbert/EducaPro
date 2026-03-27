import { useForm } from '@inertiajs/react';
import { BookOpen, LogOut, X } from 'lucide-react';

import SidebarItem from '@/Components/UI/SidebarItem';
import { AppTab, CurrentUser, NavigationItem } from '@/types';

interface SidebarProps {
    appName: string;
    currentUser: CurrentUser;
    navigation: NavigationItem[];
    activeTab: AppTab;
    isMobileMenuOpen: boolean;
    onChangeTab: (tabId: AppTab) => void;
    onCloseMobileMenu: () => void;
}

export function Sidebar({
    appName,
    currentUser,
    navigation,
    activeTab,
    isMobileMenuOpen,
    onChangeTab,
    onCloseMobileMenu,
}: SidebarProps) {
    const { post, processing } = useForm({});

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
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">{appName}</span>
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

            <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 font-bold text-indigo-700 ring-2 ring-white shadow-sm">
                        {currentUser.avatar}
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                        <p className="truncate text-sm font-bold text-slate-800">{currentUser.name}</p>
                        <p className="truncate text-xs text-slate-500">{currentUser.role}</p>
                        {currentUser.organizationName ? <p className="truncate text-[11px] text-slate-400">{currentUser.organizationName}</p> : null}
                        {currentUser.organizationUnitName ? <p className="truncate text-[11px] text-slate-400">{currentUser.organizationUnitName}</p> : null}
                    </div>
                    <button
                        type="button"
                        onClick={() => post('/logout')}
                        disabled={processing}
                        aria-label="Sair da conta"
                        title="Sair da conta"
                        className={`rounded-lg p-2 transition ${
                            processing
                                ? 'cursor-wait bg-slate-100 text-slate-400'
                                : 'text-slate-400 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                    >
                        <LogOut size={16} />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => post('/logout')}
                    disabled={processing}
                    className={`mt-3 inline-flex items-center gap-1.5 px-2 text-xs font-medium transition ${
                        processing ? 'cursor-wait text-slate-400' : 'text-slate-500 hover:text-rose-600'
                    }`}
                >
                    <LogOut size={14} />
                    <span>{processing ? 'Saindo...' : 'Sair'}</span>
                </button>
            </div>
        </aside>
    );
}
