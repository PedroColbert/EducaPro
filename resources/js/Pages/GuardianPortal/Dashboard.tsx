import { Head } from '@inertiajs/react';
import { BookOpenText, CalendarClock, ClipboardCheck, ShieldAlert } from 'lucide-react';

import ChildSwitcher from '@/Components/Features/GuardianPortal/ChildSwitcher';
import GuardianMetricCard from '@/Components/Features/GuardianPortal/GuardianMetricCard';
import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import GuardianPortalLayout from '@/Layouts/GuardianPortalLayout';
import { formatDate } from '@/lib/utils';

interface GuardianDashboardProps {
    guardian: {
        name: string;
        email: string;
        relationshipLabel: string;
    };
    students: Array<{
        id: number;
        name: string;
        level: string;
        status: string;
        relationshipLabel?: string | null;
        classNames: string[];
    }>;
    selectedStudent: {
        id: number;
        name: string;
        level: string;
        status: string;
        age: number;
        classNames: string[];
        attendanceRate: number | null;
        averageScore: number | null;
    } | null;
    attendance: Array<{
        id: number;
        status: string;
        observation: string | null;
        date: string | null;
    }>;
    assignments: Array<{
        id: number;
        status: string;
        grade: string | null;
        feedback: string | null;
        title: string | null;
        dueDate: string | null;
        className: string | null;
    }>;
    evaluations: Array<{
        id: number;
        title: string;
        skill: string;
        score: string;
        feedback: string | null;
        evaluatedAt: string | null;
    }>;
    notes: Array<{
        id: number;
        category: string;
        note: string;
        notedAt: string | null;
    }>;
    upcomingAgenda: Array<{
        id: number;
        title: string;
        type: string;
        startsAt: string | null;
        endsAt: string | null;
    }>;
    materials: Array<{
        id: number;
        title: string;
        type: string;
        category: string;
        level: string;
    }>;
    alerts: Array<{
        title: string;
        description: string;
        tone: 'critical' | 'attention' | 'warning';
    }>;
}

export default function GuardianDashboard(props: GuardianDashboardProps) {
    const {
        guardian,
        students,
        selectedStudent,
        attendance,
        assignments,
        evaluations,
        notes,
        upcomingAgenda,
        materials,
        alerts,
    } = props;

    return (
        <GuardianPortalLayout
            title={selectedStudent ? `Acompanhamento de ${selectedStudent.name}` : 'Portal da familia'}
            subtitle={
                selectedStudent
                    ? 'Confira rapidamente frequencia, compromissos, atividades e registros recentes do estudante.'
                    : 'Selecione um estudante vinculado para acompanhar a rotina escolar com clareza.'
            }
        >
            <Head title="Portal da familia" />

            <div className="space-y-8">
                <Card className="bg-white/90">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-indigo-600">Responsavel conectado</p>
                            <h3 className="text-xl font-bold text-slate-900">{guardian.name}</h3>
                            <p className="mt-1 text-sm text-slate-600">{guardian.email}</p>
                        </div>
                        <Badge variant="primary">{students.length} filho(s) vinculado(s)</Badge>
                    </div>
                </Card>

                <section className="space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Filhos vinculados</h3>
                        <p className="text-sm text-slate-500">Troque rapidamente entre os estudantes vinculados ao seu acesso.</p>
                    </div>
                    <ChildSwitcher students={students} selectedStudentId={selectedStudent?.id ?? null} />
                </section>

                {selectedStudent ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                            <GuardianMetricCard
                                icon={ClipboardCheck}
                                title="Frequencia recente"
                                value={selectedStudent.attendanceRate !== null ? `${selectedStudent.attendanceRate}%` : 'Sem dados'}
                                description="Resumo das ultimas chamadas registradas para este estudante."
                                tone={selectedStudent.attendanceRate !== null && selectedStudent.attendanceRate < 80 ? 'amber' : 'emerald'}
                            />
                            <GuardianMetricCard
                                icon={BookOpenText}
                                title="Desempenho resumido"
                                value={selectedStudent.averageScore !== null ? String(selectedStudent.averageScore) : 'Sem notas'}
                                description="Media recente das avaliacoes ja registradas."
                            />
                            <GuardianMetricCard
                                icon={CalendarClock}
                                title="Proximos compromissos"
                                value={String(upcomingAgenda.length)}
                                description="Encontros e compromissos vinculados aos grupos deste estudante."
                            />
                        </div>

                        {alerts.length ? (
                            <Card className="border-amber-100 bg-amber-50/70">
                                <div className="mb-4 flex items-center gap-2">
                                    <ShieldAlert size={18} className="text-amber-600" />
                                    <h3 className="text-lg font-bold text-slate-900">Atencoes importantes</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                                    {alerts.map((alert) => (
                                        <div key={alert.title} className="rounded-2xl border border-white/70 bg-white/80 p-4">
                                            <p className="font-semibold text-slate-900">{alert.title}</p>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{alert.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ) : null}

                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                            <Card className="xl:col-span-2">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Atividades e tarefas</h3>
                                    <Badge variant="neutral">{assignments.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {assignments.length ? (
                                        assignments.map((assignment) => (
                                            <div key={assignment.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                                                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{assignment.title}</p>
                                                        <p className="mt-1 text-sm text-slate-500">
                                                            {assignment.className ?? 'Sem grupo'} / Prazo: {formatDate(assignment.dueDate)}
                                                        </p>
                                                    </div>
                                                    <Badge variant={assignment.status === 'graded' ? 'success' : assignment.status === 'submitted' ? 'primary' : 'warning'}>
                                                        {assignment.status === 'graded' ? 'Corrigida' : assignment.status === 'submitted' ? 'Entregue' : 'Pendente'}
                                                    </Badge>
                                                </div>
                                                {assignment.grade ? <p className="mt-3 text-sm text-slate-700">Nota registrada: {assignment.grade}</p> : null}
                                                {assignment.feedback ? <p className="mt-2 text-sm text-slate-600">{assignment.feedback}</p> : null}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Nenhuma atividade vinculada neste momento.</p>
                                    )}
                                </div>
                            </Card>

                            <Card>
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Agenda proxima</h3>
                                    <Badge variant="neutral">{upcomingAgenda.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {upcomingAgenda.length ? (
                                        upcomingAgenda.map((item) => (
                                            <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
                                                <p className="font-semibold text-slate-900">{item.title}</p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {formatDate(item.startsAt, { dateStyle: 'medium', timeStyle: 'short' })}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Nenhum compromisso proximo encontrado.</p>
                                    )}
                                </div>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                            <Card>
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Presencas recentes</h3>
                                    <Badge variant="neutral">{attendance.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {attendance.length ? (
                                        attendance.map((item) => (
                                            <div key={item.id} className="rounded-2xl border border-slate-100 p-4">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-slate-900">{formatDate(item.date)}</p>
                                                    <Badge variant={item.status === 'absent' ? 'danger' : item.status === 'late' ? 'warning' : 'success'}>
                                                        {item.status === 'present' ? 'Presente' : item.status === 'late' ? 'Atraso' : item.status === 'justified' ? 'Justificada' : 'Ausente'}
                                                    </Badge>
                                                </div>
                                                {item.observation ? <p className="mt-2 text-sm text-slate-600">{item.observation}</p> : null}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Ainda nao ha chamadas suficientes para exibir.</p>
                                    )}
                                </div>
                            </Card>

                            <Card>
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Desempenho recente</h3>
                                    <Badge variant="neutral">{evaluations.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {evaluations.length ? (
                                        evaluations.map((evaluation) => (
                                            <div key={evaluation.id} className="rounded-2xl border border-slate-100 p-4">
                                                <p className="font-semibold text-slate-900">{evaluation.title}</p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {evaluation.skill} / {formatDate(evaluation.evaluatedAt)}
                                                </p>
                                                <p className="mt-2 text-sm text-slate-700">Nota: {evaluation.score}</p>
                                                {evaluation.feedback ? <p className="mt-2 text-sm text-slate-600">{evaluation.feedback}</p> : null}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Nenhuma avaliacao registrada recentemente.</p>
                                    )}
                                </div>
                            </Card>

                            <Card>
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900">Recados e observacoes</h3>
                                    <Badge variant="neutral">{notes.length}</Badge>
                                </div>
                                <div className="space-y-3">
                                    {notes.length ? (
                                        notes.map((note) => (
                                            <div key={note.id} className="rounded-2xl border border-slate-100 p-4">
                                                <div className="flex items-center justify-between gap-3">
                                                    <p className="font-semibold text-slate-900">{note.category === 'attention' ? 'Ponto de atencao' : 'Registro pedagógico'}</p>
                                                    <span className="text-xs text-slate-400">{formatDate(note.notedAt)}</span>
                                                </div>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">{note.note}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Nenhum recado importante registrado.</p>
                                    )}
                                </div>
                            </Card>
                        </div>

                        <Card>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-900">Materiais e conteudos recentes</h3>
                                <Badge variant="neutral">{materials.length}</Badge>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                                {materials.length ? (
                                    materials.map((material) => (
                                        <div key={material.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                                            <p className="font-semibold text-slate-900">{material.title}</p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {material.category} / {material.level}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-500">Nenhum material recente compartilhado para este estudante.</p>
                                )}
                            </div>
                        </Card>
                    </>
                ) : (
                    <Card className="text-center">
                        <p className="text-lg font-semibold text-slate-900">Nenhum estudante vinculado ainda</p>
                        <p className="mt-2 text-sm text-slate-500">Quando o acesso for associado a um estudante, o portal exibira frequencia, agenda, atividades e comunicados importantes.</p>
                    </Card>
                )}
            </div>
        </GuardianPortalLayout>
    );
}
