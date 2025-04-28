<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\UploadMediaUseCase;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Infrastructure\Storage\S3\DirectoryEnum;
use App\Infrastructure\Storage\S3\S3PrivateStorage;
use App\Models\Admin\Admin;
use App\Util\StringUtil;

class UploadMediaUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
        private readonly S3PrivateStorage $s3PrivateStorage,
    ) {
    }

    /**
     * @param  Admin             $admin
     * @param  int               $chatroomId
     * @param  UploadMediaInput  $input
     * @return UploadMediaOutput
     */
    public function execute(Admin $admin, int $chatroomId, UploadMediaInput $input): UploadMediaOutput
    {
        $storage = $this->storage($admin, $chatroomId);

        $path = $storage->storeAs(
            $input->media,
            StringUtil::createRandomFileName($input->media),
        );

        if ($path === false) {
            throw new \DomainException("ファイルのアップロードに失敗しました。");
        }

        return new UploadMediaOutput($path, $input->mediaType);
    }

    private function storage(Admin $admin, int $chatroomId): S3PrivateStorage
    {
        $contract = $this->contractRepository->findById($admin->contract_id);
        return $this->s3PrivateStorage->make($contract, DirectoryEnum::CHATROOM, $chatroomId);
    }
}
