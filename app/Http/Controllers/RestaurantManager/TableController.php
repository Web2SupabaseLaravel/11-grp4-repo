<?php

namespace App\Http\Controllers\RestaurantManager;

use App\Http\Controllers\Controller;
use App\Models\DiningTable;
use Illuminate\Http\Request;

class TableController extends Controller
{

    public function index()
    {
        return DiningTable::all();
    }


     public function indexView() //get
{
    $table = DiningTable::all();
    return view('dining_table.index', compact('table'));
}
    

    public function store(Request $request) //post
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

    public function update(Request $request, $id) //put
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

    public function destroy($id) //delete 
    {
        DiningTable::destroy($id);

        return response()->json(null, 204);
    }
}