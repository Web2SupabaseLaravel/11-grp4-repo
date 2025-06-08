<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class password_resets extends Model
{
    public $timestamps = true;

    protected $table = 'password_resets';

    protected $fillable = ['email', 'token', 'created_at', 'updated_at'];
    protected $primaryKey = 'email';
    public $incrementing = false;
    protected $keyType = 'string';

}
