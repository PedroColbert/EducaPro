import { Filter, Plus } from 'lucide-react';

import MaterialCard from '@/Components/Features/Materials/MaterialCard';
import { materials } from '@/data/mockData';

export default function MaterialsPage() {
    return (
        <div className="animate-in space-y-6 fade-in duration-500">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Biblioteca de Materiais</h1>
                    <p className="mt-1 text-slate-500">Seus recursos organizados e prontos para uso nas aulas.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                        <Filter size={16} /> Filtrar
                    </button>
                    <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                        <Plus size={16} /> Novo Material
                    </button>
                </div>
            </div>

            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
                {['Todos', 'Grammar', 'Vocabulary', 'Listening', 'Speaking', 'Reading', 'B1', 'Kids'].map((tag, index) => (
                    <button
                        key={tag}
                        className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                            index === 0
                                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                                : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {materials.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                ))}
            </div>
        </div>
    );
}
