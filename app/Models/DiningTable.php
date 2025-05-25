<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DiningTable
 * 
 * @property int $table_id
 * @property int $restaurant_id
 * @property int $seating_capacity
 * @property int $number
 * @property string $location
 * @property bool $status
 * 
 * @property Restaurant $restaurant
 * @property Collection|ReservationTable[] $reservation_tables
 *
 * @package App\Models
 */
class DiningTable extends Model
{
	protected $table = 'dining_table';
	protected $primaryKey = 'table_id';
	public $timestamps = false;

	protected $casts = [
		'restaurant_id' => 'int',
		'seating_capacity' => 'int',
		'number' => 'int',
		'status' => 'bool'
	];

	protected $fillable = [
		'restaurant_id',
		'seating_capacity',
		'number',
		'location',
		'status'
	];

	public function restaurant()
	{
		return $this->belongsTo(Restaurant::class);
	}

	public function reservation_tables()
	{
		return $this->hasMany(ReservationTable::class, 'table_id');
	}
}
