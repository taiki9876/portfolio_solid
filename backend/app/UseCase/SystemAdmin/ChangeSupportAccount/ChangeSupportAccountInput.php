<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\ChangeSupportAccount;

use Illuminate\Support\Facades\Validator;

class ChangeSupportAccountInput
{
    public readonly string $contractKey;

    public function __construct(
        string $contractKey,
    ) {
        Validator::make(
            ['contractKey' => $contractKey],
            $this->rules(),
            $this->messages(),
        )->validate();

        $this->contractKey = $contractKey;
    }

    /**
     * @return array<string, array<string>>
     */
    private function rules(): array
    {
        return [
            'contractKey' => ['required', 'string'],
        ];
    }

    /**
     * @return string[]
     */
    private function messages(): array
    {
        return [
            'contractKey.required' => '契約キーを指定してください。',
        ];
    }
}
