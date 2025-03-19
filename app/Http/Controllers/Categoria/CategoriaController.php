<?php

namespace App\Http\Controllers\Categoria;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoriaController extends Controller {
  public function index(): Response {
    $categorias = Categoria::all();

    return Inertia::render('welcome', ["categorias" => $categorias]);
  }

  public function show(Categoria $categoria): Response {

    $productos = $categoria->productos()->get();

    $categorias = Categoria::all('id', 'nombre', 'imagen');

    return Inertia::render('Categorias/categoria', ['categoria' => $categoria, "categorias" => $categorias, "productos" => $productos]);
  }
}
