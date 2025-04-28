<?php

declare(strict_types=1);

namespace Database\Factories\Customer;

use App\Models\Customer\Customer;
use App\Models\Customer\ValueObjects\SexEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Customer>
 */
class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    /**
     * @return array<mixed>
     */
    public function definition(): array
    {
        $firstName = $this->faker->firstName;
        $lastName = $this->faker->lastName;
        $fullName = "{$lastName} {$firstName}";
        return [
            "contract_id" => null,//必須
            "first_name" => $firstName,
            "last_name" => $lastName,
            "first_name_kana" => $this->faker->firstName,
            "last_name_kana" => $this->faker->lastName,
            "full_name" => $fullName,
            "birth_date" => $this->faker->date,
            "sex" => Arr::random(SexEnum::cases()),
            "email" => $this->faker->unique()->safeEmail,
            "phone_number" => $this->faker->phoneNumber,
            "post_code" => $this->faker->postcode,
            "address" => $this->faker->address,
            "avatar_image_path" => null,
            "is_email_opt_in" => $this->faker->boolean,
            "last_visit_at" => null,
            "entry_at" => $this->faker->dateTime,
            "leave_at" => null,
            "favorite_shop_id" => null,
            "memo" => null,
            'firebase_auth_uid' => Str::uuid(),
            "created_at" => now(),
            "updated_at" => now(),
            "deleted_at" => null,
        ];
    }
}
