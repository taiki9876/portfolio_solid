<?php

declare(strict_types=1);

namespace App\Models\Admin;

use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Contract\Contract;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Database\Factories\Admin\AdminFactory;
use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @property int                  $id
 * @property int                  $contract_id
 * @property string               $login_id
 * @property CarbonImmutable|null $last_login_at
 * @property AdminRoleEnum        $role
 * @property string|null          $avatar_image_path
 * @property string               $firebase_auth_uid
 * @property CarbonImmutable      $created_at
 * @property CarbonImmutable      $updated_at
 * @property CarbonImmutable|null $deleted_at
 */
class Admin extends Authenticatable
{
    public const TABLE = "admins";

    /** @use HasFactory<AdminFactory> */
    use HasFactory;

    protected $casts = [
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'deleted_at' => 'immutable_datetime',
        'last_login_at' => 'immutable_datetime',
        'role' => AdminRoleEnum::class,
        'firebase_auth_uid' => 'string',
    ];

    protected $guarded = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->format(DateUtil::DATE_FORMAT);
    }

    public static function create(
        Contract $contract,
        string $login_id,
        string $password,
        AdminRoleEnum $role,
        string|null $avatar_image_path = null,
    ): self {
        $admin = new Admin();
        $admin->contract_id = $contract->id;
        $admin->login_id = $login_id;
        $admin->password = Hash::make($password);
        $admin->role = $role;
        $admin->avatar_image_path = $avatar_image_path;
        $admin->firebase_auth_uid = Str::uuid()->toString();
        $admin->created_at = CarbonImmutable::now();
        $admin->updated_at = CarbonImmutable::now();
        $admin->deleted_at = null;

        return $admin;
    }

    public function isSystemAdmin(): bool
    {
        return $this->role->is(AdminRoleEnum::SYSTEM_ADMIN);
    }

    public function isSupportAdmin(): bool
    {
        return $this->role->is(AdminRoleEnum::SUPPORT_ADMIN);
    }

    public function roleIs(AdminRoleEnum $role): bool
    {
        return $this->role === $role;
    }
}
