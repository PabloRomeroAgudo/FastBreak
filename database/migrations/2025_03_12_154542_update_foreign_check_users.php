<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {

    DB::statement("ALTER TABLE usuarios ADD CONSTRAINT chk_saldo CHECK (saldo >= 0)");

    Schema::table('usuarios', function (Blueprint $table) {
      $table->foreign('id_rol')->references('id')->on('roles');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    DB::statement("ALTER TABLE usuarios DROP CONSTRAINT chk_saldo");

    Schema::table('usuarios', function (Blueprint $table) {
      // Eliminar la clave foránea
      $table->dropForeign(['id_rol']);
    });
  }
};
