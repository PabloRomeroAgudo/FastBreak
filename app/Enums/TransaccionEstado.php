<?php

namespace App\Enums;

enum TransaccionEstado: int {
  case PEDIDO = 1;
  case PREPARADO = 2;
  case ENTREGADO = 3;

  public function label(): string {
    return match ($this) {
      self::PEDIDO => "Pedido",
      self::PREPARADO => "Preparado",
      self::ENTREGADO => "Entregado",
    };
  }
}
