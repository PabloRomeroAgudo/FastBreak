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
      $table->foreignId('id_transaccion')->nullable(false)->constrained('transacciones');
      $table->foreignId('id_producto')->nullable(false)->constrained('productos');
      $table->integer('cantidad')->nullable(false);
      $table->float('precio')->nullable(false);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('transacciones_productos');
  }
};
