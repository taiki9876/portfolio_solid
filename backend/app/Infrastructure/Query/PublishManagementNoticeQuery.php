<?php

declare(strict_types=1);

namespace App\Infrastructure\Query;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\ManagementNotice;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

/**
 * 掲載中の運営からのお知らせを取得するクエリ
 */
class PublishManagementNoticeQuery
{
    /**
     * @param  ContractAppTypeEnum               $contractAppType
     * @param  int|null                          $limit
     * @return Collection<int, ManagementNotice>
     */
    public function search(ContractAppTypeEnum $contractAppType, ?int $limit = null): Collection
    {
        return $this->query($contractAppType, $limit)->get();
    }

    /**
     * @param  ContractAppTypeEnum                    $contractAppType
     * @param  int                                    $perPage
     * @param  int                                    $page
     * @return LengthAwarePaginator<ManagementNotice>
     */
    public function searchPaginate(ContractAppTypeEnum $contractAppType, int $perPage, int $page): LengthAwarePaginator
    {
        return $this->query($contractAppType)->paginate($perPage, ['*'], 'page', $page);
    }

    /**
     * @param  ContractAppTypeEnum       $contractAppType
     * @param  int|null                  $limit
     * @return Builder<ManagementNotice>
     */
    public function query(ContractAppTypeEnum $contractAppType, ?int $limit = null): Builder
    {
        $query = ManagementNotice::query()
            ->where('is_published', true)
            ->where('published_at', '<=', now())
            ->where(static function ($query) {
                $query->whereNull('unpublished_at')
                    ->orWhere('unpublished_at', '>', now());
            })
            ->where(static function ($query) use ($contractAppType) {
                $query->whereNull('contract_app_type')
                    ->orWhere('contract_app_type', $contractAppType->value);
            })
            ->orderBy('published_at', 'desc');

        if ($limit !== null) {
            $query->limit($limit);
        }

        return $query;
    }
}
