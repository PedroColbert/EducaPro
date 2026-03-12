<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttendanceIndexRequest;
use App\Models\Attendance;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    public function index(AttendanceIndexRequest $request): Response
    {
        $filters = $request->validated();

        $attendances = Attendance::query()
            ->with(['student:id,name', 'lessonRecord.schoolClass:id,name,color'])
            ->when($filters['status'] ?? null, fn ($query, string $status) => $query->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Attendances/Index', [
            'filters' => $filters,
            'attendances' => $attendances,
        ]);
    }
}
