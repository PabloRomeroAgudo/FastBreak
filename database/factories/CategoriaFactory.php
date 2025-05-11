<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categoria>
 */
class CategoriaFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array {

    $categorias = [
      "Entrantes",
      "Sopas y cremas",
      "Ensaladas",
      "Platos principales",
      "Guarniciones",
      "Postres",
      "Verduras y hortalizas",
      "Frutas",
      "Bebidas",
      "Comida rápida",
      "Snacks"
    ];

    $imagenes = [
      '/categorias/plantilla1.png',
      '/categorias/plantilla2.png',
      '/categorias/plantilla3.png',
    ];

    return [
      'nombre' => $this->faker->unique()->randomElement($categorias),
      'descripcion' => $this->faker->paragraph(),
      'imagen' => $this->faker->optional()->randomElement($imagenes)
    ];
  }
}
