<?php

declare(strict_types=1);

namespace App\Models\Contract;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use App\Models\Shared\EloquentModel;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int                  $id
 * @property string               $name
 * @property string               $key
 * @property string               $key_alias
 * @property string|null          $person_in_charge
 * @property string|null          $tel
 * @property string|null          $email
 * @property string|null          $industry
 * @property string|null          $memo
 * @property string|null          $line_access_token
 * @property ContractStatusEnum   $contract_status
 * @property ContractAppTypeEnum  $contract_app_type
 * @property CarbonImmutable      $created_at
 * @property CarbonImmutable      $updated_at
 * @property CarbonImmutable|null $deleted_at
 */
class Contract extends EloquentModel
{
    public const TABLE = "contracts";
    protected $table = self::TABLE;
    protected $primaryKey = 'id';

    /** @use HasFactory<\Database\Factories\Contract\ContractFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $casts = [
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'deleted_at' => 'immutable_datetime',
        'contract_status' => ContractStatusEnum::class,
        'contract_app_type' => ContractAppTypeEnum::class,
    ];

    /**
     * 契約情報の変更。ここで定義していない値は上書き禁止
     * @param  string                   $name
     * @param  string|null              $person_in_charge
     * @param  string|null              $tel
     * @param  string|null              $email
     * @param  string|null              $industry
     * @param  string|null              $memo
     * @param  ContractStatusEnum|null  $contract_status
     * @param  ContractAppTypeEnum|null $contract_app_type
     * @return void
     */
    public function edit(
        string $name,
        ?string $person_in_charge,
        ?string $tel,
        ?string $email,
        ?string $industry,
        ?string $memo,
        ?ContractStatusEnum $contract_status = null,
        ?ContractAppTypeEnum $contract_app_type = null,
    ): void {
        $this->name = $name;
        $this->person_in_charge = $person_in_charge;
        $this->tel = $tel;
        $this->email = $email;
        $this->industry = $industry;
        $this->memo = $memo;
        if ($contract_status !== null) {
            $this->contract_status = $contract_status;
        }
        if ($contract_app_type !== null) {
            $this->contract_app_type = $contract_app_type;
        }
    }

    /**
     * 解約する
     * @return void
     */
    public function suspension(): void
    {
        $this->contract_status = ContractStatusEnum::INACTIVE;
        $this->deleted_at = CarbonImmutable::now();
    }
}
