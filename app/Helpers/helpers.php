<?php

namespace App\Helpers;

use Illuminate\Http\Request;

function getRedirectParam(Request $request, $defaultValue = 'categorias') {
  return $request->input('redirect', route($defaultValue));
}
