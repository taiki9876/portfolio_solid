<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\UploadMediaUseCase;

use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaInput;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaTypeEnum;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class UploadMediaInputTest extends TestCase
{
    public function test_正常値(): void
    {
        // 画像タイプ
        $photo = UploadedFile::fake()->image("photo.jpg");
        $input = new UploadMediaInput($photo);
        self::assertEquals([$photo, UploadMediaTypeEnum::PHOTO], [$input->media, $input->mediaType]);

        //動画タイプ
        $video = UploadedFile::fake()->create('video.mp4', 200);
        $input = new UploadMediaInput($video);
        self::assertEquals([$video, UploadMediaTypeEnum::VIDEO], [$input->media, $input->mediaType]);
    }

    #[DataProvider("dataProvider_異常値")]
    public function test_validationエラーが発生すること(
        ?UploadedFile $media
    ): void {
        try {
            new UploadMediaInput($media);
        } catch (ValidationException $exception) {
            self::assertArrayHasKey("media", $exception->errors());
            return;
        }

        self::fail('ValidationException が発生しませんでした');
    }

    /**
     * @return array<string, array<mixed>>
     */
    public static function dataProvider_異常値(): array
    {
        return [
            "ファイルが指定されていない" => ["media" => null],
            "画像サイズオーバー" => ["media" => UploadedFile::fake()->image('photo.jpg')->size(10001)],
            "動画サイズオーバー" => ["media" => UploadedFile::fake()->create('video.mp4', 200001)],
            "許可されない動画形式" => ["media" => UploadedFile::fake()->create('video.avi', 200001)],
        ];
    }
}
