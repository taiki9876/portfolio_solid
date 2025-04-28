<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\FetchSignedUrlsUseCase;

use App\Infrastructure\Storage\S3\S3PrivateStorage;
use App\Models\Chatroom\ChatroomMember;
use App\UseCase\Admin\Chat\FetchSignedUrlsUseCase\FetchSignedUrlsInput;
use App\UseCase\Admin\Chat\FetchSignedUrlsUseCase\FetchSignedUrlsOutput;
use App\UseCase\Admin\Chat\FetchSignedUrlsUseCase\FetchSignedUrlsUseCase;
use App\Util\DateUtil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\Helper\Mock\S3StorageMock;
use Tests\TestCase;

class FetchSignedUrlsUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;
    use S3StorageMock;

    public function test_execute_署名つきURLを取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);

        $input = new FetchSignedUrlsInput(
            ["test.jpg", "test2.jpg"]
        );

        $dummyPath = 'dummy_path';

        $expiredAt = now()->addHours(FetchSignedUrlsUseCase::VALIDITY_PERIOD_HOUR)->format(DateUtil::DATE_FORMAT);
        $storageMock = Mockery::mock(S3PrivateStorage::class);
        /** @phpstan-ignore-next-line */
        $storageMock
            ->shouldReceive('generateSignedUrl')
            ->twice()
            ->with(Mockery::type('string'), FetchSignedUrlsUseCase::VALIDITY_PERIOD_HOUR)
            ->andReturn([
                "url" => $dummyPath,
                "expiredAt" => $expiredAt,
            ]);
        $this->setPrivateBucketMock($storageMock);

        //When
        $output = resolve(FetchSignedUrlsUseCase::class)->execute($admin, $chatroom->id, $input);

        //Then
        self::assertInstanceOf(FetchSignedUrlsOutput::class, $output);
        $expected = [
            "test.jpg" => ["signedUrl" => $dummyPath, "expiredAt" => $expiredAt],
            "test2.jpg" => ["signedUrl" => $dummyPath, "expiredAt" => $expiredAt],
        ];
        self::assertEquals(
            $expected,
            $output->values,
        );
    }
}
