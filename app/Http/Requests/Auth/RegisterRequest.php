<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest {
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
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class, 'email')],
      'password' => ['required', 'confirmed', Password::defaults()],
    ];
  }

  public function messages(): array {
    return [
      'name' => 'Error con el nombre.',
      'name.required' => 'El nombre es obligatorio.',
      'name.max' => 'El nombre no puede tener más de 255 caracteres.',
      'email' => 'Error con el email.',
      'email.required' => 'El correo es obligatorio.',
      'email.unique' => 'El correo ya está registrado.',
      'password.required' => 'La contraseña es obligatoria.',
      'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
      'password.confirmed' => 'Las contraseñas no coinciden.',
    ];
  }
}
