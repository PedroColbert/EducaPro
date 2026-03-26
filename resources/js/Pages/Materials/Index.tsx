import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

import MaterialCard from '@/Components/Features/Materials/MaterialCard';
import { EmptyState } from '@/Components/UI/EmptyState';
import { FilterPills } from '@/Components/UI/FilterPills';
import { ModalShell } from '@/Components/UI/ModalShell';
import { SearchInput } from '@/Components/UI/SearchInput';
import { materialCategoryOptions } from '@/data/mockData';
import { useEducaPro } from '@/hooks/useEducaPro';
import { Material, MaterialDraft } from '@/types';

const emptyMaterialDraft: MaterialDraft = {
    title: '',
    type: 'pdf',
    category: 'Grammar',
    level: 'A2',
    tags: [],
    url: '',
    isFavorite: false,
    description: '',
};

export default function MaterialsPage() {
    const { materials, saveMaterial, toggleMaterialFavorite } = useEducaPro();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingMaterialId, setEditingMaterialId] = useState<number | null>(null);
    const [draft, setDraft] = useState<MaterialDraft>(emptyMaterialDraft);
    const [isSaving, setIsSaving] = useState(false);
    const [helperMessage, setHelperMessage] = useState<string | null>(null);

    const filteredMaterials = useMemo(() => {
        return materials.filter((material) => {
            const matchesSearch = [material.title, material.category, material.level, material.tags.join(' '), material.description]
                .join(' ')
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesFilter =
                activeFilter === 'Todos' ||
                material.category === activeFilter ||
                material.level === activeFilter ||
                (activeFilter === 'Favoritos' && material.isFavorite);

            return matchesSearch && matchesFilter;
        });
    }, [activeFilter, materials, search]);

    const openCreateForm = () => {
        setEditingMaterialId(null);
        setDraft(emptyMaterialDraft);
        setIsFormOpen(true);
    };

    const openEditForm = (material: Material) => {
        setEditingMaterialId(material.id);
        setDraft({
            title: material.title,
            type: material.type,
            category: material.category,
            level: material.level,
            tags: material.tags,
            url: material.url,
            isFavorite: material.isFavorite,
            description: material.description,
        });
        setIsFormOpen(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 250));
        await saveMaterial(draft, editingMaterialId ?? undefined);
        setIsSaving(false);
        setIsFormOpen(false);
    };

    return (
        <>
            <div className="animate-in space-y-6 fade-in duration-500">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Biblioteca de materiais</h1>
                        <p className="mt-1 text-slate-500">Cadastre, edite, favorite e organize recursos para usar nas aulas.</p>
                    </div>
                    <button onClick={openCreateForm} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                        <Plus size={16} /> Novo material
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <SearchInput placeholder="Buscar material, categoria ou tag..." value={search} onChange={setSearch} />
                    <FilterPills
                        items={['Todos', 'Favoritos', ...materialCategoryOptions, 'A2', 'B1', 'B2'].map((label) => ({
                            label,
                            active: label === activeFilter,
                        }))}
                        onSelect={setActiveFilter}
                    />
                </div>

                {helperMessage ? <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">{helperMessage}</div> : null}

                {filteredMaterials.length ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {filteredMaterials.map((material) => (
                            <MaterialCard
                                key={material.id}
                                material={material}
                                onToggleFavorite={() => toggleMaterialFavorite(material.id)}
                                onView={() => setSelectedMaterial(material)}
                                onEdit={() => openEditForm(material)}
                                onUse={() => setHelperMessage(`"${material.title}" ficou pronto para ser vinculado a um plano de aula.`)}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        title="Nenhum material encontrado"
                        description="Cadastre um novo recurso ou ajuste os filtros para localizar materiais ja existentes."
                        action={
                            <button onClick={openCreateForm} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                                Cadastrar material
                            </button>
                        }
                    />
                )}
            </div>

            <ModalShell
                open={isFormOpen}
                title={editingMaterialId ? 'Editar material' : 'Novo material'}
                description="Registre o tipo, categoria, nivel e link principal do recurso."
                onClose={() => setIsFormOpen(false)}
                footer={
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setIsFormOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                            Cancelar
                        </button>
                        <button onClick={handleSave} disabled={!draft.title || !draft.url || isSaving} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400">
                            {isSaving ? 'Salvando...' : editingMaterialId ? 'Salvar material' : 'Criar material'}
                        </button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Titulo</span>
                        <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Tipo</span>
                        <select value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as MaterialDraft['type'] })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            <option value="pdf">PDF</option>
                            <option value="video">Video</option>
                            <option value="doc">Documento</option>
                            <option value="link">Link</option>
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Categoria</span>
                        <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                            {materialCategoryOptions.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Nivel</span>
                        <input value={draft.level} onChange={(event) => setDraft({ ...draft, level: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2">
                        <span className="text-sm font-medium text-slate-700">Link ou arquivo</span>
                        <input value={draft.url} onChange={(event) => setDraft({ ...draft, url: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Tags</span>
                        <input value={draft.tags.join(', ')} onChange={(event) => setDraft({ ...draft, tags: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} placeholder="grammar, revision, speaking" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                    <label className="space-y-2 md:col-span-2">
                        <span className="text-sm font-medium text-slate-700">Descricao</span>
                        <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    </label>
                </div>
            </ModalShell>

            <ModalShell
                open={Boolean(selectedMaterial)}
                title={selectedMaterial?.title ?? 'Material'}
                description={selectedMaterial ? `${selectedMaterial.category} • ${selectedMaterial.level}` : undefined}
                onClose={() => setSelectedMaterial(null)}
            >
                {selectedMaterial ? (
                    <div className="space-y-4 text-sm text-slate-600">
                        <p>{selectedMaterial.description}</p>
                        <p>
                            <span className="font-medium text-slate-800">Link principal:</span> {selectedMaterial.url}
                        </p>
                        <p>
                            <span className="font-medium text-slate-800">Tags:</span> {selectedMaterial.tags.join(', ') || 'Sem tags'}
                        </p>
                    </div>
                ) : null}
            </ModalShell>
        </>
    );
}
