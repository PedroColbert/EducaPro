<?php

namespace App\Http\Controllers;

use App\Models\AgendaItem;
use App\Models\Guardian;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class GuardianPortalController extends Controller
{
    public function index(Request $request): Response
    {
        /** @var Guardian $guardian */
        $guardian = auth('guardian')->user();

        $students = $guardian->students()
            ->with([
                'schoolClasses:id,name,color,delivery_mode,audience_type,academic_subject_id',
                'schoolClasses.academicSubject:id,name',
            ])
            ->orderBy('name')
            ->get();

        $selectedStudent = $students->firstWhere('id', (int) $request->integer('student')) ?? $students->first();

        if ($selectedStudent) {
            Gate::forUser($guardian)->authorize('view', $selectedStudent);

            $selectedStudent->load([
                'schoolClasses:id,name,color,delivery_mode,audience_type,academic_subject_id',
                'schoolClasses.academicSubject:id,name',
                'attendances.lessonRecord:id,taught_on,school_class_id',
                'assignmentSubmissions.assignment:id,title,due_date,status,school_class_id',
                'assignmentSubmissions.assignment.schoolClass:id,name,color',
                'evaluations' => fn ($query) => $query->latest('evaluated_at')->limit(4),
                'pedagogicalNotes' => fn ($query) => $query->latest('noted_at')->limit(4),
            ]);
        }

        $attendanceItems = $selectedStudent
            ? $selectedStudent->attendances
                ->sortByDesc(fn ($attendance) => optional($attendance->lessonRecord)->taught_on?->format('Y-m-d') ?? '')
                ->take(6)
                ->values()
            : collect();

        $assignmentItems = $selectedStudent
            ? $selectedStudent->assignmentSubmissions
                ->sortBy(fn ($submission) => optional($submission->assignment)->due_date?->format('Y-m-d H:i:s') ?? '9999-12-31 23:59:59')
                ->values()
            : collect();

        $upcomingAgenda = $selectedStudent
            ? AgendaItem::query()
                ->whereIn('school_class_id', $selectedStudent->schoolClasses->pluck('id'))
                ->where('starts_at', '>=', now()->startOfDay())
                ->orderBy('starts_at')
                ->take(5)
                ->get()
            : collect();

        $recentMaterials = $selectedStudent
            ? $selectedStudent->schoolClasses
                ->flatMap(fn ($schoolClass) => $schoolClass->lessonPlans()
                    ->with('materials:id,title,type,category,level')
                    ->latest('planned_for')
                    ->limit(4)
                    ->get()
                    ->flatMap->materials)
                ->unique('id')
                ->take(4)
                ->values()
            : collect();

        $alerts = collect();

        if ($selectedStudent && $selectedStudent->attendances->count()) {
            $positiveStatuses = ['present', 'late', 'justified'];
            $attendanceRate = round(
                ($selectedStudent->attendances->whereIn('status', $positiveStatuses)->count() / max($selectedStudent->attendances->count(), 1)) * 100
            );

            if ($attendanceRate < 80) {
                $alerts->push([
                    'title' => 'Frequencia abaixo do ideal',
                    'description' => "O acompanhamento recente indica {$attendanceRate}% de presenca.",
                    'tone' => 'warning',
                ]);
            }
        }

        if ($assignmentItems->where('status', 'pending')->count() > 0) {
            $alerts->push([
                'title' => 'Atividades pendentes',
                'description' => $assignmentItems->where('status', 'pending')->count().' atividade(s) ainda aguardam envio.',
                'tone' => 'attention',
            ]);
        }

        if ($selectedStudent && $selectedStudent->pedagogicalNotes->contains('category', 'attention')) {
            $alerts->push([
                'title' => 'Observacao importante registrada',
                'description' => 'Existe pelo menos uma anotacao recente com ponto de atencao da equipe pedagógica.',
                'tone' => 'critical',
            ]);
        }

        return Inertia::render('GuardianPortal/Dashboard', [
            'guardian' => [
                'name' => $guardian->name,
                'email' => $guardian->email,
                'relationshipLabel' => $guardian->relationship_label,
            ],
            'students' => $students->map(fn (Student $student) => [
                'id' => $student->id,
                'name' => $student->name,
                'level' => $student->level,
                'status' => $student->status,
                'relationshipLabel' => $student->pivot?->relationship_label,
                'classNames' => $student->schoolClasses->pluck('name')->values(),
            ]),
            'selectedStudent' => $selectedStudent ? [
                'id' => $selectedStudent->id,
                'name' => $selectedStudent->name,
                'level' => $selectedStudent->level,
                'status' => $selectedStudent->status,
                'age' => $selectedStudent->age,
                'classNames' => $selectedStudent->schoolClasses->pluck('name')->values(),
                'attendanceRate' => $attendanceItems->count()
                    ? round(($attendanceItems->whereIn('status', ['present', 'late', 'justified'])->count() / max($attendanceItems->count(), 1)) * 100)
                    : null,
                'averageScore' => $selectedStudent->evaluations->count() ? round((float) $selectedStudent->evaluations->avg('score'), 1) : null,
            ] : null,
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
            'evaluations' => $selectedStudent?->evaluations->map(fn ($evaluation) => [
                'id' => $evaluation->id,
                'title' => $evaluation->title,
                'skill' => $evaluation->skill,
                'score' => $evaluation->score,
                'feedback' => $evaluation->feedback,
                'evaluatedAt' => optional($evaluation->evaluated_at)->toDateString(),
            ])->values() ?? [],
            'notes' => $selectedStudent?->pedagogicalNotes->map(fn ($note) => [
                'id' => $note->id,
                'category' => $note->category,
                'note' => $note->note,
                'notedAt' => optional($note->noted_at)->toDateTimeString(),
            ])->values() ?? [],
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
