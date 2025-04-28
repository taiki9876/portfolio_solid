<?php

declare(strict_types=1);

namespace Tests;

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    private const BASE_TIME = "2024-12-23 10:00:00";

    public function setUp(): void
    {
        parent::setUp();
        CarbonImmutable::setTestNow(self::BASE_TIME);
        Carbon::setTestNow(self::BASE_TIME);
    }
}
