import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import ActivityCard from '@/Components/Features/Activities/ActivityCard';
import Card from '@/Components/UI/Card';
import { EmptyState } from '@/Components/UI/EmptyState';
import { ModalShell } from '@/Components/UI/ModalShell';
import { useEducaPro } from '@/hooks/useEducaPro';
import { Activity, ActivityDraft, ActivitySubmission } from '@/types';

const emptyActivityDraft: ActivityDraft = {
    title: '',
    classId: null,
    deadline: '2026-10-16',
    status: 'pending',
    description: '',
    instructions: '',
};

export default function ActivitiesPage() {
    const { activities, classes, getStudentsForClass, getStudentById, saveActivity, saveActivitySubmission } = useEducaPro();
    const [activeTab, setActiveTab] = useState<'all' | 'grading' | 'pending' | 'completed'>('all');
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingActivityId, setEditingActivityId] = useState<number | null>(null);
    const [draft, setDraft] = useState<ActivityDraft>(emptyActivityDraft);
    const [isSaving, setIsSaving] = useState(false);

    const filteredActivities = useMemo(() => {
        if (activeTab === 'all') {
            return activities;
        }

        return activities.filter((activity) => activity.status === activeTab);
    }, [activeTab, activities]);

    const openCreateForm = () => {
        setEditingActivityId(null);
        setDraft(emptyActivityDraft);
        setIsFormOpen(true);
    };

    const openEditForm = (activity: Activity) => {
        setEditingActivityId(activity.id);
        setDraft({
            title: activity.title,
            classId: activity.classId,
            deadline: activity.deadline,
            status: activity.status,
            description: activity.description,
            instructions: activity.instructions,
        });
        setIsFormOpen(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
        await saveActivity(draft, editingActivityId ?? undefined);
        setIsSaving(false);
        setIsFormOpen(false);
    };

    const updateSubmission = (activityId: number, submission: ActivitySubmission) => {
        saveActivitySubmission(activityId, submission);
        setSelectedActivity((current) =>
            current
                ? {
                      ...current,
                      submissions: current.submissions.map((entry) => (entry.studentId === submission.studentId ? submission : entry)),
                  }
                : current,
        );
    };

    return (
        <>
            <div className="animate-in space-y-6 fade-in duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Atividades e homework</h1>
                        <p className="mt-1 text-slate-500">Crie tarefas, acompanhe entregas e registre notas e feedbacks por aluno.</p>
                    </div>
                    <button onClick={openCreateForm} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                        <Plus size={18} /> Nova atividade
                    </button>
                </div>

                <Card className="overflow-hidden p-0">
                    <div className="flex overflow-x-auto border-b border-slate-100">
                        {[
                            { key: 'all', label: `Todas (${activities.length})` },
                            { key: 'grading', label: `Para corrigir (${activities.filter((activity) => activity.status === 'grading').length})` },
                            { key: 'pending', label: `Pendentes (${activities.filter((activity) => activity.status === 'pending').length})` },
                            { key: 'completed', label: `Concluidas (${activities.filter((activity) => activity.status === 'completed').length})` },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className={`whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium ${
                                    activeTab === tab.key ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4 p-6">
                        {filteredActivities.length ? (
                            filteredActivities.map((activity) => {
                                const submitted = activity.submissions.filter((entry) => entry.status !== 'pending').length;
                                const classLabel = classes.find((courseClass) => courseClass.id === activity.classId)?.name ?? 'Sem turma';

                                return (
                                    <ActivityCard
                                        key={activity.id}
                                        activity={activity}
                                        classLabel={classLabel}
                                        submitted={submitted}
                                        total={activity.submissions.length}
                                        onOpen={() => setSelectedActivity(activity)}
                                        onEdit={() => openEditForm(activity)}
                                    />
                                );
                            })
                        ) : (
                            <EmptyState title="Nenhuma atividade neste filtro" description="Ajuste a visualizacao ou crie uma nova atividade para a turma." />
                        )}
                    </div>
                </Card>
            </div>

            <ModalShell
                open={isFormOpen}
                title={editingActivityId ? 'Editar atividade' : 'Nova atividade'}
                description="Defina turma, prazo, instrucoes e status inicial da atividade."
                onClose={() => setIsFormOpen(false)}
                footer={
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setIsFormOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                            Cancelar
                        </button>
                        <button onClick={handleSave} disabled={!draft.title || !draft.classId || isSaving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400">
                            {isSaving ? 'Salvando...' : editingActivityId ? 'Salvar atividade' : 'Criar atividade'}
                        </button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Titulo</span>
                        <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Turma</span>
                        <select value={draft.classId ?? ''} onChange={(event) => setDraft({ ...draft, classId: event.target.value ? Number(event.target.value) : null })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option value="">Selecione</option>
                            {classes.map((courseClass) => (
                                <option key={courseClass.id} value={courseClass.id}>
                                    {courseClass.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Prazo</span>
                        <input type="date" value={draft.deadline} onChange={(event) => setDraft({ ...draft, deadline: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Descricao</span>
                        <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Instrucoes</span>
                        <textarea value={draft.instructions} onChange={(event) => setDraft({ ...draft, instructions: event.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                </div>
            </ModalShell>

            <ModalShell
                open={Boolean(selectedActivity)}
                title={selectedActivity?.title ?? 'Detalhes da atividade'}
                description={selectedActivity ? classes.find((courseClass) => courseClass.id === selectedActivity.classId)?.name ?? 'Sem turma' : undefined}
                onClose={() => setSelectedActivity(null)}
            >
                {selectedActivity ? (
                    <div className="space-y-5">
                        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                            <p>{selectedActivity.description}</p>
                            <p className="mt-2">{selectedActivity.instructions}</p>
                        </div>
                        <div className="space-y-4">
                            {selectedActivity.submissions.map((submission) => {
                                const student = getStudentById(submission.studentId);

                                if (!student) {
                                    return null;
                                }

                                return (
                                    <div key={student.id} className="rounded-2xl border border-slate-100 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-slate-800">{student.name}</p>
                                                <p className="text-sm text-slate-500">{student.level}</p>
                                            </div>
                                            <select
                                                value={submission.status}
                                                onChange={(event) =>
                                                    updateSubmission(selectedActivity.id, { ...submission, status: event.target.value as ActivitySubmission['status'] })
                                                }
                                                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                                            >
                                                <option value="pending">Pendente</option>
                                                <option value="submitted">Entregue</option>
                                                <option value="graded">Corrigida</option>
                                            </select>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <input
                                                value={submission.grade}
                                                onChange={(event) => updateSubmission(selectedActivity.id, { ...submission, grade: event.target.value })}
                                                placeholder="Nota"
                                                className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                                            />
                                            <input
                                                value={submission.feedback}
                                                onChange={(event) => updateSubmission(selectedActivity.id, { ...submission, feedback: event.target.value })}
                                                placeholder="Feedback rapido"
                                                className="rounded-xl border border-slate-200 px-4 py-3 text-sm"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </ModalShell>
        </>
    );
}
