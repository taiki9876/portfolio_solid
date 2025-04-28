<?php

declare(strict_types=1);

namespace App\Models\Shop\Rule;

class ShopFieldRule
{
    public const NAME_MAX_LENGTH = 200;
    public const APP_DISPLAY_NAME_MAX_LENGTH = 200;
    public const BUSINESS_HOURS_MAX_LENGTH = 255;
    public const REST_MAX_LENGTH = 255;
    public const TEL_MAX_LENGTH = 200;
    public const ADDRESS_MAX_LENGTH = 255;
    public const PRELUSION_MAX_LENGTH = 2000;
    public const HP_URL_MAX_LENGTH = 255;
    public const MAP_URL_MAX_LENGTH = 255;

    public const IMAGE_MAX_COUNT = 5;
    public const IMAGE_MAX_SIZE = 10240;// 10MB

    /**
     * @return array<string, string[]>
     */
    public static function validationRules(): array
    {
        return [
            'name' => ['string', 'max: ' . self::NAME_MAX_LENGTH],
            'app_display_name' => ['nullable', 'string', 'max: ' . self::APP_DISPLAY_NAME_MAX_LENGTH],
            'business_hours' => ['nullable', 'string', 'max: ' . self::BUSINESS_HOURS_MAX_LENGTH],
            'rest' => ['nullable', 'string', 'max: ' . self::REST_MAX_LENGTH],
            "tel" => ['nullable', 'string', 'max:' . self::TEL_MAX_LENGTH],
            "address" => ['nullable', 'string', 'max:' . self::ADDRESS_MAX_LENGTH],
            "prelusion" => ['nullable', 'string', 'max:' . self::PRELUSION_MAX_LENGTH],
            "hp_url" => ['nullable', 'string', 'max:' . self::HP_URL_MAX_LENGTH],
            "map_url" => ['nullable', 'string', 'max:' . self::MAP_URL_MAX_LENGTH],

            "images" => ["array", "max: " . self::IMAGE_MAX_COUNT],
            "images.*" => ["nullable", "file", "image", "max:" . self::IMAGE_MAX_SIZE],
        ];
    }

    /**
     * @return string[]
     */
    public static function validationAttributes(): array
    {
        return [
            'name' => '店名',
            'app_display_name' => 'アプリ表示名',
            'business_hours' => '営業時間',
            'rest' => '定休日',
            'tel' => '電話番号',
            'address' => '住所',
            'prelusion' => '紹介文',
            'hp_url' => 'ホームページのURL',
            'map_url' => 'GoogleマップURL',
            'images' => '画像',
            'images.*' => '画像'
        ];
    }
}
