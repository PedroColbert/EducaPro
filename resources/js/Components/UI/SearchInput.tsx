export function SearchInput({ placeholder = 'Buscar...', value }: { placeholder?: string; value?: string }) {
    return (
        <div className="relative w-full max-w-md">
            <input
                defaultValue={value}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-teal-300"
            />
        </div>
    );
}
