<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Ana Martins',
            'email' => 'ana@educapro.local',
            'teaching_focus' => 'General English and conversation classes',
        ]);

        $this->call([
            EducaProSeeder::class,
        ]);
    }
}
