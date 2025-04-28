<?php

declare(strict_types=1);

namespace Tests\Unit\Util;

use App\Util\StringUtil;
use Tests\TestCase;

/**
 * @see StringUtil
 */
class StringUtilTest extends TestCase
{
    public function test_snakeToCamel_スネーク形式の文字列をキャメル形式に変換できること(): void
    {
        $cases = [
            ["target" => "hoge_fuga", "expected" => "hogeFuga"],
            ["target" => "hoge_fuga_test", "expected" => "hogeFugaTest"],
            ["target" => "hoge", "expected" => "hoge"],
            ["target" => "hogeFuga", "expected" => "hogeFuga"],

        ];
        foreach ($cases as $case) {
            self::assertEquals($case["expected"], StringUtil::snakeToCamel($case["target"]));
        }
    }

    public function test_defaultIfBlank_空白文字などはデフォルト値に変換できること(): void
    {
        $default = "default";
        $testcases = [
            ["", $default],
            [" ", $default],
            [" 　", $default],
            ["　", $default],
            ["　 \n\t", $default],
            ["ああいいうう", "ああいいうう"],
            ["ああい い うう", "ああい い うう"],
            ["ああい　い うう", "ああい　い うう"],
        ];

        foreach ($testcases as $testcase) {
            $actual = StringUtil::defaultIfBlank($testcase[0], $testcase[1]);
            self::assertEquals($testcase[1], $actual);
        }
    }

    public function test_isEmptyString_空白文字だけの文字か判定できること(): void
    {
        $testcases = [
            ["", true],
            [" ", true],
            [" 　", true],
            ["　", true],
            ["　 \n\t", true],
            ["ああいいうう", false],
            ["ああい　　いうう", false],
            ["ああい いうう", false],
        ];

        foreach ($testcases as $testcase) {
            $actual = StringUtil::isEmptyString($testcase[0]);
            self::assertEquals($testcase[1], $actual);
        }
    }
}
