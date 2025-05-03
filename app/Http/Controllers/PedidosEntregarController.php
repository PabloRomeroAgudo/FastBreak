<?php

namespace App\Http\Controllers;

use App\Enums\TransaccionEstado;
use App\Models\Transaccion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosEntregarController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    $pedidos = Transaccion::with(['productos' => function ($q) {
      $q->select('productos.nombre');
    }])
      ->where('estado', TransaccionEstado::PREPARADO)
      ->select('id', 'codigo', 'fecha')
      // ->orderBy('fecha', 'desc')
      ->get()
      ->map(function (Transaccion $pedido) {
        $arr = $pedido->toArray();
        // FORMATO CORRECTO: 'H:i'
        $arr['hora'] = $pedido->fecha->format('H:i');
        return $arr;
      });

    return Inertia::render('Pedidos/deliver', ['pedidos' => $pedidos]);
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
  public function update(Request $request, Transaccion $pedido) {
    $pedido->update([
      "estado" => TransaccionEstado::ENTREGADO
    ]);

    return back();
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id) {
    //
  }
}
