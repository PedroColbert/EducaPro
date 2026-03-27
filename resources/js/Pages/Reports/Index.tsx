import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { EmptyState } from '@/Components/UI/EmptyState';
import { useAppContext } from '@/hooks/useAppContext';
import { useEducaPro } from '@/hooks/useEducaPro';

export default function ReportsPage() {
    const { appContext } = useAppContext();
    const { students, classes, activities, lessonPlans, agendaItems, getStudentsForClass } = useEducaPro();

    const attendanceAverage = students.length ? Math.round(students.reduce((sum, student) => sum + student.attendanceRate, 0) / students.length) : 0;
    const studentsInAttention = students.filter((student) => student.status === 'attention');
    const pendingCorrections = activities.filter((activity) => activity.status === 'grading');
    const plannedLessons = lessonPlans.filter((plan) => plan.status === 'planned').length;
    const overdueActivities = activities.filter((activity) => activity.submissions.some((submission) => submission.status === 'pending')).length;
    const upcomingMeetings = agendaItems.filter((item) => item.type === 'meeting').length;

    const classRows = classes.map((courseClass) => {
        const classStudents = getStudentsForClass(courseClass.id);
        const classAttendance = classStudents.length
            ? Math.round(classStudents.reduce((sum, student) => sum + student.attendanceRate, 0) / classStudents.length)
            : 0;
        const openActivities = activities.filter((activity) => activity.classId === courseClass.id && activity.status !== 'completed').length;
        const attentionCount = classStudents.filter((student) => student.status === 'attention').length;

        return {
            id: courseClass.id,
            name: courseClass.name,
            progress: courseClass.progress,
            attendance: classAttendance,
            openActivities,
            attentionCount,
        };
    });

    const profileCopy = getProfileCopy(appContext.profile);

    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">{appContext.labels.reports}</h1>
                    <p className="mt-1 max-w-3xl text-slate-500">{profileCopy.subtitle}</p>
                </div>
                <Badge variant={profileCopy.badge}>{profileCopy.badgeLabel}</Badge>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                <MetricCard title="Frequencia media" value={`${attendanceAverage}%`} tone={attendanceAverage < 80 ? 'warning' : 'success'} />
                <MetricCard title="Estudantes em atencao" value={String(studentsInAttention.length)} tone={studentsInAttention.length ? 'danger' : 'success'} />
                <MetricCard title="Correcoes pendentes" value={String(pendingCorrections.length)} tone={pendingCorrections.length ? 'warning' : 'primary'} />
                <MetricCard title="Planos confirmados" value={String(plannedLessons)} tone="primary" />
                <MetricCard title="Reunioes futuras" value={String(upcomingMeetings)} tone={upcomingMeetings ? 'warning' : 'primary'} />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
                <Card>
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Panorama por turma</h2>
                            <p className="mt-1 text-sm text-slate-500">Acompanhe andamento, frequencia e carga de acompanhamento por grupo.</p>
                        </div>
                        <Badge variant="neutral">{classRows.length}</Badge>
                    </div>

                    <div className="space-y-4">
                        {classRows.length ? (
                            classRows.map((row) => (
                                <div key={row.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <p className="font-semibold text-slate-800">{row.name}</p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {row.openActivities} atividade(s) em aberto / {row.attentionCount} estudante(s) em atencao
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant={row.attendance < 80 ? 'warning' : 'success'}>Frequencia {row.attendance}%</Badge>
                                            <Badge variant={row.progress < 50 ? 'warning' : 'primary'}>Progresso {row.progress}%</Badge>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <EmptyState title="Sem turmas suficientes" description="Cadastre turmas ou grupos para liberar os comparativos de acompanhamento." />
                        )}
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">Pontos imediatos</h2>
                            <Badge variant={studentsInAttention.length || overdueActivities ? 'warning' : 'success'}>
                                {studentsInAttention.length + overdueActivities}
                            </Badge>
                        </div>
                        <div className="space-y-3">
                            <InsightRow
                                title="Acompanhamento estudantil"
                                description={
                                    studentsInAttention.length
                                        ? `${studentsInAttention.length} estudante(s) exigem leitura mais proxima por frequencia ou status.`
                                        : 'Nenhum estudante esta sinalizado para atencao imediata.'
                                }
                                tone={studentsInAttention.length ? 'warning' : 'success'}
                            />
                            <InsightRow
                                title="Pipeline de atividades"
                                description={
                                    overdueActivities
                                        ? `${overdueActivities} atividade(s) ainda tem estudante(s) sem entrega ou retorno registrado.`
                                        : 'As atividades registradas estao em fluxo saudavel.'
                                }
                                tone={overdueActivities ? 'warning' : 'success'}
                            />
                            <InsightRow
                                title="Planejamento futuro"
                                description={
                                    plannedLessons
                                        ? `${plannedLessons} plano(s) ja estao fechados e prontos para execucao.`
                                        : 'Ainda nao ha planos confirmados suficientes para as proximas aulas.'
                                }
                                tone={plannedLessons ? 'primary' : 'warning'}
                            />
                        </div>
                    </Card>

                    <Card>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-slate-800">Leitura do perfil</h2>
                            <Badge variant="neutral">{profileCopy.focusLabel}</Badge>
                        </div>
                        <div className="space-y-3 text-sm leading-6 text-slate-600">
                            {profileCopy.bullets.map((bullet) => (
                                <p key={bullet} className="rounded-2xl border border-slate-100 bg-white p-4">
                                    {bullet}
                                </p>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MetricCard({
    title,
    value,
    tone,
}: {
    title: string;
    value: string;
    tone: 'primary' | 'success' | 'warning' | 'danger';
}) {
    const styles = {
        primary: 'bg-indigo-50 text-indigo-700',
        success: 'bg-emerald-50 text-emerald-700',
        warning: 'bg-amber-50 text-amber-700',
        danger: 'bg-rose-50 text-rose-700',
    } as const;

    return (
        <div className={`rounded-2xl px-4 py-4 ${styles[tone]}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">{title}</p>
            <p className="mt-3 text-2xl font-bold">{value}</p>
        </div>
    );
}

function InsightRow({
    title,
    description,
    tone,
}: {
    title: string;
    description: string;
    tone: 'primary' | 'success' | 'warning';
}) {
    const badgeVariant = tone === 'success' ? 'success' : tone === 'warning' ? 'warning' : 'primary';

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="mb-2 flex items-center gap-2">
                <Badge variant={badgeVariant}>{title}</Badge>
            </div>
            <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
    );
}

function getProfileCopy(profile: string | null) {
    switch (profile) {
        case 'admin':
            return {
                subtitle: 'Leitura executiva do funcionamento academico, com foco em frequencia, carga operacional, turmas e sinais de atencao institucional.',
                badge: 'primary' as const,
                badgeLabel: 'Visao institucional',
                focusLabel: 'Administracao',
                bullets: [
                    'A administracao precisa enxergar risco operacional, carga de atendimento e estabilidade das turmas.',
                    'Os principais sinais aqui ajudam a identificar onde apoiar coordenacao e docencia sem abrir o sistema inteiro.',
                    'Esse painel foi mantido leve para continuar com cara de produto moderno, sem virar ERP pesado.',
                ],
            };
        case 'coordinator':
            return {
                subtitle: 'Visao pedagogica centralizada para acompanhar estudantes, turmas, planejamento e pendencias que merecem intervencao da coordenacao.',
                badge: 'warning' as const,
                badgeLabel: 'Visao pedagogica',
                focusLabel: 'Coordenacao',
                bullets: [
                    'A coordenacao precisa acompanhar sinais de aprendizagem, frequencia, planejamento e pontos de apoio ao professor.',
                    'Os dados desta tela priorizam supervisao e priorizacao, nao apenas contagem fria de registros.',
                    'O objetivo e acelerar leitura de contexto antes de entrar nos modulos detalhados.',
                ],
            };
        default:
            return {
                subtitle: 'Visao operacional da rotina docente, com foco em turmas, estudantes que pedem atencao, carga de correcao e andamento do planejamento.',
                badge: 'success' as const,
                badgeLabel: 'Visao docente',
                focusLabel: 'Docencia',
                bullets: [
                    'Para o professor, o valor principal esta em enxergar rapidamente o que precisa de acao na rotina.',
                    'As metricas priorizam frequencia, entregas, planejamento e acompanhamento dos grupos.',
                    'A pagina se conecta com os modulos de atividades, agenda, estudantes e turmas para virar um centro de decisao diario.',
                ],
            };
    }
}
