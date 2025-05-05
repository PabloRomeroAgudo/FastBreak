<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Categoria extends Model {

  public $timestamps = false;

  use HasFactory;

  public function productos(): BelongsToMany {
    return $this->belongsToMany(Producto::class, 'productos_categorias', 'id_categoria', 'id_producto');
  }

  public function getRouteKeyName() {
    return 'nombre';
  }
}
