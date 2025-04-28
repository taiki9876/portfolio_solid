<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditShopUseCase;

use App\Models\Shop\Rule\ShopFieldRule;
use Illuminate\Support\Facades\Validator;

class EditShopInput
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
            ],
            ShopFieldRule::validationRules()
        )
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
    }
}
