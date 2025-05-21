<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::middleware('api')->group(function () {
    Route::apiResource('reservations', ReservationController::class);
});
