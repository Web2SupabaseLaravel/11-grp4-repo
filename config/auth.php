<?php

return [

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'api'), // خليه 'api' بدل 'web' عشان نستخدم jwt افتراضياً
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'jwt', // مهم جداً
            'provider' => 'users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class, // ما في داعي تستعمل env هون، Laravel بياخد المسار مباشرة
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens', // إذا بدك تغير اسم الجدول، غيره من هون
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
