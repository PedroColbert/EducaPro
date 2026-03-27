<?php

namespace App\Policies;

use App\Models\Guardian;
use App\Models\Student;
use App\Models\User;

class StudentPolicy
{
    public function view(User|Guardian|Student $actor, Student $student): bool
    {
        if ($actor instanceof User) {
            if ($actor->organization_id !== $student->organization_id) {
                return false;
            }

            return match ($actor->role) {
                'admin' => true,
                'coordinator' => $actor->organization_unit_id === null || $actor->organization_unit_id === $student->organization_unit_id,
                default => $student->user_id === $actor->id
                    || $student->schoolClasses()
                        ->whereHas('staff', fn ($query) => $query->whereKey($actor->id))
                        ->exists(),
            };
        }

        if ($actor instanceof Student) {
            return $actor->is($student);
        }

        return $actor->students()->whereKey($student->id)->exists();
    }
}
