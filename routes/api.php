<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ReportController;



//we will not use thunder it dosnt have documentation
//ok 
// API routes for reports
  
Route::get('/report', [ReportController::class, 'index']);           // عرض كل التقارير
Route::post('/report', [ReportController::class, 'store']);          // إنشاء تقرير جديد
Route::get('/report/{report}', [ReportController::class, 'show']);   // عرض تقرير معين
Route::put('/report/{report}', [ReportController::class, 'update']); // تحديث تقرير معين
Route::delete('/report/{report}', [ReportController::class, 'destroy']);