<?php

namespace App\Http\Controllers;

use App\Models\GroupsUsers;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Users extends Controller
{
    public function index()
    {
        $dt = GroupsUsers::where('users_id', Auth::id())->with('Groups')->first();
        if ($dt) {
            $permission = unserialize($dt['groups']->permission);
        } else {
            $permission = [];
        }
        return Inertia::render('Users', ['csrf_token' => csrf_token(), 'permission' => $permission]);
    }
}
