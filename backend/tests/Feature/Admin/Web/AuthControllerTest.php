<?php

declare(strict_types=1);

namespace Feature\Admin\Web;

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

    public function test_login_ログインできること(): void
    {
        $admin = $this->createStoreAdmin($this->createContract()->id);

        $this->post(
            route("admin.login"),
            ["login_id" => $admin->login_id, "password" => "password"]
        )
            ->assertStatus(Response::HTTP_FOUND)
            ->assertRedirect(route("admin.root"));

        self::assertTrue(Auth::check());
    }

    public function test_login_サポートはログインできないこと(): void
    {
        $admin = $this->createSupportAdmin($this->createContract()->id);

        $this->post(
            route("admin.login"),
            ["login_id" => $admin->login_id, "password" => "password"]
        )
            ->assertStatus(Response::HTTP_FOUND);
    }
}
