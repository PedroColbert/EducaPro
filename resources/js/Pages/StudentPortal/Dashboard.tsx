import { BookOpen, CalendarClock, CheckCircle2, ClipboardList, TrendingUp } from 'lucide-react';

import GuardianMetricCard from '@/Components/Features/GuardianPortal/GuardianMetricCard';
import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { EmptyState } from '@/Components/UI/EmptyState';
import StudentPortalLayout from '@/Layouts/StudentPortalLayout';

interface StudentPortalProps {
    student: {
        id: number;
        name: string;
        email: string;
        level: string | null;
        status: string;
        age: number | null;
        classNames: string[];
        attendanceRate: number | null;
        averageScore: number | null;
    };
    attendance: Array<{ id: number; status: string; observation: string | null; date: string | null }>;
    assignments: Array<{ id: number; status: string; grade: number | null; feedback: string | null; title: string | null; dueDate: string | null; className: string | null }>;
    evaluations: Array<{ id: number; title: string; skill: string | null; score: number | null; feedback: string | null; evaluatedAt: string | null }>;
    notes: Array<{ id: number; category: string | null; note: string; notedAt: string | null }>;
    upcomingAgenda: Array<{ id: number; title: string; type: string; startsAt: string | null; endsAt: string | null }>;
    materials: Array<{ id: number; title: string; type: string; category: string | null; level: string | null }>;
    alerts: Array<{ title: string; description: string; tone: 'warning' | 'attention' | 'critical' }>;
}

export default function StudentPortalDashboard({ student, attendance, assignments, evaluations, notes, upcomingAgenda, materials, alerts }: StudentPortalProps) {
    const submittedAssignments = assignments.filter((assignment) => assignment.status !== 'pending').length;

    return (
        <StudentPortalLayout title={`Ola, ${student.name.split(' ')[0]}`} subtitle="Aqui voce acompanha suas aulas, tarefas, agenda e sinais importantes da sua jornada academica com leitura simples e objetiva.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                <GuardianMetricCard icon={BookOpen} title="Turmas ativas" value={String(student.classNames.length)} description={student.classNames.join(' / ') || 'Sem turmas vinculadas'} tone="indigo" />
                <GuardianMetricCard icon={CheckCircle2} title="Frequencia recente" value={student.attendanceRate !== null ? `${student.attendanceRate}%` : 'N/A'} description="Presenca calculada a partir dos registros mais recentes." tone={student.attendanceRate !== null && student.attendanceRate < 80 ? 'amber' : 'emerald'} />
                <GuardianMetricCard icon={ClipboardList} title="Entregas em andamento" value={`${submittedAssignments}/${assignments.length}`} description="Atividades ja enviadas ou em processo de correcao." tone="indigo" />
                <GuardianMetricCard icon={TrendingUp} title="Media recente" value={student.averageScore !== null ? String(student.averageScore) : 'N/A'} description="Media baseada nas avaliacoes mais recentes registradas." tone="emerald" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
                <div className="space-y-6">
                    <Card>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Visao geral</p>
                                <h3 className="mt-1 text-2xl font-bold text-slate-900">{student.name}</h3>
                                <p className="mt-2 text-sm text-slate-600">Nivel {student.level ?? 'Nao informado'} / {student.classNames.join(' / ') || 'Sem turma associada'}</p>
                            </div>
                            <Badge variant={student.status === 'attention' ? 'danger' : 'success'}>
                                {student.status === 'attention' ? 'Acompanhamento' : 'Em dia'}
                            </Badge>
                        </div>
                    </Card>

                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Atividades e entregas</h3>
                            <Badge variant="primary">{assignments.length}</Badge>
                        </div>
                        <div className="space-y-3">
                            {assignments.length ? assignments.map((assignment) => (
                                <div key={assignment.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-800">{assignment.title ?? 'Atividade'}</p>
                                            <p className="mt-1 text-sm text-slate-500">{assignment.className ?? 'Sem turma'} / Prazo {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString('pt-BR') : 'a definir'}</p>
                                        </div>
                                        <Badge variant={assignment.status === 'graded' ? 'success' : assignment.status === 'submitted' ? 'primary' : 'warning'}>
                                            {assignment.status === 'graded' ? 'Corrigida' : assignment.status === 'submitted' ? 'Entregue' : 'Pendente'}
                                        </Badge>
                                    </div>
                                    {assignment.feedback ? <p className="mt-3 text-sm text-slate-600">{assignment.feedback}</p> : null}
                                </div>
                            )) : <EmptyState title="Sem atividades por agora" description="Quando novas tarefas forem publicadas, elas aparecerao aqui com prazo e status." />}
                        </div>
                    </Card>

                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Avaliacoes recentes</h3>
                            <Badge variant="neutral">{evaluations.length}</Badge>
                        </div>
                        <div className="space-y-3">
                            {evaluations.length ? evaluations.map((evaluation) => (
                                <div key={evaluation.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-800">{evaluation.title}</p>
                                            <p className="text-sm text-slate-500">{evaluation.skill ?? 'Desempenho geral'} / {evaluation.evaluatedAt ? new Date(evaluation.evaluatedAt).toLocaleDateString('pt-BR') : 'sem data'}</p>
                                        </div>
                                        <Badge variant="success">{evaluation.score !== null ? evaluation.score.toFixed(1) : 'N/A'}</Badge>
                                    </div>
                                    {evaluation.feedback ? <p className="mt-3 text-sm text-slate-600">{evaluation.feedback}</p> : null}
                                </div>
                            )) : <EmptyState title="Nenhuma avaliacao registrada" description="As avaliacoes mais recentes aparecerao aqui com feedback e pontuacao." />}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-slate-900">Alertas e prioridades</h3>
                            <CalendarClock size={18} className="text-slate-400" />
                        </div>
                        <div className="space-y-3">
                            {alerts.length ? alerts.map((alert, index) => (
                                <div key={`${alert.title}-${index}`} className={`rounded-2xl border p-4 ${
                                    alert.tone === 'critical'
                                        ? 'border-rose-200 bg-rose-50'
                                        : alert.tone === 'attention'
                                          ? 'border-indigo-200 bg-indigo-50'
                                          : 'border-amber-200 bg-amber-50'
                                }`}>
                                    <p className="font-semibold text-slate-800">{alert.title}</p>
                                    <p className="mt-1 text-sm text-slate-600">{alert.description}</p>
                                </div>
                            )) : <EmptyState title="Tudo organizado" description="No momento nao existem alertas criticos no seu acompanhamento." />}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">Proximos compromissos</h3>
                        <div className="space-y-3">
                            {upcomingAgenda.length ? upcomingAgenda.map((item) => (
                                <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                                    <p className="font-semibold text-slate-800">{item.title}</p>
                                    <p className="mt-1 text-sm text-slate-500">{item.startsAt ? new Date(item.startsAt).toLocaleString('pt-BR') : 'Sem horario definido'}</p>
                                </div>
                            )) : <EmptyState title="Agenda leve" description="Seus proximos compromissos vao aparecer aqui conforme a rotina for atualizada." />}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">Observacoes e apoio</h3>
                        <div className="space-y-3">
                            {notes.length ? notes.map((note) => (
                                <div key={note.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <Badge variant={note.category === 'attention' ? 'warning' : 'neutral'}>{note.category === 'attention' ? 'Ponto de atencao' : 'Registro'}</Badge>
                                        <span className="text-xs text-slate-400">{note.notedAt ? new Date(note.notedAt).toLocaleDateString('pt-BR') : ''}</span>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">{note.note}</p>
                                </div>
                            )) : <EmptyState title="Sem observacoes recentes" description="Quando houver orientacoes ou registros importantes, eles aparecerao aqui." />}
                        </div>
                    </Card>

                    <Card>
                        <h3 className="mb-4 text-lg font-bold text-slate-900">Recursos recentes</h3>
                        <div className="space-y-3">
                            {materials.length ? materials.map((material) => (
                                <div key={material.id} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                                    <p className="font-semibold text-slate-800">{material.title}</p>
                                    <p className="mt-1 text-sm text-slate-500">{material.category ?? 'Recurso'} / {material.level ?? 'Nivel livre'}</p>
                                </div>
                            )) : <EmptyState title="Sem materiais recentes" description="Quando novos recursos forem vinculados as suas aulas, eles aparecerao aqui." />}
                        </div>
                    </Card>
                </div>
            </div>
        </StudentPortalLayout>
    );
}
