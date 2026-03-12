export type StatusTone = 'excellent' | 'good' | 'attention';

export interface PaginationLink {
    active: boolean;
    label: string;
    url: string | null;
}

export interface Paginated<T> {
    data: T[];
    links: PaginationLink[];
    total: number;
}

export interface SharedPageProps {
    [key: string]: unknown;
    app: { name: string };
    auth: { user: User | null };
}

export interface User {
    id: number;
    name: string;
    email: string;
    timezone: string;
    locale: string;
    teaching_focus?: string | null;
}

export interface SchoolClass {
    id: number;
    name: string;
    level: string;
    schedule_description?: string | null;
    color: string;
    progress: number;
    students_count?: number;
}

export interface Student {
    id: number;
    name: string;
    age?: number | null;
    level: string;
    email_contact?: string | null;
    phone_contact?: string | null;
    status: StatusTone;
    notes?: string | null;
    school_classes?: SchoolClass[];
    pedagogical_notes?: PedagogicalNote[];
    evaluations?: Evaluation[];
    assignment_submissions?: AssignmentSubmission[];
    attendances?: Attendance[];
}

export interface Attendance {
    id: number;
    status: 'present' | 'absent' | 'late' | 'excused';
    observation?: string | null;
    student?: Pick<Student, 'id' | 'name'>;
    lesson_record?: LessonRecord;
}

export interface LessonPlan {
    id: number;
    planned_for: string;
    topic: string;
    objectives?: string[] | null;
    content?: string[] | null;
    status: 'draft' | 'planned' | 'completed';
    school_class?: SchoolClass;
    materials?: Material[];
}

export interface LessonRecord {
    id: number;
    taught_on: string;
    topic_taught: string;
    participation_level?: string | null;
    difficulties_noted?: string | null;
    general_notes?: string | null;
    school_class?: SchoolClass;
    lesson_plan?: Pick<LessonPlan, 'id' | 'topic'>;
}

export interface Assignment {
    id: number;
    title: string;
    description?: string | null;
    due_date?: string | null;
    status: 'draft' | 'assigned' | 'reviewing' | 'completed';
    school_class?: SchoolClass | null;
    student?: Pick<Student, 'id' | 'name'> | null;
    submissions?: AssignmentSubmission[];
}

export interface AssignmentSubmission {
    id: number;
    status: 'pending' | 'submitted' | 'graded';
    grade?: number | null;
    teacher_feedback?: string | null;
    student?: Pick<Student, 'id' | 'name'>;
    assignment?: Pick<Assignment, 'id' | 'title' | 'due_date' | 'status'>;
}

export interface Material {
    id: number;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'doc';
    category: string;
    level?: string | null;
    file_path_or_url: string;
    is_favorite: boolean;
}

export interface Evaluation {
    id: number;
    title: string;
    skill: string;
    score: number;
    feedback?: string | null;
    evaluated_at: string;
}

export interface PedagogicalNote {
    id: number;
    note: string;
    category: string;
    noted_at: string;
}

export interface AgendaItem {
    id: number;
    title: string;
    starts_at: string;
    ends_at?: string | null;
    type: 'class' | 'correction' | 'reminder' | 'meeting' | 'planning';
    is_completed: boolean;
    school_class?: Pick<SchoolClass, 'id' | 'name' | 'color'> | null;
}
