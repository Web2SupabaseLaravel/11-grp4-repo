<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerInfo extends Model
{
    protected $table = 'customerinfo';
    protected $primaryKey = 'info_id';
    public $timestamps = false;
    protected $fillable = ['user_id', 'notes', 'preferences', 'Name'];
}