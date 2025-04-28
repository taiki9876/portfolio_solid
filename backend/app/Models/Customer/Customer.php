<?php

declare(strict_types=1);

namespace App\Models\Customer;

use App\Models\Contract\Contract;
use App\Models\Customer\Rule\CustomerFieldRule;
use App\Models\Customer\ValueObjects\SexEnum;
use App\Models\Shared\EloquentModel;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Database\Factories\Contract\ContractFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * 会員モデル
 *
 * @property int                  $id
 * @property int                  $contract_id
 * @property string               $first_name
 * @property string               $last_name
 * @property string               $first_name_kana
 * @property string               $last_name_kana
 * @property string               $full_name
 * @property CarbonImmutable|null $birth_date
 * @property SexEnum              $sex
 * @property string|null          $email
 * @property string|null          $phone_number
 * @property string|null          $post_code
 * @property string|null          $address
 * @property string|null          $avatar_image_path
 * @property bool                 $is_email_opt_in
 * @property CarbonImmutable|null $last_visit_at
 * @property CarbonImmutable|null $entry_at
 * @property CarbonImmutable|null $leave_at
 * @property int|null             $favorite_shop_id
 * @property string|null          $memo
 * @property string               $firebase_auth_uid
 * @property CarbonImmutable|null $deleted_at
 * @property-read  CarbonImmutable $created_at
 * @property CarbonImmutable $updated_at
 */
class Customer extends EloquentModel
{
    public const TABLE = "customers";

    /** @use HasFactory<ContractFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $table = self::TABLE;
    protected $primaryKey = 'id';

    public const FULL_NAME_SEPARATOR = ' ';//POS連携の場合の名前の区切り文字

    protected $casts = [
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'deleted_at' => 'immutable_datetime',
        'birth_date' => 'immutable_datetime',
        'last_visit_at' => 'immutable_datetime',
        'entry_at' => 'immutable_datetime',
        'leave_at' => 'immutable_datetime',
        'sex' => SexEnum::class,
        'is_email_opt_in' => 'boolean',
    ];

    public static function create(
        Contract $contract,
        string $first_name,
        string $last_name,
        string $first_name_kana,
        string $last_name_kana,
        string|null $full_name = null,
        ?CarbonImmutable $birth_date = null,
        SexEnum $sex = SexEnum::UNKNOWN,
        ?string $email = null,
        ?string $phone_number = null,
        ?string $post_code = null,
        ?string $address = null,
        ?string $avatar_image_path = null,
        bool $is_email_opt_in = false,
        ?CarbonImmutable $last_visit_at = null,
        ?CarbonImmutable $entry_at = null,
        ?CarbonImmutable $leave_at = null,
        ?int $favorite_shop_id = null,
        ?string $memo = null
    ): Customer {
        $customer = new self();
        $customer->contract_id = $contract->id;
        $customer->first_name = $first_name;
        $customer->last_name = $last_name;
        $customer->first_name_kana = $first_name_kana;
        $customer->last_name_kana = $last_name_kana;
        $customer->full_name = $full_name ?? $last_name . self::FULL_NAME_SEPARATOR . $first_name;
        $customer->birth_date = DateUtil::nullableCarbon($birth_date);
        $customer->sex = $sex;
        $customer->email = $email;
        $customer->phone_number = $phone_number;
        $customer->post_code = $post_code;
        $customer->address = $address;

        $customer->avatar_image_path = $avatar_image_path;
        $customer->is_email_opt_in = $is_email_opt_in;
        $customer->last_visit_at = DateUtil::nullableCarbon($last_visit_at);
        $customer->entry_at = DateUtil::nullableCarbon($entry_at);
        $customer->leave_at = DateUtil::nullableCarbon($leave_at);
        $customer->favorite_shop_id = $favorite_shop_id;
        $customer->setMemo($memo);
        $customer->firebase_auth_uid = Str::uuid()->toString();
        $customer->deleted_at = null;

        return $customer;
    }

    /**
     * @param  CarbonImmutable|null $referenceDate
     * @return int|null
     */
    public function age(?CarbonImmutable $referenceDate = null): ?int
    {
        if ($this->birth_date === null) {
            return null;
        }

        $referenceDate = $referenceDate ?? CarbonImmutable::now();

        return (int) $this->birth_date->diffInYears($referenceDate);
    }

    public function setMemo(string|null $memo): void
    {
        if ($memo === null) {
            $this->memo = null;
            return;
        }

        if (mb_strlen($memo) > CustomerFieldRule::MEMO_MAX_LENGTH) {
            throw new \DomainException('メモは' . CustomerFieldRule::MEMO_MAX_LENGTH . '文字以内です');
        }
        $this->memo = mb_strlen($memo) === 0 ? null : $memo;
    }
}
