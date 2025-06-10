<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // تسجيل الدخول
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'البريد أو كلمة المرور غير صحيحة ⚠️'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
'user' => JWTAuth::user(),
        ]);
    }

    // تسجيل مستخدم جديد
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'roletype' => 'required|string',
            'restaurant_id' => 'required|integer',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'roletype' => $request->roletype,
            'restaurant_id' => $request->restaurant_id,
            'social_login' => false,
            'is_active' => true,
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ], 201);
    }

    // جلب بيانات المستخدم من التوكن
    public function me(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'توكن غير صالح أو منتهي الصلاحية'], 401);
        }
    }

    // تسجيل خروج (عن طريق حذف التوكن)
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'تم تسجيل الخروج بنجاح ✅']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'فشل تسجيل الخروج'], 500);
        }
    }

    // تجديد التوكن
    public function refresh()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            return response()->json([
                'access_token' => $newToken,
                'token_type' => 'bearer',
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'لا يمكن تجديد التوكن'], 401);
        }
    }
}
