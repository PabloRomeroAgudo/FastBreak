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
    DB::statement("ALTER TABLE ingresos ADD CONSTRAINT chk_cantidad CHECK (cantidad > 0)");
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    DB::statement("ALTER TABLE ingresos DROP CONSTRAINT chk_cantidad");
  }
};
