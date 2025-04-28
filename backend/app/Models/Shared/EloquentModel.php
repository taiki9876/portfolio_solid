<?php

declare(strict_types=1);

namespace App\Models\Shared;

use App\Util\DateUtil;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

abstract class EloquentModel extends Model
{
    protected $fillable = [];

    protected $guarded = [
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format(DateUtil::DATE_FORMAT);
    }
}
