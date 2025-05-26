<?php

namespace Database\Seeders;

use App\Enums\RolTypes;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    $usuarios = [
      [
        "name" => "Pablo",
        "email" => "pablo@example.com",
      ],
      [
        'name' => "Guille",
        "email" => "guille@example.com",
      ],
      [
        'name' => "David",
        "email" => "david@example.com",
      ],
      [
        'name' => "PRUEBA",
        'id_rol' => RolTypes::USUARIO,
        "email" => "prueba@example.com",
        "saldo" => 0
      ]
    ];

    User::factory()
      ->createMany($usuarios);
  }
}
