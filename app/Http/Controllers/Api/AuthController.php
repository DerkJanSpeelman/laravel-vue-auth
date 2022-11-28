<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function check()
    {
        return response()->json(Auth::guard('api')->check());
    }

    public function register(Request $request)
    {
        $request_data = $request->all();
        $validator = Validator::make($request_data, [
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $request_data['password'] = Hash::make($request_data['password']);

        $user = User::create($request_data);

        return response(['status' => true, 'message' => 'User successfully registered.'], 200);
    }

    public function login(Request $request)
    {
        $request_data = $request->all();
        $validator = Validator::make($request_data, [
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        if (!auth()->attempt($request_data)) {
            return response()->json(['error' => 'Unauthorized Access'], 401);
        }

        $accessToken = auth()->user()->createToken('authToken')->accessToken;

        return response(['user' => auth()->user(), 'access_token' => $accessToken], 200);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json(['user' => $user], 200);
    }

    public function logout (Request $request)
    {
        $request->user()->token()->revoke();
        $request->user()->token()->delete();
        $response = ['message' => 'You have been successfully logged out!'];

        return response($response, 200);
    }
}
