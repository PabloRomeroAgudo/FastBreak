<?php

namespace App\Http\Controllers;

use App\Models\Transaccion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosPrepararController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    $pedidos = Transaccion::with(['productos' => function ($q) {
      $q->select('productos.nombre');
    }])
      ->where('estado', 'pedido')
      ->select('id', 'codigo', 'fecha')
      ->orderBy('fecha', 'desc')
      ->get();

    return Inertia::render('Pedidos/prepare', ['pedidos' => $pedidos]);
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
  public function store(Request $request) {
    //
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
