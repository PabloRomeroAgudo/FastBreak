<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Transaccion extends Model {
  use HasFactory;

  protected $table = 'transacciones';
  public $timestamps = false;

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array {
    return [
      'fecha' => 'datetime',
    ];
  }

  protected function codigo(): Attribute {
    return Attribute::make(
      get: fn(?int $value) => str::padLeft($value, 4, "0")
    );
  }

  public function usuario(): BelongsTo {
    return $this->belongsTo(User::class, 'id_usuario');
  }

  public function productos(): BelongsToMany {
    return $this->belongsToMany(Producto::class, 'transacciones_productos', 'id_transaccion', 'id_producto')
      ->withPivot('cantidad', 'precio');
  }
}
