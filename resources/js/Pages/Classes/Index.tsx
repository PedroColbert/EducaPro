import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { PageHeader } from '@/Components/UI/PageHeader';
import { SearchInput } from '@/Components/UI/SearchInput';
import { SchoolClass } from '@/types';

export default function ClassesIndex({ classes }: { classes: SchoolClass[] }) {
    return (
        <AppLayout title="Turmas">
            <PageHeader title="Turmas" description="Visão enxuta das turmas da professora, com cor, progresso e tamanho da turma." />
            <Card className="flex justify-between">
                <SearchInput placeholder="Buscar turma" />
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {classes.map((schoolClass) => (
                    <Card key={schoolClass.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-semibold text-slate-900">{schoolClass.name}</p>
                                <p className="text-sm text-slate-500">{schoolClass.level}</p>
                            </div>
                            <span className="h-4 w-4 rounded-full" style={{ backgroundColor: schoolClass.color }} />
                        </div>
                        <p className="text-sm text-slate-500">{schoolClass.schedule_description}</p>
                        <div>
                            <div className="mb-2 flex justify-between text-sm text-slate-500">
                                <span>Progresso</span>
                                <span>{schoolClass.progress}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100">
                                <div className="h-2 rounded-full bg-teal-500" style={{ width: `${schoolClass.progress}%` }} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
