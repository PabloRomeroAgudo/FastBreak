<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class Categoria extends Model {

  public $timestamps = false;

  use HasFactory;

  protected function imagen(): Attribute {
    return Attribute::make(
      get: fn(?string $value) => $value
        ? Storage::url($value)
        : null,
    );
  }

  public function productos(): BelongsToMany {
    return $this->belongsToMany(Producto::class, 'productos_categorias', 'id_categoria', 'id_producto');
  }
}
