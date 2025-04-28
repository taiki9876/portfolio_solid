<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Auth\Login;

use Illuminate\Support\Facades\Validator;

class AdminLoginInput
{
    public readonly string $loginId;
    public readonly string $password;

    public function __construct(
        string $loginId,
        string $password
    ) {
        Validator::make(
            ['login_id' => $loginId, 'password' => $password],
            $this->rules(),
        )->validate();

        $this->loginId = $loginId;
        $this->password = $password;
    }

    /**
     * @return array<string, array<string>>
     */
    private function rules(): array
    {
        return [
            'login_id' => ['required', 'string'],
            'password' => ['required', 'string'],
        ];
    }
}
