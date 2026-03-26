import {
    AlertCircle,
    BookOpen,
    Calendar,
    CheckSquare,
    Clock,
    FileText,
    Folder,
    LayoutDashboard,
    Users,
} from 'lucide-react';

import {
    AgendaItem,
    AttendanceSession,
    CourseClass,
    CurrentUser,
    EducaProState,
    LessonPlan,
    Material,
    NavigationItem,
    Student,
} from '@/types';

export const currentUser: CurrentUser = {
    name: 'Marina Silva',
    role: 'Professora de Ingles',
    avatar: 'MS',
};

export const navigation: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alunos', label: 'Alunos', icon: Users },
    { id: 'turmas', label: 'Turmas', icon: BookOpen },
    { id: 'planejamento', label: 'Plano de Aulas', icon: Calendar },
    { id: 'materiais', label: 'Materiais', icon: Folder },
    { id: 'atividades', label: 'Atividades', icon: FileText },
    { id: 'agenda', label: 'Agenda', icon: CheckSquare },
];

export const studentStatusMeta = {
    great: { label: 'Otimo', badge: 'success', color: 'bg-indigo-100 text-indigo-700' },
    good: { label: 'Bom', badge: 'warning', color: 'bg-emerald-100 text-emerald-700' },
    attention: { label: 'Atencao', badge: 'danger', color: 'bg-rose-100 text-rose-700' },
    excellent: { label: 'Excelente', badge: 'success', color: 'bg-purple-100 text-purple-700' },
} as const;

export const lessonPlanStatusMeta = {
    draft: { label: 'Rascunho', badge: 'warning' },
    planned: { label: 'Planejado', badge: 'primary' },
    completed: { label: 'Concluido', badge: 'neutral' },
} as const;

export const agendaTypeMeta = {
    class: { label: 'Aula', color: 'indigo' },
    reminder: { label: 'Lembrete', color: 'blue' },
    meeting: { label: 'Reuniao', color: 'amber' },
    correction: { label: 'Correcao', color: 'emerald' },
} as const;

export const attendanceStatusMeta = {
    present: { label: 'Presente' },
    absent: { label: 'Ausente' },
    late: { label: 'Atrasado' },
    justified: { label: 'Justificado' },
} as const;

export const levelOptions = ['A1', 'A2', 'B1', 'B2', 'Kids 3', 'Conversation'];
export const materialCategoryOptions = ['Grammar', 'Vocabulary', 'Listening', 'Speaking', 'Reading', 'Writing'];

const students: Student[] = [
    { id: 1, name: 'Lucas Fernandes', age: 14, level: 'B1', status: 'great', initials: 'LF', color: studentStatusMeta.great.color, email: 'lucas.f@email.com', phone: '(11) 99888-1101', notes: 'Muito participativo, mas precisa de mais apoio em writing.', attendanceRate: 95, classIds: [1] },
    { id: 2, name: 'Sofia Almeida', age: 15, level: 'B1', status: 'good', initials: 'SA', color: studentStatusMeta.good.color, email: 'sofia.a@email.com', phone: '(11) 99888-1102', notes: 'Excelente vocabulario. Faltou a duas aulas recentes por motivo de saude.', attendanceRate: 88, classIds: [1] },
    { id: 3, name: 'Pedro Henrique', age: 10, level: 'Kids 3', status: 'attention', initials: 'PH', color: studentStatusMeta.attention.color, email: 'pedro.h@email.com', phone: '(11) 99888-1103', notes: 'Dificuldade de concentracao. Conversar com a familia sobre rotina de estudos.', attendanceRate: 70, classIds: [3] },
    { id: 4, name: 'Ana Clara', age: 16, level: 'A2', status: 'excellent', initials: 'AC', color: studentStatusMeta.excellent.color, email: 'ana.c@email.com', phone: '(11) 99888-1104', notes: 'Sempre entrega as tarefas com antecedencia. Pronta para avancar de nivel.', attendanceRate: 98, classIds: [2] },
];

const classes: CourseClass[] = [
    { id: 1, name: 'Turma B1 - Avancado', level: 'B1', schedule: 'Seg e Qua, 10:00', progress: 75, nextTopic: 'Conditionals (2nd & 3rd)', room: 'Sala 02', color: '#4f46e5', studentIds: [1, 2] },
    { id: 2, name: 'Turma A2 - Intermediario', level: 'A2', schedule: 'Ter e Qui, 08:00', progress: 45, nextTopic: 'Past Continuous', room: 'Sala 04', color: '#7c3aed', studentIds: [4] },
    { id: 3, name: 'Turma Kids 3', level: 'Kids 3', schedule: 'Seg e Qua, 13:30', progress: 60, nextTopic: 'Animals & Habitats', room: 'Sala 07', color: '#059669', studentIds: [3] },
];

const materials: Material[] = [
    { id: 1, title: 'Phrasal Verbs Flashcards', type: 'pdf', category: 'Vocabulary', level: 'B1', tags: ['flashcards', 'verbs'], url: 'https://example.com/phrasal-verbs.pdf', isFavorite: true, description: 'Cartoes visuais para revisar phrasal verbs em speaking e pair work.' },
    { id: 2, title: 'Listening Practice: Ted Talk', type: 'video', category: 'Listening', level: 'B2', tags: ['video', 'technology'], url: 'https://example.com/ted-talk', isFavorite: false, description: 'Video para warm-up e debate com alunos adultos.' },
    { id: 3, title: 'Present Perfect Worksheets', type: 'doc', category: 'Grammar', level: 'A2', tags: ['grammar', 'worksheet'], url: 'https://example.com/present-perfect.docx', isFavorite: false, description: 'Folha de exercicios para consolidacao guiada.' },
    { id: 4, title: 'Roleplay: At the Restaurant', type: 'link', category: 'Speaking', level: 'A1', tags: ['speaking', 'roleplay', 'food'], url: 'https://example.com/restaurant-roleplay', isFavorite: true, description: 'Atividade guiada para roleplay com vocabulario de restaurante.' },
];

const lessonPlans: LessonPlan[] = [
    { id: 1, date: '2026-10-12', classId: 1, topic: 'Second Conditional', status: 'planned', objectives: ['Falar sobre situacoes hipoteticas', 'Praticar estruturas com if clauses'], content: ['Warm-up', 'Guided examples', 'Pair speaking', 'Homework briefing'], materialIds: [1, 2], homework: 'Escrever cinco frases com second conditional sobre viagens.', notes: 'Priorizar speaking em duplas.' },
    { id: 2, date: '2026-10-13', classId: 2, topic: 'Past Continuous vs Simple Past', status: 'draft', objectives: ['Narrar eventos interrompidos', 'Revisar conectores de tempo'], content: ['Story cards', 'Timeline practice'], materialIds: [3], homework: 'Workbook paginas 45 e 46.', notes: 'Levar exemplos mais visuais para a turma A2.' },
    { id: 3, date: '2026-10-10', classId: 3, topic: 'Wild Animals', status: 'completed', objectives: ['Aprender nomes de animais', 'Usar can/cannot'], content: ['Flashcards', 'Mimic game', 'Mini quiz'], materialIds: [4], homework: 'Gravar audio lendo a historinha.', notes: 'Turma respondeu melhor a atividades em movimento.' },
];

const activities = [
    { id: 1, title: 'Redacao: My Dream Vacation', classId: 1, deadline: '2026-10-12', status: 'grading', description: 'Texto curto sobre viagem ideal usando present perfect e simple past.', instructions: 'Minimo de 120 palavras. Entregar em arquivo ou caderno.', submissions: [{ studentId: 1, status: 'graded', feedback: 'Boa organizacao de ideias.', grade: '9.5' }, { studentId: 2, status: 'submitted', feedback: '', grade: '' }] },
    { id: 2, title: 'Workbook: Pag 45 e 46', classId: 2, deadline: '2026-10-13', status: 'pending', description: 'Exercicios de consolidacao sobre past continuous.', instructions: 'Corrigir em sala na proxima aula.', submissions: [{ studentId: 4, status: 'pending', feedback: '', grade: '' }] },
    { id: 3, title: 'Gravar audio lendo a historinha', classId: 3, deadline: '2026-10-15', status: 'pending', description: 'Leitura em voz alta com foco em pronuncia.', instructions: 'Enviar por audio curto no grupo da turma.', submissions: [{ studentId: 3, status: 'submitted', feedback: '', grade: '' }] },
] as EducaProState['activities'];

const agendaItems: AgendaItem[] = [
    { id: 1, title: 'Turma B1 - Avancado', type: 'class', startsAt: '2026-10-12T10:00:00', endsAt: '2026-10-12T11:30:00', classId: 1, location: 'Sala 02', notes: 'Aula com foco em conditionals.' },
    { id: 2, title: 'Turma A2 - Intermediario', type: 'class', startsAt: '2026-10-13T08:00:00', endsAt: '2026-10-13T09:30:00', classId: 2, location: 'Sala 04', notes: 'Levar worksheet de apoio.' },
    { id: 3, title: 'Turma Kids 3', type: 'class', startsAt: '2026-10-12T13:30:00', endsAt: '2026-10-12T15:00:00', classId: 3, location: 'Sala 07', notes: 'Atividade oral com animais.' },
    { id: 4, title: 'Reuniao pedagogica', type: 'meeting', startsAt: '2026-10-15T14:00:00', endsAt: '2026-10-15T16:00:00', classId: null, location: 'Sala de professores', notes: 'Alinhar calendario e recuperacao.' },
    { id: 5, title: 'Corrigir audios do Kids 3', type: 'correction', startsAt: '2026-10-16T09:00:00', endsAt: '2026-10-16T10:00:00', classId: 3, location: 'Home office', notes: 'Ouvir e anotar feedback individual.' },
];

const attendanceSessions: AttendanceSession[] = [
    { id: 1, classId: 1, date: '2026-10-10', entries: [{ studentId: 1, status: 'present', note: '' }, { studentId: 2, status: 'late', note: 'Chegou 10 minutos atrasada.' }] },
    { id: 2, classId: 3, date: '2026-10-09', entries: [{ studentId: 3, status: 'justified', note: 'Consulta medica.' }] },
];

export function createInitialEducaProState(): EducaProState {
    return {
        students,
        classes,
        materials,
        lessonPlans,
        activities,
        agendaItems,
        attendanceSessions,
    };
}

export const dashboardIconMeta = {
    todayClasses: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    pendingTasks: { icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
    attentionStudents: { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
};
