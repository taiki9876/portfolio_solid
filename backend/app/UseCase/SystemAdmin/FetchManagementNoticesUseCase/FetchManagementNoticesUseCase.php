<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchManagementNoticesUseCase;

use App\Models\ManagementNotice\ManagementNotice;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class FetchManagementNoticesUseCase
{
    public function execute(FetchManagementNoticesInput $input): FetchManagementNoticesOutput
    {
        $result = $this->query($input);
        return new FetchManagementNoticesOutput($result);
    }

    /**
     * @param  FetchManagementNoticesInput               $input
     * @return EloquentCollection<int, ManagementNotice>
     */
    private function query(FetchManagementNoticesInput $input): EloquentCollection
    {
        $query = ManagementNotice::query()
            ->select([
                "id",
                "title",
                "content",
                "published_at",
                "unpublished_at",
                "is_published",
                "contract_app_type",
                "created_at",
            ]);

        if ($input->searchWord !== "") {
            $query->where("title", "like", "%{$input->searchWord}%")
                ->orWhere("content", "like", "%{$input->searchWord}%");
        }

        return $query->orderBy("published_at", "desc")->get();
    }
}
