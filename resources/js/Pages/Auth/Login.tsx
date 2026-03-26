import { FormEventHandler, useMemo, useState } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

import AuthLayout from '@/Layouts/AuthLayout';
import { cn } from '@/lib/utils';

interface LoginPageProps {
    canResetPassword: boolean;
    forgotPasswordUrl: string | null;
    requestAccessUrl: string | null;
    status?: string | null;
}

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export default function Login({ canResetPassword, forgotPasswordUrl, requestAccessUrl, status }: LoginPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [helperMessage, setHelperMessage] = useState<string | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
        email: '',
        password: '',
        remember: false,
    });

    const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

    const submit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setHelperMessage(null);

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Bem-vinda de volta!" description="Insira suas credenciais para acessar seu painel.">
            <Head title="Entrar" />

            <form onSubmit={submit} className="space-y-6" noValidate>
                {status ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {status}
                    </div>
                ) : null}

                {helperMessage ? (
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                        {helperMessage}
                    </div>
                ) : null}

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                        E-mail institucional ou pessoal
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            placeholder="professora@escola.com.br"
                            autoComplete="username"
                            autoFocus
                            required
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={cn(
                                'w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
                                errors.email ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200',
                            )}
                        />
                    </div>
                    {errors.email ? (
                        <p id="email-error" className="text-sm text-rose-600">
                            {errors.email}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                            Senha
                        </label>
                        {canResetPassword && forgotPasswordUrl ? (
                            <Link href={forgotPasswordUrl} className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700">
                                Esqueceu a senha?
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-500"
                                onClick={() =>
                                    setHelperMessage(
                                        'A recuperacao de senha sera integrada em seguida. Nesta etapa, o acesso e feito pelas credenciais configuradas localmente.',
                                    )
                                }
                            >
                                Esqueceu a senha?
                            </button>
                        )}
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                            aria-invalid={errors.password ? 'true' : 'false'}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            className={cn(
                                'w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
                                errors.password ? 'border-rose-300 ring-2 ring-rose-500/10' : 'border-slate-200',
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-600"
                            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password ? (
                        <p id="password-error" className="text-sm text-rose-600">
                            {errors.password}
                        </p>
                    ) : null}
                </div>

                <div className="flex items-center">
                    <input
                        id="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(event) => setData('remember', event.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded border-slate-300 bg-slate-50 text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember" className="ml-2 cursor-pointer text-sm text-slate-600">
                        Lembrar de mim neste dispositivo
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className={cn(
                        'group flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-medium text-white shadow-sm shadow-indigo-200 transition-colors',
                        processing ? 'cursor-wait bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700',
                    )}
                >
                    <span>{processing ? 'Entrando...' : 'Entrar no EducaPro'}</span>
                    <ArrowRight size={18} className={cn('transition-transform', processing ? '' : 'group-hover:translate-x-1')} />
                </button>

                {hasErrors && !errors.email && !errors.password ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        Nao foi possivel autenticar com os dados informados.
                    </div>
                ) : null}
            </form>

            <div className="mt-10 text-center">
                <p className="text-sm text-slate-500">
                    Ainda nao tem uma conta?{' '}
                    {requestAccessUrl ? (
                        <Link href={requestAccessUrl} className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
                            Solicite acesso
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                            onClick={() =>
                                setHelperMessage(
                                    'O fluxo de solicitacao de acesso ainda nao foi aberto. Nesta fase, o ambiente usa a conta inicial criada para desenvolvimento.',
                                )
                            }
                        >
                            Solicite acesso
                        </button>
                    )}
                </p>
            </div>
        </AuthLayout>
    );
}
