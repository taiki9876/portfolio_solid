<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\ChangeChatroomStatus;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ChangeChatroomStatusInput
{
    public RequestStatusEnum $requestStatusType;
    public bool $isOn;

    public function __construct(
        string $requestStatusType,
        bool $isOn,
    ) {
        Validator::make(
            ["requestStatusType" => $requestStatusType, "isOn" => $isOn],
            $this->rules(),
        )->validate();

        $this->requestStatusType = RequestStatusEnum::from($requestStatusType);
        $this->isOn = $isOn;
    }

    /**
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            'requestStatusType' => [
                'required',
                'string',
                Rule::in(RequestStatusEnum::cases()),
            ],
            'isOn' => [
                'required',
                'boolean',
            ],
        ];
    }
}
