<?php

namespace App\Http\Controllers;

use App\Models\AssignmentSubmission;
use App\Models\Attendance;
use App\Models\Evaluation;
use App\Models\SchoolClass;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Reports/Index', [
            'summary' => [
                'attendanceRate' => round((Attendance::query()->where('status', 'present')->count() / max(Attendance::query()->count(), 1)) * 100, 1),
                'averageGrade' => round((float) Evaluation::query()->avg('score'), 1),
                'submittedAssignments' => AssignmentSubmission::query()->where('status', 'submitted')->count(),
            ],
            'classPerformance' => SchoolClass::query()
                ->withCount('students')
                ->withAvg('evaluations', 'score')
                ->orderBy('name')
                ->get(),
        ]);
    }
}
