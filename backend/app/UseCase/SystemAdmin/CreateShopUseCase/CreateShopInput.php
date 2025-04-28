<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\CreateShopUseCase;

use App\Models\Shop\Rule\ShopFieldRule;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class CreateShopInput
{
    public readonly string $name;
    public readonly string|null $appDisplayName;
    public readonly string|null $businessHours;
    public readonly string|null $rest;
    public readonly string|null $tel;
    public readonly string|null $address;
    public readonly string|null $prelusion;
    public readonly string|null $hpUrl;
    public readonly string|null $mapUrl;

    /**
     * @var UploadedFile[]
     */
    public readonly array $images;

    /**
     * @param  string|null         $name
     * @param  string|null         $appDisplayName
     * @param  string|null         $businessHours
     * @param  string|null         $rest
     * @param  string|null         $tel
     * @param  string|null         $address
     * @param  string|null         $prelusion
     * @param  string|null         $hpUrl
     * @param  string|null         $mapUrl
     * @param  array<UploadedFile> $images
     * @throws ValidationException
     */
    public function __construct(
        string|null $name,
        string|null $appDisplayName,
        string|null $businessHours,
        string|null $rest,
        string|null $tel,
        string|null $address,
        string|null $prelusion,
        string|null $hpUrl,
        string|null $mapUrl,
        array $images = [],
    ) {
        Validator::make(
            [
                "name" => $name,
                "appDisplayName" => $appDisplayName,
                "businessHours" => $businessHours,
                "rest" => $rest,
                "tel" => $tel,
                "address" => $address,
                "prelusion" => $prelusion,
                "hpUrl" => $hpUrl,
                "mapUrl" => $mapUrl,
                "images" => $images,
            ],
            ShopFieldRule::validationRules()
        )
            ->setAttributeNames(ShopFieldRule::validationAttributes())
            ->validate();

        $this->name = $name ?? "";
        $this->appDisplayName = $appDisplayName;
        $this->businessHours = $businessHours;
        $this->rest = $rest;
        $this->tel = $tel;
        $this->address = $address;
        $this->prelusion = $prelusion;
        $this->hpUrl = $hpUrl;
        $this->mapUrl = $mapUrl;
        $this->images = $images;
    }
}
