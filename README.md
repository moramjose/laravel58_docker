# API Rest - Gestión de Libros y Autores (Laravel 5.8)

Prueba técnica implementada utilizando **Laravel 5.8** sobre un entorno contenerizado con **Docker** (PHP 7.4 + Nginx + SQLite).

## 📋 Características Técnicas
- **Arquitectura:** MVC con Servicios desacoplados.
- **Patrones:** Uso de `Events` y `Jobs` para el procesamiento asíncrono (actualización de contadores).
- **Seguridad:** Autenticación vía **JWT (JSON Web Tokens)**.
- **Validación:** Uso de `FormRequests` para separar la validación de la lógica del controlador.
- **Base de Datos:** SQLite (configurada para persistencia en entorno local).
- **Exportación:** Generación de reportes en Excel (.xlsx).

## 🚀 Instrucciones de Instalación y Despliegue

Siga estos pasos para levantar el proyecto en cualquier máquina con Docker instalado.

### 1. Clonar el repositorio
```bash
git clone <URL_DE_TU_REPO>
cd prueba_tecnica

2. Levantar contenedores Docker
docker-compose up -d --build

3. Instalar dependencias y configurar entorno
# Instalar dependencias de Composer
docker-compose exec app composer install

# Configurar permisos de carpetas
docker-compose exec app chmod -R 777 storage bootstrap/cache

# Crear archivo de base de datos SQLite
docker-compose exec app touch database/database.sqlite

# Correr migraciones
docker-compose exec app php artisan migrate

# Generar clave de aplicación y secreto JWT
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan jwt:secret

El proyecto estará disponible en: http://localhost:8058

🧪 Cómo Probar (Testing)
Se adjunta en la raíz del proyecto el archivo insomnia_collection.json con todas las peticiones configuradas.

Flujo de prueba recomendado:
Auth > Register: Crear un usuario para obtener el Token.

Autenticación: Copiar el access_token y usarlo como Bearer Token en las siguientes peticiones.

Authors > Create: Crear un autor.

Books > Create: Crear un libro asignado a ese autor.

Nota: Al crear el libro, se dispara un Job en segundo plano que actualiza el campo books_count del autor.

Export > Download Excel: Descarga el reporte completo.

📂 Estructura del Proyecto Docker
docker/Dockerfile: Imagen personalizada de PHP 7.4 FPM.

docker/nginx: Configuración del servidor web.

src/: Código fuente de Laravel.


*(Recuerda guardar el archivo `Cmd + S`)*.

---

### 2. El Archivo `.gitignore` (¡Muy Importante!)

Antes de subir nada, necesitamos decirle a Git qué **NO** subir (como la carpeta `vendor` que pesa mucho o tus claves secretas).

1.  En VS Code, en la raíz (al mismo nivel que `docker-compose.yml`), crea un archivo nuevo llamado **`.gitignore`**.
2.  Pega esto dentro:

```text
# Ignorar dependencias de PHP
src/vendor/

# Ignorar configuración de entorno local
src/.env

# Ignorar archivos de sistema y temporales
.DS_Store
src/storage/*.key
src/storage/logs/*.log
src/database/database.sqlite