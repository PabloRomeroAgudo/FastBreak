<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    DB::table('categorias')->insert([
      [
        "nombre" => "Bocadillos",
        "descripcion" => "Pan crujiente, ingredientes frescos y el mejor sabor para tu pausa.",
        "imagen" => "/img/categorias/plantilla1.png"
      ],
      [
        "nombre" => "Bebidas",
        "descripcion" => "Refresca tu día con una selección de bebidas frías y calientes.",
        "imagen" => "/img/categorias/plantilla2.png"
      ],
      [
        "nombre" => "Snacks",
        "descripcion" => "Crujientes, sabrosas y perfectas para acompañar tu snack.",
        "imagen" => "/img/categorias/plantilla3.png"
      ],
    ]);
  }
}
