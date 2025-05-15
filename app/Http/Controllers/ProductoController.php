<?php

namespace App\Http\Controllers;

use App\Http\Requests\Producto\ProductoCreateRequest;
use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    //
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create() {
    $categorias = Categoria::get(['id', 'nombre']);

    return Inertia::render('Producto/create', ["categoriasProp" => $categorias]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(ProductoCreateRequest $request) {
    $data = $request->validated();

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
  public function show(Producto $producto) {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Producto $producto) {
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Producto $producto) {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Producto $producto) {
    //
  }
}
