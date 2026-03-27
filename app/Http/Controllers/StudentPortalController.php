<?php

namespace App\Http\Controllers;

use App\Models\AgendaItem;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class StudentPortalController extends Controller
{
    public function index(): Response
    {
        /** @var Student $student */
        $student = auth('student')->user();

        $student->load([
            'schoolClasses:id,name,color,delivery_mode,audience_type,academic_subject_id',
            'schoolClasses.academicSubject:id,name',
            'attendances.lessonRecord:id,taught_on,school_class_id',
            'assignmentSubmissions.assignment:id,title,due_date,status,school_class_id',
            'assignmentSubmissions.assignment.schoolClass:id,name,color',
            'evaluations' => fn ($query) => $query->latest('evaluated_at')->limit(6),
            'pedagogicalNotes' => fn ($query) => $query->latest('noted_at')->limit(4),
        ]);

        $attendanceItems = $student->attendances
            ->sortByDesc(fn ($attendance) => optional($attendance->lessonRecord)->taught_on?->format('Y-m-d') ?? '')
            ->take(8)
            ->values();

        $assignmentItems = $student->assignmentSubmissions
            ->sortBy(fn ($submission) => optional($submission->assignment)->due_date?->format('Y-m-d H:i:s') ?? '9999-12-31 23:59:59')
            ->values();

        $upcomingAgenda = AgendaItem::query()
            ->whereIn('school_class_id', $student->schoolClasses->pluck('id'))
            ->where('starts_at', '>=', now()->startOfDay())
            ->orderBy('starts_at')
            ->take(6)
            ->get();

        $recentMaterials = $student->schoolClasses
            ->flatMap(fn ($schoolClass) => $schoolClass->lessonPlans()
                ->with('materials:id,title,type,category,level')
                ->latest('planned_for')
                ->limit(4)
                ->get()
                ->flatMap->materials)
            ->unique('id')
            ->take(5)
            ->values();

        $attendanceRate = $attendanceItems->count()
            ? round(($attendanceItems->whereIn('status', ['present', 'late', 'justified'])->count() / max($attendanceItems->count(), 1)) * 100)
            : null;

        $alerts = collect();

        if ($attendanceRate !== null && $attendanceRate < 80) {
            $alerts->push([
                'title' => 'Sua frequencia precisa de atencao',
                'description' => "Seu historico recente esta em {$attendanceRate}% de presenca.",
                'tone' => 'warning',
            ]);
        }

        if ($assignmentItems->where('status', 'pending')->count() > 0) {
            $alerts->push([
                'title' => 'Atividades aguardando entrega',
                'description' => $assignmentItems->where('status', 'pending')->count().' atividade(s) ainda estao pendentes.',
                'tone' => 'attention',
            ]);
        }

        if ($student->pedagogicalNotes->contains('category', 'attention')) {
            $alerts->push([
                'title' => 'Existe um ponto importante de acompanhamento',
                'description' => 'Confira as observacoes recentes e converse com sua equipe se precisar de apoio.',
                'tone' => 'critical',
            ]);
        }

        return Inertia::render('StudentPortal/Dashboard', [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email_contact,
                'level' => $student->level,
                'status' => $student->status,
                'age' => $student->age,
                'classNames' => $student->schoolClasses->pluck('name')->values(),
                'attendanceRate' => $attendanceRate,
                'averageScore' => $student->evaluations->count() ? round((float) $student->evaluations->avg('score'), 1) : null,
            ],
            'attendance' => $attendanceItems->map(fn ($attendance) => [
                'id' => $attendance->id,
                'status' => $attendance->status,
                'observation' => $attendance->observation,
                'date' => optional($attendance->lessonRecord?->taught_on)->toDateString(),
            ])->values(),
            'assignments' => $assignmentItems->map(fn ($submission) => [
                'id' => $submission->id,
                'status' => $submission->status,
                'grade' => $submission->grade,
                'feedback' => $submission->teacher_feedback,
                'title' => $submission->assignment?->title,
                'dueDate' => optional($submission->assignment?->due_date)->toDateString(),
                'className' => $submission->assignment?->schoolClass?->name,
            ])->values(),
            'evaluations' => $student->evaluations->map(fn ($evaluation) => [
                'id' => $evaluation->id,
                'title' => $evaluation->title,
                'skill' => $evaluation->skill,
                'score' => $evaluation->score,
                'feedback' => $evaluation->feedback,
                'evaluatedAt' => optional($evaluation->evaluated_at)->toDateString(),
            ])->values(),
            'notes' => $student->pedagogicalNotes->map(fn ($note) => [
                'id' => $note->id,
                'category' => $note->category,
                'note' => $note->note,
                'notedAt' => optional($note->noted_at)->toDateTimeString(),
            ])->values(),
            'upcomingAgenda' => $upcomingAgenda->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'type' => $item->type,
                'startsAt' => optional($item->starts_at)->toDateTimeString(),
                'endsAt' => optional($item->ends_at)->toDateTimeString(),
            ])->values(),
            'materials' => $recentMaterials->map(fn ($material) => [
                'id' => $material->id,
                'title' => $material->title,
                'type' => $material->type,
                'category' => $material->category,
                'level' => $material->level,
            ])->values(),
            'alerts' => $alerts->values(),
        ]);
    }
}
