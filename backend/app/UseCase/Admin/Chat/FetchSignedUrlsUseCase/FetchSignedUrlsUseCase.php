<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchSignedUrlsUseCase;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Infrastructure\Storage\S3\DirectoryEnum;
use App\Infrastructure\Storage\S3\S3PrivateStorage;
use App\Models\Admin\Admin;
use Psr\SimpleCache\InvalidArgumentException;

class FetchSignedUrlsUseCase
{
    public const VALIDITY_PERIOD_HOUR = 2;//URLの有効期限は2時間

    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
        private readonly S3PrivateStorage $s3PrivateStorage,
    ) {
    }

    /**
     * @param  Admin                    $admin
     * @param  int                      $chatroomId
     * @param  FetchSignedUrlsInput     $input
     * @return FetchSignedUrlsOutput
     * @throws InvalidArgumentException
     */
    public function execute(Admin $admin, int $chatroomId, FetchSignedUrlsInput $input): FetchSignedUrlsOutput
    {
        $privateStorage = $this->privateStorage($admin, $chatroomId);

        $signedUrlMaps = new FetchSignedUrlsOutput();
        foreach ($input->mediaPaths as $mediaPath) {
            [
                "url" => $url,
                "expiredAt" => $expiredAt,
            ] = $privateStorage->generateSignedUrl(basename($mediaPath), self::VALIDITY_PERIOD_HOUR);

            $signedUrlMaps->add($mediaPath, $url, $expiredAt);
        }

        return $signedUrlMaps;
    }

    private function privateStorage(Admin $admin, int $chatroomId): S3PrivateStorage
    {
        $contract = $this->contractRepository->findById($admin->contract_id);
        return $this->s3PrivateStorage->make($contract, DirectoryEnum::CHATROOM, $chatroomId);
    }
}
