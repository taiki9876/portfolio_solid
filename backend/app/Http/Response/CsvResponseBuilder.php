<?php

declare(strict_types=1);

namespace App\Http\Response;

use App\Util\PhpStanType;
use RuntimeException;
use Symfony\Component\HttpFoundation\StreamedResponse;

/** @phpstan-import-type CsvData from PhpStanType */
class CsvResponseBuilder
{
    /**
     * @param CsvData $rows
     * @param string  $filename
     * @param bool    $bom
     *
     * @return StreamedResponse
     */
    public static function make(iterable $rows, string $filename = 'file.csv', bool $bom = true): StreamedResponse
    {
        return new StreamedResponse(static function () use ($rows, $bom) {
            $fp = fopen('php://output', 'w');

            if ($fp === false) {
                throw new RuntimeException('Failed to open output stream.');
            }

            if ($bom === true) {
                fwrite($fp, "\xEF\xBB\xBF"); // UTF-8 BOM付
            }
            foreach ($rows as $row) {
                fputcsv($fp, $row);
            }
            fclose($fp);
        }, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ]);
    }
}
