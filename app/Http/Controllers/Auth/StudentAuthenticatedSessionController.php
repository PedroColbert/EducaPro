<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StudentLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentAuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('StudentPortal/Auth/Login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(StudentLoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        auth()->guard('web')->logout();
        auth()->guard('guardian')->logout();

        $request->session()->regenerate();

        return redirect()->intended(route('student.portal', absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        auth()->guard('student')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('student.login');
    }
}
