<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\UploadMediaUseCase;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\ValidationException;

class UploadMediaInput
{
    public const MAX_PHOTO_SIZE = "10";//MB
    public const MAX_VIDEO_SIZE = "200";//MB

    public UploadedFile $media;
    public UploadMediaTypeEnum $mediaType;

    /**
     * @param  UploadedFile|UploadedFile[]|null $media
     * @throws ValidationException
     */
    public function __construct(
        array|UploadedFile|null $media,
    ) {
        if (!($media instanceof UploadedFile)) {
            throw ValidationException::withMessages([
                "media" => ["ファイルではありません。"],
            ]);
        }

        $mediaType = UploadMediaTypeEnum::fromFile($media);
        Validator::make(
            ["media" => $media],
            $this->rules($mediaType),
        )->validate();

        $this->media = $media;
        $this->mediaType = $mediaType;
    }

    /**
     * @param  UploadMediaTypeEnum $mediaType
     * @return array{media: mixed}
     */
    private function rules(UploadMediaTypeEnum $mediaType): array
    {
        $mediaRule = $mediaType->is(UploadMediaTypeEnum::VIDEO)
            ? File::types(['mp4', 'mov', 'webm', 'mkv'])->max(self::MAX_VIDEO_SIZE . "mb")
            : File::image()->max(self::MAX_PHOTO_SIZE . "mb");

        return [
            'media' => [
                'required',
                $mediaRule,
            ]
        ];
    }
}
