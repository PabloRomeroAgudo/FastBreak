<?php

use App\Http\Controllers\Categoria\CategoriaController;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Rol;
use App\Models\Transaccion;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return redirect('/categoria');
})->name('home');

Route::get('/categoria', [CategoriaController::class, 'index']);

Route::get('/categoria/{categoria}', [CategoriaController::class, 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
