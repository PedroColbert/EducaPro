import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';

export default function ReportsIndex({
    summary,
    classPerformance,
}: {
    summary: { attendanceRate: number; averageGrade: number; submittedAssignments: number };
    classPerformance: Array<{ id: number; name: string; students_count: number; evaluations_avg_score?: number | null }>;
}) {
    return (
        <AppLayout title="Relatórios">
            <PageHeader title="Relatórios simples" description="Indicadores essenciais para frequência, notas e acompanhamento geral das turmas." />
            <div className="grid gap-4 md:grid-cols-3">
                <Card><p className="text-sm text-slate-500">Frequência média</p><p className="mt-3 text-3xl font-semibold">{summary.attendanceRate}%</p></Card>
                <Card><p className="text-sm text-slate-500">Nota média</p><p className="mt-3 text-3xl font-semibold">{summary.averageGrade}</p></Card>
                <Card><p className="text-sm text-slate-500">Entregas enviadas</p><p className="mt-3 text-3xl font-semibold">{summary.submittedAssignments}</p></Card>
            </div>
            <Card>
                <h2 className="text-lg font-semibold text-slate-900">Desempenho por turma</h2>
                <div className="mt-4 space-y-3">
                    {classPerformance.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                            <div>
                                <p className="font-medium text-slate-900">{item.name}</p>
                                <p className="text-sm text-slate-500">{item.students_count} alunos</p>
                            </div>
                            <p className="text-sm text-slate-600">Média {item.evaluations_avg_score ?? '-'}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </AppLayout>
    );
}
