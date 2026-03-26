import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';

interface DashboardReportStat {
    label: string;
    value: string;
    tone: 'indigo' | 'emerald' | 'amber' | 'rose';
}

interface ClassInsight {
    id: number;
    name: string;
    attendanceAverage: number;
    progress: number;
    attentionCount: number;
}

interface PedagogicalInsight {
    id: string;
    tone: 'success' | 'warning' | 'danger';
    title: string;
    description: string;
}

const toneStyles = {
    indigo: 'bg-indigo-50 text-indigo-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
} as const;

const insightBadge = {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
} as const;

export default function ReportsOverview({
    stats,
    classInsights,
    insights,
}: {
    stats: readonly DashboardReportStat[];
    classInsights: readonly ClassInsight[];
    insights: readonly PedagogicalInsight[];
}) {
    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Relatorios rapidos</h2>
                        <p className="mt-1 text-sm text-slate-500">Visao resumida do que esta evoluindo e do que precisa de ajuste.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className={`rounded-2xl px-4 py-4 ${toneStyles[stat.tone]}`}>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">{stat.label}</p>
                            <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 space-y-4">
                    {classInsights.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="font-semibold text-slate-800">{item.name}</p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {item.attentionCount
                                            ? `${item.attentionCount} aluno(s) em atencao`
                                            : 'Turma sem alertas pedagogicos no momento'}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant={item.attendanceAverage < 80 ? 'warning' : 'success'}>
                                        Frequencia media {item.attendanceAverage}%
                                    </Badge>
                                    <Badge variant={item.progress < 50 ? 'warning' : 'primary'}>
                                        Progresso {item.progress}%
                                    </Badge>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                                <div>
                                    <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                                        <span>Frequencia media</span>
                                        <span>{item.attendanceAverage}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-200">
                                        <div
                                            className={`h-2 rounded-full ${item.attendanceAverage < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                            style={{ width: `${item.attendanceAverage}%` }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-1.5 flex justify-between text-xs text-slate-500">
                                        <span>Andamento do plano</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-200">
                                        <div
                                            className={`h-2 rounded-full ${item.progress < 50 ? 'bg-amber-500' : 'bg-indigo-500'}`}
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card>
                <div className="mb-5">
                    <h2 className="text-lg font-bold text-slate-800">Insights pedagogicos</h2>
                    <p className="mt-1 text-sm text-slate-500">Sinais sintetizados a partir do que ja esta acontecendo no painel.</p>
                </div>

                <div className="space-y-3">
                    {insights.map((insight) => (
                        <div key={insight.id} className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
                            <div className="mb-2 flex items-center gap-2">
                                <Badge variant={insightBadge[insight.tone]}>{insight.tone === 'danger' ? 'Critico' : insight.tone === 'warning' ? 'Atencao' : 'Estavel'}</Badge>
                            </div>
                            <p className="font-medium text-slate-800">{insight.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-500">{insight.description}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
