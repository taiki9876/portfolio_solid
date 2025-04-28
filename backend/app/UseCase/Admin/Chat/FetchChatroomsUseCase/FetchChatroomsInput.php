<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchChatroomsUseCase;

use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\Util\StringUtil;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class FetchChatroomsInput
{
    public const NAME_MAX_LENGTH = 100;

    public ChatroomTypeEnum $chatType;
    public FilterStatusParamEnum $filterStatus;
    public string|null $name;
    public int $page;
    public string $contractKey;

    public function __construct(
        string $chatType,
        string $filterStatus,
        ?string $name,
        string $page,
        string $contractKey,
    ) {
        $chatType = StringUtil::defaultIfBlank($chatType, ChatroomTypeEnum::STORE->description());
        $filterStatus = StringUtil::defaultIfBlank($filterStatus, FilterStatusParamEnum::ALL->value);
        $name = StringUtil::isEmptyString($name) ? null : $name;
        $page = StringUtil::defaultIfBlank($page, "1");

        Validator::make(
            [
                "chatType" => $chatType,
                "filterStatus" => $filterStatus,
                "name" => $name,
                "page" => $page,
                "contractKey" => $contractKey,
            ],
            $this->rules(),
        )->validate();

        $this->chatType = ChatroomTypeEnum::fromDescription($chatType);
        $this->filterStatus = FilterStatusParamEnum::from($filterStatus);
        $this->name = $name;
        $this->page = (int) $page;
        $this->contractKey = $contractKey;
    }

    /**
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            'chatType' => [
                'nullable',
                'string',
                Rule::in(array_map(static fn ($enum) => $enum->description(), ChatroomTypeEnum::cases())),
            ],
            'filterStatus' => [
                'nullable',
                'string',
                Rule::in(FilterStatusParamEnum::cases()),
            ],
            'name' => [
                'nullable',
                'string',
                'max: ' . self::NAME_MAX_LENGTH,
            ],
            'page' => [
                'nullable',
                'integer',
                'min:1',
            ],
            'contractKey' => [
                'required',
                'string',
            ],
        ];
    }
}
