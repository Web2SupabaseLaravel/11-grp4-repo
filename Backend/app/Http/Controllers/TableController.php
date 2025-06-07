<?php

namespace App\Http\Controllers;

use App\Models\DiningTable;
use Illuminate\Http\Request;

class TableController extends Controller
{
    public function index()
    {
        return response()->json(DiningTable::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'restaurant_id'    => 'required|integer',
            'number'           => 'required|integer',
            'seating_capacity' => 'required|integer',
            'location'         => 'nullable|string',
            'status'           => 'required|boolean',
        ]);

        $table = DiningTable::create($data);

        return response()->json($table, 201);
    }

    public function show($id)
    {
        $table = DiningTable::findOrFail($id);
        return response()->json($table);
    }

    public function update(Request $request, $id)
    {
        $table = DiningTable::findOrFail($id);

        $data = $request->validate([
            'restaurant_id'    => 'sometimes|integer',
            'number'           => 'sometimes|integer',
            'seating_capacity' => 'sometimes|integer',
            'location'         => 'nullable|string',
            'status'           => 'sometimes|boolean',
        ]);

        $table->update($data);

        return response()->json($table);
    }

    public function destroy($id)
    {
        DiningTable::destroy($id);
        return response()->json(null, 204);
    }

    // ✅ New method: Get tables by restaurant_id
    public function getByRestaurant($restaurant_id)
    {
        $tables = DiningTable::where('restaurant_id', $restaurant_id)->get();
        return response()->json($tables);
    }
}
