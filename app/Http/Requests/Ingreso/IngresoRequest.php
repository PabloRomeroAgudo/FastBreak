<?php

namespace App\Http\Requests\Ingreso;

use Illuminate\Foundation\Http\FormRequest;

class IngresoRequest extends FormRequest {

  /**
   * Indicates if the validator should stop on the first rule failure.
   *
   * @var bool
   */
  protected $stopOnFirstFailure = true;

  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array {
    return [
      'idUsuario' => 'required|numeric|integer|exists:usuarios,id',
      'cantidad' => 'required|decimal:0,2|gt:0|lte:100'
    ];
  }

  public function messages(): array {
    return [
      'idUsuario.required' => 'Debes introducir un usuario',
      'idUsuario.numeric' => 'El id debe ser un número',
      'idUsuario.integer' => 'El id no puede tener decimales',
      'idUsuario.exists' => 'El usuario no existe',
      'cantidad.required' => 'Debes introducir una :attribute',
      'cantidad.decimal' => 'La :attribute debe tener 2 decimales como maximo',
      'cantidad.gt' => 'La :attribute debe ser positiva',
      'cantidad.lte' => 'La :attribute debe ser inferior a 100€'
    ];
  }
}
