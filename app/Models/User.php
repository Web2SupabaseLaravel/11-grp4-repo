<?php

namespace App\Models;

use Carbon\Carbon;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Session;




class User extends Authenticatable implements JWTSubject
{
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    public $incrementing = true;

    protected $casts = [
        'restaurant_id' => 'int',
        'social_login' => 'bool',
        'is_active' => 'bool',
    ];

    protected $hidden = [
        'password',
    ];

    protected $fillable = [
        'email',
        'password',
        'roletype',
        'restaurant_id',
        'social_login',
        'is_active',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function customerinfos()
    {
        return $this->hasMany(Customerinfo::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function reports()
    {
        return $this->hasMany(Report::class);
    }

  public function sessions()
{
    return $this->hasMany(Session::class, 'user_id', 'user_id');
}


    // ✅ JWT methods
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
