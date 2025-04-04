<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    DB::table('roles')->insert([
      [
        "nombre" => "desarrollo",
        "descripcion" => "desarrolladores"
      ],
      [
        "nombre" => "trabajador",
        "descripcion" => "trabajador en cafeteria"
      ],
      [
        "nombre" => "normal",
        "descripcion" => "usuario normal"
      ]
    ]);
  }
}
