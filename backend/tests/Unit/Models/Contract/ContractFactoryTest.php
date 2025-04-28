<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Contract;

use App\Models\Contract\Contract;
use App\Models\Contract\ContractFactory;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Carbon\CarbonImmutable;
use Tests\TestCase;

class ContractFactoryTest extends TestCase
{
    public function test_init_初期契約状態を作成できること(): void
    {
        //デフォルト値の検証
        $target = ContractFactory::init("name", "key", "keyAlias", ContractAppTypeEnum::NATIVE_APP);
        self::assertInstanceOf(Contract::class, $target);
        self::assertEquals("name", $target->name);
        self::assertEquals("key", $target->key);
        self::assertEquals("keyAlias", $target->key_alias);
        self::assertEquals(ContractStatusEnum::ACTIVE->value, $target->contract_status->value);
        self::assertEquals(ContractAppTypeEnum::NATIVE_APP->value, $target->contract_app_type->value);

        self::assertNull($target->deleted_at);
        self::assertEquals(CarbonImmutable::now(), $target->created_at);
        self::assertEquals(CarbonImmutable::now(), $target->updated_at);
    }
}
