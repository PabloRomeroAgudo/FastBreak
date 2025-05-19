<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller {
  /**
   * Show the password reset page.
   */
  public function create(Request $request): Response {
    return Inertia::render('auth/reset-password', [
      'email' => $request->email,
      'token' => $request->route('token'),
    ]);
  }

  /**
   * Handle an incoming new password request.
   *
   * @throws \Illuminate\Validation\ValidationException
   */
  public function store(Request $request): RedirectResponse {
    $request->validate([
      'token' => 'required',
      'email' => 'required|email',
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ], [
      'email.required' => 'El correo electrónico es obligatorio.',
      'email.email' => 'El correo electrónico debe tener un formato válido.',
      'password.required' => 'La contraseña es obligatoria.',
      'password.confirmed' => 'Las contraseñas no coinciden.',
      'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
    ]);

    // Here we will attempt to reset the user's password. If it is successful we
    // will update the password on an actual user model and persist it to the
    // database. Otherwise we will parse the error and return the response.
    $status = Password::reset(
      $request->only('email', 'password', 'password_confirmation', 'token'),
      function ($user) use ($request) {
        $user->forceFill([
          'password' => Hash::make($request->password),
          'remember_token' => Str::random(60),
        ])->save();

        event(new PasswordReset($user));
      }
    );

    // If the password was successfully reset, we will redirect the user back to
    // the application's home authenticated view. If there is an error we can
    // redirect them back to where they came from with their error message.
    if ($status == Password::PasswordReset) {
      return to_route('login')->with('status', 'Su contraseña ha sido restablecida');
    }

    throw ValidationException::withMessages([
      'email' => ['Error, por favor, vuelva a pedir el reinicio de la contraseña'],
    ]);
  }
}
