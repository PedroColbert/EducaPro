<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\OrganizationUnit;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DevelopmentUserSeeder extends Seeder
{
    public function run(): void
    {
        $organization = Organization::query()->updateOrCreate(
            ['slug' => 'educapro-demo'],
            [
                'name' => 'EducaPro Demo Workspace',
                'category' => 'course_provider',
                'timezone' => 'America/Sao_Paulo',
                'locale' => 'pt_BR',
                'settings' => [
                    'labels' => [
                        'students' => 'Estudantes',
                        'classes' => 'Turmas e grupos',
                        'lessonPlans' => 'Planejamento',
                        'materials' => 'Recursos',
                        'activities' => 'Atividades',
                        'agenda' => 'Agenda',
                    ],
                    'teaching_modes' => ['in_person', 'online', 'hybrid'],
                ],
            ],
        );

        $unit = OrganizationUnit::query()->updateOrCreate(
            [
                'organization_id' => $organization->id,
                'name' => 'Unidade Paulista',
            ],
            [
                'code' => 'PAULISTA',
                'city' => 'Sao Paulo',
                'state' => 'SP',
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'admin@educapro.com'],
            [
                'organization_id' => $organization->id,
                'organization_unit_id' => $unit->id,
                'name' => 'Admin EducaPro',
                'display_name' => 'Clara Gestora',
                'password' => '12345678',
                'timezone' => 'America/Sao_Paulo',
                'locale' => 'pt_BR',
                'teaching_focus' => 'Gestao institucional e configuracao academica',
                'role' => 'admin',
                'settings' => [
                    'avatar' => Str::of('Clara Gestora')
                        ->explode(' ')
                        ->filter()
                        ->take(2)
                        ->map(fn (string $part) => Str::upper(Str::substr($part, 0, 1)))
                        ->implode(''),
                ],
                'email_verified_at' => now(),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'coordenacao@educapro.com'],
            [
                'organization_id' => $organization->id,
                'organization_unit_id' => $unit->id,
                'name' => 'Coordenacao EducaPro',
                'display_name' => 'Marina Coordenadora',
                'password' => '12345678',
                'timezone' => 'America/Sao_Paulo',
                'locale' => 'pt_BR',
                'teaching_focus' => 'Coordenacao pedagogica, acompanhamento e suporte docente',
                'role' => 'coordinator',
                'settings' => [
                    'avatar' => Str::of('Marina Coordenadora')
                        ->explode(' ')
                        ->filter()
                        ->take(2)
                        ->map(fn (string $part) => Str::upper(Str::substr($part, 0, 1)))
                        ->implode(''),
                ],
                'email_verified_at' => now(),
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'professor@educapro.com'],
            [
                'organization_id' => $organization->id,
                'organization_unit_id' => $unit->id,
                'name' => 'Professor EducaPro',
                'display_name' => 'Alex Educador',
                'password' => '12345678',
                'timezone' => 'America/Sao_Paulo',
                'locale' => 'pt_BR',
                'teaching_focus' => 'Planejamento, acompanhamento de turmas e registro de rotina academica',
                'role' => 'teacher',
                'settings' => [
                    'avatar' => Str::of('Alex Educador')
                        ->explode(' ')
                        ->filter()
                        ->take(2)
                        ->map(fn (string $part) => Str::upper(Str::substr($part, 0, 1)))
                        ->implode(''),
                ],
                'email_verified_at' => now(),
            ],
        );
    }
}
