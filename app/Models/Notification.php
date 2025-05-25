<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Notification
 * 
 * @property int $notification_id
 * @property string $type
 * @property string|null $status
 * @property Carbon|null $sent_at
 * @property int $user_id
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Notification extends Model
{
	protected $table = 'notifications';
	protected $primaryKey = 'notification_id';
	public $timestamps = false;

	protected $casts = [
		'sent_at' => 'datetime',
		'user_id' => 'int'
	];

	protected $fillable = [
		'type',
		'status',
		'sent_at',
		'user_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
