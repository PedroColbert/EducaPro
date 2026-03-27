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
    Subject,
} from '@/types';

const STORAGE_KEY = 'educapro.prototype.state.v4';

interface EducaProContextValue {
    state: EducaProState;
    subjects: Subject[];
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
            const existingStudent = studentId ? state.students.find((student) => student.id === studentId) : undefined;
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
                    studentIds:
                        draft.classIds.includes(courseClass.id)
                            ? Array.from(new Set([...courseClass.studentIds, student.id]))
                            : existingStudent?.classIds.includes(courseClass.id)
                              ? courseClass.studentIds.filter((id) => id !== student.id)
                              : courseClass.studentIds,
                })),
            }));

            return student;
        };

        const saveClass = async (draft: CourseClassDraft, classId?: number) => {
            const existingClass = classId ? state.classes.find((courseClass) => courseClass.id === classId) : undefined;
            const courseClass: CourseClass = {
                id: classId ?? nextId(state.classes),
                ...draft,
            };

            setState((previous) => ({
                ...previous,
                classes: upsertById(previous.classes, courseClass),
                students: previous.students.map((student) => ({
                    ...student,
                    classIds:
                        draft.studentIds.includes(student.id)
                            ? Array.from(new Set([...student.classIds, courseClass.id]))
                            : existingClass?.studentIds.includes(student.id)
                              ? student.classIds.filter((id) => id !== courseClass.id)
                              : student.classIds,
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

            let duplicated: LessonPlan | null = null;

            setState((previous) => ({
                ...(() => {
                    duplicated = {
                        ...existing,
                        id: nextId(previous.lessonPlans),
                        status: 'draft',
                        topic: `${existing.topic} (Copia)`,
                    };

                    return previous;
                })(),
                ...previous,
                lessonPlans: duplicated ? [...previous.lessonPlans, duplicated] : previous.lessonPlans,
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
            let activity: Activity | null = null;

            setState((previous) => ({
                ...(() => {
                    const existing = activityId ? previous.activities.find((entry) => entry.id === activityId) : undefined;
                    const relatedStudents =
                        draft.classId !== null ? previous.students.filter((student) => student.classIds.includes(draft.classId as number)) : [];
                    const existingMap = new Map((existing?.submissions ?? []).map((submission) => [submission.studentId, submission]));
                    const submissions: ActivitySubmission[] = relatedStudents.map((student) => {
                        const persisted = existingMap.get(student.id);

                        return (
                            persisted ?? {
                                studentId: student.id,
                                status: 'pending',
                                feedback: '',
                                grade: '',
                            }
                        );
                    });

                    const createdActivity: Activity = {
                        id: activityId ?? nextId(previous.activities),
                        ...draft,
                        submissions: draft.classId === null ? existing?.submissions ?? [] : submissions,
                    };
                    activity = createdActivity;

                    return previous;
                })(),
                ...previous,
                activities: activity ? upsertById(previous.activities, activity) : previous.activities,
            }));

            if (!activity) {
                throw new Error('Nao foi possivel salvar a atividade.');
            }

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

            setState((previous) => ({
                ...(() => {
                    const previousSessions = upsertById(previous.attendanceSessions, session);
                    const updatedStudents = previous.students.map((student) => {
                        const studentEntries = previousSessions
                            .filter((entry) => entry.classId === classId)
                            .flatMap((entry) => entry.entries.filter((item) => item.studentId === student.id));

                        if (!studentEntries.length) {
                            return student;
                        }

                        const positiveEntries = studentEntries.filter(
                            (entry) => entry.status === 'present' || entry.status === 'late' || entry.status === 'justified',
                        ).length;

                        return {
                            ...student,
                            attendanceRate: Math.round((positiveEntries / studentEntries.length) * 100),
                        };
                    });

                    return {
                        ...previous,
                        attendanceSessions: previousSessions,
                        students: updatedStudents,
                    };
                })(),
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
            subjects: state.subjects,
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
