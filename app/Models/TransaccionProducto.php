<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransaccionProducto extends Model {
  protected $table = 'transacciones_productos';

  public function transaccion() {
    return $this->belongsTo(Transaccion::class, 'id_transaccion');
  }

  public function producto() {
    return $this->belongsTo(Producto::class, 'id_producto');
  }
}
