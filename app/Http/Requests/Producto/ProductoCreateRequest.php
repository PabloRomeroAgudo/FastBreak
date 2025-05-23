<?php

namespace App\Http\Requests\Producto;

use App\Models\Producto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

class ProductoCreateRequest extends FormRequest {
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
      "nombre" => ['required', 'string', 'max:255', Rule::unique(Producto::class, 'nombre')],
      "precio" => ['required', 'decimal:0,2', 'gt:0', 'lt:100'],
      "descripcion" => ['required', 'string'],
      "ingredientes" => ['nullable', 'array'],
      "ingredientes.*" => ['string'],
      "alergenos" => ['nullable', 'array'],
      "alergenos.*" => ['string'],
      "imagen" => ['nullable', 'image', 'max:2048'],
      "categorias" => ['required', 'array', 'min:0']
    ];
  }

  /* Get the error messages for the defined validation rules.*
@return array<string, string> */
  public function messages(): array {
    return [
      'nombre.required' => 'El nombre es obligatorio.',
      'nombre.max' => 'Has excedido el número de caracteres permitidos (:max).',
      'nombre.unique' => 'Ya existe un producto con ese nombre.',
      'nombre' => 'Error en el nombre.',

      'precio.required' => 'Debes introducir un :attribute',
      'precio.decimal' => 'El :attribute debe tener 2 decimales como maximo',
      'precio.gt' => 'El :attribute debe ser positivo',
      'precio.lt' => 'El :attribute debe ser menor de 100€',
      'precio' => 'Error en el precio.',

      'descripcion.required' => 'La descripcion es obligatoria.',
      'descripcion' => 'Error en la descripción.',

      'imagen.image' => 'El archivo debe ser una imagen',
      'imagen.max' => 'La imagen es demasiado pesada (maximo: :max)',
      'imagen' => 'Error en la imagen.',

      'categorias.required' => 'Selecciona al menos una categoría.',
      'categorias' => 'Error en la categoria.'
    ];
  }

  /**
   * Get the "after" validation callbacks for the request.
   *
   * @return array<int, \Closure>
   */
  public function after(): array {
    // se asegura que no haya ingredientes duplicados
    return [
      function (Validator $validator) {
        foreach (['ingredientes', 'alergenos'] as $campo) {
          $valores = $this->input($campo, []);

          if (is_null($valores)) continue;

          $lowered = array_map('mb_strtolower', $valores);
          $counts  = array_count_values($lowered);
          $dups    = array_keys(array_filter($counts, fn($c) => $c > 1));

          if (!empty($dups)) {
            $lista  = implode('", "', $dups);
            // Mapa de nombres legibles con tilde
            $labels = [
              'ingredientes' => 'Ingrediente',
              'alergenos'    => 'Alérgeno',
            ];
            $label = $labels[$campo];
            $pref  = count($dups) > 1
              ? "{$label}s duplicados: \""
              : "{$label} duplicado: \"";

            $validator->errors()->add(
              $campo,
              $pref . $lista . '".'
            );
          }
        }
      }
    ];
  }
}
