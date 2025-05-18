<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomerInfo;

class CustomerInfoController extends Controller
{
    public function indexView()
    {
        $customers = CustomerInfo::all();
        return view('CustomerInfo.index', compact('customers'));
    }

    public function store(Request $request)
{
    try {
        $data = $request->validate([
            'user_id'     => 'required|integer',
            'notes'       => 'required|string',
            'preferences' => 'nullable|string',
        ]);

        $customer = CustomerInfo::create($data);

        return response()->json($customer, 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'حدث خطأ في الخادم: ' . $e->getMessage()
        ], 500);
    }
}

}