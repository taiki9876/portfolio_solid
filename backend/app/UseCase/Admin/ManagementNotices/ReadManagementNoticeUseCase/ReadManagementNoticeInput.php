<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\ReadManagementNoticeUseCase;

use Illuminate\Support\Facades\Validator;

class ReadManagementNoticeInput
{
    public readonly int $managementNoticeId;

    public function __construct(
        string $managementNoticeId,
    ) {
        Validator::make(
            [
                "managementNoticeId" => $managementNoticeId,
            ],
            $this->rules()
        )->validate();

        $this->managementNoticeId = (int)$managementNoticeId;
    }

    /**
     * @return array<mixed>
     */
    private function rules(): array
    {
        return [
            "managementNoticeId" => ["required", "string"],
        ];
    }
}
