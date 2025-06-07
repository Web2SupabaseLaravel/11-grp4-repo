<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TableController;
use App\Http\Controllers\CustomerInfoController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UsersController;


//users
Route::get('/users', [UsersController::class, 'index']); //لجلب اليوزرات عالادمن
Route::post('/register', [UsersController::class, 'register']); // لتسجيل الدخول لاول مره
Route::post('/login', [UsersController::class, 'login']);
Route::post('/google-login', [UsersController::class, 'googleLogin']); // لتسجيل الدخول عن طريق جوجل
Route::put('/users/{user_id}', [UsersController::class, 'update']); // للتعديل على اليوزر في الادمن
Route::delete('/users/{user_id}', [UsersController::class, 'destroy']); // لحذف اليوزر في الادمنv



//Reservation
Route::middleware('api')->group(function () {
    Route::apiResource('reservations', ReservationController::class);
});

//Restaurants
Route::prefix('manager')->group(function () {
    Route::get('/restaurants', [RestaurantController::class, 'index']);
    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::put('/restaurants/{restaurant_id}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{restaurant_id}', [RestaurantController::class, 'destroy']);
});

//DiningTable
Route::get('/dining-table', [TableController::class, 'index']);
Route::post('/dining-table', [TableController::class, 'store']);
Route::get('/dining-table/{id}', [TableController::class, 'show']);
Route::put('/dining-table/{id}', [TableController::class, 'update']);
Route::delete('/dining-table/{id}', [TableController::class, 'destroy']);
Route::get('/dining-table/by-restaurant/{restaurant_id}', [TableController::class, 'getByRestaurant']);


//CustomerInfo
Route::get('/customers', [CustomerInfoController::class, 'index']);
Route::post('/customers', [CustomerInfoController::class, 'store']);
Route::get('/customers/{id}', [CustomerInfoController::class, 'show']);
Route::put('/customers/{id}', [CustomerInfoController::class, 'update']);
Route::delete('/customers/{id}', [CustomerInfoController::class, 'destroy']);

//Reports
Route::get('/report', [ReportController::class, 'index']);           // عرض كل التقارير
Route::post('/report', [ReportController::class, 'store']);          // إنشاء تقرير جديد
Route::get('/report/{report}', [ReportController::class, 'show']);   // عرض تقرير معين
Route::put('/report/{report}', [ReportController::class, 'update']); // تحديث تقرير معين
Route::delete('/report/{report}', [ReportController::class, 'destroy']);

