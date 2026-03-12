<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('level', 50);
            $table->string('schedule_description')->nullable();
            $table->string('color', 20)->default('#2563eb');
            $table->unsignedTinyInteger('progress')->default(0);
            $table->timestamps();

            $table->index(['user_id', 'level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_classes');
    }
};
