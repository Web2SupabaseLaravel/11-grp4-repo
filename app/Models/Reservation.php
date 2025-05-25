<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Reservation
 * 
 * @property int $reservation_id
 * @property int $restaurant_id
 * @property int $user_id
 * @property Carbon $reservation_date
 * @property time without time zone $reservation_time
 * @property int $party_size
 * @property string $status
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property Restaurant $restaurant
 * @property User $user
 * @property Collection|ReservationTable[] $reservation_tables
 *
 * @package App\Models
 */
class Reservation extends Model
{
	protected $table = 'reservation';
	protected $primaryKey = 'reservation_id';

	protected $casts = [
		'restaurant_id' => 'int',
		'user_id' => 'int',
		'reservation_date' => 'datetime',
		'reservation_time' => 'time without time zone',
		'party_size' => 'int'
	];

	protected $fillable = [
		'restaurant_id',
		'user_id',
		'reservation_date',
		'reservation_time',
		'party_size',
		'status'
	];

	public function restaurant()
	{
		return $this->belongsTo(Restaurant::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function reservation_tables()
	{
		return $this->hasMany(ReservationTable::class);
	}
}
