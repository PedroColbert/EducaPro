<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialIndexRequest;
use App\Models\Material;
use Inertia\Inertia;
use Inertia\Response;

class MaterialController extends Controller
{
    public function index(MaterialIndexRequest $request): Response
    {
        $filters = $request->validated();

        $materials = Material::query()
            ->when($filters['search'] ?? null, fn ($query, string $search) => $query->where('title', 'like', "%{$search}%"))
            ->when($filters['category'] ?? null, fn ($query, string $category) => $query->where('category', $category))
            ->orderByDesc('is_favorite')
            ->orderBy('title')
            ->get();

        return Inertia::render('Materials/Index', [
            'filters' => $filters,
            'materials' => $materials,
        ]);
    }
}
