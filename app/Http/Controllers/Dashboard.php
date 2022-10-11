<?php

namespace App\Http\Controllers;

use App\Models\Employe;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Dashboard extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', ['csrf_token' => csrf_token(), 'employe' => Employe::where('users_id', Auth::id())->first()]);
    }
}
