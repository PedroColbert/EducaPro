<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\GuardianLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GuardianAuthenticatedSessionController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('GuardianPortal/Auth/Login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(GuardianLoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        auth()->guard('web')->logout();
        auth()->guard('student')->logout();

        $request->session()->regenerate();

        return redirect()->intended(route('guardian.portal', absolute: false));
    }

    public function destroy(Request $request): RedirectResponse
    {
        auth()->guard('guardian')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('guardian.login');
    }
}
