import AppLayout from '@/Layouts/AppLayout';
import { Badge } from '@/Components/UI/Badge';
import { PageHeader } from '@/Components/UI/PageHeader';
import { TableWrapper } from '@/Components/UI/TableWrapper';
import { Attendance, Paginated } from '@/types';
import { formatDate } from '@/lib/utils';

export default function AttendancesIndex({ attendances }: { attendances: Paginated<Attendance> }) {
    return (
        <AppLayout title="Presenças">
            <PageHeader title="Presenças" description="Histórico consolidado das chamadas registradas nas aulas ministradas." />
            <TableWrapper>
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Aluno</th>
                            <th className="px-4 py-3">Turma</th>
                            <th className="px-4 py-3">Data</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances.data.map((attendance) => (
                            <tr key={attendance.id} className="border-t border-slate-100">
                                <td className="px-4 py-4">{attendance.student?.name}</td>
                                <td className="px-4 py-4">{attendance.lesson_record?.school_class?.name}</td>
                                <td className="px-4 py-4">{formatDate(attendance.lesson_record?.taught_on)}</td>
                                <td className="px-4 py-4"><Badge variant="neutral">{attendance.status}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableWrapper>
        </AppLayout>
    );
}
