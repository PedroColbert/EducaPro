import { ArrowLeft, ChevronRight } from 'lucide-react';

import AgendaDayColumn, { AgendaSlot } from '@/Components/Features/Agenda/AgendaDayColumn';

const agendaByDay: { day: string; date: string; slots: AgendaSlot[] }[] = [
    {
        day: 'Segunda',
        date: '12 Out',
        slots: [
            { time: '10:00 - 11:30', title: 'Turma B1 - Avançado', subtitle: 'Sala 02', color: 'indigo' },
            { time: '13:30 - 15:00', title: 'Turma Kids 3', subtitle: 'Sala 07', color: 'emerald' },
        ],
    },
    {
        day: 'Terça',
        date: '13 Out',
        slots: [{ time: '08:00 - 09:30', title: 'Turma A2 - Intermediário', subtitle: 'Sala 04', color: 'purple' }],
    },
    {
        day: 'Quarta',
        date: '14 Out',
        slots: [
            { time: '10:00 - 11:30', title: 'Turma B1 - Avançado', subtitle: 'Sala 02', color: 'indigo' },
            { time: '13:30 - 15:00', title: 'Turma Kids 3', subtitle: 'Sala 07', color: 'emerald' },
        ],
    },
    {
        day: 'Quinta',
        date: '15 Out',
        slots: [
            { time: '08:00 - 09:30', title: 'Turma A2 - Intermediário', subtitle: 'Sala 04', color: 'purple' },
            { time: '14:00 - 16:00', title: 'Reunião Pedagógica', color: 'amber', dashed: true },
        ],
    },
    {
        day: 'Sexta',
        date: '16 Out',
        slots: [{ time: '15:30 - 17:00', title: 'Conversação Livre', subtitle: 'Lab 01', color: 'blue' }],
    },
];

export default function AgendaPage() {
    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Sua Semana</h1>
                    <p className="mt-1 text-slate-500">Agenda de aulas e compromissos pedagógicos.</p>
                </div>
                <div className="flex gap-2">
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                        <ArrowLeft size={18} />
                    </button>
                    <span className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-medium text-slate-700">Outubro 2026</span>
                    <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                {agendaByDay.map((day) => (
                    <AgendaDayColumn key={day.day} day={day.day} date={day.date} slots={day.slots} />
                ))}
            </div>
        </div>
    );
}
