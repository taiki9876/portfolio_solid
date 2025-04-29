<?php

declare(strict_types=1);

namespace App\Models\ManagementNotice;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\ValueObjects\PublishingStatusEnum;
use App\Models\Shared\EloquentModel;
use Carbon\CarbonImmutable;
use Database\Factories\ManagementNotice\ManagementNoticeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 運営からのお知らせモデル
 * @property int                      $id
 * @property string                   $title
 * @property string                   $content
 * @property bool                     $is_published
 * @property bool                     $show_popup
 * @property CarbonImmutable          $published_at
 * @property CarbonImmutable|null     $unpublished_at
 * @property ContractAppTypeEnum|null $contract_app_type
 * @property CarbonImmutable          $created_at
 * @property CarbonImmutable          $updated_at
 */
class ManagementNotice extends EloquentModel
{
    public const TABLE = "management_notices";

    /** @use HasFactory<ManagementNoticeFactory> */
    use HasFactory;

    protected $casts = [
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'published_at' => 'immutable_datetime',
        'unpublished_at' => 'immutable_datetime',
        'is_published' => 'boolean',
        'contract_app_type' => ContractAppTypeEnum::class,
    ];

    public static function create(
        string $title,
        string $content,
        bool $is_published,
        bool $show_popup,
        CarbonImmutable $published_at,
        ?CarbonImmutable $unpublished_at = null,
        ?ContractAppTypeEnum $contract_app_type = null,
    ): self {
        $managementNotice = new self();
        $managementNotice->title = $title;
        $managementNotice->content = $content;
        $managementNotice->is_published = $is_published;
        $managementNotice->show_popup = $show_popup;
        $managementNotice->published_at = $published_at;
        $managementNotice->unpublished_at = $unpublished_at;
        $managementNotice->contract_app_type = $contract_app_type;

        return $managementNotice;
    }

    public function edit(
        string $title,
        string $content,
        bool $is_published,
        CarbonImmutable $published_at,
        ?CarbonImmutable $unpublished_at,
        ?ContractAppTypeEnum $contract_app_type,
    ): void {
        $this->title = $title;
        $this->content = $content;
        $this->is_published = $is_published;
        $this->published_at = $published_at;
        $this->unpublished_at = $unpublished_at;
        $this->contract_app_type = $contract_app_type;
    }

    public function publishingStatus(): PublishingStatusEnum
    {
        if ($this->is_published === false) {
            return PublishingStatusEnum::Private;
        }

        $now = CarbonImmutable::now();
        if ($this->unpublished_at !== null && $now->gte($this->unpublished_at)) {
            return PublishingStatusEnum::EndOfPublication;
        }

        if ($now->lt($this->published_at)) {
            return PublishingStatusEnum::Unpublished;
        }

        return PublishingStatusEnum::Published;
    }
}
