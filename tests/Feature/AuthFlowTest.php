<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed();
    }

    public function test_guest_root_redirects_to_login(): void
    {
        $this->get('/')
            ->assertRedirect(route('login'));
    }

    public function test_admin_login_redirects_to_admin_dashboard(): void
    {
        $this->post('/login', [
            'email' => 'admin@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('admin.dashboard', absolute: false));
    }

    public function test_coordination_login_redirects_to_coordination_dashboard(): void
    {
        $this->post('/login', [
            'email' => 'coordenacao@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('coordinator.dashboard', absolute: false));
    }

    public function test_teacher_login_redirects_to_teaching_dashboard(): void
    {
        $this->post('/login', [
            'email' => 'professor@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('teacher.dashboard', absolute: false));
    }

    public function test_student_login_redirects_to_student_portal(): void
    {
        $this->post('/student/login', [
            'email' => 'aluno@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('student.portal', absolute: false));
    }

    public function test_guardian_login_redirects_to_guardian_portal(): void
    {
        $this->post('/family/login', [
            'email' => 'familia@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('guardian.portal', absolute: false));
    }

    public function test_student_login_replaces_guardian_session_in_same_browser(): void
    {
        $this->post('/family/login', [
            'email' => 'familia@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('guardian.portal', absolute: false));

        $this->post('/student/login', [
            'email' => 'aluno@educapro.com',
            'password' => '12345678',
        ])->assertRedirect(route('student.portal', absolute: false));

        $this->get('/')
            ->assertRedirect(route('student.portal'));
    }
}
