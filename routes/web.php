<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;


    Route::get('/users', [AuthController::class,'index'])->name('users.index');
    Route::post('/users', [AuthController::class,'store'])->name('users.store');
    Route::put('/users{id}' ,[AuthController::class,'update'])->name('users.update');
    Route::delete('/users{id}' ,[AuthController::class,'destroy'])->name('users.destroy');





