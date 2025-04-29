<?php

declare(strict_types=1);

namespace App\Models\ManagementNotice\Rule;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use Illuminate\Validation\Rule;

class ManagementNoticeFieldRule
{
    public const TITLE_MAX_LENGTH = 200;
    public const CONTENT_MAX_LENGTH = 2000;

    /**
     * @return array<string, mixed>
     */
    public static function validationRules(): array
    {
        return [
            'title' => ['required', 'string', 'max: ' . self::TITLE_MAX_LENGTH],
            'content' => ['required', 'string', 'max: ' . self::CONTENT_MAX_LENGTH],
            'publishedAt' => ['required', 'date'],
            'unpublishedAt' => ['nullable', 'date', 'after:publishedAt'],
            'isPublished' => ['required', 'boolean'],
            'showPopup' => ['required', 'boolean'],
            'contractAppType' => ['nullable', Rule::in(ContractAppTypeEnum::values())],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function validationAttribute(): array
    {
        return [
            "title" => "件名",
            "content" => "本文",
            "publishedAt" => "掲載日時",
            "unpublishedAt" => "掲載終了日時",
            "isPublished" => "公開許可",
            "contractAppType" => "アプリタイプ",
        ];
    }
}
