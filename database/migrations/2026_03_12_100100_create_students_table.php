<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->unsignedTinyInteger('age')->nullable();
            $table->string('level', 50);
            $table->string('email_contact')->nullable();
            $table->string('phone_contact', 30)->nullable();
            $table->string('status', 20)->default('good');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['user_id', 'level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
