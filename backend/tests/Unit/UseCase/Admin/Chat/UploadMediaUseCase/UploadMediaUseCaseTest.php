<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\UploadMediaUseCase;

use App\Infrastructure\Storage\S3\S3PrivateStorage;
use App\Models\Chatroom\ChatroomMember;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaInput;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaOutput;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaTypeEnum;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Mockery;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\Helper\Mock\S3StorageMock;
use Tests\TestCase;

class UploadMediaUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;
    use S3StorageMock;

    public function test_execute_メディアファイルをアップロードできること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);

        $input = new UploadMediaInput(
            UploadedFile::fake()->image('photo.jpg'),
        );

        $dummyPath = 'dummy_path';

        $storageMock = Mockery::mock(S3PrivateStorage::class);
        /** @phpstan-ignore-next-line */
        $storageMock
            ->shouldReceive('storeAs')
            ->once()
            ->with($input->media, Mockery::type('string'))
            ->andReturn($dummyPath);
        $this->setPrivateBucketMock($storageMock);

        //When
        $output = resolve(UploadMediaUseCase::class)->execute($admin, $chatroom->id, $input);

        //Then
        self::assertInstanceOf(UploadMediaOutput::class, $output);
        self::assertEquals([
            "uploadPath" => $dummyPath,
            "mediaType" => UploadMediaTypeEnum::PHOTO->value,
        ], $output->toArray());
    }
}
