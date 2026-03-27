<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('organization_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->string('display_name')->nullable()->after('name');
            $table->string('role', 50)->default('teacher')->after('teaching_focus');
            $table->json('settings')->nullable()->after('role');

            $table->index(['organization_id', 'role']);
        });

        Schema::table('school_classes', function (Blueprint $table) {
            $table->foreignId('organization_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            $table->foreignId('academic_subject_id')->nullable()->after('organization_id')->constrained()->nullOnDelete();
            $table->string('delivery_mode', 20)->default('in_person')->after('level');
            $table->string('audience_type', 20)->default('group')->after('delivery_mode');
            $table->json('settings')->nullable()->after('progress');

            $table->index(['organization_id', 'delivery_mode']);
        });

        Schema::table('students', function (Blueprint $table) {
            $table->foreignId('organization_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
            $table->string('external_reference', 80)->nullable()->after('phone_contact');

            $table->index(['organization_id', 'level']);
        });

        foreach (['lesson_plans', 'lesson_records', 'materials', 'assignments', 'evaluations', 'pedagogical_notes', 'agenda_items'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->foreignId('organization_id')->nullable()->after('user_id')->constrained()->nullOnDelete();
                $table->index('organization_id');
            });
        }
    }

    public function down(): void
    {
        foreach (['agenda_items', 'pedagogical_notes', 'evaluations', 'assignments', 'materials', 'lesson_records', 'lesson_plans'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropConstrainedForeignId('organization_id');
            });
        }

        Schema::table('students', function (Blueprint $table) {
            $table->dropIndex(['organization_id', 'level']);
            $table->dropConstrainedForeignId('organization_id');
            $table->dropColumn('external_reference');
        });

        Schema::table('school_classes', function (Blueprint $table) {
            $table->dropIndex(['organization_id', 'delivery_mode']);
            $table->dropConstrainedForeignId('organization_id');
            $table->dropConstrainedForeignId('academic_subject_id');
            $table->dropColumn(['delivery_mode', 'audience_type', 'settings']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['organization_id', 'role']);
            $table->dropConstrainedForeignId('organization_id');
            $table->dropColumn(['display_name', 'role', 'settings']);
        });
    }
};
