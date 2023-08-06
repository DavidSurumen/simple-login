<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    // logic for user registration
    public function register(Request $request)
    {
        // inspecting the request object
        Log::debug($request->json()->all());

        $validatedData = $request->all();

        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        //return redirect()->route('home')->with('success', 'Registration successful!');
        return response()->json(['success' => true]);
    }
}
