import Card from '@/Components/UI/Card';
import { Student } from '@/types';

export default function StudentPerformanceCard({ student }: { student: Student }) {
    const writingScore = student.attendanceRate < 80 ? 60 : 88;

    return (
        <Card>
            <h2 className="mb-4 text-lg font-bold text-slate-800">Desempenho por habilidade</h2>
            <div className="space-y-4">
                {[
                    { skill: 'Speaking', value: 85, color: 'bg-indigo-500' },
                    { skill: 'Listening', value: 78, color: 'bg-emerald-500' },
                    { skill: 'Reading', value: 92, color: 'bg-blue-500' },
                    { skill: 'Writing', value: writingScore, color: writingScore < 80 ? 'bg-rose-500' : 'bg-purple-500' },
                ].map((item) => (
                    <div key={item.skill}>
                        <div className="mb-1.5 flex justify-between text-sm">
                            <span className="font-medium text-slate-700">{item.skill}</span>
                            <span className="text-slate-500">{item.value}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100">
                            <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.value}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
