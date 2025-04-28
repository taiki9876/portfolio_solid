<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api\SystemAdmin;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\UseCase\SystemAdmin\ChangeSupportAccount\ChangeSupportAccountInput;
use App\UseCase\SystemAdmin\ChangeSupportAccount\ChangeSupportAccountUseCase;
use App\UseCase\SystemAdmin\ChangeSystemAccount\ChangeSystemAccountUseCase;
use App\UseCase\SystemAdmin\CreateContractUseCase\CreateContractInput;
use App\UseCase\SystemAdmin\CreateContractUseCase\CreateContractUseCase;
use App\UseCase\SystemAdmin\EditContractUseCase\EditContractInput;
use App\UseCase\SystemAdmin\EditContractUseCase\EditContractUseCase;
use App\UseCase\SystemAdmin\FetchContractListUseCase\FetchContractListInput;
use App\UseCase\SystemAdmin\FetchContractListUseCase\FetchContractListUseCase;
use App\UseCase\SystemAdmin\FetchContractNameUseCase\FetchContractNameUseCase;
use App\UseCase\SystemAdmin\FetchContractUseCase\FetchContractUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class SystemAdminController extends Controller
{
    public function __construct(
        private readonly FetchContractListUseCase $fetchContractListUseCase,
        private readonly FetchContractUseCase $fetchContractUseCase,
        private readonly CreateContractUseCase $createContractUseCase,
        private readonly EditContractUseCase $editContractUseCase,
        private readonly ChangeSupportAccountUseCase $changeSupportAccountUseCase,
        private readonly ChangeSystemAccountUseCase $changeSystemAccountUseCase,
        private readonly FetchContractNameUseCase $fetchContractNameUseCase,
    ) {
    }

    /**
     * 契約アカウント一覧を取得する
     * @param  Request      $request
     * @return JsonResponse
     */
    public function fetchContractList(Request $request): JsonResponse
    {
        $input = new FetchContractListInput($request->input("searchWord", ""));
        $output = $this->fetchContractListUseCase->execute($input);

        return JsonResponseBuilder::make([
            'contracts' => $output->values,
        ]);
    }

    /**
     * 特定の契約アカウントを取得する
     * @param  int          $contractId
     * @return JsonResponse
     */
    public function fetchContract(int $contractId): JsonResponse
    {
        $result = $this->fetchContractUseCase->execute($contractId);
        return JsonResponseBuilder::make([
            'contract' => $result->toContractInfo(),
            'admin' => $result->toOwnerAdminInfo(),
        ]);
    }

    /**
     * @param  Request      $request
     * @return JsonResponse
     * @throws Throwable
     */
    public function createContract(Request $request): JsonResponse
    {
        $input = new CreateContractInput(
            $request->input('contractName'),
            $request->input('contractKey'),
            $request->input('contractKeyAlias'),
            $request->input('contractAppType'),
            $request->input('personInCharge'),
            $request->input('tel'),
            $request->input('email'),
            $request->input('industry'),
            $request->input('memo'),
            $request->input('adminLoginId'),
            $request->input('adminPassword'),
        );
        $contract = $this->createContractUseCase->execute($input);

        return JsonResponseBuilder::make([
            'contractId' => $contract->id,
        ]);
    }

    /**
     * 特定の契約アカウントを更新する
     * @param  int          $contractId
     * @param  Request      $request
     * @return JsonResponse
     */
    public function editContract(int $contractId, Request $request): JsonResponse
    {
        $input = new EditContractInput(
            $request->input('contractName'),
            $request->input('personInCharge'),
            $request->input('tel'),
            $request->input('email'),
            $request->input('industry'),
            $request->input('memo'),
            $request->input('contractStatus'),
            $request->input('contractAppType'),
        );
        $this->editContractUseCase->execute($contractId, $input);
        return JsonResponseBuilder::make([
            'contractId' => $contractId,
        ]);
    }

    /**
     * システム管理者->サポートに切り替え
     * @param  Request      $request
     * @return JsonResponse
     */
    public function changeSupportAccount(Request $request): JsonResponse
    {
        $input = new ChangeSupportAccountInput($request->input("contractKey", ""));
        $isSuccess = $this->changeSupportAccountUseCase->execute($input);

        return JsonResponseBuilder::make([
            'isSuccess' => $isSuccess,
        ]);
    }

    /**
     * サポート->システム管理者に切り替え
     * @return JsonResponse
     */
    public function changeSystemAccount(): JsonResponse
    {
        $isSuccess = $this->changeSystemAccountUseCase->execute();

        return JsonResponseBuilder::make([
            'isSuccess' => $isSuccess,
        ]);
    }

    public function fetchContractName(int $contractId): JsonResponse
    {
        $contractName = $this->fetchContractNameUseCase->execute($contractId);
        return JsonResponseBuilder::make([
            'contractName' => $contractName,
        ]);
    }
}
