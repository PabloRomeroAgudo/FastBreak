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
      $transaccion = new Transaccion();
      $transaccion->id_usuario = Auth::id();
      $transaccion->total = $precioTotal;
      $transaccion->codigo = 'a1';
      $transaccion->save();

      // https://laravel.com/docs/12.x/eloquent-relationships#attaching-detaching
      // Se necesita un array asociativo en el que la clave es el id de producto y el valor
      // es otro array asociativo con los valores que se quieren añadir a la tabla intermedia
      $datos = [];
      foreach ($productos as $producto) {
        $datos[$producto['id']] = ['cantidad' => $producto['cantidad']];
      }
      $transaccion->productos()->attach($datos);

      $usuario =  $request->user();
      $usuario->decrement('saldo', $transaccion->total);
      $usuario->save();
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
