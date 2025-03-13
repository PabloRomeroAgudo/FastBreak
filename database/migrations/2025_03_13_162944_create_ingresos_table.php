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
    Schema::create('ingresos', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('id_trabajador')->nullable(false);
      $table->unsignedBigInteger('id_usuario')->nullable(false);
      $table->float('cantidad')->nullable(false);
      $table->dateTime('fecha')->useCurrent();

      $table->foreign('id_trabajador')->references('id')->on('usuarios');
      $table->foreign('id_usuario')->references('id')->on('usuarios');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('ingresos');
  }
};
