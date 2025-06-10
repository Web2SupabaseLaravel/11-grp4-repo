<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantManager\RestaurantController;
use App\Http\Controllers\AuthController;

// Authentication Routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

// Routes for Restaurant Management
Route::prefix('manager')->group(function () {
    Route::get('/restaurants', [RestaurantController::class, 'index']);
    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::put('/restaurants/{restaurant_id}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{restaurant_id}', [RestaurantController::class, 'destroy']);
});
