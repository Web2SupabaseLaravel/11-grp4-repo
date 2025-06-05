<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{

    protected $primaryKey = 'user_id';
    public $timestamps = true;


    protected $fillable = ['email', 'password', 'roletype', 'restaurant_id', 'social_login', 'is_active', 'created_at', 'updated_at'];

}
