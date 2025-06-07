<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    public function index()
    {
        return response()->json(Users::all());
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'roletype' => 'required|string'
        ]);

        $user = Users::create([
            'email'         => $validated['email'],
            'password'      => Hash::make($validated['password']),
            'roletype'      => $validated['roletype'],
            'is_active'     => true,
            'social_login'  => false,
            'created_at'    => now(),
            'updated_at'    => now()
        ]);

        return response()->json($user, 201);
    }

    // ✅ Login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = Users::where('email', $request->email)->first();

        if (
            !$user ||
            !Hash::check($request->password, $user->password) ||
            !$user->is_active
        ) {
            return response()->json(['message' => 'Invalid credentials or inactive user'], 401);
        }

        Auth::login($user);

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
            'role'    => $user->roletype
        ]);
    }

    public function googleLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = Users::firstOrCreate(
            ['email' => $request->email],
            [
                'password'      => Hash::make(uniqid()),
                'roletype'      => 'customer',
                'social_login'  => true,
                'is_active'     => true,
                'created_at'    => now(),
                'updated_at'    => now()
            ]
        );

        Auth::login($user);

        return response()->json([
            'message' => 'Google login successful',
            'user'    => $user,
            'role'    => $user->roletype
        ]);
    }


    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
            'role' => $request->user()?->roletype
        ]);
    }

    public function update(Request $request, $user_id)
    {
        $user = Users::findOrFail($user_id);

        $data = $request->validate([
            'email'     => 'nullable|email|unique:users,email,' . $user_id . ',user_id',
            'roletype'  => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $user->update($data);
        return response()->json(['message' => 'Updated', 'user' => $user]);
    }

    public function destroy($user_id)
    {
        Users::destroy($user_id);
        return response()->json(['message' => 'User deleted'], 204);
    }
}
