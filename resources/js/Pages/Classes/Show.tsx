import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';
import { SchoolClass, Student, LessonPlan, LessonRecord } from '@/types';

export default function ClassesShow({
    schoolClass,
}: {
    schoolClass: SchoolClass & { students: Student[]; lesson_plans: LessonPlan[]; lesson_records: LessonRecord[] };
}) {
    return (
        <AppLayout title={schoolClass.name}>
            <PageHeader title={schoolClass.name} description="Detalhamento da turma com alunos vinculados, planos e aulas registradas." />
            <div className="grid gap-4 xl:grid-cols-3">
                <Card className="xl:col-span-1">
                    <h2 className="text-lg font-semibold text-slate-900">Alunos</h2>
                    <div className="mt-4 space-y-3">
                        {schoolClass.students.map((student) => (
                            <div key={student.id} className="rounded-2xl bg-slate-50 px-4 py-3">
                                <p className="font-medium text-slate-900">{student.name}</p>
                                <p className="text-sm text-slate-500">{student.level}</p>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="xl:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-900">Últimos planos e registros</h2>
                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                        {schoolClass.lesson_plans.map((plan) => (
                            <div key={plan.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                                <p className="font-medium text-slate-900">{plan.topic}</p>
                                <p className="text-sm text-slate-500">{plan.status}</p>
                            </div>
                        ))}
                        {schoolClass.lesson_records.map((record) => (
                            <div key={record.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                                <p className="font-medium text-slate-900">{record.topic_taught}</p>
                                <p className="text-sm text-slate-500">{record.participation_level}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
