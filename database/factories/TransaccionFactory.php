<?php

namespace Database\Factories;

use App\Enums\TransaccionEstado;
use App\Models\Producto;
use App\Models\Transaccion;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\=Transaccion>
 */
class TransaccionFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array {
    $estados = array_merge(
      array_fill(0, 5, TransaccionEstado::PEDIDO),
      array_fill(0, 4, TransaccionEstado::PREPARADO),
      array_fill(0, 1, TransaccionEstado::ENTREGADO),
    );

    return [
      'id_usuario' => User::inRandomOrder()->first(),
      'total' => 0,
      'fecha' => $this->faker->dateTimeThisYear(),
      'codigo' => 0,
      'estado' => Str::lower($this->faker->randomElement($estados)->label())
    ];
  }

  public function configure() {
    return $this->afterCreating(function (Transaccion $transaccion) {
      // Seleccionar productos aleatorios
      $productos = Producto::inRandomOrder()->take(rand(1, 5))->get();

      $total = 0;

      foreach ($productos as $producto) {
        $cantidad = rand(1, 7);
        $transaccion->productos()->attach($producto->id, [
          'cantidad' => $cantidad,
          'precio' => $producto->precio
        ]);
        $total += $producto->precio * $cantidad;
      }

      // Asignar el total calculado
      $transaccion->update(['total' => $total]);

      // Generar un código único por día
      $fecha = Carbon::parse($transaccion->fecha)->toDateString();
      $ultimoCodigo = Transaccion::whereDate('fecha', $fecha)->max('codigo') + 1;
      $transaccion->update(['codigo' => $ultimoCodigo]);
    });
  }
}
