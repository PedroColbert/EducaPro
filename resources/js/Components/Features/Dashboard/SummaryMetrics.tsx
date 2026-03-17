import Card from '@/Components/UI/Card';
import { SummaryMetric } from '@/types';

export default function SummaryMetrics({ metrics }: { metrics: SummaryMetric[] }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {metrics.map((metric) => (
                <Card key={metric.title} className="flex items-center gap-4">
                    <div className={`rounded-2xl p-4 ${metric.bg}`}>
                        <metric.icon size={24} className={metric.color} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">{metric.title}</p>
                        <p className="text-2xl font-bold text-slate-800">{metric.value}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
}
