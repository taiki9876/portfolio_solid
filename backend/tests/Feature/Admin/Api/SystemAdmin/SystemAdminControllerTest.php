<?php

declare(strict_types=1);

namespace Feature\Admin\Api\SystemAdmin;

use App\Models\Admin\Admin;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use App\UseCase\SystemAdmin\CreateContractUseCase\CreateContractUseCase;
use App\UseCase\SystemAdmin\EditContractUseCase\EditContractUseCase;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class SystemAdminControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;

    public function test_fetchContract_契約情報を取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();
        $storeAdmin = $this->createStoreAdmin($contract->id);
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->get(route("admin.api.systemAdmin.fetchContract", ["contract_id" => $contract->id]));

        //Then
        $response->assertStatus(Response::HTTP_OK);

        // システム管理者以外はアクセスできないこと
        $this->actingAs($storeAdmin, "admin");
        $this->get(route("admin.api.systemAdmin.fetchContract", ["contract_id" => $contract->id]))
            ->assertStatus(Response::HTTP_FORBIDDEN);
    }

    //TODO: デモ用にサポートアカウントではなく店舗オーナーへ切り替える処理にしている
    //    public function test_changeAccount_アカウントの切り替えができること(): void
    //    {
    //        //Given
    //        $dummyKey = "dummyKey";
    //        $contract = $this->createContract(overrideParams: ["key" => $dummyKey]);
    //        $systemAdmin = $this->createSystemAdmin();
    //        $supportAdmin = $this->createSupportAdmin(contractId: $contract->id);
    //
    //        $this->actingAs($systemAdmin, "admin");
    //
    //        //When
    //        $this->post(
    //            route("admin.api.systemAdmin.changeSupportAccount"),
    //            ["contractKey" => $dummyKey]
    //        )
    //            ->assertStatus(Response::HTTP_OK)
    //            ->assertJson(["isSuccess" => true]);
    //
    //        //Then
    //        /** @var Admin $loginAdmin */
    //        $loginAdmin = Auth::user();
    //        self::assertEquals($supportAdmin->id, $loginAdmin->id, "サポートアカウントに切り替わること");
    //    }

    /**
     * @return void
     *
     * @throws Exception
     */
    //    public function test_changeAccount_対応するキーのアカウントがない場合切り替えに失敗すること(): void
    //    {
    //        //Given
    //        $contract = $this->createContract(overrideParams: ["key" => "dummyKey"]);
    //        $systemAdmin = $this->createSystemAdmin();
    //        $this->createSupportAdmin(contractId: $contract->id);
    //
    //        $this->actingAs($systemAdmin, "admin");
    //
    //        //When
    //        $this->expectException(ModelNotFoundException::class);
    //        $this->post(
    //            route("admin.api.systemAdmin.changeSupportAccount"),
    //            ["contractKey" => "hoge"]
    //        )
    //            ->assertStatus(Response::HTTP_NOT_FOUND)
    //            ->assertJson(["isSuccess" => false]);
    //    }

    public function test_changeSystemAccount_システム管理者へアカウントの切り替えができること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();
        $supportAdmin = $this->createSupportAdmin(contractId: $contract->id);

        $this->actingAs($supportAdmin, "admin");

        //When
        $this->post(route("admin.api.systemAdmin.changeSystemAccount"))
            ->assertStatus(Response::HTTP_OK)
            ->assertJson(["isSuccess" => true]);

        //Then
        /** @var Admin $loginAdmin */
        $loginAdmin = Auth::user();
        self::assertEquals($systemAdmin->id, $loginAdmin->id, "サポートアカウントに切り替わること");

        // サポート以外はアクセスできないこと
        $ownerAdmin = $this->createStoreAdmin($contract->id);
        $this->actingAs($ownerAdmin, "admin");
        $this->post(route("admin.api.systemAdmin.changeSystemAccount"))
            ->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_createContract_契約の保存ができること(): void
    {
        //Given
        $mock = Mockery::mock(CreateContractUseCase::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("execute")->once()->andReturn($this->createContract());
        app()->instance(CreateContractUseCase::class, $mock);

        $systemAdmin = $this->createSystemAdmin();
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->post(
            route("admin.api.systemAdmin.createContract"),
            [
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
            ]
        );

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_editContract_契約の編集ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $mock = Mockery::mock(EditContractUseCase::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("execute")->once()->andReturn($contract);
        app()->instance(EditContractUseCase::class, $mock);

        $systemAdmin = $this->createSystemAdmin();
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->patch(
            route("admin.api.systemAdmin.editContract", ["contract_id" => $contract->id]),
            [
                "contractName" => "契約アカウント名",
                "personInCharge" => "担当者名",
                "tel" => "090-1234-5678",
                "email" => null,
                "industry" => "業種",
                "memo" => "メモ",
                "contractStatus" => (string) ContractStatusEnum::ACTIVE->value,
                "contractAppType" => (string) ContractAppTypeEnum::NATIVE_APP->value,
            ]
        );

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }
}
