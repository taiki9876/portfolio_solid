<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\ManagementNotice\ManagementNotice;

trait ManagementNoticeCreator
{
    /**
     * @param  array<string, mixed> $overrideParams
     * @return ManagementNotice
     */
    public function createManagementNotice(array $overrideParams = []): ManagementNotice
    {
        return ManagementNotice::factory()->create($overrideParams);
    }

    /**
     * @param  array<string, mixed> $overrideParams
     * @return ManagementNotice
     */
    public function createPublishedManagementNotice(array $overrideParams = []): ManagementNotice
    {
        $params = array_merge([
            "is_published" => true,
            "published_at" => now(),
            "unpublished_at" => null,
        ], $overrideParams);
        return ManagementNotice::factory()->create($params);
    }

    /**
     * @param  array<string, mixed> $overrideParams
     * @return ManagementNotice
     */
    public function createUnpublishedManagementNotice(array $overrideParams = []): ManagementNotice
    {
        $params = array_merge([
            "is_published" => false,
        ], $overrideParams);
        return ManagementNotice::factory()->create($params);
    }
}
