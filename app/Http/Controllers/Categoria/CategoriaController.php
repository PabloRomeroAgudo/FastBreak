<?php

namespace App\Http\Controllers\Categoria;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categoria\CategoriaCreateRequest;
use App\Http\Requests\Categoria\CategoriaUpdateRequest;
use App\Models\Categoria;
use App\Models\Producto;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoriaController extends Controller {
  public function index(): Response {
    $categorias = Categoria::all();

    return Inertia::render("Categoria/index", ["categorias" => $categorias]);
  }

  public function show(Categoria $categoria): Response {

    $productos = $categoria->productos()->paginate(7);

    $categorias = Categoria::all('id', 'nombre', 'imagen', 'slug');

    return Inertia::render('Categoria/show', ['categoria' => $categoria, "categorias" => $categorias, "paginacion" => $productos]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create() {
    return Inertia::render('Categoria/create', ["productosProp" => Inertia::defer(fn() => Producto::get(['id', 'nombre']))]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(CategoriaCreateRequest $request) {
    $data = $request->validated();

    $data["slug"] = Str::slug($data["nombre"]);

    if ($data['imagen']) {
      /** @var \Illuminate\Http\UploadedFile $imagen */
      $imagen = $data['imagen'];


      $imagenPath = $imagen->store('categorias', 'public');

      $data['imagen'] = $imagenPath;
    }

    $productos = $data['productos'];
    unset($data['productos']);

    /** @var \App\Models\Categoria $categoria*/
    $categoria = Categoria::create($data);

    $categoria->productos()->sync($productos);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Categoria $categoria) {
    $categoria->load(['productos' => function ($query) {
      $query->select('productos.id', 'nombre');
    }]);

    return Inertia::render('Categoria/edit', [
      "categoria" => $categoria,
      "productosProp" => Inertia::defer(fn() => Producto::get(['id', 'nombre']))
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(CategoriaUpdateRequest $request, Categoria $categoria) {
    $data = $request->validated();

    $data["slug"] = Str::slug($data["nombre"]);

    if ($data['imagen']) {
      $imagen = $data['imagen'];
      $imagenPath = $imagen->store('categorias', 'public');
      $data['imagen'] = $imagenPath;

      // borrar la anterior si existía
      if ($categoria->getRawOriginal('imagen')) {
        Storage::disk('public')->delete($categoria->getRawOriginal('imagen'));
      }
    } else if ($data['borrarImagen']) {
      if ($categoria->getRawOriginal('imagen')) {
        Storage::disk('public')->delete($categoria->getRawOriginal('imagen'));
      }
      $data['imagen'] = null;
    } else {
      unset($data['imagen']);
    }
    unset($data['borrarImagen']);

    $productos = $data['productos'];
    unset($data['productos']);

    $categoria->productos()->sync($productos);
    $categoria->update($data);
    $categoria->refresh();

    return to_route('categoria.edit', $categoria);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Categoria $categoria) {
    $categoria->delete();

    return to_route('home');
  }
}
