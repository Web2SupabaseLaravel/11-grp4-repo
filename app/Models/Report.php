<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $table = 'report';
    protected $primaryKey = 'report_id';
    protected $keyType = 'int';
    public $incrementing = true;
    public $timestamps = false; // لأنه ما في created_at, updated_at
    protected $casts = [
        'generated_at' => 'datetime',
    ];

    protected $fillable = ['report_type', 'content', 'user_id', 'generated_at'];
}
