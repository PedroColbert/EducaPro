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
    Activity,
    CourseClass,
    CurrentUser,
    LessonPlan,
    Material,
    NavigationItem,
    Student,
    SummaryMetric,
    TodayClass,
} from '@/types';

export const currentUser: CurrentUser = {
    name: 'Marina Silva',
    role: 'Professora de Inglês',
    avatar: 'MS',
};

export const summaryMetrics: SummaryMetric[] = [
    { title: 'Aulas Hoje', value: '4', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Tarefas Pendentes', value: '12', icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'Alunos em Alerta', value: '2', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
];

export const todayClasses: TodayClass[] = [
    { id: 1, time: '08:00 - 09:30', name: 'Turma A2 - Intermediário', room: 'Sala 04', status: 'completed' },
    { id: 2, time: '10:00 - 11:30', name: 'Turma B1 - Avançado', room: 'Sala 02', status: 'current' },
    { id: 3, time: '13:30 - 15:00', name: 'Turma Kids 3', room: 'Sala 07', status: 'upcoming' },
    { id: 4, time: '15:30 - 17:00', name: 'Conversação Livre', room: 'Lab 01', status: 'upcoming' },
];

export const students: Student[] = [
    { id: 1, name: 'Lucas Fernandes', age: 14, level: 'B1', class: 'Turma B1 - Avançado', attendance: '95%', status: 'Ótimo', initials: 'LF', color: 'bg-indigo-100 text-indigo-700', email: 'lucas.f@email.com', notes: 'Muito participativo, mas precisa de atenção especial na escrita (Writing).' },
    { id: 2, name: 'Sofia Almeida', age: 15, level: 'B1', class: 'Turma B1 - Avançado', attendance: '88%', status: 'Bom', initials: 'SA', color: 'bg-emerald-100 text-emerald-700', email: 'sofia.a@email.com', notes: 'Excelente vocabulário. Faltou a duas aulas recentes por problemas de saúde.' },
    { id: 3, name: 'Pedro Henrique', age: 10, level: 'Kids 3', class: 'Turma Kids 3', attendance: '70%', status: 'Atenção', initials: 'PH', color: 'bg-rose-100 text-rose-700', email: 'pedro.h@email.com', notes: 'Dificuldade de concentração. Conversar com os pais sobre rotina de estudos em casa.' },
    { id: 4, name: 'Ana Clara', age: 16, level: 'A2', class: 'Turma A2 - Intermediário', attendance: '98%', status: 'Excelente', initials: 'AC', color: 'bg-purple-100 text-purple-700', email: 'ana.c@email.com', notes: 'Sempre entrega as tarefas com antecedência. Pronta para avançar de nível.' },
];

export const courseClasses: CourseClass[] = [
    { id: 1, name: 'Turma B1 - Avançado', students: 15, schedule: 'Seg e Qua, 10:00', progress: 75, nextTopic: 'Conditionals (2nd & 3rd)' },
    { id: 2, name: 'Turma A2 - Intermediário', students: 22, schedule: 'Ter e Qui, 08:00', progress: 45, nextTopic: 'Past Continuous' },
    { id: 3, name: 'Turma Kids 3', students: 12, schedule: 'Seg e Qua, 13:30', progress: 60, nextTopic: 'Animals & Habitats' },
];

export const materials: Material[] = [
    { id: 1, title: 'Phrasal Verbs Flashcards', type: 'pdf', category: 'Vocabulary', level: 'B1', tags: ['flashcards', 'pdf', 'verbs'] },
    { id: 2, title: 'Listening Practice: Ted Talk', type: 'video', category: 'Listening', level: 'B2', tags: ['video', 'ted', 'technology'] },
    { id: 3, title: 'Present Perfect Worksheets', type: 'doc', category: 'Grammar', level: 'A2', tags: ['grammar', 'exercises', 'pdf'] },
    { id: 4, title: 'Roleplay: At the Restaurant', type: 'link', category: 'Speaking', level: 'A1', tags: ['speaking', 'roleplay', 'food'] },
];

export const lessonPlans: LessonPlan[] = [
    { id: 1, date: '12 Out, 2026', class: 'Turma B1 - Avançado', topic: 'Second Conditional', status: 'planned', objectives: 'Falar sobre situações hipotéticas e sonhos.' },
    { id: 2, date: '13 Out, 2026', class: 'Turma A2 - Intermediário', topic: 'Past Continuous vs Simple Past', status: 'draft', objectives: 'Narrar eventos interrompidos no passado.' },
    { id: 3, date: '10 Out, 2026', class: 'Turma Kids 3', topic: 'Wild Animals', status: 'completed', objectives: 'Aprender nomes de animais e verbos de ação.' },
];

export const activities: Activity[] = [
    { id: 1, title: 'Redação: My Dream Vacation', class: 'Turma B1', deadline: 'Hoje', status: 'grading', submitted: 12, total: 15 },
    { id: 2, title: 'Workbook: Pág 45 e 46', class: 'Turma A2', deadline: 'Amanhã', status: 'pending', submitted: 0, total: 22 },
    { id: 3, title: 'Gravar áudio lendo a historinha', class: 'Turma Kids 3', deadline: '15 Out', status: 'pending', submitted: 5, total: 12 },
    { id: 4, title: 'Quiz: Phrasal Verbs', class: 'Turma B1', deadline: '08 Out', status: 'completed', submitted: 15, total: 15 },
];

export const navigation: NavigationItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alunos', label: 'Alunos', icon: Users },
    { id: 'turmas', label: 'Turmas', icon: BookOpen },
    { id: 'planejamento', label: 'Plano de Aulas', icon: Calendar },
    { id: 'materiais', label: 'Materiais', icon: Folder },
    { id: 'atividades', label: 'Atividades', icon: FileText },
    { id: 'agenda', label: 'Agenda', icon: CheckSquare },
];
