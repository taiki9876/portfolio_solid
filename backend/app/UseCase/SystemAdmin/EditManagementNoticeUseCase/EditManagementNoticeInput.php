<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditManagementNoticeUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\Rule\ManagementNoticeFieldRule;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Validator;

class EditManagementNoticeInput
{
    public readonly string $title;
    public readonly string $content;
    public readonly bool $isPublished;
    public readonly bool $showPopup;
    public readonly CarbonImmutable $publishedAt;
    public readonly ?CarbonImmutable $unpublishedAt;
    public readonly ?ContractAppTypeEnum $contractAppType;

    public function __construct(
        string|null $title,
        string|null $content,
        string|bool|null $isPublished,
        string|bool|null $showPopup,
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
                'isPublished' => filter_var($isPublished, \FILTER_VALIDATE_BOOLEAN),
                'showPopup' => filter_var($showPopup, \FILTER_VALIDATE_BOOLEAN),
                'contractAppType' => $contractAppType,
            ],
            ManagementNoticeFieldRule::validationRules()
        )
            ->setAttributeNames(ManagementNoticeFieldRule::validationAttribute())
            ->validate();

        $this->title = $title ?? "";
        $this->content = $content ?? "";
        $this->isPublished = filter_var($isPublished, \FILTER_VALIDATE_BOOLEAN);
        $this->showPopup = filter_var($showPopup, \FILTER_VALIDATE_BOOLEAN);
        $this->publishedAt = CarbonImmutable::parse($publishedAt);
        $this->unpublishedAt = DateUtil::nullableCarbon($unpublishedAt);
        $this->contractAppType = $contractAppType === null ? null : ContractAppTypeEnum::from((int) $contractAppType);
    }
}
