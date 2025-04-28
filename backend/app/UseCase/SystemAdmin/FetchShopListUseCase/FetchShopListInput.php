<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchShopListUseCase;

use Illuminate\Support\Facades\Validator;

class FetchShopListInput
{
    public readonly string $searchWord;

    public function __construct(
        string|null $searchWord,
    ) {
        Validator::make(
            [
                "search_word" => $searchWord,
            ],
            $this->rules()
        )
            ->validate();

        $this->searchWord = $searchWord ?? "";
    }

    /**
     * @return array<string, array<string>>
     */
    private function rules(): array
    {
        return [
            'search_word' => ['nullable', 'string', 'max: 200'],
        ];
    }
}
