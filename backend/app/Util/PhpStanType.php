<?php
// phpcs:ignoreFile

declare(strict_types=1);

namespace App\Util;

/**
 * @description phpStanの型エイリアス用ファイル
 *
 * @phpstan-type Key int|string
 *
 * @phpstan-type CsvRow array<Key, bool|float|int|string|null>
 * @phpstan-type CsvData iterable<Key, CsvRow>
 *
 * @phpstan-type JsonObject array<string, mixed>
 * @phpstan-type JsonArray array<int, mixed>
 */
interface PhpStanType
{
}
