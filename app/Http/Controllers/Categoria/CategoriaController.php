<?php

namespace App\Http\Controllers\Categoria;

use App\Http\Controllers\Controller;
use App\Http\Requests\Categoria\CategoriaCreateRequest;
use App\Http\Requests\Categoria\CategoriaUpdateRequest;
use App\Models\Categoria;
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

    $categorias = Categoria::all('id', 'nombre', 'imagen');

    return Inertia::render('Categoria/show', ['categoria' => $categoria, "categorias" => $categorias, "paginacion" => $productos]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create() {
    return Inertia::render('Categoria/create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(CategoriaCreateRequest $request) {
    $datos = $request->validated();

    if ($datos['imagen']) {
      /** @var \Illuminate\Http\UploadedFile $imagen */
      $imagen = $datos['imagen'];


      $imagenPath = $imagen->store('categorias', 'public');

      $datos['imagen'] = $imagenPath;
    }

    $datos["slug"] = Str::slug($datos["nombre"]);

    Categoria::create($datos);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Categoria $categoria) {
    return Inertia::render('Categoria/edit', ["categoria" => $categoria]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(CategoriaUpdateRequest $request, Categoria $categoria) {

    $datos = $request->validated();

    $datos["slug"] = Str::slug($datos["nombre"]);

    if ($datos['imagen']) {
      $imagen = $datos['imagen'];
      $imagenPath = $imagen->store('categorias', 'public');
      $datos['imagen'] = $imagenPath;

      // borrar la anterior si existía
      if ($categoria->getRawOriginal('imagen')) {
        Storage::disk('public')->delete($categoria->getRawOriginal('imagen'));
      }
    } else if ($datos['borrarImagen']) {
      if ($categoria->getRawOriginal('imagen')) {
        Storage::disk('public')->delete($categoria->getRawOriginal('imagen'));
      }
      $datos['imagen'] = null;
    } else {
      unset($datos['imagen']);
    }
    unset($datos['borrarImagen']);

    $categoria->update($datos);
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
