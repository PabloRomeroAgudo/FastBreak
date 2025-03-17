<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoCategoriaSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    DB::table('productos_categorias')->insert([
      [
        "id_producto" => 1,
        "id_categoria" => 1,
      ],
      [
        "id_producto" => 2,
        "id_categoria" => 1,
      ],
      [
        "id_producto" => 3,
        "id_categoria" => 1,
      ],
      [
        "id_producto" => 4,
        "id_categoria" => 2,
      ],
      [
        "id_producto" => 5,
        "id_categoria" => 2,
      ],
      [
        "id_producto" => 6,
        "id_categoria" => 2,
      ],
      [
        "id_producto" => 7,
        "id_categoria" => 3,
      ],
      [
        "id_producto" => 8,
        "id_categoria" => 3,
      ],
    ]);
  }
}
