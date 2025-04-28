<?php

declare(strict_types=1);

namespace App\Models\Shop;

use App\Models\Shared\EloquentModel;
use Carbon\CarbonImmutable;
use Database\Factories\Shop\ShopFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property int                  $id
 * @property int                  $contract_id
 * @property string               $name
 * @property string|null          $app_display_name
 * @property string|null          $business_hours
 * @property string|null          $rest
 * @property string|null          $tel
 * @property string|null          $address
 * @property string|null          $prelusion
 * @property string|null          $hp_url
 * @property string|null          $map_url
 * @property CarbonImmutable      $created_at
 * @property CarbonImmutable      $updated_at
 * @property CarbonImmutable|null $deleted_at
 *
 * //relations
 * @property Collection<int, ShopImage> $images
 */
class Shop extends EloquentModel
{
    public const TABLE = "shops";

    /** @use HasFactory<ShopFactory> */
    use HasFactory;

    protected $casts = [
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'deleted_at' => 'immutable_datetime',
    ];

    protected $fillable = [
        'name',
        'app_display_name',
        'business_hours',
        'rest',
        'tel',
        'address',
        'prelusion',
        'hp_url',
        'map_url',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * @param  string                $name
     * @param  string|null           $app_display_name
     * @param  string|null           $business_hours
     * @param  string|null           $rest
     * @param  string|null           $tel
     * @param  string|null           $address
     * @param  string|null           $prelusion
     * @param  string|null           $hp_url
     * @param  string|null           $map_url
     * @param  array<ShopImage>|null $images
     * @return void
     */
    public function edit(
        string $name,
        string|null $app_display_name,
        string|null $business_hours,
        string|null $rest,
        string|null $tel,
        string|null $address,
        string|null $prelusion,
        string|null $hp_url,
        string|null $map_url,
        array|null $images = null,
    ): void {
        $this->name = $name;
        $this->app_display_name = $app_display_name;
        $this->business_hours = $business_hours;
        $this->rest = $rest;
        $this->tel = $tel;
        $this->address = $address;
        $this->prelusion = $prelusion;
        $this->hp_url = $hp_url;
        $this->map_url = $map_url;

        if ($images !== null) {
            $this->images = collect($images);
        }
    }

    /**
     * @return HasMany<ShopImage, $this>
     */
    public function images(): HasMany
    {
        return $this->hasMany(ShopImage::class, 'shop_id', 'id');
    }
}
