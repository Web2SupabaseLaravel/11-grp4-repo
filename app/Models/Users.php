<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{

    protected $table = 'users';
    protected $primarykey='user_id';
    public $timestamps = true;
    public $incrementing = false;          
    protected $keyType = 'string';


    protected $fillable = [
        'email', 'password',
        'roletype','restaurant_id','
        social_login', 'is_active',
        'created_at', 'updated_at'
    ];

}
