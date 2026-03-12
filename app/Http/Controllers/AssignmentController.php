<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignmentIndexRequest;
use App\Models\Assignment;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentController extends Controller
{
    public function index(AssignmentIndexRequest $request): Response
    {
        $filters = $request->validated();

        $assignments = Assignment::query()
            ->with(['schoolClass:id,name,color', 'student:id,name', 'submissions.student:id,name'])
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->orderBy('due_date')
            ->get();

        return Inertia::render('Assignments/Index', [
            'filters' => $filters,
            'assignments' => $assignments,
        ]);
    }
}
