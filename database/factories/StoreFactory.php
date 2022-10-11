<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'tipe' => 'Outlet',
            'address' => $this->faker->address(),
            'whatsapp' => $this->faker->e164PhoneNumber(),
            'img' => $this->faker->imageUrl(),
            'active' => 1,
        ];
    }
}
