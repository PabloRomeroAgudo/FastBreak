<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ingreso\IngresoRequest;
use App\Models\Ingreso;
use App\Models\Transaccion;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class IngresoController extends Controller {
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
    return Inertia::render('Ingreso/create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(IngresoRequest $request) {
    $data = $request->validated();
    $trabajador = $request->user();

    DB::transaction(function () use ($trabajador, $data) {

      ["idUsuario" => $idUsuario, "cantidad" => $cantidad] = $data;
      /**@var User $user */
      $receptor = User::find($idUsuario);

      $trabajador
        ->ingresosRealizados()
        ->create([
          'id_usuario' => $idUsuario,
          'cantidad'   => $cantidad,
        ]);

      $receptor->increment('saldo', $cantidad);
    });

    return back();
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
