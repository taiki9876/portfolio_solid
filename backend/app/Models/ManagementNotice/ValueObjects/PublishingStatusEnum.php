<?php

declare(strict_types=1);

namespace App\Models\ManagementNotice\ValueObjects;

use App\Util\trait\EnumExtension;

enum PublishingStatusEnum: string
{
    use EnumExtension;

    case Published = "掲載中";
    case Unpublished = "未掲載";
    case EndOfPublication = "掲載終了";
    case Private = "非公開";//NOTE: 非公開設定の場合、常にこの値になる (is_published = false)
}
