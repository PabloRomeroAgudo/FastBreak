<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SavePreviousURL {
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response {
    $nombreRuta = $request->path();
    if (!in_array($nombreRuta, ['login', 'register'])) {
      cookie()->queue('previous_route_name', $nombreRuta, 5);
    }

    return $next($request);
  }
}
