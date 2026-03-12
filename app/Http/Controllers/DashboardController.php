<?php

namespace App\Http\Controllers;

use App\Models\AgendaItem;
use App\Models\Assignment;
use App\Models\LessonPlan;
use App\Models\LessonRecord;
use App\Models\SchoolClass;
use App\Models\Student;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'students' => Student::query()->count(),
                'classes' => SchoolClass::query()->count(),
                'plannedLessons' => LessonPlan::query()->where('status', 'planned')->count(),
                'pendingAssignments' => Assignment::query()->where('status', 'assigned')->count(),
            ],
            'upcomingAgenda' => AgendaItem::query()
                ->with('schoolClass:id,name,color')
                ->orderBy('starts_at')
                ->limit(5)
                ->get(),
            'recentLessonRecords' => LessonRecord::query()
                ->with('schoolClass:id,name,color')
                ->latest('taught_on')
                ->limit(4)
                ->get(),
        ]);
    }
}
