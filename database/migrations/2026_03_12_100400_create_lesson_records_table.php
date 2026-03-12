<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_class_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lesson_plan_id')->nullable()->constrained()->nullOnDelete();
            $table->date('taught_on');
            $table->string('topic_taught');
            $table->string('participation_level', 20)->nullable();
            $table->text('difficulties_noted')->nullable();
            $table->text('general_notes')->nullable();
            $table->timestamps();

            $table->index(['school_class_id', 'taught_on']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_records');
    }
};
