<?php

declare(strict_types=1);

namespace App\Models\Shared;

use Exception;

abstract readonly class DomainModel
{
    /**
     * 主キーを取得
     * NOTE: ドメインモデルのidはDBの主キーに依存する。そのためidはnullである可能性がある(=永続化前)。
     *
     * @return int
     * @throws Exception
     */
    public function readId(): int
    {
        if (property_exists($this, "id") === false) {
            throw new Exception("id プロパティが存在しません");
        }
        if ($this->id === null) {
            throw new Exception("id が設定されていません。 このインスタンスは永続化前です");
        }

        return $this->id;
    }
}
