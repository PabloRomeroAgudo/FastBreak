<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Producto extends Model {
  use HasFactory, SoftDeletes;

  public $timestamps = false;

  protected function imagen(): Attribute {
    return Attribute::make(
      get: fn(?string $value) => $value
        ? Storage::url($value)
        : null,
    );
  }

  public function categorias(): BelongsToMany {
    return $this->belongsToMany(Categoria::class, 'productos_categorias', 'id_producto', 'id_categoria');
  }

  public function transacciones() {
    return $this->belongsToMany(Transaccion::class, 'transacciones_productos')
      ->withPivot('cantidad', 'precio');
  }
}
