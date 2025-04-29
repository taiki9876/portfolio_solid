<?php

declare(strict_types=1);

namespace App\Models\ManagementNotice;

use Carbon\CarbonImmutable;
use Database\Factories\ManagementNotice\NoticeReadFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int             $id
 * @property int             $admin_id
 * @property int             $management_notice_id
 * @property CarbonImmutable $read_at
 * @property CarbonImmutable $created_at
 */
class NoticeRead extends Model
{
    /** @use HasFactory<NoticeReadFactory> */
    use HasFactory;

    public $timestamps = false;

    public const TABLE = "notice_reads";

    protected $casts = [
        'read_at' => 'immutable_datetime',
        'created_at' => 'immutable_datetime',
    ];
}
