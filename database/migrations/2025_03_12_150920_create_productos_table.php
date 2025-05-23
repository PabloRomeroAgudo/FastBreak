<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('productos', function (Blueprint $table) {
      $table->id();
      $table->string('nombre')->nullable(false)->unique(true);
      $table->string('slug')->nullable(false)->unique(true);
      $table->float('precio')->nullable(false);
      $table->text('descripcion')->nullable(false);
      $table->string('ingredientes')->nullable();
      $table->string('alergenos')->nullable();
      $table->integer('max_stock')->default(0);
      $table->string('imagen')->nullable(true);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('productos');
  }
};
