<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Chatroom;

use App\Models\Chatroom\ValueObjects\ContentTypeEnum;
use Tests\Helper\ChatroomCreator;
use Tests\TestCase;

class MessageTest extends TestCase
{
    use ChatroomCreator;

    public function test_toString_文字列を取得できること(): void
    {
        //テキストメッセージ
        $textMessage = $this->createMessage(["contentType" => ContentTypeEnum::TEXT, "content" => "テキストメッセージ"]);
        self::assertEquals("テキストメッセージ", $textMessage->toString());

        //テキストメッセージ
        $photoMessage = $this->createMessage(["contentType" => ContentTypeEnum::PHOTO]);
        self::assertEquals("画像を送信しました", $photoMessage->toString());

        //テキストメッセージ
        $videoMessage = $this->createMessage(["contentType" => ContentTypeEnum::VIDEO]);
        self::assertEquals("動画を送信しました", $videoMessage->toString());

        //対応済みマークメッセージ
        $processedMark = $this->createMessage(["contentType" => ContentTypeEnum::PROCESSED]);
        self::assertEquals("対応済み", $processedMark->toString());
    }
}
