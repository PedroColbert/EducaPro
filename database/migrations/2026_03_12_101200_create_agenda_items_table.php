<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agenda_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('school_class_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->dateTime('starts_at');
            $table->dateTime('ends_at')->nullable();
            $table->string('type', 20);
            $table->boolean('is_completed')->default(false);
            $table->timestamps();

            $table->index(['user_id', 'starts_at']);
            $table->index(['type', 'is_completed']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agenda_items');
    }
};
