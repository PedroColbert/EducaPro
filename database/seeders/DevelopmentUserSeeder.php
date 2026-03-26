<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DevelopmentUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@educapro.com'],
            [
                'name' => 'Admin EducaPro',
                'password' => '12345678',
                'timezone' => 'America/Sao_Paulo',
                'locale' => 'pt_BR',
                'teaching_focus' => 'Painel pessoal de desenvolvimento do EducaPro',
                'email_verified_at' => now(),
            ],
        );
    }
}
