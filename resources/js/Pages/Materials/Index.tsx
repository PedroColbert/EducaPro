import AppLayout from '@/Layouts/AppLayout';
import { Card } from '@/Components/UI/Card';
import { FilterPills } from '@/Components/UI/FilterPills';
import { PageHeader } from '@/Components/UI/PageHeader';
import { SearchInput } from '@/Components/UI/SearchInput';
import { Material } from '@/types';

export default function MaterialsIndex({ materials }: { materials: Material[] }) {
    return (
        <AppLayout title="Materiais">
            <PageHeader title="Biblioteca de materiais" description="Catálogo estilo drive pessoal para PDFs, links, vídeos e documentos de apoio." />
            <Card className="space-y-4">
                <SearchInput placeholder="Buscar material" />
                <FilterPills items={[{ label: 'Todos', active: true }, { label: 'Grammar' }, { label: 'Listening' }, { label: 'B1' }]} />
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {materials.map((material) => (
                    <Card key={material.id} className="space-y-3">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-slate-900">{material.title}</p>
                                <p className="text-sm text-slate-500">{material.category} • {material.level ?? 'Livre'}</p>
                            </div>
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                                {material.is_favorite ? 'Favorito' : material.type}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500">{material.file_path_or_url}</p>
                    </Card>
                ))}
            </div>
        </AppLayout>
    );
}
