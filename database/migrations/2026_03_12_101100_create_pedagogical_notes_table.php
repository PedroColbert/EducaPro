<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedagogical_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('category', 50)->default('observation');
            $table->text('note');
            $table->dateTime('noted_at');
            $table->timestamps();

            $table->index(['student_id', 'category']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedagogical_notes');
    }
};
