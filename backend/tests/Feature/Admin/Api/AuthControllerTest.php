<?php

declare(strict_types=1);

namespace Feature\Admin\Api;

use App\Infrastructure\Firebase\FirebaseAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;

    public function test_logout_ログアウトできること(): void
    {
        //Given
        $admin = $this->createSupportAdmin($this->createContract()->id);
        $this->actingAs($admin, "admin");

        self::assertTrue(Auth::check());

        //When
        $this->post(route("admin.api.logout"))
            ->assertStatus(Response::HTTP_NO_CONTENT);

        //Then
        self::assertFalse(Auth::check());
    }

    public function test_profile_ログイン中の管理者情報を取得できること(): void
    {
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $this->actingAs($admin, "admin");

        $mock = \Mockery::mock(FirebaseAuth::class)->makePartial();
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("createFirebaseLoginToken")->once()->andReturn("dummyToken");
        app()->instance(FirebaseAuth::class, $mock);

        $response = $this->get(route("admin.api.profile"));
        $response->assertStatus(Response::HTTP_OK);

        self::assertEqualsCanonicalizing(
            [
                "id" => $admin->id,
                "contract_name" => $contract->name,
                "contract_key" => $contract->key,
                "role" => $admin->role->toString(),
                "firebaseLoginToken" => "dummyToken",
            ],
            $response->collect()->toArray(),
        );
    }
}
