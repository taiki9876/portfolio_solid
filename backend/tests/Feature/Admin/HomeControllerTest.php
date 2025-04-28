<?php

declare(strict_types=1);

namespace Feature\Admin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;

    public function test_index_管理者はアクセスできること(): void
    {
        //Given
        $admin = $this->createSupportAdmin($this->createContract()->id);
        $this->actingAs($admin, "admin");

        //When
        $response = $this->get("/admin");

        //Then
        $response->assertStatus(Response::HTTP_OK);
        self::assertTrue(Auth::check());
    }
}
