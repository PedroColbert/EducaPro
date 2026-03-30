import { PropsWithChildren } from 'react';

import { Head, router, usePage } from '@inertiajs/react';
import { LogOut, ShieldCheck } from 'lucide-react';

import { SharedPageProps } from '@/types';

interface GuardianPortalLayoutProps extends PropsWithChildren {
    title: string;
    subtitle: string;
}

export default function GuardianPortalLayout({ title, subtitle, children }: GuardianPortalLayoutProps) {
    const { props } = usePage<SharedPageProps>();
    const productName = props.app.context.productName;
    const guardian = props.auth.guardian;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-900">
                <header className="border-b border-white/70 bg-white/80 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-indigo-600">{productName}</p>
                                <h1 className="text-lg font-bold text-slate-900">Portal da familia</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 sm:block">
                                <p className="text-sm font-semibold text-slate-800">{guardian?.name}</p>
                                <p className="text-xs text-slate-500">{guardian?.organization_name ?? 'Acompanhamento escolar'}</p>
                            </div>
                            <div className="hidden rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-medium text-indigo-700 md:block">
                                Leitura clara para a familia
                            </div>
                            <button
                                onClick={() => router.post('/family/logout')}
                                className="flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Sair</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-2">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
                        <p className="max-w-3xl text-sm leading-6 text-slate-600">{subtitle}</p>
                    </div>

                    {children}
                </main>
            </div>
        </>
    );
}
