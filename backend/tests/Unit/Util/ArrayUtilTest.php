<?php

declare(strict_types=1);

namespace Tests\Unit\Util;

use App\Util\ArrayUtil;
use Tests\TestCase;

class ArrayUtilTest extends TestCase
{
    public function test_pluckKeys_特定のキーのみの新しい配列を作成すること(): void
    {
        $target = ["name" => "hoge", "propA" => "987654321", "propB" => 654];

        $actual = ArrayUtil::pluckKeys($target, ["name", "propB"]);

        self::assertEquals(["name" => "hoge", "propB" => 654], $actual);
    }
}
