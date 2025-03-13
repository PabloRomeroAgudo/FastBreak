<?php

use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('transacciones', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('id_usuario')->nullable(false);
      $table->float('total')->nullable(false);
      $table->dateTime('fecha')->nullable(false)->default(Carbon::now());
      $table->string('codigo')->nullable(false);
      $table->enum('estado', ['pedido', 'preparado', 'entregado'])->default('pedido');

      $table->foreign('id_usuario')->references('id')->on('usuarios');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('transacciones');
  }
};
