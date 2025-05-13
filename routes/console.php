<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;

use function Termwind\ask;
use function Termwind\render;

Artisan::command('inspire', function () {
  $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('borradoCategorias', function () {
  $ruta = public_path('storage/categorias');
  $excepciones = ['plantilla1.png', 'plantilla2.png', 'plantilla3.png'];

  $archivos = array_filter(File::files($ruta), function ($archivo) use ($excepciones) {
    return !in_array($archivo->getFilename(), $excepciones);
  });

  if ($archivos) {
    render(<<<HTML
    <p class="text-red-900 font-bold px-1">Se van a <strong class="uppercase bg-white">borrar</strong> los siguientes archivos:</p>
  HTML);
  }

  foreach ($archivos as $archivo) {
    if (! in_array($archivo->getFilename(), $excepciones)) {
      $filename = $archivo->getFilename();
      // Construimos la URL pública:
      $url = asset("storage/categorias/{$filename}");

      render(<<<HTML
                <li class="text-red-400 italic ml-5">
                  -> <a href="{$url}" class="underline">{$filename}</a>
                </li>
            HTML);

      File::delete($archivo->getPathname());
    }
  }
});

Artisan::command('borradoProducto', function () {
  $ruta = public_path('storage/productos');
  $excepciones = ['plantilla1.png', 'plantilla2.png', 'plantilla3.png'];

  $archivos = array_filter(File::files($ruta), function ($archivo) use ($excepciones) {
    return !in_array($archivo->getFilename(), $excepciones);
  });

  if ($archivos) {
    render(<<<HTML
    <p class="text-red-900 font-bold px-1">Se van a <strong class="uppercase bg-white">borrar</strong> los siguientes archivos:</p>
  HTML);
  }

  foreach ($archivos as $archivo) {
    if (! in_array($archivo->getFilename(), $excepciones)) {
      $filename = $archivo->getFilename();
      // Construimos la URL pública:
      $url = asset("storage/categorias/{$filename}");

      render(<<<HTML
                <li class="text-red-400 italic ml-5">
                  -> <a href="{$url}" class="underline">{$filename}</a>
                </li>
            HTML);

      File::delete($archivo->getPathname());
    }
  }
});
