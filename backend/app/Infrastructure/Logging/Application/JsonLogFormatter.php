<?php

declare(strict_types=1);

namespace App\Infrastructure\Logging\Application;

use Monolog\Formatter\FormatterInterface;
use Monolog\Formatter\JsonFormatter;
use Monolog\Logger;
use Monolog\LogRecord;

class JsonLogFormatter extends JsonFormatter implements FormatterInterface
{
    /**
     * @param LogRecord $record
     *
     * @return string
     */
    public function format(LogRecord $record): string
    {
        $fields = $this->makeLogFields($record); //ログ規格に沿った情報
        $fields['context'] = $this->makeContextFields($record); //ログ出力時に指定できるcontext、その他 例外時のスタックトレースなど
        $fields['extra'] = $this->makeExtraFields($record); // その他付与情報

        return $this->toJson($this->normalize($fields), true) . ($this->appendNewline ? "\n" : '');
    }

    public function formatBatch(array $records): string
    {
        $result = json_encode(array_map([$this, 'format'], $records));
        if ($result === false) {
            return '';
        }

        return $result;
    }

    /**
     * @param LogRecord $record
     *
     * @return array<string, mixed>
     */
    private function makeLogFields(LogRecord $record): array
    {
        return [
            'time' => $record->datetime,
            'uid' => $record->extra['uid'], // from UidProcessor
            'level' => Logger::toMonologLevel($record->level)->getName(),
            'message' => $record->message,
            'pid' => $record->extra['process_id'], // from ProcessIdProcessor
            'server' => $_SERVER['HTTP_HOST'] ?? '',
        ];
    }

    /**
     * @param LogRecord $record
     *
     * @return array<string, string>
     */
    private function makeExtraFields(LogRecord $record): array
    {
        return [
            'memory_usage' => $record->extra['memory_usage'] ?? "", //from MemoryUsageProcessor
            'ip' => $record->extra['ip'] ?? "", // from WebProcessor
            'class' => $record->extra['class'] ?? "", // from IntrospectionProcessor
            'function' => $record->extra['function'] ?? "", // from IntrospectionProcessor
            'path' => \PHP_SAPI === "cli" ? "None. cli execution" : \request()->getRequestUri()
        ];
    }

    /**
     * @param LogRecord $record
     *
     * @return array<string, string>
     */
    private function makeContextFields(LogRecord $record): array
    {
        $context = $record->context ?? [];

        $exception = $context['exception'] ?? '';
        unset($context['exception']);
        return array_merge(
            ['trace' => $exception],
            $context,
        );
    }
}
