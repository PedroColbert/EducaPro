import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import StudentInfoCard from '@/Components/Features/Students/StudentInfoCard';
import StudentNotesCard from '@/Components/Features/Students/StudentNotesCard';
import StudentPerformanceCard from '@/Components/Features/Students/StudentPerformanceCard';
import StudentProfileHeader from '@/Components/Features/Students/StudentProfileHeader';
import StudentTable from '@/Components/Features/Students/StudentTable';
import StudentTasksCard from '@/Components/Features/Students/StudentTasksCard';
import { EmptyState } from '@/Components/UI/EmptyState';
import { ModalShell } from '@/Components/UI/ModalShell';
import { SearchInput } from '@/Components/UI/SearchInput';
import { studentStatusMeta } from '@/data/mockData';
import { useEducaPro } from '@/hooks/useEducaPro';
import { Student, StudentDraft } from '@/types';

const emptyStudentDraft: StudentDraft = {
    name: '',
    age: 12,
    level: 'A2',
    status: 'good',
    email: '',
    phone: '',
    notes: '',
    attendanceRate: 100,
    classIds: [],
};

export default function StudentsPage() {
    const { students, classes, activities, saveStudent } = useEducaPro();
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
    const [draft, setDraft] = useState<StudentDraft>(emptyStudentDraft);

    const selectedStudent = useMemo(
        () => students.find((student) => student.id === selectedStudentId) ?? null,
        [selectedStudentId, students],
    );

    const filteredStudents = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return students;
        }

        return students.filter((student) =>
            [student.name, student.email, student.level, classes.filter((item) => student.classIds.includes(item.id)).map((item) => item.name).join(' ')]
                .join(' ')
                .toLowerCase()
                .includes(term),
        );
    }, [classes, search, students]);

    const getClassLabel = (student: Student) => {
        const labels = classes.filter((courseClass) => student.classIds.includes(courseClass.id)).map((courseClass) => courseClass.name);
        return labels.length ? labels.join(', ') : 'Sem turma';
    };

    const getStudentTasks = (studentId: number) =>
        activities
            .map((activity) => {
                const submission = activity.submissions.find((entry) => entry.studentId === studentId);

                if (!submission) {
                    return null;
                }

                return {
                    activity,
                    grade: submission.grade,
                    isLate: submission.status === 'pending',
                    statusLabel:
                        submission.status === 'graded'
                            ? 'Corrigida recentemente'
                            : submission.status === 'submitted'
                              ? 'Enviada e aguardando correcao'
                              : 'Prazo aberto e ainda pendente',
                };
            })
            .filter(Boolean)
            .slice(0, 4) as { activity: (typeof activities)[number]; grade: string; isLate: boolean; statusLabel: string }[];

    const openCreateForm = () => {
        setEditingStudentId(null);
        setDraft(emptyStudentDraft);
        setIsFormOpen(true);
    };

    const openEditForm = (student: Student) => {
        setEditingStudentId(student.id);
        setDraft({
            name: student.name,
            age: student.age,
            level: student.level,
            status: student.status,
            email: student.email,
            phone: student.phone,
            notes: student.notes,
            attendanceRate: student.attendanceRate,
            classIds: student.classIds,
        });
        setIsFormOpen(true);
    };

    const handleSaveStudent = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
        const savedStudent = await saveStudent(draft, editingStudentId ?? undefined);
        setSelectedStudentId(savedStudent.id);
        setIsSaving(false);
        setIsFormOpen(false);
    };

    if (selectedStudent) {
        return (
            <>
                <div className="animate-in space-y-6 fade-in slide-in-from-bottom-4 duration-500">
                    <StudentProfileHeader
                        student={selectedStudent}
                        classLabel={getClassLabel(selectedStudent)}
                        onBack={() => setSelectedStudentId(null)}
                        onEdit={() => openEditForm(selectedStudent)}
                    />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-6">
                            <StudentInfoCard student={selectedStudent} />
                            <StudentNotesCard student={selectedStudent} onEdit={() => openEditForm(selectedStudent)} />
                        </div>

                        <div className="space-y-6 lg:col-span-2">
                            <StudentPerformanceCard student={selectedStudent} />
                            <StudentTasksCard tasks={getStudentTasks(selectedStudent.id)} />
                        </div>
                    </div>
                </div>

                <StudentFormModal
                    open={isFormOpen}
                    draft={draft}
                    classes={classes}
                    editingStudentId={editingStudentId}
                    isSaving={isSaving}
                    onClose={() => setIsFormOpen(false)}
                    onChange={setDraft}
                    onSubmit={handleSaveStudent}
                />
            </>
        );
    }

    return (
        <>
            <div className="animate-in space-y-6 fade-in duration-500">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Alunos</h1>
                        <p className="mt-1 text-slate-500">Crie, edite e acompanhe os alunos da sua rotina pedagogica.</p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <SearchInput placeholder="Buscar aluno..." value={search} onChange={setSearch} />
                        <button onClick={openCreateForm} className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
                            <Plus size={16} /> Novo aluno
                        </button>
                    </div>
                </div>

                {filteredStudents.length ? (
                    <StudentTable
                        students={filteredStudents}
                        onSelectStudent={(student) => setSelectedStudentId(student.id)}
                        onEditStudent={openEditForm}
                        getClassLabel={getClassLabel}
                    />
                ) : (
                    <EmptyState
                        title={students.length ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado'}
                        description={
                            students.length
                                ? 'Ajuste a busca para localizar um aluno ja existente.'
                                : 'Comece cadastrando o primeiro aluno para acompanhar presenca, status e observacoes.'
                        }
                        action={
                            <button onClick={openCreateForm} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                                Adicionar aluno
                            </button>
                        }
                    />
                )}
            </div>

            <StudentFormModal
                open={isFormOpen}
                draft={draft}
                classes={classes}
                editingStudentId={editingStudentId}
                isSaving={isSaving}
                onClose={() => setIsFormOpen(false)}
                onChange={setDraft}
                onSubmit={handleSaveStudent}
            />
        </>
    );
}

function StudentFormModal({
    open,
    draft,
    classes,
    editingStudentId,
    isSaving,
    onClose,
    onChange,
    onSubmit,
}: {
    open: boolean;
    draft: StudentDraft;
    classes: ReturnType<typeof useEducaPro>['classes'];
    editingStudentId: number | null;
    isSaving: boolean;
    onClose: () => void;
    onChange: (draft: StudentDraft) => void;
    onSubmit: () => void;
}) {
    return (
        <ModalShell
            open={open}
            title={editingStudentId ? 'Editar aluno' : 'Novo aluno'}
            description="Atualize dados essenciais, status pedagogico e vinculo com turma."
            onClose={onClose}
            footer={
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                        Cancelar
                    </button>
                    <button onClick={onSubmit} disabled={!draft.name || !draft.email || isSaving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400">
                        {isSaving ? 'Salvando...' : editingStudentId ? 'Salvar alteracoes' : 'Criar aluno'}
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
                    <span className="text-sm font-medium text-slate-700">Idade</span>
                    <input type="number" min={4} value={draft.age} onChange={(event) => onChange({ ...draft, age: Number(event.target.value) })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Nivel</span>
                    <input value={draft.level} onChange={(event) => onChange({ ...draft, level: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Status</span>
                    <select value={draft.status} onChange={(event) => onChange({ ...draft, status: event.target.value as StudentDraft['status'] })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                        {Object.entries(studentStatusMeta).map(([key, meta]) => (
                            <option key={key} value={key}>
                                {meta.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input type="email" value={draft.email} onChange={(event) => onChange({ ...draft, email: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Telefone</span>
                    <input value={draft.phone} onChange={(event) => onChange({ ...draft, phone: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
                <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Frequencia visivel</span>
                    <input type="range" min={0} max={100} value={draft.attendanceRate} onChange={(event) => onChange({ ...draft, attendanceRate: Number(event.target.value) })} />
                    <p className="text-sm text-slate-500">{draft.attendanceRate}%</p>
                </label>
                <div className="space-y-3 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Turmas vinculadas</span>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {classes.map((courseClass) => (
                            <label key={courseClass.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={draft.classIds.includes(courseClass.id)}
                                    onChange={(event) =>
                                        onChange({
                                            ...draft,
                                            classIds: event.target.checked
                                                ? [...draft.classIds, courseClass.id]
                                                : draft.classIds.filter((id) => id !== courseClass.id),
                                        })
                                    }
                                />
                                <span>{courseClass.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <label className="space-y-2 md:col-span-2">
                    <span className="text-sm font-medium text-slate-700">Observacoes pedagogicas</span>
                    <textarea value={draft.notes} onChange={(event) => onChange({ ...draft, notes: event.target.value })} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                </label>
            </div>
        </ModalShell>
    );
}
