<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    use HasFactory;
    protected $table = 'employe';
    protected $guarded = ['id'];

    public function Store()
    {
        return $this->belongsTo(Store::class);
    }


    public function Users()
    {
        return $this->belongsTo(User::class);
    }
}
