<?php

declare(strict_types=1);

namespace App\Models\Shop;

use App\Models\Shared\EloquentModel;
use App\Util\Env;
use Carbon\CarbonImmutable;
use Database\Factories\Shop\ShopImageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @property int             $id
 * @property int             $shop_id
 * @property string          $image_path
 * @property int             $sort_order
 * @property CarbonImmutable $created_at
 * @property CarbonImmutable $updated_at
 */
class ShopImage extends EloquentModel
{
    public const TABLE = "shop_images";
    public const PRIMARY_KEY = 'id';

    /** @use HasFactory<ShopImageFactory> */
    use HasFactory;

    protected $casts = [
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'deleted_at' => 'immutable_datetime',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public static function init(
        string $image_path,
        int $sort_order = 0,
    ): ShopImage {
        $shopImage = new ShopImage();
        $shopImage->image_path = $image_path;
        $shopImage->sort_order = $sort_order;

        return $shopImage;
    }

    public function belongTo(Shop $shop): self
    {
        $this->shop_id = $shop->id;
        return $this;
    }

    public function absolutePath(): string
    {
        return Env::publicBucketUrl($this->image_path);
    }
}
