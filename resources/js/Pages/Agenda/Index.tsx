import { useMemo, useState } from 'react';
import { ArrowLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';

import AgendaDayColumn from '@/Components/Features/Agenda/AgendaDayColumn';
import { ModalShell } from '@/Components/UI/ModalShell';
import { agendaTypeMeta } from '@/data/mockData';
import { useEducaPro } from '@/hooks/useEducaPro';
import { AgendaItem, AgendaItemDraft } from '@/types';

const emptyAgendaDraft: AgendaItemDraft = {
    title: '',
    type: 'reminder',
    startsAt: '2026-10-12T09:00',
    endsAt: '2026-10-12T10:00',
    classId: null,
    location: '',
    notes: '',
};

const weekDays = ['segunda-feira', 'terca-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira'];
const colorMap = {
    indigo: 'bg-indigo-50 border-indigo-500 text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-500 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    blue: 'bg-blue-50 border-blue-500 text-blue-700',
};

export default function AgendaPage() {
    const { agendaItems, classes, saveAgendaItem, removeAgendaItem } = useEducaPro();
    const [selectedItem, setSelectedItem] = useState<AgendaItem | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [draft, setDraft] = useState<AgendaItemDraft>(emptyAgendaDraft);
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [weekStart, setWeekStart] = useState(() => getInitialWeekStart(agendaItems));

    const agendaByDay = useMemo(() => {
        return weekDays.map((weekDay, index) => {
            const date = addDays(weekStart, index);
            const slots = agendaItems
                .filter((item) => isSameDay(new Date(item.startsAt), date))
                .sort((left, right) => left.startsAt.localeCompare(right.startsAt))
                .map((item) => ({
                    item,
                    colorClasses: colorMap[agendaTypeMeta[item.type].color as keyof typeof colorMap],
                }));

            return {
                day: weekDay.replace('-feira', '').replace('terca', 'Terca').replace('segunda', 'Segunda').replace('quarta', 'Quarta').replace('quinta', 'Quinta').replace('sexta', 'Sexta'),
                date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
                isoDate: toIsoDate(date),
                slots,
            };
        });
    }, [agendaItems, weekStart]);

    const openCreate = (isoDay?: string) => {
        setEditingItemId(null);
        setDraft(
            isoDay
                ? {
                      ...emptyAgendaDraft,
                      startsAt: `${isoDay}T09:00`,
                      endsAt: `${isoDay}T10:00`,
                  }
                : emptyAgendaDraft,
        );
        setIsFormOpen(true);
    };

    const openEdit = (item: AgendaItem) => {
        setSelectedItem(item);
        setEditingItemId(item.id);
        setDraft({
            title: item.title,
            type: item.type,
            startsAt: item.startsAt.slice(0, 16),
            endsAt: item.endsAt.slice(0, 16),
            classId: item.classId,
            location: item.location,
            notes: item.notes,
        });
        setIsFormOpen(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 200));
        await saveAgendaItem(draft, editingItemId ?? undefined);
        setIsSaving(false);
        setIsFormOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div className="animate-in space-y-6 fade-in duration-500">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Sua semana</h1>
                        <p className="mt-1 text-slate-500">Adicione aulas, lembretes, reunioes e blocos de correcao com uma agenda visual.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setWeekStart((current) => addDays(current, -7))}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">
                            {weekLabel(weekStart)}
                        </span>
                        <button
                            type="button"
                            onClick={() => setWeekStart((current) => addDays(current, 7))}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button onClick={() => openCreate()} className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                            <Plus size={16} /> Novo item
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                    {agendaByDay.map((day, index) => (
                        <AgendaDayColumn
                            key={day.day}
                            day={day.day}
                            date={day.date}
                            slots={day.slots}
                            onAdd={() => openCreate(day.isoDate)}
                            onSelect={openEdit}
                        />
                    ))}
                </div>
            </div>

            <ModalShell
                open={isFormOpen}
                title={editingItemId ? 'Editar item da agenda' : 'Novo item da agenda'}
                description="Organize blocos da semana com tipo, horario e local."
                onClose={() => setIsFormOpen(false)}
                footer={
                    <div className="flex items-center justify-between">
                        <div>
                            {editingItemId ? (
                                <button
                                    onClick={() => {
                                        removeAgendaItem(editingItemId);
                                        setIsFormOpen(false);
                                        setSelectedItem(null);
                                    }}
                                    className="flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                >
                                    <Trash2 size={16} /> Remover
                                </button>
                            ) : null}
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setIsFormOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                                Cancelar
                            </button>
                            <button onClick={handleSave} disabled={!draft.title || isSaving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400">
                                {isSaving ? 'Salvando...' : editingItemId ? 'Salvar item' : 'Criar item'}
                            </button>
                        </div>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Titulo</span>
                        <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Tipo</span>
                        <select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as AgendaItemDraft['type'] })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            {Object.entries(agendaTypeMeta).map(([key, meta]) => (
                                <option key={key} value={key}>
                                    {meta.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Turma vinculada</span>
                        <select value={draft.classId ?? ''} onChange={(event) => setDraft({ ...draft, classId: event.target.value ? Number(event.target.value) : null })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option value="">Sem turma</option>
                            {classes.map((courseClass) => (
                                <option key={courseClass.id} value={courseClass.id}>
                                    {courseClass.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Inicio</span>
                        <input type="datetime-local" value={draft.startsAt} onChange={(event) => setDraft({ ...draft, startsAt: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Fim</span>
                        <input type="datetime-local" value={draft.endsAt} onChange={(event) => setDraft({ ...draft, endsAt: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Local</span>
                        <input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Notas</span>
                        <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                </div>
            </ModalShell>
        </>
    );
}

function getInitialWeekStart(items: AgendaItem[]) {
    const seedDate = items.length ? new Date(items[0].startsAt) : new Date();
    return startOfWeek(seedDate);
}

function startOfWeek(date: Date) {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    const day = normalized.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    normalized.setDate(normalized.getDate() + diff);
    return normalized;
}

function addDays(date: Date, days: number) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
}

function isSameDay(left: Date, right: Date) {
    return (
        left.getFullYear() === right.getFullYear() &&
        left.getMonth() === right.getMonth() &&
        left.getDate() === right.getDate()
    );
}

function toIsoDate(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function weekLabel(weekStart: Date) {
    const weekEnd = addDays(weekStart, 4);

    return `${weekStart.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} a ${weekEnd.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
    })}`;
}
