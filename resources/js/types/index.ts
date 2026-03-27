import { LucideIcon } from 'lucide-react';

export type AppTab = 'dashboard' | 'alunos' | 'turmas' | 'planejamento' | 'materiais' | 'atividades' | 'agenda' | 'desempenho';
export type UserRole = 'admin' | 'coordinator' | 'teacher';
export type AppProfile = UserRole | 'student' | 'guardian';

export interface AuthUser {
    id: number;
    name: string;
    display_name?: string | null;
    email: string;
    role?: UserRole | null;
    avatar?: string | null;
    organization_name?: string | null;
    organization_unit_name?: string | null;
}

export interface GuardianAuthUser {
    id: number;
    name: string;
    email: string;
    relationship_label?: string | null;
    organization_name?: string | null;
    organization_unit_name?: string | null;
}

export interface StudentAuthUser {
    id: number;
    name: string;
    email: string;
    level?: string | null;
    organization_name?: string | null;
    organization_unit_name?: string | null;
}

export interface AppLabels {
    students: string;
    classes: string;
    lessonPlans: string;
    materials: string;
    activities: string;
    agenda: string;
    reports: string;
}

export interface AppContext {
    productName: string;
    organizationName: string | null;
    organizationCategory: string | null;
    organizationUnitName?: string | null;
    locale: string;
    timezone: string;
    profile: AppProfile | null;
    labels: AppLabels;
}

export interface SharedPageProps extends Record<string, unknown> {
    app: {
        name: string;
        context: AppContext;
    };
    auth: {
        user: AuthUser | null;
        guardian?: GuardianAuthUser | null;
        student?: StudentAuthUser | null;
    };
    errors: Record<string, string>;
}

export interface CurrentUser {
    name: string;
    role: string;
    avatar: string;
    organizationName?: string | null;
    organizationUnitName?: string | null;
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
    subjectId: number | null;
    deliveryMode: 'in_person' | 'online' | 'hybrid';
    audienceType: 'group' | 'individual';
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
    subjectId: number | null;
    deliveryMode: 'in_person' | 'online' | 'hybrid';
    audienceType: 'group' | 'individual';
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

export interface Subject {
    id: number;
    name: string;
    code?: string;
}

export interface NavigationItem {
    id: AppTab;
    label: string;
    icon: LucideIcon;
}

export interface EducaProState {
    subjects: Subject[];
    students: Student[];
    classes: CourseClass[];
    materials: Material[];
    lessonPlans: LessonPlan[];
    activities: Activity[];
    agendaItems: AgendaItem[];
    attendanceSessions: AttendanceSession[];
}
