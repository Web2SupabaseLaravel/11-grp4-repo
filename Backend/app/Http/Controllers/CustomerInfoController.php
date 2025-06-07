<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomerInfo;

class CustomerInfoController extends Controller
{
    public function index()
    {
        return response()->json(CustomerInfo::all());
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'user_id'     => 'required|integer',
                'notes'       => 'required|string',
                'preferences' => 'nullable|string',
                'Name'        => 'required|string',
            ]);

            $customer = CustomerInfo::create($data);
            return response()->json($customer, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        return response()->json(CustomerInfo::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $customer = CustomerInfo::findOrFail($id);

        $data = $request->validate([
            'user_id'     => 'required|integer',
            'notes'       => 'required|string',
            'preferences' => 'nullable|string',
            'Name'        => 'required|string',
        ]);

        $customer->update($data);
        return response()->json($customer);
    }

    public function destroy($id)
    {
        $customer = CustomerInfo::findOrFail($id);
        $customer->delete();
        return response()->json(null, 204);
    }
}
