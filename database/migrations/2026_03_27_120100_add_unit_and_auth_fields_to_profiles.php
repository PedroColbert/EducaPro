<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('organization_unit_id')->nullable()->after('organization_id')->constrained('organization_units')->nullOnDelete();
        });

        Schema::table('students', function (Blueprint $table) {
            $table->foreignId('organization_unit_id')->nullable()->after('organization_id')->constrained('organization_units')->nullOnDelete();
            $table->string('password')->nullable()->after('external_reference');
            $table->rememberToken();
            $table->json('settings')->nullable()->after('notes');
        });

        Schema::table('guardians', function (Blueprint $table) {
            $table->foreignId('organization_unit_id')->nullable()->after('organization_id')->constrained('organization_units')->nullOnDelete();
        });

        Schema::table('school_classes', function (Blueprint $table) {
            $table->foreignId('organization_unit_id')->nullable()->after('organization_id')->constrained('organization_units')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('school_classes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('organization_unit_id');
        });

        Schema::table('guardians', function (Blueprint $table) {
            $table->dropConstrainedForeignId('organization_unit_id');
        });

        Schema::table('students', function (Blueprint $table) {
            $table->dropConstrainedForeignId('organization_unit_id');
            $table->dropColumn(['password', 'remember_token', 'settings']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('organization_unit_id');
        });
    }
};
