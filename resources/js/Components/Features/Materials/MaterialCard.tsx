import { BookMarked, File, FileText, Link as LinkIcon, Play } from 'lucide-react';

import Badge from '@/Components/UI/Badge';
import Card from '@/Components/UI/Card';
import { Material } from '@/types';

export default function MaterialCard({
    material,
    onToggleFavorite,
    onView,
    onUse,
    onEdit,
}: {
    material: Material;
    onToggleFavorite: () => void;
    onView: () => void;
    onUse: () => void;
    onEdit: () => void;
}) {
    const Icon = material.type === 'pdf' ? FileText : material.type === 'video' ? Play : material.type === 'link' ? LinkIcon : File;
    const containerClasses =
        material.type === 'pdf'
            ? 'bg-rose-50 text-rose-500'
            : material.type === 'video'
              ? 'bg-indigo-50 text-indigo-500'
              : material.type === 'link'
                ? 'bg-emerald-50 text-emerald-500'
                : 'bg-blue-50 text-blue-500';

    return (
        <Card className="group flex h-full flex-col transition-all hover:border-indigo-200">
            <div className="mb-4 flex items-start justify-between">
                <div className={`rounded-xl p-3 ${containerClasses}`}>
                    <Icon size={24} />
                </div>
                <button className={`transition-colors ${material.isFavorite ? 'text-amber-400' : 'text-slate-300 hover:text-amber-400'}`} onClick={onToggleFavorite}>
                    <BookMarked size={20} />
                </button>
            </div>

            <div className="flex-1">
                <h3 className="mb-2 leading-tight font-bold text-slate-800 transition-colors group-hover:text-indigo-600">{material.title}</h3>
                <p className="line-clamp-2 text-sm text-slate-500">{material.description}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">{material.level}</Badge>
                    <Badge variant="neutral">{material.category}</Badge>
                </div>
            </div>

            <div className="mt-6 flex gap-2 border-t border-slate-50 pt-4">
                <button onClick={onView} className="flex-1 rounded-lg bg-slate-50 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100">
                    Ver
                </button>
                <button onClick={onEdit} className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                    Editar
                </button>
                <button onClick={onUse} className="flex-1 rounded-lg bg-indigo-50 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100">
                    Usar
                </button>
            </div>
        </Card>
    );
}
