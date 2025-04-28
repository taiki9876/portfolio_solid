<?php

declare(strict_types=1);

namespace App\Infrastructure\Queue;

enum WorkerEnum: string
{
    case Default = 'default';
}
