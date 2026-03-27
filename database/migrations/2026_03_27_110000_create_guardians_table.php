<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guardians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('relationship_label', 50)->default('responsavel');
            $table->json('settings')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();

            $table->index(['organization_id', 'relationship_label']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guardians');
    }
};
