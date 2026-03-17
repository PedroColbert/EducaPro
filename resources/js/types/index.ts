import { LucideIcon } from 'lucide-react';

export type AppTab = 'dashboard' | 'alunos' | 'turmas' | 'planejamento' | 'materiais' | 'atividades' | 'agenda' | 'desempenho';

export interface CurrentUser {
    name: string;
    role: string;
    avatar: string;
}

export interface SummaryMetric {
    title: string;
    value: string;
    icon: LucideIcon;
    color: string;
    bg: string;
}

export interface TodayClass {
    id: number;
    time: string;
    name: string;
    room: string;
    status: 'completed' | 'current' | 'upcoming';
}

export interface Student {
    id: number;
    name: string;
    age: number;
    level: string;
    class: string;
    attendance: string;
    status: 'Ótimo' | 'Bom' | 'Atenção' | 'Excelente';
    initials: string;
    color: string;
    email: string;
    notes: string;
}

export interface CourseClass {
    id: number;
    name: string;
    students: number;
    schedule: string;
    progress: number;
    nextTopic: string;
}

export interface Material {
    id: number;
    title: string;
    type: 'pdf' | 'video' | 'doc' | 'link';
    category: string;
    level: string;
    tags: string[];
}

export interface LessonPlan {
    id: number;
    date: string;
    class: string;
    topic: string;
    status: 'planned' | 'draft' | 'completed';
    objectives: string;
}

export interface Activity {
    id: number;
    title: string;
    class: string;
    deadline: string;
    status: 'grading' | 'pending' | 'completed';
    submitted: number;
    total: number;
}

export interface NavigationItem {
    id: AppTab;
    label: string;
    icon: LucideIcon;
}
