<?php

namespace App\Http\Controllers\RestaurantManager;




use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    // Add Restaurant
    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|integer|unique:restaurants,restaurant_id',
            'name' => 'required|string',
            'address' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email',
            'seating_capacity' => 'nullable|integer',
            'allowsreservationmodification' => 'required|boolean',
        ]);

        $restaurant = Restaurant::create($validated);

        return response()->json([
            'message' => 'تم إضافة المطعم بنجاح',
            'data' => $restaurant
        ], 201);
    }

    // Show all Restaurants
    public function index()
    {
        $restaurants = Restaurant::all();

        return response()->json($restaurants);
    }

    // Update Restaurant
    public function update(Request $request, $restaurant_id)
    {
        $restaurant = Restaurant::findOrFail($restaurant_id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'address' => 'nullable|string',
            'opening_hours' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'email' => 'nullable|email',
            'seating_capacity' => 'nullable|integer',
            'allowsreservationmodification' => 'required|boolean',
        ]);

        $restaurant->update($validated);

        return response()->json([
            'message' => 'تم تحديث بيانات المطعم',
            'data' => $restaurant
        ]);
    }

    // Delete Restaurant
    public function destroy($restaurant_id)
    {
        $restaurant = Restaurant::findOrFail($restaurant_id);
        $restaurant->delete();

        return response()->json(['message' => 'تم حذف المطعم بنجاح']);
    }
}
