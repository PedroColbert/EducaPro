import { useMemo, useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';

import ClassCard from '@/Components/Features/Classes/ClassCard';
import { EmptyState } from '@/Components/UI/EmptyState';
import { ModalShell } from '@/Components/UI/ModalShell';
import { audienceTypeOptions, deliveryModeOptions } from '@/data/mockData';
import { useAppContext } from '@/hooks/useAppContext';
import { useEducaPro } from '@/hooks/useEducaPro';
import { AttendanceEntry, CourseClass, CourseClassDraft } from '@/types';

const emptyClassDraft: CourseClassDraft = {
    name: '',
    level: 'A2',
    subjectId: null,
    deliveryMode: 'in_person',
    audienceType: 'group',
    schedule: '',
    progress: 0,
    nextTopic: '',
    room: '',
    color: '#4f46e5',
    studentIds: [],
};

export default function ClassesPage() {
    const { appContext } = useAppContext();
    const { classes, students, subjects, getStudentsForClass, getActivitiesForClass, getAttendanceForClass, saveClass, saveAttendanceSession } = useEducaPro();
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
    const [editingClassId, setEditingClassId] = useState<number | null>(null);
    const [draft, setDraft] = useState<CourseClassDraft>(emptyClassDraft);
    const [attendanceDate, setAttendanceDate] = useState('2026-10-16');
    const [attendanceEntries, setAttendanceEntries] = useState<AttendanceEntry[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const selectedClass = useMemo(() => classes.find((courseClass) => courseClass.id === selectedClassId) ?? null, [classes, selectedClassId]);

    const openCreateForm = () => {
        setEditingClassId(null);
        setDraft(emptyClassDraft);
        setIsFormOpen(true);
    };

    const openEditForm = (courseClass: CourseClass) => {
        setEditingClassId(courseClass.id);
        setDraft({
            name: courseClass.name,
            level: courseClass.level,
            subjectId: courseClass.subjectId,
            deliveryMode: courseClass.deliveryMode,
            audienceType: courseClass.audienceType,
            schedule: courseClass.schedule,
            progress: courseClass.progress,
            nextTopic: courseClass.nextTopic,
            room: courseClass.room,
            color: courseClass.color,
            studentIds: courseClass.studentIds,
        });
        setIsFormOpen(true);
    };

    const openAttendance = (courseClass: CourseClass) => {
        const entries = getStudentsForClass(courseClass.id).map((student) => ({
            studentId: student.id,
            status: 'present' as const,
            note: '',
        }));
        setSelectedClassId(courseClass.id);
        setAttendanceEntries(entries);
        setIsAttendanceOpen(true);
    };

    const handleSaveClass = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
        const savedClass = await saveClass(draft, editingClassId ?? undefined);
        setSelectedClassId(savedClass.id);
        setIsSaving(false);
        setIsFormOpen(false);
    };

    const handleSaveAttendance = async () => {
        if (!selectedClass) {
            return;
        }

        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
        await saveAttendanceSession(selectedClass.id, attendanceDate, attendanceEntries);
        setIsSaving(false);
        setIsAttendanceOpen(false);
    };

    if (selectedClass) {
        const classStudents = getStudentsForClass(selectedClass.id);
        const classActivities = getActivitiesForClass(selectedClass.id);
        const classAttendance = getAttendanceForClass(selectedClass.id);
        const subject = subjects.find((item) => item.id === selectedClass.subjectId);

        return (
            <>
                <div className="animate-in space-y-6 fade-in duration-500">
                    <button onClick={() => setSelectedClassId(null)} className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600">
                        <ArrowLeft size={16} /> Voltar para turmas
                    </button>

                    <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div>
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="h-4 w-4 rounded-full" style={{ backgroundColor: selectedClass.color }} />
                                    <h1 className="text-3xl font-bold text-slate-800">{selectedClass.name}</h1>
                                </div>
                                <p className="text-sm text-slate-500">
                                    {subject?.name ?? 'Sem disciplina'} / {selectedClass.level} / {selectedClass.schedule} / {selectedClass.room}
                                </p>
                                <p className="mt-3 text-sm text-slate-600">Proximo topico: {selectedClass.nextTopic}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => openAttendance(selectedClass)} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                                    Fazer chamada
                                </button>
                                <button onClick={() => openEditForm(selectedClass)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                                    Editar turma
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-slate-800">Participantes vinculados</h2>
                                <span className="text-sm text-slate-500">{classStudents.length} estudantes</span>
                            </div>
                            <div className="space-y-3">
                                {classStudents.map((student) => (
                                    <div key={student.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                                        <div>
                                            <p className="font-medium text-slate-800">{student.name}</p>
                                            <p className="text-sm text-slate-500">
                                                {student.level} / {student.attendanceRate}% de frequencia
                                            </p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${student.color}`}>{student.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-800">Panorama rapido</h2>
                                <div className="mt-4 space-y-3 text-sm text-slate-600">
                                    <p>Progresso do periodo: {selectedClass.progress}%</p>
                                    <p>Modalidade: {deliveryModeOptions.find((item) => item.value === selectedClass.deliveryMode)?.label}</p>
                                    <p>Formato: {audienceTypeOptions.find((item) => item.value === selectedClass.audienceType)?.label}</p>
                                    <p>Atividades abertas: {classActivities.length}</p>
                                    <p>Chamadas registradas: {classAttendance.length}</p>
                                </div>
                            </div>
                            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-800">Ultimas chamadas</h2>
                                <div className="mt-4 space-y-3">
                                    {classAttendance.length ? (
                                        classAttendance.slice(-3).map((session) => (
                                            <div key={session.id} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                                {new Date(session.date).toLocaleDateString('pt-BR')} / {session.entries.length} registros
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-slate-500">Nenhuma chamada registrada ainda.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ClassFormModal
                    open={isFormOpen}
                    draft={draft}
                    students={students}
                    subjects={subjects}
                    editingClassId={editingClassId}
                    isSaving={isSaving}
                    onClose={() => setIsFormOpen(false)}
                    onChange={setDraft}
                    onSubmit={handleSaveClass}
                />

                <AttendanceModal
                    open={isAttendanceOpen}
                    courseClass={selectedClass}
                    students={classStudents}
                    attendanceDate={attendanceDate}
                    attendanceEntries={attendanceEntries}
                    isSaving={isSaving}
                    onClose={() => setIsAttendanceOpen(false)}
                    onDateChange={setAttendanceDate}
                    onChangeEntries={setAttendanceEntries}
                    onSubmit={handleSaveAttendance}
                />
            </>
        );
    }

    return (
        <>
            <div className="animate-in space-y-6 fade-in duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{appContext.labels.classes}</h1>
                        <p className="mt-1 text-slate-500">Gerencie grupos, atendimentos, alocacao de estudantes e registro de presenca.</p>
                    </div>
                    <button onClick={openCreateForm} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                        <Plus size={16} /> Nova turma
                    </button>
                </div>

                {classes.length ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {classes.map((courseClass) => (
                            <ClassCard
                                key={courseClass.id}
                                courseClass={courseClass}
                                subjectLabel={subjects.find((subject) => subject.id === courseClass.subjectId)?.name ?? 'Sem disciplina'}
                                studentCount={getStudentsForClass(courseClass.id).length}
                                onEdit={() => openEditForm(courseClass)}
                                onOpenDetails={() => setSelectedClassId(courseClass.id)}
                                onTakeAttendance={() => openAttendance(courseClass)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Nenhum grupo cadastrado"
                        description="Crie o primeiro grupo, turma ou atendimento para vincular estudantes, registrar presenca e acompanhar o periodo."
                        action={
                            <button onClick={openCreateForm} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                                Criar grupo
                            </button>
                        }
                    />
                )}
            </div>

            <ClassFormModal
                open={isFormOpen}
                draft={draft}
                students={students}
                subjects={subjects}
                editingClassId={editingClassId}
                isSaving={isSaving}
                onClose={() => setIsFormOpen(false)}
                onChange={setDraft}
                onSubmit={handleSaveClass}
            />

            {selectedClass ? (
                <AttendanceModal
                    open={isAttendanceOpen}
                    courseClass={selectedClass}
                    students={selectedClassId ? getStudentsForClass(selectedClassId) : []}
                    attendanceDate={attendanceDate}
                    attendanceEntries={attendanceEntries}
                    isSaving={isSaving}
                    onClose={() => setIsAttendanceOpen(false)}
                    onDateChange={setAttendanceDate}
                    onChangeEntries={setAttendanceEntries}
                    onSubmit={handleSaveAttendance}
                />
            ) : null}
        </>
    );
}

function ClassFormModal({
    open,
    draft,
    students,
    subjects,
    editingClassId,
    isSaving,
    onClose,
    onChange,
    onSubmit,
}: {
    open: boolean;
    draft: CourseClassDraft;
    students: ReturnType<typeof useEducaPro>['students'];
    subjects: ReturnType<typeof useEducaPro>['subjects'];
    editingClassId: number | null;
    isSaving: boolean;
    onClose: () => void;
    onChange: (draft: CourseClassDraft) => void;
    onSubmit: () => void;
}) {
    return (
        <ModalShell
            open={open}
            title={editingClassId ? 'Editar grupo' : 'Novo grupo'}
            description="Defina disciplina, modalidade, formato, progresso e participantes vinculados."
            onClose={onClose}
            footer={
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                        Cancelar
                    </button>
                    <button onClick={onSubmit} disabled={!draft.name || isSaving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400">
                        {isSaving ? 'Salvando...' : editingClassId ? 'Salvar grupo' : 'Criar grupo'}
                    </button>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Nome</span>
                    <input value={draft.name} onChange={(event) => onChange({ ...draft, name: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Nivel</span>
                    <input value={draft.level} onChange={(event) => onChange({ ...draft, level: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Disciplina</span>
                    <select value={draft.subjectId ?? ''} onChange={(event) => onChange({ ...draft, subjectId: event.target.value ? Number(event.target.value) : null })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                        <option value="">Selecione</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Modalidade</span>
                    <select value={draft.deliveryMode} onChange={(event) => onChange({ ...draft, deliveryMode: event.target.value as CourseClassDraft['deliveryMode'] })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                        {deliveryModeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Formato</span>
                    <select value={draft.audienceType} onChange={(event) => onChange({ ...draft, audienceType: event.target.value as CourseClassDraft['audienceType'] })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                        {audienceTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Horario</span>
                    <input value={draft.schedule} onChange={(event) => onChange({ ...draft, schedule: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Sala ou ambiente</span>
                    <input value={draft.room} onChange={(event) => onChange({ ...draft, room: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Progresso</span>
                    <input type="range" min={0} max={100} value={draft.progress} onChange={(event) => onChange({ ...draft, progress: Number(event.target.value) })} />
                    <p className="text-sm text-slate-500">{draft.progress}%</p>
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Proximo topico</span>
                    <input value={draft.nextTopic} onChange={(event) => onChange({ ...draft, nextTopic: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <div className="space-y-3 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Estudantes vinculados</span>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {students.map((student) => (
                            <label key={student.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={draft.studentIds.includes(student.id)}
                                    onChange={(event) =>
                                        onChange({
                                            ...draft,
                                            studentIds: event.target.checked
                                                ? [...draft.studentIds, student.id]
                                                : draft.studentIds.filter((id) => id !== student.id),
                                        })
                                    }
                                />
                                <span>{student.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </ModalShell>
    );
}

function AttendanceModal({
    open,
    courseClass,
    students,
    attendanceDate,
    attendanceEntries,
    isSaving,
    onClose,
    onDateChange,
    onChangeEntries,
    onSubmit,
}: {
    open: boolean;
    courseClass: CourseClass;
    students: ReturnType<typeof useEducaPro>['students'];
    attendanceDate: string;
    attendanceEntries: AttendanceEntry[];
    isSaving: boolean;
    onClose: () => void;
    onDateChange: (value: string) => void;
    onChangeEntries: (entries: AttendanceEntry[]) => void;
    onSubmit: () => void;
}) {
    const statusOptions: AttendanceEntry['status'][] = ['present', 'absent', 'late', 'justified'];

    return (
        <ModalShell
            open={open}
            title={`Chamada - ${courseClass.name}`}
            description="Registre presenca, atrasos e justificativas do grupo."
            onClose={onClose}
            footer={
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                        Fechar
                    </button>
                    <button onClick={onSubmit} disabled={isSaving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400">
                        {isSaving ? 'Salvando...' : 'Salvar chamada'}
                    </button>
                </div>
            }
        >
            <div className="space-y-4">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Data da aula</span>
                    <input type="date" value={attendanceDate} onChange={(event) => onDateChange(event.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                {students.map((student) => {
                    const entry = attendanceEntries.find((item) => item.studentId === student.id) ?? { studentId: student.id, status: 'present' as const, note: '' };

                    return (
                        <div key={student.id} className="rounded-2xl border border-slate-100 p-4">
                            <div className="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="font-medium text-slate-800">{student.name}</p>
                                    <p className="text-sm text-slate-500">{student.level}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {statusOptions.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() =>
                                                onChangeEntries(
                                                    attendanceEntries.map((item) =>
                                                        item.studentId === student.id ? { ...item, status } : item,
                                                    ),
                                                )
                                            }
                                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                                                entry.status === status ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                                            }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <input
                                value={entry.note}
                                onChange={(event) =>
                                    onChangeEntries(
                                        attendanceEntries.map((item) =>
                                            item.studentId === student.id ? { ...item, note: event.target.value } : item,
                                        ),
                                    )
                                }
                                placeholder="Observacao opcional"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>
                    );
                })}
            </div>
        </ModalShell>
    );
}
