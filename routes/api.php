<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantManager\RestaurantController;

// Routes for Restaurant Management
Route::prefix('manager')->group(function () {
    Route::get('/restaurants', [RestaurantController::class, 'index']);
    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::put('/restaurants/{restaurant_id}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{restaurant_id}', [RestaurantController::class, 'destroy']);
});


