<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('productos_categorias', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('id_producto')->nullable(false);
      $table->unsignedBigInteger('id_categoria')->nullable(false);

      $table->foreign('id_producto')->references('id')->on('productos');
      $table->foreign('id_categoria')->references('id')->on('categorias');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('productos_categorias');
  }
};
