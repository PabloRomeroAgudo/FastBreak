<?php

namespace App\Http\Requests\Categoria;

use App\Models\Categoria;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoriaCreateRequest extends FormRequest {
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
      "nombre" => ['required', 'string', 'max:255', Rule::unique(Categoria::class, 'nombre')],
      "descripcion" => ['required', 'string'],
      "imagen" => ['nullable', 'image', 'max:2048'],
      "productos" => ['nullable', 'array']
    ];
  }

  /* Get the error messages for the defined validation rules.*
@return array<string, string> */
  public function messages(): array {
    return [
      'nombre.required' => 'El nombre es obligatorio.',
      'nombre.max' => 'Has excedido el número de caracteres permitidos (:max).',
      'nombre.unique' => 'Ya existe una categoria con ese nombre.',
      'nombre' => 'Error en el nombre.',

      'descripcion.required' => 'La descripcion es obligatoria.',
      'descripcion' => 'Error en la descripción.',

      'imagen.image' => 'El archivo debe ser una imagen',
      'imagen.max' => 'La imagen es demasiado pesada (maximo: :max)',
      'imagen' => 'Error en la imagen.',

      'productos' => 'Error en los productos.'
    ];
  }
}
