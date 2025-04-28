<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Response\CsvResponseBuilder;
use App\Http\Response\JsonResponseBuilder;
use App\Models\Admin\Admin;
use App\UseCase\Admin\Customer\FetchCustomerUseCase\FetchCustomerInput;
use App\UseCase\Admin\Customer\FetchCustomerUseCase\FetchCustomerUseCase;
use App\UseCase\Admin\Customer\UpdateMemoUseCase\UpdateMemoInput;
use App\UseCase\Admin\Customer\UpdateMemoUseCase\UpdateMemoUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CustomerController extends Controller
{
    public function __construct(
        private readonly FetchCustomerUseCase $fetchCustomerUseCase,
        private readonly UpdateMemoUseCase $updateMemoUseCase,
    ) {
    }

    /**
     * @param  Request      $request
     * @return JsonResponse
     */
    public function fetchCustomers(Request $request): JsonResponse
    {
        $input = new FetchCustomerInput(
            $request->get('perPage'),
            $request->get('page'),
            $request->get('sortBy'),
            $request->get('sortOrder'),
            $request->get('searchWord'),
        );

        /** @var Admin $admin */
        $admin = Auth::user();
        $output = $this->fetchCustomerUseCase->execute($input, $admin->contract_id);

        return JsonResponseBuilder::make(
            [
                "data" => $output->value,
                "meta" => $output->meta->toArray(),
            ]
        );
    }

    /**
     * TODO: 顧客データをCSVでダウンロード　現状はダミーデータ
     *
     * @return StreamedResponse
     */
    public function downloadCustomers(): StreamedResponse
    {
        // TODO: データを集計
        $resource = collect([
            ['名前', '年齢', '職業'],
            ['山田太郎', '25', 'エンジニア'],
            ['鈴木花子', '30', 'デザイナー'],
            ['田中一郎', '35', 'マネージャー'],
        ]);

        return CsvResponseBuilder::make($resource, 'customers.csv');
    }

    /**
     * @param  Request  $request
     * @return Response
     */
    public function updateMemo(Request $request): Response
    {
        $input = new UpdateMemoInput(
            $request->get('customerId', 0),
            $request->get('memo', ''),
        );
        $this->updateMemoUseCase->execute($input);

        return response()->noContent();
    }
}
