<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Infrastructure\Queue\QueueManager;
use App\Infrastructure\Queue\WorkerEnum;
use App\UseCase\Jobs\SampleJob;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class SampleCommand extends Command
{
    protected $signature = 'app:sample-command';
    protected $description = 'Command description';

    public function handle(): void
    {
        Log::info("command start");
        QueueManager::enqueueJob(SampleJob::class, WorkerEnum::Default);
    }
}
