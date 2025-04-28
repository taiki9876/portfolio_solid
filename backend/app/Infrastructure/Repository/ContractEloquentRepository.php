<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository;

use App\Models\Contract\Contract;
use Carbon\CarbonImmutable;

class ContractEloquentRepository
{
    /**
     * @param Contract $contract
     *
     * @return Contract
     */
    public function save(Contract $contract): Contract
    {
        if ($contract->id === null) {
            $contract->save();
        } else {
            $contract->updated_at = CarbonImmutable::now();
            Contract::query()
                ->where('id', $contract->id)
                ->update($contract->toArray());
        }
        return $contract->refresh();
    }

    /**
     * @param int  $id
     * @param bool $withTrashed
     *
     * @return Contract
     */
    public function findById(int $id, bool $withTrashed = false): Contract
    {
        $query = Contract::withTrashed($withTrashed);
        return $query->where("id", $id)->firstOrFail();
    }

    /**
     * @param string $key
     * @param bool   $withTrashed
     *
     * @return Contract
     */
    public function findByKey(string $key, bool $withTrashed = false): Contract
    {
        $query = Contract::withTrashed($withTrashed);
        return $query->where("key", $key)->firstOrFail();
    }
}
