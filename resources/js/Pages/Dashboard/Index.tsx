import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';
import { StatCard } from '@/Components/UI/StatCard';
import { formatDate } from '@/lib/utils';
import { AgendaItem, LessonRecord } from '@/types';

export default function Dashboard({
    stats,
    upcomingAgenda,
    recentLessonRecords,
}: {
    stats: { students: number; classes: number; plannedLessons: number; pendingAssignments: number };
    upcomingAgenda: AgendaItem[];
    recentLessonRecords: LessonRecord[];
}) {
    return (
        <AppLayout title="Dashboard">
            <PageHeader title="Dashboard" description="Visão geral da semana, andamento das turmas e pendências mais próximas." />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Alunos" value={String(stats.students)} hint="base ativa da professora" />
                <StatCard label="Turmas" value={String(stats.classes)} hint="organizadas por nível" />
                <StatCard label="Planos" value={String(stats.plannedLessons)} hint="planejados para as próximas aulas" />
                <StatCard label="Tarefas" value={String(stats.pendingAssignments)} hint="pendentes de acompanhamento" />
            </div>
            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <Card>
                    <h2 className="text-lg font-semibold text-slate-900">Agenda imediata</h2>
                    <div className="mt-4 space-y-3">
                        {upcomingAgenda.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                <div>
                                    <p className="font-medium text-slate-900">{item.title}</p>
                                    <p className="text-sm text-slate-500">{item.school_class?.name ?? 'Item pessoal'}</p>
                                </div>
                                <p className="text-sm text-slate-500">{formatDate(item.starts_at, { dateStyle: 'short', timeStyle: 'short' })}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold text-slate-900">Aulas recentes</h2>
                    <div className="mt-4 space-y-3">
                        {recentLessonRecords.map((record) => (
                            <div key={record.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                                <p className="font-medium text-slate-900">{record.topic_taught}</p>
                                <p className="mt-1 text-sm text-slate-500">{record.school_class?.name ?? 'Turma'} • {formatDate(record.taught_on)}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
