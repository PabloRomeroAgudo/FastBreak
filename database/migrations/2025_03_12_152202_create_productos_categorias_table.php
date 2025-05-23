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
      $table->foreignId('id_producto')->nullable(false)->constrained('productos')->onDelete('cascade');
      $table->foreignId('id_categoria')->nullable(false)->constrained('categorias')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('productos_categorias');
  }
};
