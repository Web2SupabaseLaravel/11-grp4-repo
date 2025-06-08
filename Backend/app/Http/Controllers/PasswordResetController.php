<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\password_resets;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'البريد غير صالح أو غير موجود'], 422);
        }

        $token = Str::random(60);

        password_resets::updateOrCreate(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'token' => $token,
                'created_at' => Carbon::now()

            ]
        );

        $resetUrl = url('/reset-password?token=' . $token . '&email=' . urlencode($request->email));

        Mail::raw("Reset your password using the following link: $resetUrl", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Password Reset');
        });

        return response()->json(['message' => 'Password reset email sent']);
    }
}
