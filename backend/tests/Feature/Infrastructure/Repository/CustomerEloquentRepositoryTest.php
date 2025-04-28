<?php

declare(strict_types=1);

namespace Tests\Feature\Infrastructure\Repository;

use App\Infrastructure\Repository\CustomerEloquentRepository;
use App\Models\Customer\Customer;
use App\Models\Customer\ValueObjects\SexEnum;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class CustomerEloquentRepositoryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use CustomerCreator;

    private CustomerEloquentRepository $repository;

    public function setUp(): void
    {
        parent::setUp();
        $this->repository = new CustomerEloquentRepository();
    }

    public function test_save_新規保存と更新ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $props = $this->customerDummyProps();
        $customer = Customer::create($contract, ...$props);

        //When 新規保存
        $this->repository->save($customer);//Then: 新規保存できること
        self::assertDatabaseHas("customers", [
            "id" => $customer->id,
            "contract_id" => $contract->id,
            ...$props
        ]);

        //When 更新
        $customer->email = "test@changed.hoge";
        $this->repository->save($customer);//Then: 更新できること
        self::assertDatabaseHas("customers", [
            "id" => $customer->id,
            "contract_id" => $contract->id,
            ...$props,
            "email" => "test@changed.hoge"
        ]);
    }

    public function test_findById_ID検索できること(): void
    {
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);

        $actual = $this->repository->findById($customer->id);
        self::assertNotNull($actual);
        self::assertEquals($customer->id, $actual->id);
    }

    /**
     * @return array<string, mixed>
     */
    private function customerDummyProps(): array
    {
        return [
            "first_name" => "first_name",
            "last_name" => "last_name",
            "first_name_kana" => "ナマエ",
            "last_name_kana" => "ミョウジ",
            "birth_date" => CarbonImmutable::parse("2000-01-01"),
            "sex" => SexEnum::MALE,
            "email" => "test@example.hoge",
            "phone_number" => "090-1234-5678",
            "post_code" => "123-4567",
            "address" => "東京都渋谷区",
            "avatar_image_path" => "avatar_image_path",
            "is_email_opt_in" => true,
            "last_visit_at" => CarbonImmutable::parse("2021-01-01 12:34:56"),
            "entry_at" => null,
            "leave_at" => null,
            "favorite_shop_id" => 1,
            "memo" => "memo",
        ];
    }
}
