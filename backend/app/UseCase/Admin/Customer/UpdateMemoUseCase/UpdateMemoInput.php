<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Customer\UpdateMemoUseCase;

use App\Models\Customer\Rule\CustomerFieldRule;
use Illuminate\Support\Facades\Validator;

readonly class UpdateMemoInput
{
    public int $customerId;
    public string $memo;

    public function __construct(
        int|string $customerId,
        string $memo,
    ) {
        Validator::make(
            ["customerId" => $customerId, "memo" => $memo],
            $this->rules(),
        )->validate();

        $this->customerId = (int) $customerId;
        $this->memo = $memo;
    }

    /**
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            'customerId' => [
                'required',
                'integer',
            ],
            'memo' => [
                'nullable',
                'string',
                'max:' . CustomerFieldRule::MEMO_MAX_LENGTH,
            ]
        ];
    }
}
