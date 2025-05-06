<?php

namespace Database\Seeders;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    $this->addCategorias();
  }

  public function addCategorias($nbCategorias = 11, $nbProductos = 10): void {
    Categoria::factory()
      ->has(
        Producto::factory()
          ->count(10)
      )->count(11)
      ->create();
  }
}
