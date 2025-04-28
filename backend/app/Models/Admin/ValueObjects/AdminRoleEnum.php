<?php

declare(strict_types=1);

namespace App\Models\Admin\ValueObjects;

use App\Util\trait\EnumExtension;

enum AdminRoleEnum: int
{
    use EnumExtension;

    case SYSTEM_ADMIN = 0; //NOTE: 全ての店舗へのログイン権限を持つ ログイン後は"SUPPORT_ADMIN"権限を持つ
    case SUPPORT_ADMIN = 1; //NOTE: 店舗契約ごとの各種設定権限を持つ。弊社サポートなど
    case STORE_OWNER = 2; //NOTE: 店舗契約アカウントの一番上の権限。複数店舗がある場合、全ての店舗の統括権限を持つ
    case BRANCH_OWNER = 3; //NOTE: その店舗のみの管理権限
    case STAFF = 4;

    /**
     * @return string
     */
    public function description(): string
    {
        return match($this) {
            self::SYSTEM_ADMIN => 'システム管理者',
            self::SUPPORT_ADMIN => 'システムサポート',
            self::STORE_OWNER => '契約オーナー',
            self::BRANCH_OWNER => '店舗オーナー',
            self::STAFF => '店舗スタッフ',
        };
    }

    /**
     * @return string
     */
    public function toString(): string
    {
        return match($this) {
            self::SYSTEM_ADMIN => 'systemAdmin',
            self::SUPPORT_ADMIN => 'supportAdmin',
            self::STORE_OWNER => 'storeOwner',
            self::BRANCH_OWNER => 'branchOwner',
            self::STAFF => 'staff',
        };
    }
}
