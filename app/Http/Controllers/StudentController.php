<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentIndexRequest;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function index(StudentIndexRequest $request): Response
    {
        $filters = $request->validated();

        $students = Student::query()
            ->with('schoolClasses:id,name,color')
            ->when($filters['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($studentQuery) use ($search): void {
                    $studentQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('level', 'like', "%{$search}%")
                        ->orWhere('email_contact', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Students/Index', [
            'filters' => $filters,
            'students' => $students,
        ]);
    }

    public function show(Student $student): Response
    {
        $student->load([
            'schoolClasses:id,name,color,level',
            'pedagogicalNotes' => fn ($query) => $query->latest('noted_at')->limit(6),
            'evaluations' => fn ($query) => $query->latest('evaluated_at')->limit(6),
            'assignmentSubmissions.assignment:id,title,due_date,status',
            'attendances.lessonRecord:id,taught_on,school_class_id',
        ]);

        return Inertia::render('Students/Show', [
            'student' => $student,
        ]);
    }
}
