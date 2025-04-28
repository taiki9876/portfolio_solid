<?php

declare(strict_types=1);

namespace Tests\Helper\Mock;

use Carbon\CarbonImmutable;
use Kreait\Firebase\Auth\UserMetaData;
use Kreait\Firebase\Auth\UserRecord;

trait FirebaseMock
{
    /**
     * @return UserRecord
     */
    public function stabUserRecord(): UserRecord
    {
        $userMetaData = new UserMetaData(
            CarbonImmutable::now(),
            CarbonImmutable::now(),
            CarbonImmutable::now(),
            CarbonImmutable::now(),
        );
        return new UserRecord(
            'dummy_uid',
            'dummy_email',
            false,
            "ttt",
            "00000000000",
            "dfgsdhs",
            false,
            $userMetaData,
            [],
            null,
            "sfdhsdhs",
            "shsd",
            [],
            "fdhsdfhsfghs",
            null,
        );
    }
}
