<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | هنا بنحدد أي الـ origins مسموح لهم يطلبوا من الـ API تبعنا.
    |
    */

    // مسارات الـ routes اللي بدنا نفعّل لها CORS
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // methods مسموح بها
    'allowed_methods' => ['*'],

    // origins (Front) مسموح لهم يطلبوا
    'allowed_origins' => [
        'http://localhost:3000',  // لو React على 3000
        'http://localhost:5173',  // أو لو Vite على 5173
    ],

    // لو بترسل credentials مع الطلب (cookie أو Authorization)
    'supports_credentials' => false,

    // أوراق headers مسموح فيها الطلب
    'allowed_headers' => ['*'],

    // أوراق headers بدنا نعرضها بالرد
    'exposed_headers' => [],

    // كم ثانية browsers يحتفظوا بـ preflight cache
    'max_age' => 0,
];
