<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

use function App\Helpers\getRedirectParam;

class AuthenticatedSessionController extends Controller {
  /**
   * Show the login page.
   */
  public function create(Request $request): Response {
    $redirect = getRedirectParam($request);

    return Inertia::render('auth/login', [
      'canResetPassword' => Route::has('password.request'),
      'status' => $request->session()->get('status'),
      'redirect' => $redirect
    ]);
  }

  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): RedirectResponse {
    $request->authenticate();

    $request->session()->regenerate();

    $redirect = getRedirectParam($request);

    return redirect()->intended($redirect);
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): RedirectResponse {
    Auth::guard('web')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return redirect('/');
  }
}
