<?php

use App\Http\Controllers\Auth\StudentAuthenticatedSessionController;
use App\Http\Controllers\StudentPortalController;
use Illuminate\Support\Facades\Route;

Route::prefix('student')->group(function () {
    Route::middleware('guest:student')->group(function () {
        Route::get('/login', [StudentAuthenticatedSessionController::class, 'create'])->name('student.login');
        Route::post('/login', [StudentAuthenticatedSessionController::class, 'store'])->name('student.login.store');
    });

    Route::middleware('auth:student')->group(function () {
        Route::get('/', [StudentPortalController::class, 'index'])->name('student.portal');
        Route::post('/logout', [StudentAuthenticatedSessionController::class, 'destroy'])->name('student.logout');
    });
});
