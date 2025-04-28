<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\UploadMediaUseCase;

class UploadMediaOutput
{
    public function __construct(
        private readonly string $uploadPath,
        private readonly UploadMediaTypeEnum $mediaType,
    ) {
    }

    /**
     * @return array{
     *     uploadPath: string,
     *     mediaType: string,
     * }
     */
    public function toArray(): array
    {
        return [
            "uploadPath" => $this->uploadPath,
            "mediaType" => $this->mediaType->value,
        ];
    }
}
