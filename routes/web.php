<?php

use App\Http\Controllers\AgendaItemController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LessonPlanController;
use App\Http\Controllers\LessonRecordController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::get('/dashboard', DashboardController::class)->name('dashboard');
Route::get('/students', [StudentController::class, 'index'])->name('students.index');
Route::get('/students/{student}', [StudentController::class, 'show'])->name('students.show');
Route::get('/classes', [SchoolClassController::class, 'index'])->name('classes.index');
Route::get('/classes/{schoolClass}', [SchoolClassController::class, 'show'])->name('classes.show');
Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');
Route::get('/lesson-plans', [LessonPlanController::class, 'index'])->name('lesson-plans.index');
Route::get('/lesson-records', [LessonRecordController::class, 'index'])->name('lesson-records.index');
Route::get('/materials', [MaterialController::class, 'index'])->name('materials.index');
Route::get('/assignments', [AssignmentController::class, 'index'])->name('assignments.index');
Route::get('/agenda', [AgendaItemController::class, 'index'])->name('agenda.index');
Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
