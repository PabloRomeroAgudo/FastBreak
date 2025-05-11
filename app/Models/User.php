<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\RolTypes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
  /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory, Notifiable;

  protected $table = 'usuarios';

  /**
   * The attributes that are mass assignable.
   *
   * @var list<string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'id_rol'
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var list<string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.
   *
   * @return array<string, string>
   */
  protected function casts(): array {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function rol(): BelongsTo {
    return $this->belongsTo(Rol::class, 'id_rol');
  }

  public function transacciones(): HasMany {
    return $this->hasMany(Transaccion::class, 'id_usuario');
  }

  public function ingresosRecibidos(): HasMany {
    return $this->hasMany(Ingreso::class, 'id_usuario');
  }

  public function ingresosRealizados(): HasMany {
    return $this->hasMany(Ingreso::class, 'id_trabajador');
  }

  public function isNormalUser(): bool {
    return $this->id_rol === RolTypes::USUARIO->value;
  }

  public function isAdmin(): bool {
    return $this->id_rol === RolTypes::ADMIN->value || $this->id_rol === RolTypes::DESARROLLADOR->value;
  }
}
