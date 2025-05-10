<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaccion\TransaccionRequest;
use App\Models\Transaccion;
use App\Models\TransaccionProducto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransaccionController extends Controller {
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
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(TransaccionRequest $request) {
    $carrito  = $request->validated('carrito');
    [
      'precioTotal' => $precioTotal,
      'productos' => $productos
    ] = $carrito;

    DB::transaction(function () use ($precioTotal, $productos, $request) {
      $usuario = $request->user();

      /** @var \App\Models\Transaccion $transaccion */
      $transaccion = $usuario->transacciones()->create([
        'total' => $precioTotal,
        'codigo' => 'a1'
      ]);

      $datosPivot = [];
      foreach ($productos as $item) {
        $datosPivot[$item['id']] = ['cantidad' => $item['cantidad']];
      }
      $transaccion->productos()->attach($datosPivot);

      $usuario->decrement('saldo', $transaccion->total);
    });
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id) {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id) {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id) {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id) {
    //
  }
}
