<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Producto extends Model {
  use HasFactory;

  public $timestamps = false;

  public function categorias(): BelongsToMany {
    return $this->belongsToMany(Categoria::class, 'productos_categorias', 'id_producto', 'id_categoria');
  }

  public function transacciones() {
    return $this->belongsToMany(Transaccion::class, 'transacciones_productos')
      ->withPivot('cantidad');
  }
}
