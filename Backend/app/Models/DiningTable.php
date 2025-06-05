<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DiningTable extends Model
{
    protected $table = 'dining_table'; 
    protected $primaryKey = 'table_id';
    public $timestamps = false;

    protected $fillable = ['restaurant_id', 'seating_capacity','number', 'location', 'status'];
}