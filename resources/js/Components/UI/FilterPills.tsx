import { cn } from '@/lib/utils';

export function FilterPills({ items }: { items: { label: string; active?: boolean }[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <button
                    key={item.label}
                    type="button"
                    className={cn(
                        'rounded-full px-3 py-1.5 text-sm transition',
                        item.active ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 ring-1 ring-slate-200',
                    )}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}
