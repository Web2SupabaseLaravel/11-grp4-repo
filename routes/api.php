<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantManager\TableController;
use App\Http\Controllers\CustomerInfoController;



//DiningTable
Route::get('/dining-table', [TableController::class, 'index']);
Route::post('/dining-table', [TableController::class, 'store']);
Route::get('/dining-table/{id}', [TableController::class, 'show']);
Route::put('/dining-table/{id}', [TableController::class, 'update']);
Route::delete('/dining-table/{id}', [TableController::class, 'destroy']);

//CustomerInfo
Route::get('/customers', [CustomerInfoController::class, 'index']);
Route::post('/customers', [CustomerInfoController::class, 'store']);
Route::get('/customers/{id}', [CustomerInfoController::class, 'show']); 
Route::put('/customers/{id}', [CustomerInfoController::class, 'update']);
Route::delete('/customers/{id}', [CustomerInfoController::class, 'destroy']); 
