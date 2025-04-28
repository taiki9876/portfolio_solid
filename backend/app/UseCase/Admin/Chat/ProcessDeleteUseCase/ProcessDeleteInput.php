<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\ProcessDeleteUseCase;

use Illuminate\Support\Facades\Validator;

class ProcessDeleteInput
{
    public bool $isLatestMessageDeleted;
    public bool $isUnreadMessage;

    public function __construct(
        bool $isLatestMessageDeleted,
        bool $isUnreadMessage,
    ) {
        Validator::make(
            [
                "isLatestMessageDeleted" => $isLatestMessageDeleted,
                "isUnreadMessage" => $isUnreadMessage,
            ],
            $this->rules(),
        )->validate();

        $this->isLatestMessageDeleted = $isLatestMessageDeleted;
        $this->isUnreadMessage = $isUnreadMessage;
    }

    /**
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            'isLatestMessageDeleted' => [
                'required',
                'boolean',
            ],
            'isUnreadMessage' => [
                'required',
                'boolean',
            ],
        ];
    }
}
