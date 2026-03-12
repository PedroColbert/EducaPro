import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';

import { Sidebar } from '@/Components/Shared/Sidebar';
import { Topbar } from '@/Components/Shared/Topbar';

export default function AppLayout({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6f4_100%)] px-4 py-4 lg:px-6">
                <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <Sidebar />
                    <main className="space-y-4">
                        <Topbar />
                        <div className="space-y-6 rounded-[2rem] bg-white/45 p-2">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
