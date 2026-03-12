import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';
import { AgendaItem } from '@/types';
import { formatDate } from '@/lib/utils';

const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

export default function AgendaIndex({ agendaItems }: { agendaItems: AgendaItem[] }) {
    return (
        <AppLayout title="Agenda">
            <PageHeader title="Agenda semanal" description="Calendário simples e visual para aulas, correções, lembretes e blocos de planejamento." />
            <div className="grid gap-4 md:grid-cols-5">
                {weekdays.map((day) => (
                    <Card key={day} className="space-y-3">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{day}</h2>
                        {agendaItems.slice(0, 2).map((item) => (
                            <div key={`${day}-${item.id}`} className="rounded-2xl px-4 py-3 text-white" style={{ backgroundColor: item.school_class?.color ?? '#0f766e' }}>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-white/80">{formatDate(item.starts_at, { timeStyle: 'short' })}</p>
                            </div>
                        ))}
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
