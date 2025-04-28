<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchChatroomsUseCase;

use App\Util\trait\EnumExtension;

enum FilterStatusParamEnum: string
{
    use EnumExtension;

    case ALL = "all";
    case UNREAD = "unread";
    case PENDING = "pending";
    case PROCESSED = "processed";
    case SPAM = "spam";
}
