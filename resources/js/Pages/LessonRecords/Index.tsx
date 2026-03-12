import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';
import { LessonRecord, Paginated } from '@/types';

export default function LessonRecordsIndex({ records }: { records: Paginated<LessonRecord> }) {
    return (
        <AppLayout title="Aulas ministradas">
            <PageHeader title="Aulas ministradas" description="Registro do que foi realmente dado, participação da turma e dificuldades observadas." />
            <div className="grid gap-4">
                {records.data.map((record) => (
                    <Card key={record.id}>
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">{record.topic_taught}</h2>
                                <p className="text-sm text-slate-500">{record.school_class?.name}</p>
                            </div>
                            <p className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">{record.participation_level}</p>
                        </div>
                        <p className="mt-4 text-sm text-slate-600">{record.general_notes}</p>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
