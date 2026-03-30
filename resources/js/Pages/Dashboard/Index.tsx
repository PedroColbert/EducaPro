import { Plus } from 'lucide-react';

import PrioritiesCard from '@/Components/Features/Dashboard/PrioritiesCard';
import QuickActions from '@/Components/Features/Dashboard/QuickActions';
import ReportsOverview from '@/Components/Features/Dashboard/ReportsOverview';
import SummaryMetrics from '@/Components/Features/Dashboard/SummaryMetrics';
import TodayClasses from '@/Components/Features/Dashboard/TodayClasses';
import { dashboardIconMeta } from '@/data/mockData';
import { useAppContext } from '@/hooks/useAppContext';
import { useEducaPro } from '@/hooks/useEducaPro';
import { Activity, AgendaItem, AppTab, LessonPlan, Student } from '@/types';

type PriorityCandidate = {
    id: string;
    title: string;
    description: string;
    level: 'critical' | 'attention' | 'normal';
    score: number;
    module: string;
    actionLabel: string;
    actionTab: AppTab;
};

function daysBetween(referenceDate: Date, target: string) {
    const start = new Date(referenceDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(target);
    end.setHours(0, 0, 0, 0);

    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export default function DashboardPage({ changeTab }: { changeTab: (tabId: AppTab) => void }) {
    const { currentUser, appContext } = useAppContext();
    const { students, classes, activities, agendaItems, lessonPlans, getClassById, getStudentsForClass } = useEducaPro();
    const primaryAction = getPrimaryAction(appContext.profile, appContext.labels);

    const orderedAgenda = [...agendaItems].sort((left, right) => left.startsAt.localeCompare(right.startsAt));
    const referenceDate = orderedAgenda.length ? new Date(orderedAgenda[0].startsAt) : new Date();

    const classAgenda = orderedAgenda
        .filter((item) => item.type === 'class')
        .slice(0, 4)
        .map((item, index) => {
            const status: 'completed' | 'current' | 'upcoming' = index === 0 ? 'completed' : index === 1 ? 'current' : 'upcoming';

            return {
                id: item.id,
                time: `${new Date(item.startsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - ${new Date(item.endsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
                name: item.title,
                room: item.location || getClassById(item.classId)?.room || 'Sala principal',
                status,
            };
        });

    const overallAttendance = students.length ? Math.round(students.reduce((sum, student) => sum + student.attendanceRate, 0) / students.length) : 0;
    const attentionStudents = students.filter((student) => student.status === 'attention');
    const gradingActivities = activities.filter((activity) => activity.status === 'grading');
    const recentDraftPlans = lessonPlans.filter((plan) => plan.status === 'draft').length;

    const summaryMetrics = [
        { title: 'Aulas hoje', value: String(classAgenda.length), ...dashboardIconMeta.todayClasses },
        { title: 'Tarefas pendentes', value: String(activities.filter((activity) => activity.status !== 'completed').length), ...dashboardIconMeta.pendingTasks },
        { title: 'Alunos em alerta', value: String(attentionStudents.length), ...dashboardIconMeta.attentionStudents },
    ];

    const classInsights = classes.map((courseClass) => {
        const classStudents = getStudentsForClass(courseClass.id);
        const attendanceAverage = classStudents.length
            ? Math.round(classStudents.reduce((sum, student) => sum + student.attendanceRate, 0) / classStudents.length)
            : 0;

        return {
            id: courseClass.id,
            name: courseClass.name,
            progress: courseClass.progress,
            attendanceAverage,
            attentionCount: classStudents.filter((student) => student.status === 'attention').length,
        };
    });

    const reportStats = [
        { label: 'Frequencia media', value: `${overallAttendance}%`, tone: overallAttendance < 80 ? 'amber' : 'emerald' },
        { label: 'Correcao pendente', value: String(gradingActivities.length), tone: gradingActivities.length ? 'rose' : 'indigo' },
        { label: 'Planos em rascunho', value: String(recentDraftPlans), tone: recentDraftPlans ? 'amber' : 'indigo' },
        { label: 'Turmas ativas', value: String(classes.length), tone: 'indigo' },
    ] as const;

    const reportInsights = buildPedagogicalInsights({
        students,
        classes,
        activities,
        agendaItems: orderedAgenda,
        lessonPlans,
        overallAttendance,
        attentionStudents,
        getStudentsForClass,
        referenceDate,
    });

    const priorityTasks = buildPriorityCandidates({
        activities,
        students,
        classes,
        agendaItems: orderedAgenda,
        lessonPlans,
        getClassById,
        getStudentsForClass,
        referenceDate,
    }).slice(0, 5);

    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Bom dia, {currentUser.name.split(' ')[0]}!</h1>
                    <p className="mt-1 text-slate-500">{profileSummary(appContext.profile)}</p>
                </div>
                {primaryAction ? (
                    <button
                        onClick={() => changeTab(primaryAction.tab)}
                        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm shadow-indigo-200 transition-colors hover:bg-indigo-700"
                    >
                        <Plus size={18} />
                        <span>{primaryAction.label}</span>
                    </button>
                ) : null}
            </div>

            <SummaryMetrics metrics={summaryMetrics} />
            <ReportsOverview stats={reportStats} classInsights={classInsights} insights={reportInsights} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <TodayClasses classes={classAgenda} changeTab={changeTab} />
                <div className="space-y-6">
                    <QuickActions changeTab={changeTab} />
                    <PrioritiesCard tasks={priorityTasks} changeTab={changeTab} />
                </div>
            </div>
        </div>
    );
}

function profileSummary(profile: string | null) {
    switch (profile) {
        case 'admin':
            return 'Aqui esta uma leitura rapida da operacao escolar, com foco em visao institucional e acompanhamento geral.';
        case 'coordinator':
            return 'Aqui esta um resumo da coordenacao, com sinais pedagogicos, turmas e pontos de acompanhamento.';
        default:
            return 'Aqui esta um resumo vivo da sua operacao academica.';
    }
}

function getPrimaryAction(
    profile: string | null,
    labels: { lessonPlans: string; reports: string },
) {
    switch (profile) {
        case 'admin':
            return {
                tab: 'desempenho' as const,
                label: `Abrir ${labels.reports.toLowerCase()}`,
            };
        case 'coordinator':
            return {
                tab: 'planejamento' as const,
                label: `Revisar ${labels.lessonPlans.toLowerCase()}`,
            };
        default:
            return {
                tab: 'planejamento' as const,
                label: `Novo item de ${labels.lessonPlans.toLowerCase()}`,
            };
    }
}

function buildPedagogicalInsights({
    students,
    classes,
    activities,
    agendaItems,
    lessonPlans,
    overallAttendance,
    attentionStudents,
    getStudentsForClass,
    referenceDate,
}: {
    students: Student[];
    classes: ReturnType<typeof useEducaPro>['classes'];
    activities: Activity[];
    agendaItems: AgendaItem[];
    lessonPlans: LessonPlan[];
    overallAttendance: number;
    attentionStudents: Student[];
    getStudentsForClass: ReturnType<typeof useEducaPro>['getStudentsForClass'];
    referenceDate: Date;
}) {
    const strongestClass = [...classes]
        .map((courseClass) => {
            const classStudents = getStudentsForClass(courseClass.id);
            const attendanceAverage = classStudents.length
                ? Math.round(classStudents.reduce((sum, student) => sum + student.attendanceRate, 0) / classStudents.length)
                : 0;

            return {
                ...courseClass,
                attendanceAverage,
            };
        })
        .sort((left, right) => right.attendanceAverage - left.attendanceAverage || right.progress - left.progress)[0];

    const upcomingEvents = agendaItems.filter((item) => daysBetween(referenceDate, item.startsAt) <= 2 && daysBetween(referenceDate, item.startsAt) >= 0);
    const nearPlans = lessonPlans.filter((plan) => plan.status !== 'completed' && daysBetween(referenceDate, plan.date) <= 2 && daysBetween(referenceDate, plan.date) >= 0);

    const attendanceTone: 'success' | 'warning' | 'danger' = overallAttendance < 80 ? 'warning' : 'success';
    const momentumTone: 'success' | 'warning' | 'danger' = strongestClass && strongestClass.attendanceAverage >= 90 ? 'success' : 'warning';
    const workloadTone: 'success' | 'warning' | 'danger' =
        activities.some((activity) => activity.status === 'grading') || nearPlans.some((plan) => plan.status === 'draft') ? 'warning' : 'success';

    return [
        {
            id: 'attendance-overview',
            tone: attendanceTone,
            title: overallAttendance < 80 ? 'Frequencia media abaixo do ideal' : 'Frequencia geral sob controle',
            description:
                overallAttendance < 80
                    ? `${attentionStudents.length} aluno(s) ja pedem acompanhamento mais proximo para evitar queda de ritmo.`
                    : `A media geral esta em ${overallAttendance}% e favorece continuidade dos objetivos planejados.`,
        },
        {
            id: 'class-momentum',
            tone: momentumTone,
            title: strongestClass ? `Melhor tracao atual: ${strongestClass.name}` : 'Sem turmas suficientes para comparar',
            description: strongestClass
                ? `Essa turma combina ${strongestClass.attendanceAverage}% de frequencia media com ${strongestClass.progress}% de progresso do semestre.`
                : 'Cadastre mais turmas para habilitar comparativos e sinais pedagogicos mais confiaveis.',
        },
        {
            id: 'weekly-load',
            tone: workloadTone,
            title: 'Carga pedagogica da janela curta',
            description:
                upcomingEvents.length || nearPlans.length
                    ? `${upcomingEvents.length} evento(s) e ${nearPlans.length} plano(s) exigem atencao nos proximos dois dias.`
                    : 'A semana esta organizada sem gargalos imediatos em agenda ou planejamento.',
        },
    ];
}

function buildPriorityCandidates({
    activities,
    students,
    classes,
    agendaItems,
    lessonPlans,
    getClassById,
    getStudentsForClass,
    referenceDate,
}: {
    activities: Activity[];
    students: Student[];
    classes: ReturnType<typeof useEducaPro>['classes'];
    agendaItems: AgendaItem[];
    lessonPlans: LessonPlan[];
    getClassById: ReturnType<typeof useEducaPro>['getClassById'];
    getStudentsForClass: ReturnType<typeof useEducaPro>['getStudentsForClass'];
    referenceDate: Date;
}) {
    const priorities: PriorityCandidate[] = [];

    activities.forEach((activity) => {
        const submittedCount = activity.submissions.filter((entry) => entry.status === 'submitted').length;
        const pendingCount = activity.submissions.filter((entry) => entry.status === 'pending').length;
        const dueInDays = daysBetween(referenceDate, activity.deadline);

        if (activity.status === 'grading' || dueInDays <= 1 || pendingCount > 0) {
            const score =
                (activity.status === 'grading' ? 95 : 70) +
                (dueInDays <= 0 ? 15 : dueInDays === 1 ? 10 : 0) +
                Math.min(pendingCount * 2, 10);

            priorities.push({
                id: `activity-${activity.id}`,
                title: `${activity.title} precisa de decisao`,
                description: `${submittedCount} entrega(s) aguardam correcao e ${pendingCount} ainda estao pendentes em ${getClassById(activity.classId)?.name ?? 'uma turma sem vinculo'}.`,
                level: score >= 100 ? 'critical' : score >= 80 ? 'attention' : 'normal',
                score,
                module: 'Atividades',
                actionLabel: 'Abrir atividades',
                actionTab: 'atividades',
            });
        }
    });

    students
        .filter((student) => student.attendanceRate < 80)
        .forEach((student) => {
            const score = 82 + Math.max(0, 80 - student.attendanceRate);

            priorities.push({
                id: `student-${student.id}`,
                title: `${student.name} esta com frequencia em queda`,
                description: `Frequencia atual de ${student.attendanceRate}% e status ${student.status === 'attention' ? 'de atencao' : 'em observacao'} pedem revisao pedagogica.`,
                level: score >= 95 ? 'critical' : 'attention',
                score,
                module: 'Alunos',
                actionLabel: 'Revisar alunos',
                actionTab: 'alunos',
            });
        });

    classes.forEach((courseClass) => {
        const classStudents = getStudentsForClass(courseClass.id);
        const attentionCount = classStudents.filter((student) => student.status === 'attention').length;
        const avgAttendance = classStudents.length
            ? Math.round(classStudents.reduce((sum, student) => sum + student.attendanceRate, 0) / classStudents.length)
            : 0;

        if (attentionCount > 0 || courseClass.progress < 50 || avgAttendance < 80) {
            const score = 65 + attentionCount * 8 + (courseClass.progress < 50 ? 10 : 0) + (avgAttendance < 80 ? 8 : 0);

            priorities.push({
                id: `class-${courseClass.id}`,
                title: `${courseClass.name} pede calibragem`,
                description: `${attentionCount} aluno(s) em atencao, progresso em ${courseClass.progress}% e frequencia media de ${avgAttendance || 0}%.`,
                level: score >= 85 ? 'attention' : 'normal',
                score,
                module: 'Turmas',
                actionLabel: 'Abrir turmas',
                actionTab: 'turmas',
            });
        }
    });

    agendaItems
        .filter((item) => {
            const days = daysBetween(referenceDate, item.startsAt);
            return days >= 0 && days <= 2 && item.type !== 'class';
        })
        .forEach((item) => {
            const days = daysBetween(referenceDate, item.startsAt);
            const score = item.type === 'meeting' ? 76 : item.type === 'correction' ? 84 : 68;

            priorities.push({
                id: `agenda-${item.id}`,
                title: `${item.title} esta proximo`,
                description: `${agendaItemsLabel(item.type)} agendado para ${new Date(item.startsAt).toLocaleDateString('pt-BR')} com janela curta para preparacao.`,
                level: score >= 84 || days === 0 ? 'attention' : 'normal',
                score: score + (days === 0 ? 6 : 0),
                module: 'Agenda',
                actionLabel: 'Ver agenda',
                actionTab: 'agenda',
            });
        });

    lessonPlans
        .filter((plan) => plan.status === 'draft')
        .forEach((plan) => {
            const days = daysBetween(referenceDate, plan.date);

            if (days <= 2) {
                priorities.push({
                    id: `plan-${plan.id}`,
                    title: `Plano em rascunho: ${plan.topic}`,
                    description: `Aula prevista para ${new Date(plan.date).toLocaleDateString('pt-BR')} ainda precisa ser fechada e vinculada a materiais/homework.`,
                    level: days <= 1 ? 'attention' : 'normal',
                    score: days <= 1 ? 83 : 72,
                    module: 'Planejamento',
                    actionLabel: 'Editar plano',
                    actionTab: 'planejamento',
                });
            }
        });

    return priorities.sort((left, right) => right.score - left.score);
}

function agendaItemsLabel(type: AgendaItem['type']) {
    switch (type) {
        case 'meeting':
            return 'Reuniao';
        case 'correction':
            return 'Bloco de correcao';
        case 'reminder':
            return 'Lembrete';
        default:
            return 'Compromisso';
    }
}
