<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    DB::table('usuarios')->insert([
      [
        'name' => "Pablo",
        'id_rol' => 1,
        "email" => "pablo@example.com",
        "password" => Hash::make('1234'),
        "saldo" => 100
      ],
      [
        'name' => "Guille",
        'id_rol' => 1,
        "email" => "guille@example.com",
        "password" => Hash::make('1234'),
        "saldo" => 100
      ],
      [
        'name' => "David",
        'id_rol' => 1,
        "email" => "david@example.com",
        "password" => Hash::make('1234'),
        "saldo" => 100
      ]
    ]);
  }
}
