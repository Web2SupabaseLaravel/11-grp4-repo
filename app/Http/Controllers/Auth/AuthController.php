<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function index()  //get all user
    {
        $users = Users::all();
        return view('users.index', compact('users'));
    }


    public function store(Request $request)   //post the entered users from the front client
    {
        $validated = $request->validate([
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|string|min:8',
            'roletype'      => 'required|string',
            'restaurant_id' => 'nullable|integer',
            'social_login'  => 'nullable|boolean',
            'is_active'     => 'nullable|boolean',
            'created_at'    => 'nullable|date',
            'updated_at'    => 'nullable|date'
        ]);


        Users::create([
            'email'         => $validated['email'],
            'password'      => Hash::make($validated['password']),
            'roletype'      => $validated['roletype'],
            'restaurant_id' => $validated['restaurant_id'] ?? null,
            'social_login'  => $validated['social_login'] ?? false,
            'is_active'     => $validated['is_active'] ?? true,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);
        return response()->json(null, 204);
    }



    public function update(Request $request, $id)
    {
        $user = Users::findOrFail($id);

        $validated = $request->validate([
            'email' => 'required|email|unique:users,email,' . $id,
            'roletype' => 'required|string',
        ]);

        $user->update([
            'email' => $validated['email'],
            'roletype' => $validated['roletype'],
            'restaurant_id' => $request->restaurant_id,
            'social_login' => $request->social_login ?? false,
            'is_active' => $request->is_active ?? true,
        ]);

          return response()->json(['message' => 'تم التعديل'], 200);
    }



    public function destroy($id)   //delete
    {
        Users::destroy($id);

        return response()->json(null, 204);
    }
}
