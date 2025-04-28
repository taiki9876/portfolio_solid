<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\CreateManagementNoticeUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\Rule\ManagementNoticeFieldRule;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use const FILTER_VALIDATE_BOOLEAN;
use Illuminate\Support\Facades\Validator;

class CreateManagementNoticeInput
{
    public readonly string $title;
    public readonly string $content;
    public readonly bool $isPublished;
    public readonly CarbonImmutable $publishedAt;
    public readonly ?CarbonImmutable $unpublishedAt;
    public readonly ?ContractAppTypeEnum $contractAppType;

    public function __construct(
        string|null $title,
        string|null $content,
        string|bool|null $isPublished,
        string|null $publishedAt,
        string|null $unpublishedAt,
        string | null $contractAppType,
    ) {
        Validator::make(
            [
                'title' => $title,
                'content' => $content,
                'publishedAt' => $publishedAt,
                'unpublishedAt' => $unpublishedAt,
                'isPublished' => filter_var($isPublished, FILTER_VALIDATE_BOOLEAN),
                'contractAppType' => $contractAppType,
            ],
            ManagementNoticeFieldRule::validationRules()
        )
            ->setAttributeNames(ManagementNoticeFieldRule::validationAttribute())
            ->validate();

        $this->title = $title ?? "";
        $this->content = $content ?? "";
        $this->isPublished = filter_var($isPublished, FILTER_VALIDATE_BOOLEAN);
        $this->publishedAt = CarbonImmutable::parse($publishedAt);
        $this->unpublishedAt = DateUtil::nullableCarbon($unpublishedAt);
        $this->contractAppType = $contractAppType === null ? null : ContractAppTypeEnum::from((int) $contractAppType);
    }
}
