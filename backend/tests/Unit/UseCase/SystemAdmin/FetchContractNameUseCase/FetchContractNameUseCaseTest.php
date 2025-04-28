<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchContractNameUseCase;

use App\UseCase\SystemAdmin\FetchContractNameUseCase\FetchContractNameUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class FetchContractNameUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;

    public function test_execute_契約名を取得できること(): void
    {
        // Given
        $contract = $this->createContract();

        // When
        $useCase = resolve(FetchContractNameUseCase::class);
        $contractName = $useCase->execute($contract->id);

        // Then
        self::assertEquals($contract->name, $contractName);
    }
}
