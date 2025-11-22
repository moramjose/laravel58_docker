# API Rest - Gestión de Libros y Autores

![PHP](https://img.shields.io/badge/PHP-7.4-blue)
![Laravel](https://img.shields.io/badge/Laravel-5.8-red)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)

API REST desarrollada en **Laravel 5.8** para la gestión de bibliotecas (autores y libros). El proyecto se encuentra contenerizado mediante **Docker** (Nginx + PHP 7.4 + SQLite), implementando autenticación JWT y procesamiento de tareas en segundo plano.

## Descripción Técnica

El sistema implementa una arquitectura MVC desacoplada, priorizando la escalabilidad y el orden del código mediante los siguientes patrones:

* **Procesamiento Asíncrono:** Actualización de contadores mediante el patrón Observer (Events & Jobs) para no bloquear el hilo principal de la petición HTTP.
* **Seguridad:** Implementación de `tymon/jwt-auth` para autenticación stateless.
* **Validación:** Lógica de validación extraída a `FormRequests`.
* **Persistencia:** SQLite configurado para facilitar el despliegue en entornos de desarrollo/prueba sin dependencias externas pesadas.
* **Reportes:** Generación de archivos Excel (.xlsx) mediante `maatwebsite/excel`.

## Requisitos Previos

* Docker
* Docker Compose
* Cliente REST (Insomnia o Postman)

## Instalación

Sigue estos pasos para levantar el entorno de desarrollo.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/moramjose/laravel58_docker.git
    cd laravel58_docker
    ```

2.  **Construir y levantar contenedores:**
    ```bash
    docker-compose up -d --build
    ```

3.  **Configuración del entorno:**
    Ejecuta los siguientes comandos para instalar dependencias, configurar permisos y preparar la base de datos dentro del contenedor:

    ```bash
    # Instalar dependencias de PHP
    docker-compose exec app composer install

    # Ajustar permisos de escritura
    docker-compose exec app chmod -R 777 storage bootstrap/cache

    # Crear base de datos SQLite
    docker-compose exec app touch database/database.sqlite

    # Ejecutar migraciones
    docker-compose exec app php artisan migrate

    # Generar claves de aplicación y JWT
    docker-compose exec app php artisan key:generate
    docker-compose exec app php artisan jwt:secret
    ```

La API estará disponible en: `http://localhost:8058`

## Uso y Endpoints

Se incluye el archivo `insomnia_collection.yaml` en la raíz del proyecto. Puede importarse directamente en Insomnia (o Postman) para disponer de todas las peticiones configuradas.

### Flujo de prueba

1.  **Autenticación:**
    * `POST /api/auth/register`: Crea un usuario nuevo.
    * `POST /api/auth/login`: Retorna el `access_token`.
    * *Nota:* Todas las peticiones siguientes requieren el header `Authorization: Bearer <TOKEN>`.

2.  **Autores y Libros:**
    * `POST /api/authors`: Crea un autor.
    * `POST /api/books`: Registra un libro y lo asocia a un autor.
    * *Comportamiento:* Al crear un libro, se dispara un Job que recalcula y actualiza el campo `books_count` del autor asociado.

3.  **Exportación:**
    * `GET /api/export`: Descarga un archivo Excel con el listado de autores y sus libros.

## Estructura del Proyecto

* `docker/`: Configuración de infraestructura (Dockerfile PHP 7.4 y Nginx).
* `src/app/Events` y `src/app/Jobs`: Lógica para el procesamiento asíncrono.
* `src/app/Http/Requests`: Validaciones de entrada.
* `src/database/database.sqlite`: Archivo de base de datos (generado tras la instalación).

## Notas Adicionales

El entorno está configurado con `QUEUE_CONNECTION=sync` en el archivo `.env` para que los Jobs se ejecuten inmediatamente sin necesidad de configurar un worker de colas adicional para esta prueba.