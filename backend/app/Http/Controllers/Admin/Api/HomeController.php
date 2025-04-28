<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\Models\Admin\Admin;
use App\UseCase\Admin\Home\FetchAggregationSummaryUseCase\FetchAggregationSummaryUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function __construct(
        private readonly FetchAggregationSummaryUseCase $fetchAggregationSummaryUseCase,
    ) {
    }

    public function aggregationSummary(): JsonResponse
    {
        /** @var Admin $admin */
        $admin = Auth::user();
        $output = $this->fetchAggregationSummaryUseCase->execute($admin);

        return JsonResponseBuilder::make([
            'managementNotices' => $output->managementNotices(),
        ]);
    }
}
