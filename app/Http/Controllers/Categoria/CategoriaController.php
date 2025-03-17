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

    return Inertia::render('Categorias/categoria', ['categoria' => $categoria->nombre, "productos" => $productos]);
  }
}
