import { Bell, Calendar, Menu, Search } from 'lucide-react';

export function Topbar({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) {
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

                <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500 md:flex">
                    <Calendar size={16} />
                    <span>{currentDate}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Busca rápida (Ctrl+K)"
                        className="w-64 rounded-full border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                <button className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600">
                    <Bell size={20} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
                </button>
            </div>
        </header>
    );
}
