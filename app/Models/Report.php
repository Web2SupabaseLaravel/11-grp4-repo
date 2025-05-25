<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Report
 * 
 * @property int $report_id
 * @property int $user_id
 * @property string $report_type
 * @property string $content
 * @property Carbon $generated_at
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Report extends Model
{
	protected $table = 'report';
	protected $primaryKey = 'report_id';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'generated_at' => 'datetime'
	];

	protected $fillable = [
		'user_id',
		'report_type',
		'content',
		'generated_at'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
