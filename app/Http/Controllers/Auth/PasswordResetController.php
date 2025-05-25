<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;


class PasswordResetController extends Controller
{
    public function change(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user = Users::where('email', $request->email)->first();

        if ($user->social_login) {
            return response()->json(['message' => 'Cannot change password for Google accounts'], 403);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json(['message' => 'Password updated']);
    }

}