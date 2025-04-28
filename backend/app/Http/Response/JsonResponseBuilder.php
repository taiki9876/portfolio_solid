<?php

declare(strict_types=1);

namespace App\Http\Response;

use Illuminate\Http\JsonResponse;

class JsonResponseBuilder
{
    /**
     * @param  array<mixed> $data
     * @param  array<mixed> $header
     * @return JsonResponse
     */
    public static function make(array $data, array $header = []): JsonResponse
    {
        return \response()->json($data, 200, $header, \JSON_UNESCAPED_UNICODE);
    }
}
