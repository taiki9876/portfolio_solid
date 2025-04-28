<?php

declare(strict_types=1);

namespace App\Models\Contract;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Carbon\CarbonImmutable;

class ContractFactory
{
    /**
     * 初期の契約状態を作成
     * @param  string                  $name
     * @param  string                  $key
     * @param  string                  $keyAlias
     * @param  ContractAppTypeEnum     $contractAppType
     * @param  ContractStatusEnum|null $contractStatus
     * @param  string|null             $personInCharge
     * @param  string|null             $tel
     * @param  string|null             $email
     * @param  string|null             $industry
     * @param  string|null             $memo
     * @return Contract
     */
    public static function init(
        string $name, // 契約企業・店舗名
        string $key, // URLのスラグなどで利用される、専用ファイルのディレクトリ置き場
        string $keyAlias, // URLのスラグなどで利用される、専用ファイルのディレクトリ置き場
        ContractAppTypeEnum $contractAppType,
        ?ContractStatusEnum $contractStatus = null, // 契約状態
        ?string $personInCharge = null, // 担当者名
        ?string $tel = null, // 担当者電話番号
        ?string $email = null, // 担当者メールアドレス
        ?string $industry = null, // 業種
        ?string $memo = null
    ): Contract {
        $contract = new Contract();
        $contract->name = $name;
        $contract->key = $key;
        $contract->key_alias = $keyAlias;
        $contract->contract_status = $contractStatus ?? ContractStatusEnum::ACTIVE;
        $contract->contract_app_type = $contractAppType;
        $contract->person_in_charge = $personInCharge;
        $contract->tel = $tel;
        $contract->email = $email;
        $contract->industry = $industry;
        $contract->memo = $memo;

        $contract->created_at = CarbonImmutable::now();
        $contract->updated_at = CarbonImmutable::now();
        $contract->deleted_at = $contract->contract_status->is(ContractStatusEnum::INACTIVE) ? CarbonImmutable::now() : null;

        return $contract;
    }
}
