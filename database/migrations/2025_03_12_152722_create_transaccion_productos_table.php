<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('transacciones_productos', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('id_transaccion')->nullable(false);
      $table->unsignedBigInteger('id_producto')->nullable(false);
      $table->integer('cantidad')->nullable(false);

      $table->foreign('id_transaccion')->references('id')->on('transacciones');
      $table->foreign('id_producto')->references('id')->on('productos');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('transacciones_productos');
  }
};
