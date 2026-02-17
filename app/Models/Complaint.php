<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    protected $table = 'complaint';
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function Society()
    {
        return $this->belongsTo(Society::class, 'society_id', 'id');
    }

    public function Response()
    {
        return $this->hasOne(Response::class, 'complaint_id', 'id');
    }
}
