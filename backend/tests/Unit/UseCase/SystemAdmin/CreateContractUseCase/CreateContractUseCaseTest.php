<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\CreateContractUseCase;

use App\Infrastructure\Firebase\FirebaseAuth;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use App\UseCase\SystemAdmin\CreateContractUseCase\CreateContractInput;
use App\UseCase\SystemAdmin\CreateContractUseCase\CreateContractUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Mockery;
use Tests\Helper\Mock\FirebaseMock;
use Tests\TestCase;

class CreateContractUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use FirebaseMock;

    public function test_execute_契約アカウントと管理者アカウントを作成できること(): void
    {
        //Given
        $params = [
            "contractName" => "契約アカウント名",
            "contractKey" => "adsf",
            "contractKeyAlias" => "alias",
            "contractAppType" => (string) ContractAppTypeEnum::NATIVE_APP->value,
            "personInCharge" => "担当者名",
            "tel" => "090-1234-5678",
            "email" => null,
            "industry" => "業種",
            "memo" => "メモ",

            "adminLoginId" => "admin_login_id",
            "adminPassword" => "password",
        ];
        $input = new CreateContractInput(...$params);

        // When
        $this->expectCalledFirebaseAuth();
        $contact = resolve(CreateContractUseCase::class)->execute($input);

        // Then
        self::assertDatabaseHas("contracts", [
            "id" => $contact->id,
            "name" => $params["contractName"],
            "key" => $params["contractKey"],
            "key_alias" => $params["contractKeyAlias"],
            "person_in_charge" => $params["personInCharge"],
            "tel" => $params["tel"],
            "email" => $params["email"],
            "industry" => $params["industry"],
            "memo" => $params["memo"],

            "contract_status" => ContractStatusEnum::ACTIVE->value,
        ]);

        self::assertDatabaseHas("admins", [
            "contract_id" => $contact->id,
            "login_id" => $params["adminLoginId"],
            "role" => AdminRoleEnum::STORE_OWNER->value,
        ]);
        /** @var \stdClass $admin */
        $admin = DB::table("admins")->where("contract_id", $contact->id)->where("role", AdminRoleEnum::STORE_OWNER->value)->first();
        self::assertTrue(Hash::check($params["adminPassword"], $admin->password ?? "") === true);

        self::assertDatabaseHas("admins", [
            "contract_id" => $contact->id,
            "login_id" => "support-{$contact->id}",
            "role" => AdminRoleEnum::SUPPORT_ADMIN->value,
        ]);
    }

    /**
     * Firebase Auth作成処理がよばれることを検証と同時にモックする
     * @return void
     */
    private function expectCalledFirebaseAuth(): void
    {
        $mock = Mockery::mock(FirebaseAuth::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("createAuthUser")->once()->andReturn($this->stabUserRecord());
        app()->instance(FirebaseAuth::class, $mock);
    }
}
