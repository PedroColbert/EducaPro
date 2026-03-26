<?php

namespace Database\Seeders;

use App\Models\AgendaItem;
use App\Models\Assignment;
use App\Models\AssignmentSubmission;
use App\Models\Attendance;
use App\Models\Evaluation;
use App\Models\LessonPlan;
use App\Models\LessonRecord;
use App\Models\Material;
use App\Models\PedagogicalNote;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class EducaProSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()
            ->where('email', 'admin@educapro.com')
            ->firstOrFail();

        $classes = collect([
            SchoolClass::query()->create([
                'user_id' => $user->id,
                'name' => 'Teens B1 Tuesday',
                'level' => 'B1',
                'schedule_description' => 'Terca e quinta, 19h as 20h',
                'color' => '#0f766e',
                'progress' => 64,
            ]),
            SchoolClass::query()->create([
                'user_id' => $user->id,
                'name' => 'Adults Conversation',
                'level' => 'B2',
                'schedule_description' => 'Segunda e quarta, 20h30 as 21h30',
                'color' => '#ea580c',
                'progress' => 48,
            ]),
            SchoolClass::query()->create([
                'user_id' => $user->id,
                'name' => 'Private Starter',
                'level' => 'A2',
                'schedule_description' => 'Sexta, 18h',
                'color' => '#7c3aed',
                'progress' => 81,
            ]),
        ]);

        $students = collect([
            ['name' => 'Livia Costa', 'age' => 14, 'level' => 'B1', 'status' => 'excellent', 'email_contact' => 'livia@example.com'],
            ['name' => 'Rafael Nunes', 'age' => 15, 'level' => 'B1', 'status' => 'good', 'email_contact' => 'rafael@example.com'],
            ['name' => 'Camila Siqueira', 'age' => 28, 'level' => 'B2', 'status' => 'good', 'email_contact' => 'camila@example.com'],
            ['name' => 'Bruno Azevedo', 'age' => 33, 'level' => 'B2', 'status' => 'attention', 'email_contact' => 'bruno@example.com'],
            ['name' => 'Helena Rocha', 'age' => 11, 'level' => 'A2', 'status' => 'excellent', 'email_contact' => 'helena@example.com'],
        ])->map(fn (array $student) => Student::query()->create([
            'user_id' => $user->id,
            'phone_contact' => '(11) 99999-0000',
            'notes' => 'Aluno acompanhado individualmente pela professora.',
            ...$student,
        ]));

        $classes[0]->students()->attach([$students[0]->id, $students[1]->id]);
        $classes[1]->students()->attach([$students[2]->id, $students[3]->id]);
        $classes[2]->students()->attach([$students[4]->id]);

        $materials = collect([
            ['title' => 'B1 Conversation Prompts', 'type' => 'pdf', 'category' => 'Speaking', 'level' => 'B1', 'file_path_or_url' => 'materials/conversation-prompts.pdf', 'is_favorite' => true],
            ['title' => 'Present Perfect Video', 'type' => 'video', 'category' => 'Grammar', 'level' => 'B1', 'file_path_or_url' => 'https://example.com/present-perfect', 'is_favorite' => false],
            ['title' => 'Listening Warmup Playlist', 'type' => 'link', 'category' => 'Listening', 'level' => 'B2', 'file_path_or_url' => 'https://example.com/listening-playlist', 'is_favorite' => true],
        ])->map(fn (array $material) => Material::query()->create([
            'user_id' => $user->id,
            ...$material,
        ]));

        $plans = collect([
            LessonPlan::query()->create([
                'user_id' => $user->id,
                'school_class_id' => $classes[0]->id,
                'planned_for' => now()->addDays(2)->toDateString(),
                'topic' => 'Past experiences and travel stories',
                'objectives' => ['Expandir vocabulário de viagens', 'Praticar present perfect'],
                'content' => ['Icebreaker', 'Listening', 'Controlled speaking', 'Homework briefing'],
                'status' => 'planned',
            ]),
            LessonPlan::query()->create([
                'user_id' => $user->id,
                'school_class_id' => $classes[1]->id,
                'planned_for' => now()->addDays(1)->toDateString(),
                'topic' => 'Debate: remote work routines',
                'objectives' => ['Ganhar fluidez', 'Trabalhar connectors'],
                'content' => ['Warm-up', 'Prompt cards', 'Feedback notes'],
                'status' => 'draft',
            ]),
        ]);

        $plans[0]->materials()->attach([$materials[0]->id, $materials[1]->id]);
        $plans[1]->materials()->attach([$materials[2]->id]);

        $records = collect([
            LessonRecord::query()->create([
                'user_id' => $user->id,
                'school_class_id' => $classes[0]->id,
                'lesson_plan_id' => $plans[0]->id,
                'taught_on' => now()->subDays(2)->toDateString(),
                'topic_taught' => 'Travel mishaps storytelling',
                'participation_level' => 'high',
                'difficulties_noted' => 'Alguns alunos ainda confundem present perfect com simple past.',
                'general_notes' => 'A turma respondeu bem aos prompts em duplas.',
            ]),
            LessonRecord::query()->create([
                'user_id' => $user->id,
                'school_class_id' => $classes[1]->id,
                'taught_on' => now()->subDay()->toDateString(),
                'topic_taught' => 'Opinion phrases for meetings',
                'participation_level' => 'medium',
                'difficulties_noted' => 'Bruno precisou de mais apoio para organizar argumentos.',
                'general_notes' => 'Bom ritmo, mas preciso revisar discourse markers.',
            ]),
        ]);

        foreach ($classes[0]->students as $student) {
            Attendance::query()->create([
                'lesson_record_id' => $records[0]->id,
                'student_id' => $student->id,
                'status' => $student->id === $students[1]->id ? 'late' : 'present',
                'observation' => $student->id === $students[1]->id ? 'Chegou 10 minutos atrasado.' : null,
            ]);
        }

        foreach ($classes[1]->students as $student) {
            Attendance::query()->create([
                'lesson_record_id' => $records[1]->id,
                'student_id' => $student->id,
                'status' => $student->id === $students[3]->id ? 'absent' : 'present',
                'observation' => $student->id === $students[3]->id ? 'Faltou sem justificativa.' : null,
            ]);
        }

        $assignments = collect([
            Assignment::query()->create([
                'user_id' => $user->id,
                'school_class_id' => $classes[0]->id,
                'title' => 'Travel diary paragraph',
                'description' => 'Escrever um parágrafo usando present perfect e simple past.',
                'due_date' => now()->addDays(4),
                'status' => 'assigned',
            ]),
            Assignment::query()->create([
                'user_id' => $user->id,
                'school_class_id' => $classes[1]->id,
                'title' => 'Meeting phrases audio response',
                'description' => 'Gravar uma resposta curta com opinião e justificativa.',
                'due_date' => now()->addDays(2),
                'status' => 'reviewing',
            ]),
        ]);

        foreach ($classes[0]->students as $student) {
            AssignmentSubmission::query()->create([
                'assignment_id' => $assignments[0]->id,
                'student_id' => $student->id,
                'status' => $student->id === $students[0]->id ? 'submitted' : 'pending',
                'grade' => $student->id === $students[0]->id ? 9.2 : null,
                'teacher_feedback' => $student->id === $students[0]->id ? 'Muito boa organização de ideias.' : null,
            ]);
        }

        foreach ($classes[1]->students as $student) {
            AssignmentSubmission::query()->create([
                'assignment_id' => $assignments[1]->id,
                'student_id' => $student->id,
                'status' => 'submitted',
                'grade' => null,
                'teacher_feedback' => null,
            ]);
        }

        Evaluation::query()->create([
            'student_id' => $students[0]->id,
            'school_class_id' => $classes[0]->id,
            'title' => 'Speaking checkpoint',
            'skill' => 'speaking',
            'score' => 9.4,
            'feedback' => 'Boa autonomia ao se expressar.',
            'evaluated_at' => now()->subWeek()->toDateString(),
        ]);

        Evaluation::query()->create([
            'student_id' => $students[3]->id,
            'school_class_id' => $classes[1]->id,
            'title' => 'Listening checkpoint',
            'skill' => 'listening',
            'score' => 7.1,
            'feedback' => 'Precisa revisar inferência em áudios mais rápidos.',
            'evaluated_at' => now()->subDays(10)->toDateString(),
        ]);

        PedagogicalNote::query()->create([
            'user_id' => $user->id,
            'student_id' => $students[0]->id,
            'category' => 'strength',
            'note' => 'Tem boa iniciativa para puxar conversa em inglês.',
            'noted_at' => now()->subDays(3),
        ]);

        PedagogicalNote::query()->create([
            'user_id' => $user->id,
            'student_id' => $students[3]->id,
            'category' => 'attention',
            'note' => 'Precisa de reforço nas estruturas para opinião.',
            'noted_at' => now()->subDays(5),
        ]);

        AgendaItem::query()->create([
            'user_id' => $user->id,
            'school_class_id' => $classes[0]->id,
            'title' => 'Teens B1 - aula com storytelling',
            'starts_at' => now()->addDay()->setTime(19, 0),
            'ends_at' => now()->addDay()->setTime(20, 0),
            'type' => 'class',
            'is_completed' => false,
        ]);

        AgendaItem::query()->create([
            'user_id' => $user->id,
            'school_class_id' => $classes[1]->id,
            'title' => 'Corrigir audios de homework',
            'starts_at' => now()->addDay()->setTime(17, 30),
            'ends_at' => now()->addDay()->setTime(18, 30),
            'type' => 'correction',
            'is_completed' => false,
        ]);

        AgendaItem::query()->create([
            'user_id' => $user->id,
            'title' => 'Planejar aula particular de sexta',
            'starts_at' => now()->addDays(2)->setTime(14, 0),
            'ends_at' => now()->addDays(2)->setTime(15, 0),
            'type' => 'planning',
            'is_completed' => false,
        ]);
    }
}
