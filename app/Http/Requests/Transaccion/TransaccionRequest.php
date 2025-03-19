<?php

namespace App\Http\Requests\Transaccion;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TransaccionRequest extends FormRequest {
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

    $usuario = User::find(Auth::id());
    $saldoUser = $usuario->saldo;

    return [
      'carrito.precioTotal' => "required|numeric|lte:$saldoUser",
      'carrito.productos' => 'required|array|min:1'
    ];
  }


  /* Get the error messages for the defined validation rules.*
@return array<string, string> */
  public function messages(): array {
    return [
      'carrito.precioTotal.lte' => 'No tienes suficiente saldo.',
      'body.required' => 'A message is required',
    ];
  }
}
