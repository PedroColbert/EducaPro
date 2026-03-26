<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', fn (): Response => Inertia::render('Prototype/Index'))->name('dashboard');
    Route::get('/prototype', fn (): Response => Inertia::render('Prototype/Index'))->name('prototype');
});

require __DIR__.'/auth.php';
