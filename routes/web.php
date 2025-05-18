<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RestaurantManager\TableController;
use App\Http\Controllers\CustomerInfoController;


Route::get('/dining-table', [TableController::class, 'indexView'])->name('dining-table.index');
Route::post('/dining-table', [TableController::class, 'store'])->name('dining-table.store');
Route::put('/dining-table/{id}', [TableController::class, 'update'])->name('dining-table.update');
Route::delete('/dining-table/{id}', [TableController::class, 'destroy'])->name('dining-table.destroy');

Route::get('/Customer-Info', [CustomerInfoController::class, 'indexView'])->name('CustomerInfo.index');
Route::post('/Customer-Info', [CustomerInfoController::class, 'store'])->name('CustomerInfo.store');