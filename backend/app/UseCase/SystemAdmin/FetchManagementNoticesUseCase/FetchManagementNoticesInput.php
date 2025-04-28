<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchManagementNoticesUseCase;

use Illuminate\Support\Facades\Validator;

class FetchManagementNoticesInput
{
    public readonly string $searchWord;

    public function __construct(
        string|null $searchWord,
    ) {
        Validator::make(
            [
                "searchWord" => $searchWord,
            ],
            $this->rules()
        )
            ->validate();

        $this->searchWord = $searchWord ?? "";
    }

    /**
     * @return array<string, string[]>
     */
    private function rules(): array
    {
        return [
            "searchWord" => ["nullable", "string", "max:255"],
        ];
    }
}
