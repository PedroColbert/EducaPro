<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('type', 20);
            $table->string('category', 100);
            $table->string('level', 50)->nullable();
            $table->string('file_path_or_url');
            $table->boolean('is_favorite')->default(false);
            $table->timestamps();

            $table->index(['user_id', 'category']);
            $table->index(['user_id', 'is_favorite']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};
