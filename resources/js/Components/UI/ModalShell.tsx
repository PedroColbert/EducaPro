import { PropsWithChildren, ReactNode } from 'react';

import { X } from 'lucide-react';

interface ModalShellProps extends PropsWithChildren {
    open: boolean;
    title: string;
    description?: string;
    onClose: () => void;
    footer?: ReactNode;
}

export function ModalShell({ open, title, description, onClose, footer, children }: ModalShellProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
                    </div>
                    <button className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto px-6 py-5">{children}</div>
                {footer ? <div className="border-t border-slate-100 px-6 py-4">{footer}</div> : null}
            </div>
        </div>
    );
}
