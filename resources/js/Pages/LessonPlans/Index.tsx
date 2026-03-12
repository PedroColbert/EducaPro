import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { ModalShell } from '@/Components/UI/ModalShell';
import { PageHeader } from '@/Components/UI/PageHeader';
import { LessonPlan, Material } from '@/types';
import { formatDate } from '@/lib/utils';

export default function LessonPlansIndex({ plans, materials }: { plans: LessonPlan[]; materials: Material[] }) {
    const selected = plans[0];

    return (
        <AppLayout title="Planos de aula">
            <PageHeader title="Planos de aula" description="Planejamento em duas colunas, com preview rápido e acoplamento de materiais." />
            <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
                <Card className="space-y-3">
                    {plans.map((plan) => (
                        <div key={plan.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                            <p className="font-medium text-slate-900">{plan.topic}</p>
                            <p className="text-sm text-slate-500">{formatDate(plan.planned_for)} • {plan.status}</p>
                        </div>
                    ))}
                </Card>
                <div className="space-y-4">
                    <Card className="space-y-4">
                        <div>
                            <p className="text-sm text-slate-500">Preview do plano</p>
                            <h2 className="text-2xl font-semibold text-slate-900">{selected?.topic}</h2>
                            <p className="text-sm text-slate-500">{selected?.school_class?.name}</p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-700">Objetivos</p>
                                <p className="mt-2 text-sm text-slate-500">{selected?.objectives?.join(', ')}</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-700">Conteúdo</p>
                                <p className="mt-2 text-sm text-slate-500">{selected?.content?.join(', ')}</p>
                            </div>
                        </div>
                    </Card>
                    <ModalShell title="Adicionar material ao plano">
                        <div className="grid gap-3 md:grid-cols-2">
                            {materials.map((material) => (
                                <div key={material.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                                    <p className="font-medium text-slate-900">{material.title}</p>
                                    <p className="text-sm text-slate-500">{material.category} • {material.type}</p>
                                </div>
                            ))}
                        </div>
                    </ModalShell>
                </div>
            </div>
        </AppLayout>
    );
}
