import { AlertCircle, CheckCircle2 } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';

export default function StudentTasksCard() {
    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Últimas Tarefas</h2>
            <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <div>
                            <p className="text-sm font-medium text-slate-700">Workbook: Unit 4</p>
                            <p className="text-xs text-slate-500">Entregue há 2 dias</p>
                        </div>
                    </div>
                    <Badge variant="success">Nota: 9.5</Badge>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/30 p-3">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={18} className="text-rose-500" />
                        <div>
                            <p className="text-sm font-medium text-slate-700">Redação: My Hobby</p>
                            <p className="text-xs text-rose-500">Atrasada (prazo era ontem)</p>
                        </div>
                    </div>
                    <Badge variant="danger">Pendente</Badge>
                </div>
            </div>
        </Card>
    );
}
