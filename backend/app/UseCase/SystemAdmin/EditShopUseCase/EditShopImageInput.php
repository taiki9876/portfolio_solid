<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditShopUseCase;

use App\Models\Shop\Rule\ShopFieldRule;
use App\Models\Shop\ShopImage;
use App\Util\Env;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

/**
 * リクエストで受け取った画像情報を整形する
 * 既存の画像情報はそのまま、新規の画像情報はファイルをアップロードされてリクエストされる
 * @phpstan-type NewUploadFile array{file: UploadedFile, sortOrder: int}
 *
 * @property array<ShopImage|NewUploadFile> $images
 */
class EditShopImageInput
{
    /**
     * @var array<ShopImage|NewUploadFile>
     */
    public array $images;

    public function __construct(
        Request $request
    ) {
        $requestImages = $request->only("images");
        /** @var UploadedFile[]|array{id:int, path:string, sortOrder: int}[] $images */
        $images = $requestImages["images"] ?? [];

        $mappings = [];
        foreach ($images as $index => $image) {
            if (is_array($image)) {
                $mappings[] = ShopImage::init(
                    Str::replace(Env::publicBucketUrl(), "", $image["path"]),
                    $index,
                );
            } else {
                $mappings[] = [
                    "file" => $image,
                    "sortOrder" => $index
                ];
            }
        }

        $this->images = $mappings;
        $this->validate();
    }

    /**
     * 新しくアップロードされた画像に対してバリデーションを行う
     * @return void
     * @throws ValidationException
     */
    private function validate()
    {
        $rules = ShopFieldRule::validationRules();
        Validator::make(
            [
                "images" => $this->getUploadFiles(),
            ],
            [
                "images" => $rules["images"],
                "images.*" => $rules["images.*"],
            ]
        )
            ->validate();
    }

    /**
     * @return array<UploadedFile>
     */
    private function getUploadFiles(): array
    {
        /** @var NewUploadFile[] $uploadedFiles */
        $uploadedFiles = array_filter($this->images, static fn ($image) => isset($image["file"]));
        return Arr::pluck($uploadedFiles, 'file');
    }
}
