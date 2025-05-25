<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\RestaurantManager\TableController;
use App\Http\Controllers\CustomerInfoController;

//Users
//+important notes for admin
Route::get('/users', [AuthController::class, 'index']); //لجلب اليوزرات عالادمن
Route::post('/register', [AuthController::class, 'register']); // لتسجيل الدخول لاول مره
Route::post('/login', [AuthController::class, 'login']);
Route::post('/google-login', [AuthController::class, 'googleLogin']); // لتسجيل الدخول عن طريق جوجل
Route::put('/users/{user_id}', [AuthController::class, 'update']); // للتعديل على اليوزر في الادمن
Route::delete('/users/{user_id}', [AuthController::class, 'destroy']); // لحذف اليوزر في الادمن
