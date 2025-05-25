<?php

namespace App\Http\Controllers;

use App\Http\Requests\Producto\ProductoCreateRequest;
use App\Http\Requests\Producto\ProductoUpdateRequest;
use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductoController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {

    return Inertia::render('Producto/create', ["categoriasProp" => Inertia::defer(fn() => Categoria::get(['id', 'nombre']))]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(ProductoCreateRequest $request)
  {
    $data = $request->validated();

    $data["slug"] = Str::slug($data["nombre"]);

    if (!is_null($data['ingredientes'])) {
      $data['ingredientes'] = implode(", ", $data['ingredientes']);
    }

    if (!is_null($data['alergenos'])) {
      $data['alergenos'] = implode(", ", $data['alergenos']);
    }

    if ($data['imagen']) {
      /** @var \Illuminate\Http\UploadedFile $imagen */
      $imagen = $data['imagen'];


      $imagenPath = $imagen->store('productos', 'public');

      $data['imagen'] = $imagenPath;
    }

    $categorias = $data['categorias'];
    unset($data['categorias']);

    /** @var \App\Models\Producto $producto*/
    $producto = Producto::create($data);

    $producto->categorias()->sync($categorias);
  }

  /**
   * Display the specified resource.
   */
  public function show(Producto $producto)
  {
    //
    return Inertia::render('Producto/show', ["producto" => $producto]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Producto $producto)
  {
    $producto->load(['categorias' => function ($query) {
      $query->select('categorias.id', 'nombre');
    }]);

    return Inertia::render('Producto/edit', ["producto" => $producto, "categoriasProp" => Inertia::defer(fn() => Categoria::get(['id', 'nombre']))]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(ProductoUpdateRequest $request, Producto $producto)
  {
    $data = $request->validated();

    $data["slug"] = Str::slug($data["nombre"]);

    if (!is_null($data['ingredientes'])) {
      $data['ingredientes'] = implode(", ", $data['ingredientes']);
    }

    if (!is_null($data['alergenos'])) {
      $data['alergenos'] = implode(", ", $data['alergenos']);
    }

    if ($data['imagen']) {
      $imagen = $data['imagen'];
      $imagenPath = $imagen->store('productos', 'public');
      $data['imagen'] = $imagenPath;

      // borrar la anterior si existía
      if ($producto->getRawOriginal('imagen')) {
        Storage::disk('public')->delete($producto->getRawOriginal('imagen'));
      }
    } else if ($data['borrarImagen']) {
      if ($producto->getRawOriginal('imagen')) {
        Storage::disk('public')->delete($producto->getRawOriginal('imagen'));
      }
      $data['imagen'] = null;
    } else {
      unset($data['imagen']);
    }
    unset($data['borrarImagen']);

    $categorias = $data['categorias'];
    unset($data['categorias']);

    $producto->categorias()->sync($categorias);
    $producto->update($data);
    $producto->refresh();

    return to_route('producto.edit', $producto);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Producto $producto)
  {
    $producto->delete();

    return to_route('home');
  }
}
