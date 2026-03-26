import { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import LessonPlanCard from '@/Components/Features/LessonPlans/LessonPlanCard';
import LessonPlanQuickEditor from '@/Components/Features/LessonPlans/LessonPlanQuickEditor';
import { EmptyState } from '@/Components/UI/EmptyState';
import { useEducaPro } from '@/hooks/useEducaPro';
import { LessonPlanDraft } from '@/types';

const emptyPlanDraft: LessonPlanDraft = {
    date: '2026-10-16',
    classId: null,
    topic: '',
    status: 'draft',
    objectives: [''],
    content: [''],
    materialIds: [],
    homework: '',
    notes: '',
};

export default function LessonPlansPage() {
    const { lessonPlans, classes, materials, saveLessonPlan, duplicateLessonPlan } = useEducaPro();
    const [selectedPlanId, setSelectedPlanId] = useState<number | null>(lessonPlans[0]?.id ?? null);
    const [draft, setDraft] = useState<LessonPlanDraft>(emptyPlanDraft);
    const [isSaving, setIsSaving] = useState(false);

    const selectedPlan = useMemo(() => lessonPlans.find((plan) => plan.id === selectedPlanId) ?? null, [lessonPlans, selectedPlanId]);

    useEffect(() => {
        if (!selectedPlan) {
            setDraft(emptyPlanDraft);
            return;
        }

        setDraft({
            date: selectedPlan.date,
            classId: selectedPlan.classId,
            topic: selectedPlan.topic,
            status: selectedPlan.status,
            objectives: selectedPlan.objectives,
            content: selectedPlan.content,
            materialIds: selectedPlan.materialIds,
            homework: selectedPlan.homework,
            notes: selectedPlan.notes,
        });
    }, [selectedPlan]);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
        const plan = await saveLessonPlan(draft, selectedPlanId ?? undefined);
        setSelectedPlanId(plan.id);
        setIsSaving(false);
    };

    const handleDuplicate = async () => {
        if (!selectedPlanId) {
            return;
        }

        const duplicated = await duplicateLessonPlan(selectedPlanId);

        if (duplicated) {
            setSelectedPlanId(duplicated.id);
        }
    };

    const openBlankPlan = () => {
        setSelectedPlanId(null);
        setDraft(emptyPlanDraft);
    };

    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Plano de aulas</h1>
                    <p className="mt-1 text-slate-500">Crie, edite, duplique e organize seus planos com materiais e homework.</p>
                </div>
                <button onClick={openBlankPlan} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                    <Plus size={18} /> Novo plano
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    {lessonPlans.length ? (
                        lessonPlans.map((plan) => (
                            <LessonPlanCard
                                key={plan.id}
                                plan={plan}
                                classLabel={classes.find((courseClass) => courseClass.id === plan.classId)?.name ?? 'Sem turma'}
                                onSelect={() => setSelectedPlanId(plan.id)}
                                onDuplicate={() => {
                                    setSelectedPlanId(plan.id);
                                    void handleDuplicate();
                                }}
                            />
                        ))
                    ) : (
                        <EmptyState
                            title="Nenhum plano criado"
                            description="Comece criando o primeiro plano para organizar objetivos, conteudo e homework."
                            action={
                                <button onClick={openBlankPlan} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                                    Criar plano
                                </button>
                            }
                        />
                    )}
                </div>

                <LessonPlanQuickEditor
                    title={selectedPlan ? selectedPlan.topic : 'Novo plano'}
                    subtitle={selectedPlan ? 'Edite detalhes, materiais e homework da aula selecionada.' : 'Monte um plano novo sem sair da pagina.'}
                    onDuplicate={() => void handleDuplicate()}
                    onSave={() => void handleSave()}
                >
                    <div className="space-y-4">
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">Topico</span>
                            <input value={draft.topic} onChange={(event) => setDraft({ ...draft, topic: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </label>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-slate-700">Data</span>
                                <input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-slate-700">Status</span>
                                <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as LessonPlanDraft['status'] })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                                    <option value="draft">Rascunho</option>
                                    <option value="planned">Planejado</option>
                                    <option value="completed">Concluido</option>
                                </select>
                            </label>
                        </div>
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">Turma</span>
                            <select value={draft.classId ?? ''} onChange={(event) => setDraft({ ...draft, classId: event.target.value ? Number(event.target.value) : null })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                                <option value="">Selecione uma turma</option>
                                {classes.map((courseClass) => (
                                    <option key={courseClass.id} value={courseClass.id}>
                                        {courseClass.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <ArrayField label="Objetivos" items={draft.objectives} onChange={(items) => setDraft({ ...draft, objectives: items })} />
                        <ArrayField label="Conteudo da aula" items={draft.content} onChange={(items) => setDraft({ ...draft, content: items })} />
                        <div className="space-y-3">
                            <span className="text-sm font-medium text-slate-700">Materiais necessarios</span>
                            <div className="space-y-2">
                                {materials.map((material) => (
                                    <label key={material.id} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600">
                                        <input
                                            type="checkbox"
                                            checked={draft.materialIds.includes(material.id)}
                                            onChange={(event) =>
                                                setDraft({
                                                    ...draft,
                                                    materialIds: event.target.checked
                                                        ? [...draft.materialIds, material.id]
                                                        : draft.materialIds.filter((id) => id !== material.id),
                                                })
                                            }
                                        />
                                        <span>{material.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">Homework planejado</span>
                            <textarea value={draft.homework} onChange={(event) => setDraft({ ...draft, homework: event.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </label>
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-slate-700">Notas da professora</span>
                            <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} rows={3} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                        </label>
                        {isSaving ? <p className="text-sm text-indigo-600">Salvando plano...</p> : null}
                    </div>
                </LessonPlanQuickEditor>
            </div>
        </div>
    );
}

function ArrayField({
    label,
    items,
    onChange,
}: {
    label: string;
    items: string[];
    onChange: (items: string[]) => void;
}) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{label}</span>
                <button onClick={() => onChange([...items, ''])} className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700">
                    Adicionar
                </button>
            </div>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={`${label}-${index}`} className="flex gap-2">
                        <input
                            value={item}
                            onChange={(event) => onChange(items.map((entry, itemIndex) => (itemIndex === index ? event.target.value : entry)))}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <button onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50">
                            Remover
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
