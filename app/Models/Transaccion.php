<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaccion extends Model {
  protected $table = 'transacciones';
  public $timestamps = false;

  public function usuario(): BelongsTo {
    return $this->belongsTo(User::class, 'id_usuario');
  }

  public function productos(): BelongsToMany {
    return $this->belongsToMany(Producto::class, 'transacciones_productos', 'id_transaccion', 'id_producto')
      ->withPivot('cantidad');
  }
}
