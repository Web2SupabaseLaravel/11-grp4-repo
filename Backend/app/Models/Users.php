<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Users extends Authenticatable implements JWTSubject
{
    protected $primaryKey = 'user_id';
    public $timestamps = true;

    protected $fillable = [
        'email',
        'password',
        'roletype',
        'restaurant_id',
        'social_login',
        'is_active',
        'created_at',
        'updated_at',
    ];

    protected $hidden = ['password'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
    