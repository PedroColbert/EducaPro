<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonPlanIndexRequest;
use App\Models\LessonPlan;
use App\Models\Material;
use Inertia\Inertia;
use Inertia\Response;

class LessonPlanController extends Controller
{
    public function index(LessonPlanIndexRequest $request): Response
    {
        $filters = $request->validated();

        $plans = LessonPlan::query()
            ->with(['schoolClass:id,name,color', 'materials:id,title,type,category'])
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->orderBy('planned_for')
            ->get();

        return Inertia::render('LessonPlans/Index', [
            'filters' => $filters,
            'plans' => $plans,
            'materials' => Material::query()->latest()->limit(12)->get(['id', 'title', 'type', 'category', 'level']),
        ]);
    }
}
