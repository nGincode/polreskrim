<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Dashboard extends Controller
{
    public function index()
    {
        $Proses = Report::where('progres', "Proses")->count();
        $Dihentikan = Report::where('progres', "Dihentikan")->count();
        $BerhentiSementara = Report::where('progres', "Berhenti Sementara")->count();
        $Selesai = Report::where('progres', "Selesai")->count();
        $total = Report::count();
        return Inertia::render('Dashboard', ['csrf_token' => csrf_token(), "total" => $total, 'Proses' => $Proses, 'BerhentiSementara' => $BerhentiSementara, 'Dihentikan' => $Dihentikan, 'Selesai' => $Selesai]);
    }
}
