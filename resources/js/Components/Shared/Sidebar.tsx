import { Link, usePage } from '@inertiajs/react';

import { SharedPageProps } from '@/types';
import { cn } from '@/lib/utils';

const items = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/students', label: 'Alunos' },
    { href: '/classes', label: 'Turmas' },
    { href: '/attendances', label: 'Presenças' },
    { href: '/lesson-plans', label: 'Planos' },
    { href: '/lesson-records', label: 'Aulas dadas' },
    { href: '/assignments', label: 'Tarefas' },
    { href: '/materials', label: 'Materiais' },
    { href: '/agenda', label: 'Agenda' },
    { href: '/reports', label: 'Relatórios' },
];

export function Sidebar() {
    const page = usePage<SharedPageProps>();

    return (
        <aside className="rounded-[2rem] bg-slate-950 px-5 py-6 text-slate-100 shadow-[0_32px_80px_-50px_rgba(15,23,42,0.9)]">
            <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.32em] text-teal-300">EducaPro</p>
                <h2 className="mt-3 text-2xl font-semibold">Painel da professora</h2>
            </div>
            <nav className="space-y-2">
                {items.map((item) => {
                    const active = page.url.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex rounded-2xl px-4 py-3 text-sm transition',
                                active ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-white/8 hover:text-white',
                            )}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
