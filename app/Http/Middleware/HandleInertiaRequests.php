<?php

namespace App\Http\Middleware;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user()?->loadMissing('organization', 'organizationUnit');
        $guardian = auth('guardian')->user()?->loadMissing('organization', 'organizationUnit');
        $student = auth('student')->user()?->loadMissing('organization', 'organizationUnit');
        $actor = $user ?? $guardian ?? $student;
        $organizationSettings = data_get($actor?->organization, 'settings', []);
        $userSettings = data_get($user, 'settings', []) ?: data_get($student, 'settings', []);

        $defaultLabels = [
            'students' => 'Estudantes',
            'classes' => 'Turmas e grupos',
            'lessonPlans' => 'Planejamento',
            'materials' => 'Recursos',
            'activities' => 'Atividades',
            'agenda' => 'Agenda',
            'reports' => 'Relatorios',
        ];

        return [
            ...parent::share($request),
            'app' => [
                'name' => config('app.name', 'EducaPro'),
                'context' => [
                    'productName' => config('app.name', 'EducaPro'),
                    'organizationName' => $actor?->organization?->name,
                    'organizationCategory' => $actor?->organization?->category,
                    'organizationUnitName' => $actor?->organizationUnit?->name,
                    'locale' => $user?->locale ?? $actor?->organization?->locale ?? config('app.locale', 'pt_BR'),
                    'timezone' => $user?->timezone ?? $actor?->organization?->timezone ?? config('app.timezone', 'UTC'),
                    'profile' => $user?->role ?? ($guardian ? 'guardian' : ($student ? 'student' : null)),
                    'labels' => array_merge(
                        $defaultLabels,
                        data_get($organizationSettings, 'labels', []),
                        data_get($userSettings, 'labels', []),
                    ),
                ],
            ],
            'auth' => [
                'user' => $this->resolveAuthUser($user),
                'guardian' => $this->resolveGuardian($guardian),
                'student' => $this->resolveStudent($student),
            ],
        ];
    }

    protected function resolveAuthUser(?Authenticatable $user): ?array
    {
        if (! $user instanceof \App\Models\User) {
            return null;
        }

        return [
            'id' => $user->id,
            'name' => $user->name,
            'display_name' => $user->display_name,
            'email' => $user->email,
            'role' => $user->role,
            'avatar' => data_get($user->settings, 'avatar'),
            'organization_name' => $user->organization?->name,
            'organization_unit_name' => $user->organizationUnit?->name,
        ];
    }

    protected function resolveGuardian(?Authenticatable $guardian): ?array
    {
        if (! $guardian instanceof \App\Models\Guardian) {
            return null;
        }

        return [
            'id' => $guardian->id,
            'name' => $guardian->name,
            'email' => $guardian->email,
            'relationship_label' => $guardian->relationship_label,
            'organization_name' => $guardian->organization?->name,
            'organization_unit_name' => $guardian->organizationUnit?->name,
        ];
    }

    protected function resolveStudent(?Authenticatable $student): ?array
    {
        if (! $student instanceof \App\Models\Student) {
            return null;
        }

        return [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email_contact,
            'level' => $student->level,
            'organization_name' => $student->organization?->name,
            'organization_unit_name' => $student->organizationUnit?->name,
        ];
    }
}
