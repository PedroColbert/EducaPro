<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchoolClassIndexRequest;
use App\Models\SchoolClass;
use Inertia\Inertia;
use Inertia\Response;

class SchoolClassController extends Controller
{
    public function index(SchoolClassIndexRequest $request): Response
    {
        $filters = $request->validated();

        $classes = SchoolClass::query()
            ->withCount('students')
            ->when($filters['search'] ?? null, fn ($query, string $search) => $query->where('name', 'like', "%{$search}%"))
            ->when($filters['level'] ?? null, fn ($query, string $level) => $query->where('level', $level))
            ->orderBy('name')
            ->get();

        return Inertia::render('Classes/Index', [
            'filters' => $filters,
            'classes' => $classes,
        ]);
    }

    public function show(SchoolClass $schoolClass): Response
    {
        $schoolClass->load([
            'students:id,name,level,status,email_contact',
            'lessonPlans' => fn ($query) => $query->latest('planned_for')->limit(5),
            'lessonRecords' => fn ($query) => $query->latest('taught_on')->limit(5),
        ]);

        return Inertia::render('Classes/Show', [
            'schoolClass' => $schoolClass,
        ]);
    }
}
