import { Card } from '@/Components/UI/Card';

export function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
    return (
        <Card className="space-y-3">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="text-3xl font-semibold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{description}</p>
        </Card>
    );
}
