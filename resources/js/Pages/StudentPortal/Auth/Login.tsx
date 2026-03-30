import { FormEventHandler, useMemo, useState } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, GraduationCap, Lock, Mail } from 'lucide-react';

import AuthLayout from '@/Layouts/AuthLayout';
import { cn } from '@/lib/utils';

interface StudentLoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export default function StudentLogin({ status }: { status?: string | null }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<StudentLoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        post('/student/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Acesso do estudante" description="Entre para acompanhar suas aulas, entregas, frequencia e observacoes importantes com clareza.">
            <Head title="Portal do estudante" />

            <div className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                <div className="flex items-center gap-2 font-medium">
                    <GraduationCap size={16} />
                    Um espaco simples para rotina academica, entregas e acompanhamento do proprio progresso.
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6" noValidate>
                {status ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{status}</div> : null}

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="student-email">
                        E-mail do estudante
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            id="student-email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            placeholder="aluno@educapro.com"
                            autoComplete="username"
                            required
                            className={cn('w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20', errors.email ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200')}
                        />
                    </div>
                    {errors.email ? <p className="text-sm text-rose-600">{errors.email}</p> : null}
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="student-password">
                        Senha
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            id="student-password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            placeholder="********"
                            autoComplete="current-password"
                            required
                            className={cn('w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20', errors.password ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200')}
                        />
                        <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-600" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password ? <p className="text-sm text-rose-600">{errors.password}</p> : null}
                </div>

                <div className="flex items-center">
                    <input id="student-remember" type="checkbox" checked={data.remember} onChange={(event) => setData('remember', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="student-remember" className="ml-2 text-sm text-slate-600">
                        Manter acesso neste dispositivo
                    </label>
                </div>

                <button type="submit" disabled={processing} className={cn('group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-medium text-white shadow-sm shadow-indigo-200 transition-colors', processing ? 'cursor-wait bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700')}>
                    <span>{processing ? 'Entrando...' : 'Entrar no portal do estudante'}</span>
                    <ArrowRight size={18} className={cn('transition-transform', processing ? '' : 'group-hover:translate-x-1')} />
                </button>

                {hasErrors && !errors.email && !errors.password ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        Nao foi possivel autenticar com os dados informados.
                    </div>
                ) : null}
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-500">
                    Acesso da equipe pedagogica?{' '}
                    <Link href="/login" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                        Entrar no painel principal
                    </Link>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                    Acesso da familia?{' '}
                    <Link href="/family/login" className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                        Entrar no portal da familia
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
