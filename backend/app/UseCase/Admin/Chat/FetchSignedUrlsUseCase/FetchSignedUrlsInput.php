<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchSignedUrlsUseCase;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FetchSignedUrlsInput
{
    /**
     * @var string[]
     */
    public array $mediaPaths;

    /**
     * @param  string[]            $mediaPaths
     * @throws ValidationException
     */
    public function __construct(
        array $mediaPaths,
    ) {
        Validator::make(
            ["mediaPaths" => $mediaPaths],
            $this->rules(),
        )->validate();

        $this->mediaPaths = $mediaPaths;
    }

    /**
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            'mediaPaths.*' => [
                'string',
            ],
        ];
    }
}
