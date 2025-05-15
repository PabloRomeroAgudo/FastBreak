<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producto>
 */
class ProductoFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array {

    $imagen = "/productos/plantilla1.png";


    return [
      'nombre' => $this->faker->sentence(nbWords: 2),
      'precio' => $this->faker->randomFloat(2, 0, 20),
      'descripcion' => $this->faker->paragraph(),
      'imagen' => $this->faker->optional()->randomElement([$imagen])
    ];
  }
}
