import { Plus } from 'lucide-react';

export interface AgendaSlot {
    time: string;
    title: string;
    subtitle?: string;
    color: 'indigo' | 'emerald' | 'purple' | 'amber' | 'blue';
    dashed?: boolean;
}

const slotStyles = {
    indigo: 'bg-indigo-50 border-indigo-500 text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-500 text-emerald-700',
    purple: 'bg-purple-50 border-purple-500 text-purple-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    blue: 'bg-blue-50 border-blue-500 text-blue-700',
};

export default function AgendaDayColumn({
    day,
    date,
    slots,
}: {
    day: string;
    date: string;
    slots: AgendaSlot[];
}) {
    return (
        <div className="flex flex-col space-y-3">
            <div className="rounded-xl bg-slate-100 p-3 text-center">
                <h3 className="font-bold text-slate-700">{day}</h3>
                <span className="text-xs text-slate-500">{date}</span>
            </div>

            {slots.map((slot) => (
                <div
                    key={`${day}-${slot.time}-${slot.title}`}
                    className={`rounded-lg border-l-4 p-3 shadow-sm ${slotStyles[slot.color]} ${slot.dashed ? 'border border-dashed' : ''}`}
                >
                    <p className="mb-1 text-xs font-semibold">{slot.time}</p>
                    <p className="text-sm leading-tight font-bold text-slate-800">{slot.title}</p>
                    {slot.subtitle ? <p className="mt-1 text-xs text-slate-500">{slot.subtitle}</p> : null}
                </div>
            ))}

            <div className="flex min-h-[100px] flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-100 transition-colors hover:bg-slate-50/50">
                <Plus size={20} className="text-slate-300" />
            </div>
        </div>
    );
}
