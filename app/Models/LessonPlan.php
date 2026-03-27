<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LessonPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'organization_id',
        'school_class_id',
        'planned_for',
        'topic',
        'objectives',
        'content',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'planned_for' => 'date',
            'objectives' => 'array',
            'content' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class);
    }

    public function lessonRecords(): HasMany
    {
        return $this->hasMany(LessonRecord::class);
    }

    public function materials(): BelongsToMany
    {
        return $this->belongsToMany(Material::class)->withTimestamps();
    }
}
