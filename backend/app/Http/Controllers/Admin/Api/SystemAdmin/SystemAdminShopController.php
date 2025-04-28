<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api\SystemAdmin;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\UseCase\SystemAdmin\CreateShopUseCase\CreateShopInput;
use App\UseCase\SystemAdmin\CreateShopUseCase\CreateShopUseCase;
use App\UseCase\SystemAdmin\DeleteShopUseCase\DeleteShopUseCase;
use App\UseCase\SystemAdmin\EditShopUseCase\EditShopImageInput;
use App\UseCase\SystemAdmin\EditShopUseCase\EditShopInput;
use App\UseCase\SystemAdmin\EditShopUseCase\EditShopUseCase;
use App\UseCase\SystemAdmin\FetchShopListUseCase\FetchShopListInput;
use App\UseCase\SystemAdmin\FetchShopListUseCase\FetchShopListUseCase;
use App\UseCase\SystemAdmin\FetchShopUseCase\FetchShopUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SystemAdminShopController extends Controller
{
    public function __construct(
        private readonly FetchShopListUseCase $fetchShopListUseCase,
        private readonly FetchShopUseCase $fetchShopUseCase,
        private readonly CreateShopUseCase $createShopUseCase,
        private readonly EditShopUseCase $editShopUseCase,
        private readonly DeleteShopUseCase $deleteShopUseCase,
    ) {
    }

    public function fetchShopList(int $contractId, Request $request): JsonResponse
    {
        $input = new FetchShopListInput($request->input("searchWord", ""));
        $output = $this->fetchShopListUseCase->execute($contractId, $input);

        return JsonResponseBuilder::make([
            "shops" => $output->values
        ]);
    }

    public function fetchShop(int $contractId, int $shopId): JsonResponse
    {
        $output = $this->fetchShopUseCase->execute($contractId, $shopId);

        return JsonResponseBuilder::make([
            "shop" => $output->toArray()
        ]);
    }

    /**
     * @param  int                 $contractId
     * @param  Request             $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function createShop(int $contractId, Request $request): JsonResponse
    {
        $params = array_merge(
            $this->convertToResource($request),
            ["images" => $request->file('images') ?? []]
        );
        $input = new CreateShopInput(...$params);
        $shop = $this->createShopUseCase->execute($contractId, $input);

        return JsonResponseBuilder::make([
            "shopId" => $shop->id,
        ]);
    }

    public function editShop(int $contractId, int $shopId, Request $request): JsonResponse
    {
        $input = new EditShopInput(...$this->convertToResource($request));
        $imageInput = new EditShopImageInput($request);
        $output = $this->editShopUseCase->execute($contractId, $shopId, $input, $imageInput);

        return JsonResponseBuilder::make([
            "shop" => $output->toArray()
        ]);
    }

    public function deleteShop(int $contractId, int $shopId): JsonResponse
    {
        $result = $this->deleteShopUseCase->execute($contractId, $shopId);
        return JsonResponseBuilder::make([
            "isSuccess" => $result
        ]);
    }

    /**
     * @param  Request      $request
     * @return array<mixed>
     */
    private function convertToResource(Request $request): array
    {
        return [
            $request->input('name'),
            $request->input('appDisplayName'),
            $request->input('businessHours'),
            $request->input('rest'),
            $request->input('tel'),
            $request->input('address'),
            $request->input('prelusion'),
            $request->input('hpUrl'),
            $request->input('mapUrl'),
        ];
    }
}
