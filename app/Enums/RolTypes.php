<?php

namespace App\Enums;

enum RolTypes: int {
  case DESARROLLADOR = 1;
  case ADMIN = 2;
  case TRABAJADOR = 3;
  case USUARIO = 4;

  public function label(): string {
    return match ($this) {
      self::DESARROLLADOR => "Desarrollador",
      self::ADMIN => "Administrador",
      self::TRABAJADOR => "Trabajador",
      self::USUARIO => "Usuario",
    };
  }
}
