<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Contract;

use App\Models\Contract\ContractFactory;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Tests\TestCase;

class ContractTest extends TestCase
{
    public function test_suspension_解約処理できること(): void
    {
        $target = ContractFactory::init("name", "key", "keyAlias", ContractAppTypeEnum::NATIVE_APP);
        $target->suspension();

        self::assertEquals(ContractStatusEnum::INACTIVE->value, $target->contract_status->value);
        self::assertNotNull($target->deleted_at);
    }
}
