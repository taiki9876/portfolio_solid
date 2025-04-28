<?php

declare(strict_types=1);

namespace App\UseCase\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SampleJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
    ) {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("Job実行");
    }
}
