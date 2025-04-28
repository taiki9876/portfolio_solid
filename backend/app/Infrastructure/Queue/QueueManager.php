<?php

declare(strict_types=1);

namespace App\Infrastructure\Queue;

use Exception;
use Illuminate\Support\Facades\Log;

class QueueManager
{
    /**
     * @param string     $job
     * @param WorkerEnum $worker
     *
     * @return void
     *
     * @throws Exception
     */
    public static function enqueueJob(
        string $job,
        WorkerEnum $worker
    ): void {
        /** @var array<string, class-string> $traits */
        $traits = class_uses($job);
        if (!in_array("Illuminate\Foundation\Queue\Queueable", $traits, true)) {
            throw new Exception("Laravel標準のJobクラスを指定してください。Queueable traitをuseする必要があります。");
        }

        Log::info("dispatch");
        $job::dispatch()->onQueue($worker->value);
    }
}
