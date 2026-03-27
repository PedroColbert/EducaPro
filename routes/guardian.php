<?php

use App\Http\Controllers\Auth\GuardianAuthenticatedSessionController;
use App\Http\Controllers\GuardianPortalController;
use Illuminate\Support\Facades\Route;

Route::prefix('family')->group(function () {
    Route::middleware('guest:guardian')->group(function () {
        Route::get('/login', [GuardianAuthenticatedSessionController::class, 'create'])->name('guardian.login');
        Route::post('/login', [GuardianAuthenticatedSessionController::class, 'store'])->name('guardian.login.store');
    });

    Route::middleware('auth:guardian')->group(function () {
        Route::get('/', [GuardianPortalController::class, 'index'])->name('guardian.portal');
        Route::post('/logout', [GuardianAuthenticatedSessionController::class, 'destroy'])->name('guardian.logout');
    });
});
