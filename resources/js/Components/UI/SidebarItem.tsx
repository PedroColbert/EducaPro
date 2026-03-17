import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export default function SidebarItem({ icon: Icon, label, isActive, onClick }: SidebarItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                isActive ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
            }`}
        >
            <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
            <span>{label}</span>
        </button>
    );
}
