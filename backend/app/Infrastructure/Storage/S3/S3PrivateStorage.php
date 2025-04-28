<?php

declare(strict_types=1);

namespace App\Infrastructure\Storage\S3;

use App\Models\Contract\Contract;
use Exception;
use Illuminate\Support\Facades\Storage;

class S3PrivateStorage extends S3Storage
{
    // @see config/filesystem.php
    public const DISK = 's3_private';

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
    public function make(Contract $contract, DirectoryEnum $directoryType, string|int|null $id = null): self
    {
        if ($contract->id === null) {
            throw new Exception('契約IDが設定されていません');
        }

        $uploadDirectory = $contract->id . "/" . $directoryType->getDirectory($id);
        return new self($uploadDirectory);
    }
}
