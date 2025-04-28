<?php

declare(strict_types=1);

namespace Database\Factories\Contract;

use App\Models\Contract\Contract;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Contract>
 */
class ContractFactory extends Factory
{
    protected $model = Contract::class;

    /**
     * @return array<mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->company,
            "key" => Str::random(16),
            "key_alias" => Str::random(5),
            "person_in_charge" => $this->faker->name,
            "tel" => $this->faker->phoneNumber,
            "email" => $this->faker->email,
            "industry" => $this->faker->word,
            "memo" => null,
            'contract_status' => ContractStatusEnum::ACTIVE->value,
            'contract_app_type' => ContractAppTypeEnum::NATIVE_APP->value,
            "created_at" => now(),
            "updated_at" => now(),
            "deleted_at" => null,
        ];
    }
}
