import { usePage } from '@inertiajs/react';

import { SharedPageProps } from '@/types';

export function Topbar() {
    const { props } = usePage<SharedPageProps>();

    return (
        <div className="flex flex-col gap-3 rounded-[2rem] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_16px_48px_-36px_rgba(15,23,42,0.45)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Bem-vinda de volta</p>
                <h1 className="text-xl font-semibold text-slate-900">{props.auth.user?.name ?? 'Professora'}</h1>
            </div>
            <div className="rounded-2xl bg-[var(--color-panel-soft)] px-4 py-3 text-sm text-slate-600">
                {props.auth.user?.teaching_focus ?? 'Organize turmas, aulas e acompanhamento pedagógico.'}
            </div>
        </div>
    );
}
