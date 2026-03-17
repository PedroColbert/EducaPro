import { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
    className?: string;
    onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ${
                onClick ? 'cursor-pointer transition-all hover:border-indigo-100 hover:shadow-md' : ''
            } ${className}`}
        >
            {children}
        </div>
    );
}
