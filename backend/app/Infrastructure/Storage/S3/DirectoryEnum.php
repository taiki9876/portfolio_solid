<?php

declare(strict_types=1);

namespace App\Infrastructure\Storage\S3;

/**
 * S3に保存する各種ファイルの種類と、それに対応する保存先を定義するEnum
 */
enum DirectoryEnum: string
{
    case CHATROOM = 'chatroom';//問い合わせチャットでアップロードされるファイル群
    case SHOP_IMAGE = 'shop_image';//店舗画像

    /**
     * @param  string|int|null $id
     * @return string
     */
    public function getDirectory(string|int|null $id = null): string
    {
        return match ($this) {
            self::CHATROOM => $id ? "chatroom/{$id}" : throw new \InvalidArgumentException('チャットルームのIDが必要です'),
            self::SHOP_IMAGE => "shop_image"
        };
    }
}
