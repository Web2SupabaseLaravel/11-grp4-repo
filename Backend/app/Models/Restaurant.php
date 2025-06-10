<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $table = 'restaurants';

    protected $primaryKey = 'restaurant_id';
    public $incrementing = false;

    protected $fillable = [
        'restaurant_id',
        'name',
        'address',
        'opening_hours',
        'phone_number',
        'email',
        'seating_capacity',
        'created_at',
        'updated_at',
        'allowsreservationmodification'

    ];

    public $timestamps = true;
}
