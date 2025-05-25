<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Customerinfo
 * 
 * @property int $info_id
 * @property int $user_id
 * @property string|null $notes
 * @property string|null $preferences
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Customerinfo extends Model
{
	protected $table = 'customerinfo';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int'
	];

	protected $fillable = [
		'notes',
		'preferences'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
