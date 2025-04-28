<?php

declare(strict_types=1);

namespace Tests\Unit\Util\Trait;

use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Tests\TestCase;

//NOTE: Enumはstringタイプとintタイプが存在するので両方でテストする
class EnumExtensionTest extends TestCase
{
    public function test_is_等しいかを判断できる事(): void
    {
        //int Enum
        self::assertFalse(ContractStatusEnum::INACTIVE->is(ContractStatusEnum::ACTIVE));
        self::assertTrue(ContractStatusEnum::ACTIVE->is(ContractStatusEnum::ACTIVE));

        //string Enum
        self::assertFalse(MemberTypeEnum::STAFF->is(MemberTypeEnum::CUSTOMER));
        self::assertTrue(MemberTypeEnum::STAFF->is(MemberTypeEnum::STAFF));
    }

    public function test_values_値を配列で取得できること(): void
    {
        //int Enum
        self::assertEqualsCanonicalizing(
            [1, 0],
            ContractStatusEnum::values()
        );

        //string Enum
        self::assertEqualsCanonicalizing(
            ["customer", "staff"],
            MemberTypeEnum::values()
        );
    }

    public function test_names_値を配列で取得できること(): void
    {
        //int Enum
        self::assertEqualsCanonicalizing(
            ["ACTIVE", "INACTIVE"],
            ContractStatusEnum::names()
        );

        //string Enum
        self::assertEqualsCanonicalizing(
            ["STAFF", "CUSTOMER"],
            MemberTypeEnum::names()
        );
    }
}
