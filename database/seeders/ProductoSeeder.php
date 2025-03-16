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
        "descripcion" => "Pan crujiente, ingredientes frescos y el mejor sabor para tu pausa.",
        "precio" => 2.99,
        "imagen" => "/img/productos/plantilla1.png"
      ],
      [
        "nombre" => "Bocadillo chorizo",
        "descripcion" => "Pan crujiente, ingredientes frescos y el mejor sabor para tu pausa.",
        "precio" => 3,
        "imagen" => "/img/productos/plantilla1.png"
      ],
      [
        "nombre" => "Bocadillo vegano",
        "descripcion" => "Pan crujiente, ingredientes frescos y el mejor sabor para tu pausa.",
        "precio" => 3.5,
        "imagen" => "/img/productos/plantilla1.png"
      ]
    ]);

    DB::table('productos')->insert([
      [
        "nombre" => "Coca cola zero",
        "descripcion" => "Refrescante y fría para un dia caluroso.",
        "precio" => 1.99,
      ],
      [
        "nombre" => "Agua",
        "descripcion" => "Refrescante y fría para un dia caluroso.",
        "precio" => 1.2,
      ],
      [
        "nombre" => "Ron",
        "descripcion" => "Refrescante y fría para un dia caluroso.",
        "precio" => 7,
      ],
      [
        "nombre" => "Snickers",
        "descripcion" => "Dulce chocolate para alegrar el dia.",
        "precio" => 1.20,
      ],
      [
        "nombre" => "Pringles paprika",
        "descripcion" => "Crujientes con el mejor sabor.",
        "precio" => 2.70,
      ],
    ]);
  }
}
