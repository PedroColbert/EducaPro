import { Plus } from 'lucide-react';

import { AgendaItem } from '@/types';

export default function AgendaDayColumn({
    day,
    date,
    slots,
    onAdd,
    onSelect,
}: {
    day: string;
    date: string;
    slots: { item: AgendaItem; colorClasses: string }[];
    onAdd: () => void;
    onSelect: (item: AgendaItem) => void;
}) {
    return (
        <div className="flex flex-col space-y-3">
            <div className="rounded-xl bg-slate-100 p-3 text-center">
                <h3 className="font-bold text-slate-700">{day}</h3>
                <span className="text-xs text-slate-500">{date}</span>
            </div>

            {slots.map(({ item, colorClasses }) => (
                <button
                    key={item.id}
                    className={`rounded-lg border-l-4 p-3 text-left shadow-sm transition hover:-translate-y-0.5 ${colorClasses}`}
                    onClick={() => onSelect(item)}
                >
                    <p className="mb-1 text-xs font-semibold">
                        {new Date(item.startsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} -{' '}
                        {new Date(item.endsAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm leading-tight font-bold text-slate-800">{item.title}</p>
                    {item.location ? <p className="mt-1 text-xs text-slate-500">{item.location}</p> : null}
                </button>
            ))}

            <button onClick={onAdd} className="flex min-h-[100px] flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-100 transition-colors hover:bg-slate-50/50">
                <Plus size={20} className="text-slate-300" />
            </button>
        </div>
    );
}
