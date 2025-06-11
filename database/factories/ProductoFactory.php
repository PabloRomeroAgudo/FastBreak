<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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

    $imagen = "productos/plantilla1.webp";

    $nombre = $this->faker->sentence(nbWords: 2);

    return [
      'nombre' => $nombre,
      'slug' => Str::slug($nombre, language: 'es'),
      'precio' => $this->faker->randomFloat(2, 0, 20),
      'descripcion' => $this->faker->paragraph(),
      'imagen' => $this->faker->optional()->randomElement([$imagen])
    ];
  }
}
