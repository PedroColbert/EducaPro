<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_class_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('skill', 50);
            $table->decimal('score', 4, 1);
            $table->text('feedback')->nullable();
            $table->date('evaluated_at');
            $table->timestamps();

            $table->index(['student_id', 'skill']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
