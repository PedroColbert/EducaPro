import AppLayout from '@/Layouts/AppLayout';
import { Badge } from '@/Components/UI/Badge';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';
import { formatDate } from '@/lib/utils';
import { Student } from '@/types';

export default function StudentsShow({ student }: { student: Student }) {
    return (
        <AppLayout title={student.name}>
            <PageHeader title={student.name} description="Perfil pedagógico consolidado, observações recentes e entregas acompanhadas." />
            <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <Card className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-100 text-xl font-semibold text-teal-700">
                            {student.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-slate-900">{student.name}</p>
                            <p className="text-sm text-slate-500">{student.level}</p>
                        </div>
                        <Badge variant={student.status}>{student.status}</Badge>
                    </div>
                    <div className="grid gap-3">
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Contato: {student.email_contact ?? '-'}</div>
                        <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">Turmas: {student.school_classes?.map((item) => item.name).join(', ')}</div>
                    </div>
                </Card>
                <Card>
                    <h2 className="text-lg font-semibold text-slate-900">Observações pedagógicas</h2>
                    <div className="mt-4 space-y-3">
                        {student.pedagogical_notes?.map((note) => (
                            <div key={note.id} className="rounded-2xl border border-slate-200 px-4 py-3">
                                <p className="font-medium text-slate-900">{note.note}</p>
                                <p className="mt-1 text-sm text-slate-500">{note.category} • {formatDate(note.noted_at, { dateStyle: 'short', timeStyle: 'short' })}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
