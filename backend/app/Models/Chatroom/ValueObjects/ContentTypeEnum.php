<?php

declare(strict_types=1);

namespace App\Models\Chatroom\ValueObjects;

use App\Util\trait\EnumExtension;

enum ContentTypeEnum: string
{
    use EnumExtension;

    case TEXT = 'text';
    case PHOTO = 'photo';
    case VIDEO = 'video';
    case PROCESSED = 'processed';
}
