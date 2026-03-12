<?php

namespace App\Http\Controllers;

use App\Http\Requests\AgendaItemIndexRequest;
use App\Models\AgendaItem;
use Inertia\Inertia;
use Inertia\Response;

class AgendaItemController extends Controller
{
    public function index(AgendaItemIndexRequest $request): Response
    {
        $filters = $request->validated();

        $agendaItems = AgendaItem::query()
            ->with('schoolClass:id,name,color')
            ->when($filters['type'] ?? null, fn ($query, string $type) => $query->where('type', $type))
            ->orderBy('starts_at')
            ->get();

        return Inertia::render('Agenda/Index', [
            'filters' => $filters,
            'agendaItems' => $agendaItems,
        ]);
    }
}
