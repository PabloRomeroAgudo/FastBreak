<div align="center">
  <img src="./public/ico/logo.png" width="150" height="150">
  <h1>FastBreak</h1>
</div>

## 📒 Descripción

Esta aplicación web está diseñada para **digitalizar y optimizar** la gestión de pedidos en **cafeterías y restaurantes**, ofreciendo una plataforma **intuitiva y eficiente** tanto para los clientes como para el personal del establecimiento.

El sistema permite a los usuarios:

- Navegar por un menú digital actualizado en tiempo real.
- **Realizar pedidos** de forma rápida desde su dispositivo.
- **Hacer seguimiento del estado del pedido** (en preparación, listo, entregado).
- Facilitar el proceso de **pago y notificación**.

Además, el personal del restaurante puede:

- **Gestionar internamente los pedidos** desde cocina o barra.
- Controlar el estado y flujo de trabajo de cada orden.
- Añadir saldo a los usuarios.

Sumado a todo lo anterior, el administrador puede:

- Añadir y editar categorías.
- Añadir y editar productos.

Todo ello, centralizado en una misma plataforma con acceso web desde cualquier dispositivo.

## 🫀 Requisitos MÍNIMOS

- [Composer 2.8.4](https://getcomposer.org/download/)
- [Laravel12](https://laravel.com/)
- [PHP 8.2.12](https://www.php.net/downloads.php)
- [10.4.32-MariaDB](https://mariadb.com/kb/en/mariadb-10-4-32-release-notes/)

Por comodidad, las últimas dos aplicaciones se pueden usar a través de [XAMPP](https://www.apachefriends.org/download.html).

El resto de dependencias como React, tailwind, inertia se instalarán siguiendo el proceso de [instalación](#-instalación).

## 📦 Instalación y ejecución en local

Tras instalar los [requisitos mínimos](#requisitos-mínimos), realizar una clonación de este proyecto en la carpeta deseada:

```bash
git clone https://github.com/PabloRomeroAgudo/FastBreak.git
```

Tras acceder al proyecto, instalar las dependencias con:

```bash
npm install # Instalar dependencias de JavaScript
composer install # Instalar dependencias de PHP
npm run build # Hacer build de la aplicación
```

Además, es necesario generar el fichero .env a través del [.env.example](/.env.example) y agregar cierta información:

### 🔑 Generar key del proyecto

```bash
php artisan key:generate
```

### Configurar base de datos

Cambiar la información relacionada a la base de datos que se encuentra en:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=TuPuerto
DB_DATABASE=TuBaseDeDatos
DB_USERNAME=TuUsuario
DB_PASSWORD=TuContraseña
```

### Configurar correo (si se quiere probar la verificación)

Configurar la información que se encuentra en:

```bash
MAIL_MAILER=log
MAIL_SCHEME=null
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

> [!IMPORTANT]
> En nuestro caso, se ha usado una cuenta de gmail.
> Para la contraseña se recomienda usar una _App Password_, para ello se necesita tener un 2FA ([+ info](https://support.google.com/accounts/answer/185833?hl=es)).

### 📖 Crear base de datos

Para la creación y reinicio de la base de datos se han creado dos funciones para ejecutar migraciones, seeders, etc.

Estos comandos se pueden encontrar en [composer.json](./composer.json)

Si es la primera vez que se ejecuta y no existe la base de datos:

```bash
composer crear:db # Crea la base de datos, ejecuta migraciones y carga datos con seeders.
```

Si se quiere reiniciar la base de datos (y borrar las imágenes subidas para liberar espacio):

```bash
composer refresh:db # Reinicia la base de datos desde cero y borra archivos temporales como imágenes.
```

### 🚀 Levantar el proyecto

Para levantar el proyecto ejecutar:

```bash
composer run dev # Levantar jobs, vite y laravel
```

## Estructura

La estructura del proyecto sigue la típica de un proyecto de Laravel con React. Esta se puede encontrar en [estructura.txt](./estructura.txt):

```
├── app
│  ├── Enums
│  ├── Helpers
│  ├── Http
│  │  ├── Controllers
│  │  │  ├── Auth
│  │  │  └── Settings
│  │  ├── Middleware
│  │  └── Requests
│  │     ├── Auth
│  │     ├── Categoria
│  │     ├── Ingreso
│  │     ├── Producto
│  │     ├── Settings
│  │     └── Transaccion
│  ├── Models
│  └── Providers
├── bootstrap
│  └── cache
├── config
├── database
│  ├── factories
│  ├── migrations
│  └── seeders
├── public
│  ├── build
│  │  └── assets
│  └── ico
├── resources
│  ├── css
│  ├── js
│  │  ├── components
│  │  │  ├── carrito
│  │  │  ├── categoria
│  │  │  ├── pedidos
│  │  │  ├── producto
│  │  │  └── ui
│  │  ├── context
│  │  ├── hooks
│  │  ├── layouts
│  │  │  ├── app
│  │  │  ├── auth
│  │  │  └── settings
│  │  ├── lib
│  │  ├── pages
│  │  │  ├── auth
│  │  │  ├── Carrito
│  │  │  ├── Categoria
│  │  │  ├── Ingreso
│  │  │  ├── Pedidos
│  │  │  ├── Producto
│  │  │  └── settings
│  │  └── types
│  └── views
├── routes
├── storage
│  ├── app
│  │  ├── private
│  │  └── public
│  │     ├── categorias
│  │     └── productos
│  ├── debugbar
│  ├── framework
│  │  ├── cache
│  │  │  └── data
│  │  ├── sessions
│  │  ├── testing
│  │  └── views
│  └── logs
├── tests
│  ├── Feature
│  │  ├── Auth
│  │  └── Settings
│  └── Unit
```

## Dia a dia

Para un seguimiento del proyecto, se ha realizado un ["cuaderno de bitácora"](./bitacora.md) para mantener un registro de nuestro trabajo

## 📄 Autores

- [Guillermo Laborda Gómez](https://github.com/guillelg10)
- [David López Leyva](https://github.com/davidlply)
- [Pablo Romero Agudo](https://github.com/PabloRomeroAgudo)
