import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { createInitialEducaProState, studentStatusMeta } from '@/data/mockData';
import {
    Activity,
    ActivityDraft,
    ActivitySubmission,
    AgendaItem,
    AgendaItemDraft,
    AttendanceEntry,
    AttendanceSession,
    CourseClass,
    CourseClassDraft,
    EducaProState,
    LessonPlan,
    LessonPlanDraft,
    Material,
    MaterialDraft,
    Student,
    StudentDraft,
} from '@/types';

const STORAGE_KEY = 'educapro.prototype.state.v2';

interface EducaProContextValue {
    state: EducaProState;
    students: Student[];
    classes: CourseClass[];
    materials: Material[];
    lessonPlans: LessonPlan[];
    activities: Activity[];
    agendaItems: AgendaItem[];
    attendanceSessions: AttendanceSession[];
    saveStudent: (draft: StudentDraft, studentId?: number) => Promise<Student>;
    saveClass: (draft: CourseClassDraft, classId?: number) => Promise<CourseClass>;
    saveLessonPlan: (draft: LessonPlanDraft, planId?: number) => Promise<LessonPlan>;
    duplicateLessonPlan: (planId: number) => Promise<LessonPlan | null>;
    saveMaterial: (draft: MaterialDraft, materialId?: number) => Promise<Material>;
    toggleMaterialFavorite: (materialId: number) => void;
    saveActivity: (draft: ActivityDraft, activityId?: number) => Promise<Activity>;
    saveActivitySubmission: (activityId: number, submission: ActivitySubmission) => void;
    saveAgendaItem: (draft: AgendaItemDraft, itemId?: number) => Promise<AgendaItem>;
    removeAgendaItem: (itemId: number) => void;
    saveAttendanceSession: (classId: number, date: string, entries: AttendanceEntry[]) => Promise<AttendanceSession>;
    getClassById: (classId: number | null | undefined) => CourseClass | undefined;
    getStudentById: (studentId: number) => Student | undefined;
    getStudentsForClass: (classId: number) => Student[];
    getMaterialsForPlan: (plan: LessonPlan) => Material[];
    getActivitiesForClass: (classId: number) => Activity[];
    getAttendanceForClass: (classId: number) => AttendanceSession[];
}

const EducaProContext = createContext<EducaProContextValue | undefined>(undefined);

function buildInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function nextId<T extends { id: number }>(items: T[]) {
    return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}

function upsertById<T extends { id: number }>(items: T[], item: T) {
    return items.some((entry) => entry.id === item.id) ? items.map((entry) => (entry.id === item.id ? item : entry)) : [...items, item];
}

export function EducaProProvider({ children }: PropsWithChildren) {
    const [state, setState] = useState<EducaProState>(() => {
        if (typeof window === 'undefined') {
            return createInitialEducaProState();
        }

        const persisted = window.localStorage.getItem(STORAGE_KEY);

        if (!persisted) {
            return createInitialEducaProState();
        }

        try {
            return JSON.parse(persisted) as EducaProState;
        } catch {
            return createInitialEducaProState();
        }
    });

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const value = useMemo<EducaProContextValue>(() => {
        const saveStudent = async (draft: StudentDraft, studentId?: number) => {
            const student: Student = {
                id: studentId ?? nextId(state.students),
                initials: buildInitials(draft.name),
                color: studentStatusMeta[draft.status].color,
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                students: upsertById(previous.students, student),
                classes: previous.classes.map((courseClass) => ({
                    ...courseClass,
                    studentIds: draft.classIds.includes(courseClass.id)
                        ? Array.from(new Set([...courseClass.studentIds.filter((id) => id !== student.id), student.id]))
                        : courseClass.studentIds.filter((id) => id !== student.id),
                })),
            }));

            return student;
        };

        const saveClass = async (draft: CourseClassDraft, classId?: number) => {
            const courseClass: CourseClass = {
                id: classId ?? nextId(state.classes),
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                classes: upsertById(previous.classes, courseClass),
                students: previous.students.map((student) => ({
                    ...student,
                    classIds: draft.studentIds.includes(student.id)
                        ? Array.from(new Set([...student.classIds.filter((id) => id !== courseClass.id), courseClass.id]))
                        : student.classIds.filter((id) => id !== courseClass.id),
                })),
            }));

            return courseClass;
        };

        const saveLessonPlan = async (draft: LessonPlanDraft, planId?: number) => {
            const lessonPlan: LessonPlan = {
                id: planId ?? nextId(state.lessonPlans),
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                lessonPlans: upsertById(previous.lessonPlans, lessonPlan),
            }));

            return lessonPlan;
        };

        const duplicateLessonPlan = async (planId: number) => {
            const existing = state.lessonPlans.find((plan) => plan.id === planId);

            if (!existing) {
                return null;
            }

            const duplicated: LessonPlan = {
                ...existing,
                id: nextId(state.lessonPlans),
                status: 'draft',
                topic: `${existing.topic} (Copia)`,
            };

            setState((previous) => ({
                ...previous,
                lessonPlans: [...previous.lessonPlans, duplicated],
            }));

            return duplicated;
        };

        const saveMaterial = async (draft: MaterialDraft, materialId?: number) => {
            const material: Material = {
                id: materialId ?? nextId(state.materials),
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                materials: upsertById(previous.materials, material),
            }));

            return material;
        };

        const toggleMaterialFavorite = (materialId: number) => {
            setState((previous) => ({
                ...previous,
                materials: previous.materials.map((material) =>
                    material.id === materialId ? { ...material, isFavorite: !material.isFavorite } : material,
                ),
            }));
        };

        const saveActivity = async (draft: ActivityDraft, activityId?: number) => {
            const existing = state.activities.find((activity) => activity.id === activityId);
            const classId = draft.classId;
            const relatedStudents = classId !== null ? state.students.filter((student) => student.classIds.includes(classId)) : [];
            const activity: Activity = {
                id: activityId ?? nextId(state.activities),
                submissions:
                    existing?.submissions ??
                    relatedStudents.map((student) => ({
                        studentId: student.id,
                        status: 'pending',
                        feedback: '',
                        grade: '',
                    })),
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                activities: upsertById(previous.activities, activity),
            }));

            return activity;
        };

        const saveActivitySubmission = (activityId: number, submission: ActivitySubmission) => {
            setState((previous) => ({
                ...previous,
                activities: previous.activities.map((activity) => {
                    if (activity.id !== activityId) {
                        return activity;
                    }

                    const submissions = activity.submissions.some((entry) => entry.studentId === submission.studentId)
                        ? activity.submissions.map((entry) => (entry.studentId === submission.studentId ? submission : entry))
                        : [...activity.submissions, submission];

                    const gradedCount = submissions.filter((entry) => entry.status === 'graded').length;
                    const submittedCount = submissions.filter((entry) => entry.status === 'submitted').length;

                    return {
                        ...activity,
                        submissions,
                        status: gradedCount === submissions.length ? 'completed' : submittedCount > 0 || gradedCount > 0 ? 'grading' : 'pending',
                    };
                }),
            }));
        };

        const saveAgendaItem = async (draft: AgendaItemDraft, itemId?: number) => {
            const item: AgendaItem = {
                id: itemId ?? nextId(state.agendaItems),
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                agendaItems: upsertById(previous.agendaItems, item),
            }));

            return item;
        };

        const removeAgendaItem = (itemId: number) => {
            setState((previous) => ({
                ...previous,
                agendaItems: previous.agendaItems.filter((item) => item.id !== itemId),
            }));
        };

        const saveAttendanceSession = async (classId: number, date: string, entries: AttendanceEntry[]) => {
            const existing = state.attendanceSessions.find((session) => session.classId === classId && session.date === date);
            const session: AttendanceSession = {
                id: existing?.id ?? nextId(state.attendanceSessions),
                classId,
                date,
                entries,
            };

            const updatedStudents = state.students.map((student) => {
                if (!entries.some((entry) => entry.studentId === student.id)) {
                    return student;
                }

                const sessionsForStudent = state.attendanceSessions
                    .filter((entry) => entry.classId === classId && entry.id !== existing?.id)
                    .flatMap((entry) => entry.entries.filter((item) => item.studentId === student.id));
                const allEntries = [...sessionsForStudent, ...entries.filter((entry) => entry.studentId === student.id)];
                const positiveEntries = allEntries.filter((entry) => entry.status === 'present' || entry.status === 'late' || entry.status === 'justified').length;

                return {
                    ...student,
                    attendanceRate: allEntries.length ? Math.round((positiveEntries / allEntries.length) * 100) : student.attendanceRate,
                };
            });

            setState((previous) => ({
                ...previous,
                attendanceSessions: upsertById(previous.attendanceSessions, session),
                students: updatedStudents,
            }));

            return session;
        };

        const getClassById = (classId: number | null | undefined) => state.classes.find((courseClass) => courseClass.id === classId);
        const getStudentById = (studentId: number) => state.students.find((student) => student.id === studentId);
        const getStudentsForClass = (classId: number) => state.students.filter((student) => student.classIds.includes(classId));
        const getMaterialsForPlan = (plan: LessonPlan) => state.materials.filter((material) => plan.materialIds.includes(material.id));
        const getActivitiesForClass = (classId: number) => state.activities.filter((activity) => activity.classId === classId);
        const getAttendanceForClass = (classId: number) => state.attendanceSessions.filter((session) => session.classId === classId);

        return {
            state,
            students: state.students,
            classes: state.classes,
            materials: state.materials,
            lessonPlans: state.lessonPlans,
            activities: state.activities,
            agendaItems: state.agendaItems,
            attendanceSessions: state.attendanceSessions,
            saveStudent,
            saveClass,
            saveLessonPlan,
            duplicateLessonPlan,
            saveMaterial,
            toggleMaterialFavorite,
            saveActivity,
            saveActivitySubmission,
            saveAgendaItem,
            removeAgendaItem,
            saveAttendanceSession,
            getClassById,
            getStudentById,
            getStudentsForClass,
            getMaterialsForPlan,
            getActivitiesForClass,
            getAttendanceForClass,
        };
    }, [state]);

    return <EducaProContext.Provider value={value}>{children}</EducaProContext.Provider>;
}

export function useEducaPro() {
    const context = useContext(EducaProContext);

    if (!context) {
        throw new Error('useEducaPro must be used within EducaProProvider.');
    }

    return context;
}
