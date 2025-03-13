<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductoSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    DB::table('productos')->insert([
      [
        "nombre" => "Bocadillo lomo",
        "precio" => 3
      ],
      [
        "nombre" => "Bocadillo chorizo",
        "precio" => 3
      ],
      [
        "nombre" => "Coca cola zero",
        "precio" => 1.80
      ],
      [
        "nombre" => "Agua",
        "precio" => 1.20
      ],
      [
        "nombre" => "Snickers",
        "precio" => 1.20
      ],
      [
        "nombre" => "Pringles paprika",
        "precio" => 2.70
      ],
    ]);
  }
}
