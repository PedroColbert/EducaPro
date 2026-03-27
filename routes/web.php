<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function () {
    if (auth('student')->check()) {
        return redirect()->route('student.portal');
    }

    if (auth('guardian')->check()) {
        return redirect()->route('guardian.portal');
    }

    return Auth::check()
        ? redirect()->route(match (Auth::user()?->role) {
            'admin' => 'admin.dashboard',
            'coordinator' => 'coordinator.dashboard',
            default => 'teacher.dashboard',
        })
        : redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return redirect()->route(match (Auth::user()?->role) {
            'admin' => 'admin.dashboard',
            'coordinator' => 'coordinator.dashboard',
            default => 'teacher.dashboard',
        });
    })->name('dashboard');

    Route::get('/workspace/admin', fn (): Response => Inertia::render('Prototype/Index'))->middleware('role:admin')->name('admin.dashboard');
    Route::get('/workspace/coordination', fn (): Response => Inertia::render('Prototype/Index'))->middleware('role:admin,coordinator')->name('coordinator.dashboard');
    Route::get('/workspace/teaching', fn (): Response => Inertia::render('Prototype/Index'))->middleware('role:admin,coordinator,teacher')->name('teacher.dashboard');
    Route::get('/prototype', fn (): Response => Inertia::render('Prototype/Index'))->name('prototype');
});

require __DIR__.'/auth.php';
require __DIR__.'/guardian.php';
require __DIR__.'/student.php';
