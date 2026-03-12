<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LessonPlanIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'status' => ['nullable', 'in:draft,planned,completed'],
        ];
    }
}
