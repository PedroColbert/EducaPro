import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { ModalShell } from '@/Components/UI/ModalShell';
import { PageHeader } from '@/Components/UI/PageHeader';
import { Assignment } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AssignmentsIndex({ assignments }: { assignments: Assignment[] }) {
    const toReview = assignments.filter((assignment) => assignment.status === 'reviewing');

    return (
        <AppLayout title="Tarefas">
            <PageHeader title="Tarefas e homework" description="Acompanhamento por status, com foco rápido nas entregas que precisam de correção." />
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-4">
                    {assignments.map((assignment) => (
                        <Card key={assignment.id}>
                            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900">{assignment.title}</p>
                                    <p className="text-sm text-slate-500">{assignment.school_class?.name ?? assignment.student?.name} • {formatDate(assignment.due_date)}</p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{assignment.status}</span>
                            </div>
                        </Card>
                    ))}
                </div>
                <ModalShell title="Correção rápida">
                    <div className="space-y-3">
                        {toReview.flatMap((assignment) => assignment.submissions ?? []).map((submission) => (
                            <div key={submission.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                                <p className="font-medium text-slate-900">{submission.student?.name}</p>
                                <p className="text-sm text-slate-500">Status: {submission.status}</p>
                            </div>
                        ))}
                    </div>
                </ModalShell>
            </div>
        </AppLayout>
    );
}
