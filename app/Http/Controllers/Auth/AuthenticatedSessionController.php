<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'forgotPasswordUrl' => Route::has('password.request') ? route('password.request') : null,
            'requestAccessUrl' => Route::has('access.request') ? route('access.request') : null,
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        auth('guardian')->logout();
        auth('student')->logout();

        $request->session()->regenerate();

        $user = $request->user();

        $targetRoute = match ($user?->role) {
            'admin' => 'admin.dashboard',
            'coordinator' => 'coordinator.dashboard',
            default => 'teacher.dashboard',
        };

        return redirect()->intended(route($targetRoute, absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        auth()->guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
