<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ingreso extends Model {
  public $timestamps = false;

  public function trabajador(): BelongsTo {
    return $this->belongsTo(User::class, 'id_trabajador', 'id');
  }

  public function usuario(): BelongsTo {
    return $this->belongsTo(User::class, 'id_usuario', 'id');
  }
}
