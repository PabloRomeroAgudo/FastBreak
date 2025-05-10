<?php

namespace App\Http\Controllers\Auth;

use App\Enums\RolTypes;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller {
  /**
   * Show the registration page.
   */
  public function create(): Response {
    return Inertia::render('auth/register');
  }

  /**
   * Handle an incoming registration request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(RegisterRequest $request): RedirectResponse {
    $data = $request->validated();

    $data['id_rol'] = RolTypes::USUARIO;

    $user = User::create($data);

    event(new Registered($user));

    Auth::login($user);

    return to_route('categorias');
  }
}
