<?php

declare(strict_types=1);

namespace Feature\Infrastructure\Repository;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Contract\ContractFactory;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class ContractEloquentRepositoryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;

    private ContractEloquentRepository $contractRepository;

    public function setUp(): void
    {
        parent::setUp();
        $this->contractRepository = resolve(ContractEloquentRepository::class);
    }

    public function test_save_新規保存と更新できること(): void
    {
        //Given
        $contract = ContractFactory::init("name", "key", "alias", ContractAppTypeEnum::NATIVE_APP);

        //When
        $newContract = $this->contractRepository->save($contract);

        //Then
        self::assertTrue($newContract->id !== null);
        $this->assertDatabaseHas(
            'contracts',
            [
                "name" => $contract->name,
                "key" => $contract->key,
                "contract_status" => $contract->contract_status->value,
                "created_at" => $contract->created_at->toDateTimeString(),
                "updated_at" => $contract->updated_at->toDateTimeString(),
                "deleted_at" => $contract->deleted_at?->toDateTimeString(),
            ],
        );

        $contract->suspension();
        $this->contractRepository->save($contract);
        $this->assertDatabaseHas(
            'contracts',
            [
                "id" => $contract->id,
                "deleted_at" => $contract->deleted_at?->toDateTimeString(),
            ],
        );
    }

    public function test_findById_検索できること(): void
    {
        //Given
        $contract = $this->createContract();

        //When
        $actual = $this->contractRepository->findById($contract->id);

        //Then
        self::assertEquals($contract->id, $actual->id);
    }

    public function test_findById_見つからない場合は例外が出ること(): void
    {
        $this->expectException(ModelNotFoundException::class);
        $this->contractRepository->findById(9999);
    }

    public function test_findByKey_検索できること(): void
    {
        //Given
        $contract = $this->createContract(overrideParams: ["key" => "testkey"]);

        //When
        $actual = $this->contractRepository->findByKey("testkey");

        //Then
        self::assertEquals($contract->key, $actual->key);
    }

    public function test_findByKey_検索できること_オプションで停止中の契約も取得できること(): void
    {
        //Given
        $this->createContract(overrideParams: ["key" => "testkey", "deleted_at" => now()->toImmutable()]);

        //When Then 削除済みも取得できること
        $contract = $this->contractRepository->findByKey("testkey", true);
        self::assertEquals("testkey", $contract->key);

        //When Then 削除済みは除外すること
        $this->expectException(ModelNotFoundException::class);
        $this->contractRepository->findByKey("testkey");
    }
}
