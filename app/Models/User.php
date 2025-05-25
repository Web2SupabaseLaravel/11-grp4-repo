<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property int $user_id
 * @property string $email
 * @property string $password
 * @property string $roletype
 * @property int $restaurant_id
 * @property bool|null $social_login
 * @property bool|null $is_active
 * @property Carbon $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Restaurant $restaurant
 * @property Collection|Reservation[] $reservations
 * @property Collection|Customerinfo[] $customerinfos
 * @property Collection|Notification[] $notifications
 * @property Collection|Report[] $reports
 * @property Collection|Session[] $sessions
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'users';

	protected $casts = [
		'restaurant_id' => 'int',
		'social_login' => 'bool',
		'is_active' => 'bool'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'password',
		'roletype',
		'restaurant_id',
		'social_login',
		'is_active'
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
		return $this->hasMany(Session::class, 'user_id', 'id');
	}
}
