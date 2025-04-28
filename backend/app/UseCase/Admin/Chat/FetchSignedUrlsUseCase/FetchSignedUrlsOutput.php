<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchSignedUrlsUseCase;

class FetchSignedUrlsOutput
{
    /**
     * @param array<string, array{signedUrl: string|null, expiredAt: string}> $values
     */
    public function __construct(
        public array $values = []
    ) {
    }

    /**
     * @param  string      $imagePath
     * @param  string|null $signedUrl
     * @param  string      $expiredAt
     * @return void
     */
    public function add(string $imagePath, string|null $signedUrl, string $expiredAt): void
    {
        $this->values[$imagePath] = [
            'signedUrl' => $signedUrl,
            'expiredAt' => $expiredAt,
        ];
    }
}
