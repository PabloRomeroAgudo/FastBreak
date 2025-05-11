<?php

use App\Http\Controllers\Carrito\CarritoController;
use App\Http\Controllers\Categoria\CategoriaController;
use App\Http\Controllers\IngresoController;
use App\Http\Controllers\PedidosEntregarController;
use App\Http\Controllers\PedidosPrepararController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TransaccionController;
use App\Http\Middleware\UserIsAdmin;
use App\Http\Middleware\UserIsWorker;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth::routes(['verify' => true]);

Route::get('/', function () {
  return redirect('categoria');
})->name('home');

Route::get('categoria', [CategoriaController::class, 'index'])->name('categorias');


Route::middleware(['auth', 'verified'])->group(function () {
  Route::get('carrito', function (Request $request) {
    return Inertia::render('Carrito/carrito');
  })->name('carrito');


  Route::post('carrito', [TransaccionController::class, 'store'])->name('pago');

  Route::middleware(UserIsWorker::class)->group(function () {
    Route::get('addSaldo', [IngresoController::class, 'create'])->name('saldo');
    Route::post('addSaldo', [IngresoController::class, 'store']);

    Route::get('pedidos/preparar', [PedidosPrepararController::class, 'index'])->name('preparar');
    Route::patch('pedidos/preparar/{pedido}', [PedidosPrepararController::class, 'update'])->name('prepararAct');

    Route::get('pedidos/entregar', [PedidosEntregarController::class, 'index'])->name('entregar');
    Route::patch('pedidos/entregar/{pedido}', [PedidosEntregarController::class, 'update'])->name('entregarAct');
  });

  Route::middleware(UserIsAdmin::class)->group(function () {
    Route::get('categoria/add', [CategoriaController::class, 'create'])->name('categoria.create');
    Route::post('categoria/add', [CategoriaController::class, 'store'])->name('categoria.store');
    Route::get('categoria/{categoria:nombre}/edit', [CategoriaController::class, 'edit'])->name('categoria.edit');
    Route::post('categoria/{categoria}/edit', [CategoriaController::class, 'update'])->name('categoria.update');
    Route::delete('categoria/{categoria}', [CategoriaController::class, 'destroy'])->name('categoria.destroy');

    Route::get('producto/add', [ProductoController::class, 'create'])->name('producto.create');
    Route::post('producto/add', [ProductoController::class, 'store'])->name('producto.store');
    Route::delete('producto', [ProductoController::class, 'destroy'])->name('producto.destroy');
  });
});


Route::get('categoria/{categoria:nombre}', [CategoriaController::class, 'show'])->name('categoria.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
