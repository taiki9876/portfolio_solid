<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\ChangeChatroomStatus;

use App\Util\trait\EnumExtension;

enum RequestStatusEnum: string
{
    use EnumExtension;

    case PROCESSED = "processed";
    case SPAM = "spam";
}
