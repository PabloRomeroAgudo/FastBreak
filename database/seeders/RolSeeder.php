<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    $roles = [
      "desarrollo" => "desarrolladores",
      "admin" => "administrado o jefe",
      "trabajador" => "trabajador en cafeteria",
      "usuario" => "usuario corriente"
    ];

    foreach ($roles as $key => $value) {
      Rol::create(['nombre' => $key, 'descripcion' => $value]);
    }
  }
}
