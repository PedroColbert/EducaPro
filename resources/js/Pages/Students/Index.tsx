import AppLayout from '@/Layouts/AppLayout';
import { Badge } from '@/Components/UI/Badge';
import { Card } from '@/Components/UI/Card';
import { EmptyState } from '@/Components/UI/EmptyState';
import { FilterPills } from '@/Components/UI/FilterPills';
import { PageHeader } from '@/Components/UI/PageHeader';
import { SearchInput } from '@/Components/UI/SearchInput';
import { TableWrapper } from '@/Components/UI/TableWrapper';
import { Paginated, Student } from '@/types';

export default function StudentsIndex({ students }: { students: Paginated<Student> }) {
    return (
        <AppLayout title="Alunos">
            <PageHeader title="Alunos" description="Cadastro individual dos alunos, status pedagógico e vínculo com turmas." />
            <Card className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <SearchInput placeholder="Buscar por nome, nível ou contato" />
                <FilterPills items={[{ label: 'Todos', active: true }, { label: 'Excelente' }, { label: 'Bom' }, { label: 'Atenção' }]} />
            </Card>
            {students.data.length === 0 ? (
                <EmptyState title="Nenhum aluno encontrado" description="Os seeders já deixam a base pronta. Depois, ligue os formulários para cadastro real." />
            ) : (
                <TableWrapper>
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-4 py-3">Aluno</th>
                                <th className="px-4 py-3">Nível</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Turmas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.data.map((student) => (
                                <tr key={student.id} className="border-t border-slate-100">
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-slate-900">{student.name}</p>
                                        <p className="text-slate-500">{student.email_contact}</p>
                                    </td>
                                    <td className="px-4 py-4 text-slate-600">{student.level}</td>
                                    <td className="px-4 py-4"><Badge variant={student.status}>{student.status}</Badge></td>
                                    <td className="px-4 py-4 text-slate-600">{student.school_classes?.map((item) => item.name).join(', ')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TableWrapper>
            )}
        </AppLayout>
    );
}
