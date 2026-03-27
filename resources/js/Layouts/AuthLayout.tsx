import { PropsWithChildren } from 'react';

import { usePage } from '@inertiajs/react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

import { SharedPageProps } from '@/types';

interface AuthLayoutProps extends PropsWithChildren {
    title: string;
    description: string;
}

const highlights = [
    'Registros de aula e presenca em segundos',
    'Acompanhamento visual de pendencias e desempenho',
    'Biblioteca de recursos pronta para diferentes contextos',
];

export default function AuthLayout({ title, description, children }: AuthLayoutProps) {
    const { props } = usePage<SharedPageProps>();
    const productName = props.app.context.productName;

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-purple-400 blur-3xl" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/20 shadow-lg backdrop-blur-md">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">{productName}</span>
                    </div>
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="mb-6 text-4xl font-bold leading-tight text-white">
                        Sua rotina escolar,
                        <br />
                        mais leve e organizada.
                    </h1>
                    <p className="mb-8 text-lg leading-relaxed text-indigo-100">
                        Um espaco flexivel para planejar encontros, acompanhar participantes e organizar a rotina
                        academica com clareza.
                    </p>

                    <div className="space-y-4">
                        {highlights.map((item) => (
                            <div key={item} className="flex items-center gap-3 text-indigo-100">
                                <CheckCircle2 size={20} className="text-indigo-300" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-sm text-indigo-200/80">
                    &copy; {new Date().getFullYear()} {productName}. Todos os direitos reservados.
                </div>
            </div>

            <div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">{productName}</span>
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="mb-2 text-3xl font-bold text-slate-800">{title}</h2>
                        <p className="text-slate-500">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
