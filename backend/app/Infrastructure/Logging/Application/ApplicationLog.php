<?php

declare(strict_types=1);

namespace App\Infrastructure\Logging\Application;

use Illuminate\Log\Logger;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Level;
use Monolog\Processor\IntrospectionProcessor;
use Monolog\Processor\MemoryUsageProcessor;
use Monolog\Processor\ProcessIdProcessor;
use Monolog\Processor\UidProcessor;
use Monolog\Processor\WebProcessor;

/**
 * Application用ログフォーマッタ
 *
 * @see logging.php.channels.application
 */
class ApplicationLog
{
    /**
     * @param Logger $logger
     *
     * @return void
     */
    public function __invoke(Logger $logger): void
    {
        $introspectionProcessor = new IntrospectionProcessor(
            Level::Debug,
            [
                'Illuminate\\',
                'App\\Logging\\',
            ]
        );

        $webProcessor = new WebProcessor();
        $memoryUsageProcessor = new MemoryUsageProcessor();
        $uidProcessor = new UidProcessor();
        $processId = new ProcessIdProcessor();
        $formatter = new JsonLogFormatter();

        $monoLog = $logger->getLogger();
        if (!$monoLog instanceof \Monolog\Logger) {
            return;
        }

        /** @var RotatingFileHandler $handler */
        foreach ($monoLog->getHandlers() as $handler) {
            $handler->setFormatter($formatter);
            $handler->pushProcessor($introspectionProcessor);
            $handler->pushProcessor($webProcessor);
            $handler->pushProcessor($memoryUsageProcessor);
            $handler->pushProcessor($uidProcessor);
            $handler->pushProcessor($processId);
        }
    }
}
