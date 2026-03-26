import { LucideIcon } from 'lucide-react';

export type AppTab = 'dashboard' | 'alunos' | 'turmas' | 'planejamento' | 'materiais' | 'atividades' | 'agenda' | 'desempenho';

export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface SharedPageProps {
    app: {
        name: string;
    };
    auth: {
        user: AuthUser | null;
    };
    errors: Record<string, string>;
}

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

export type StudentStatus = 'great' | 'good' | 'attention' | 'excellent';
export type MaterialType = 'pdf' | 'video' | 'doc' | 'link';
export type LessonPlanStatus = 'draft' | 'planned' | 'completed';
export type ActivityStatus = 'pending' | 'grading' | 'completed';
export type SubmissionStatus = 'pending' | 'submitted' | 'graded';
export type AgendaItemType = 'class' | 'reminder' | 'meeting' | 'correction';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'justified';

export interface Student {
    id: number;
    name: string;
    age: number;
    level: string;
    status: StudentStatus;
    initials: string;
    color: string;
    email: string;
    phone: string;
    notes: string;
    attendanceRate: number;
    classIds: number[];
}

export interface StudentDraft {
    name: string;
    age: number;
    level: string;
    status: StudentStatus;
    email: string;
    phone: string;
    notes: string;
    attendanceRate: number;
    classIds: number[];
}

export interface CourseClass {
    id: number;
    name: string;
    level: string;
    schedule: string;
    progress: number;
    nextTopic: string;
    room: string;
    color: string;
    studentIds: number[];
}

export interface CourseClassDraft {
    name: string;
    level: string;
    schedule: string;
    progress: number;
    nextTopic: string;
    room: string;
    color: string;
    studentIds: number[];
}

export interface Material {
    id: number;
    title: string;
    type: MaterialType;
    category: string;
    level: string;
    tags: string[];
    url: string;
    isFavorite: boolean;
    description: string;
}

export interface MaterialDraft {
    title: string;
    type: MaterialType;
    category: string;
    level: string;
    tags: string[];
    url: string;
    isFavorite: boolean;
    description: string;
}

export interface LessonPlan {
    id: number;
    date: string;
    classId: number | null;
    topic: string;
    status: LessonPlanStatus;
    objectives: string[];
    content: string[];
    materialIds: number[];
    homework: string;
    notes: string;
}

export interface LessonPlanDraft {
    date: string;
    classId: number | null;
    topic: string;
    status: LessonPlanStatus;
    objectives: string[];
    content: string[];
    materialIds: number[];
    homework: string;
    notes: string;
}

export interface ActivitySubmission {
    studentId: number;
    status: SubmissionStatus;
    feedback: string;
    grade: string;
}

export interface Activity {
    id: number;
    title: string;
    classId: number | null;
    deadline: string;
    status: ActivityStatus;
    description: string;
    instructions: string;
    submissions: ActivitySubmission[];
}

export interface ActivityDraft {
    title: string;
    classId: number | null;
    deadline: string;
    status: ActivityStatus;
    description: string;
    instructions: string;
}

export interface AgendaItem {
    id: number;
    title: string;
    type: AgendaItemType;
    startsAt: string;
    endsAt: string;
    classId: number | null;
    location: string;
    notes: string;
}

export interface AgendaItemDraft {
    title: string;
    type: AgendaItemType;
    startsAt: string;
    endsAt: string;
    classId: number | null;
    location: string;
    notes: string;
}

export interface AttendanceEntry {
    studentId: number;
    status: AttendanceStatus;
    note: string;
}

export interface AttendanceSession {
    id: number;
    classId: number;
    date: string;
    entries: AttendanceEntry[];
}

export interface NavigationItem {
    id: AppTab;
    label: string;
    icon: LucideIcon;
}

export interface EducaProState {
    students: Student[];
    classes: CourseClass[];
    materials: Material[];
    lessonPlans: LessonPlan[];
    activities: Activity[];
    agendaItems: AgendaItem[];
    attendanceSessions: AttendanceSession[];
}
