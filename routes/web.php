<?php

use App\Http\Controllers\Carrito\CarritoController;
use App\Http\Controllers\Categoria\CategoriaController;
use App\Http\Controllers\TransaccionController;
use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Rol;
use App\Models\Transaccion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use function App\Helpers\getRedirectParam;

Route::get('/', function () {
  return redirect('categoria');
})->name('home');

Route::get('categoria', [CategoriaController::class, 'index'])->name('categorias');

Route::get('categoria/{categoria}', [CategoriaController::class, 'show'])->name('categoria.show');

Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('carrito', function (Request $request) {
    $redirect = getRedirectParam($request);
    return Inertia::render('Carrito/carrito', ["redirect" => $redirect]);
  })->name('carrito');


  Route::post('/carrito', [TransaccionController::class, 'store'])->name('pago');


  Route::get('dashboard', function () {
    return Inertia::render('dashboard');
  })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
