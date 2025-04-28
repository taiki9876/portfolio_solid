<?php

declare(strict_types=1);

namespace App\Infrastructure\Storage\S3;

use App\Models\Contract\Contract;
use Exception;
use Illuminate\Support\Facades\Storage;

class S3PublicStorage extends S3Storage
{
    // @see config/filesystem.php
    public const DISK = 's3_public';

    public function __construct(
        string $uploadDirectory = "",
    ) {
        parent::__construct(
            $uploadDirectory,
            Storage::disk(self::DISK)
        );
    }

    /**
     * @param  Contract        $contract
     * @param  DirectoryEnum   $directoryType
     * @param  string|int|null $id
     * @return self
     *
     * @throws Exception
     */
    public function make(Contract|int $contract, DirectoryEnum $directoryType, string|int|null $id = null): self
    {
        $contractId = $this->contractId($contract);
        $uploadDirectory = $contractId . "/" . $directoryType->getDirectory($id);
        return new self($uploadDirectory);
    }

    private function contractId(Contract|int $contract): int
    {
        if ($contract instanceof Contract) {
            if ($contract->id === null) {
                throw new Exception('契約IDが設定されていません');
            }
            return $contract->id;
        }

        return $contract;
    }
}
