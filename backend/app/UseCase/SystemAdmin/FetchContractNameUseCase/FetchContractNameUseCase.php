<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchContractNameUseCase;

use App\Models\Contract\Contract;
use Illuminate\Support\Facades\DB;
use stdClass;

class FetchContractNameUseCase
{
    public function execute(int $contractId): string
    {
        return $this->query($contractId);
    }

    private function query(int $contractId): string
    {
        /** @var stdClass $result */
        $result = DB::table(Contract::TABLE)->select(["name"])->where("id", $contractId)->first();
        return $result->name;
    }
}
