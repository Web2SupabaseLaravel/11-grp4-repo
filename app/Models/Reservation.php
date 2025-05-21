<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $primaryKey = 'reservation_id';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $table = 'reservation';


    protected $fillable = [
        'restaurant_id',
        'user_id',
        'reservation_date',
        'reservation_time',
        'party_size',
        'status',
        'created_at',
        'updated_at',
    ];

    public $timestamps = false; 
}
