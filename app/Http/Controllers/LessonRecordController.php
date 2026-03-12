<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonRecordIndexRequest;
use App\Models\LessonRecord;
use Inertia\Inertia;
use Inertia\Response;

class LessonRecordController extends Controller
{
    public function index(LessonRecordIndexRequest $request): Response
    {
        $filters = $request->validated();

        $records = LessonRecord::query()
            ->with(['schoolClass:id,name,color', 'lessonPlan:id,topic'])
            ->when($filters['class_id'] ?? null, fn ($query, int $classId) => $query->where('school_class_id', $classId))
            ->orderByDesc('taught_on')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('LessonRecords/Index', [
            'filters' => $filters,
            'records' => $records,
        ]);
    }
}
