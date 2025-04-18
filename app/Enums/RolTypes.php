<?php

namespace App\Enums;

enum RolTypes: int {
  case DESARROLLADOR = 1;
  case TRABAJADOR = 2;
  case USUARIO = 3;

  public function label(): string {
    return match ($this) {
      self::DESARROLLADOR => "Desarrollador",
      self::TRABAJADOR => "Trabajador",
      self::USUARIO => "Usuario",
    };
  }
}
