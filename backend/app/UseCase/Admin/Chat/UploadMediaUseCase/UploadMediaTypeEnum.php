<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\UploadMediaUseCase;

use App\Util\trait\EnumExtension;
use Illuminate\Http\UploadedFile;

enum UploadMediaTypeEnum: string
{
    use EnumExtension;

    case PHOTO = "photo";
    case VIDEO = "video";

    /**
     * @param  UploadedFile $file
     * @return self
     */
    public static function fromFile(UploadedFile $file): self
    {
        $mimeType = $file->getMimeType();
        if ($mimeType === null) {
            throw new \DomainException("ファイルのMIMEタイプが取得できませんでした。");
        }

        if (str_starts_with($mimeType, 'image/')) {
            return self::PHOTO;
        }
        if (str_starts_with($mimeType, 'video/')) {
            return self::VIDEO;
        }

        return throw new \DomainException("不正なファイル形式です。");
    }
}
