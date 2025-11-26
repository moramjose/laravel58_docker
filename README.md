# Sistema de Gestión de Bibliotecas (Full Stack)

![PHP](https://img.shields.io/badge/PHP-7.4-777BB4?style=for-the-badge&logo=php&logoColor=white) ![Laravel](https://img.shields.io/badge/Laravel-5.8-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) ![Angular](https://img.shields.io/badge/Angular-16-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

Solución integral **Full Stack** para la gestión de bibliotecas. Combina una API REST robusta en **Laravel 5.8** (Legacy/LTS) con un cliente moderno en **Angular 16**, todo orquestado sobre una infraestructura contenerizada con **Docker**.

## 🛠️ Descripción Técnica y Arquitectura

El proyecto demuestra la integración de tecnologías legacy y modernas mediante microservicios:

### Backend (API REST)
* **Core:** Laravel 5.8 ejecutándose en PHP 7.4.
* **Patrones:** Event-Driven Architecture (Events & Jobs) para actualizaciones asíncronas de contadores.
* **Seguridad:** Autenticación Stateless vía JWT (`tymon/jwt-auth`).
* **Persistencia:** SQLite para portabilidad inmediata.
* **Features:** CRUD completo, Validaciones mediante FormRequests y Exportación a Excel.

### Frontend (SPA)
* **Core:** Angular 16.
* **UI/UX:** Diseño responsivo con Bootstrap 5.
* **Seguridad:** Guards para protección de rutas y manejo de interceptores HTTP.
* **Funcionalidad:** Consumo de API, descarga de archivos binarios (BLOB) y gestión de estado.

---

## 🚀 Instrucciones de Instalación y Despliegue

Siga estos pasos para levantar el entorno completo (Back + Front) en cualquier máquina con Docker.

### 1. Clonar el repositorio
```bash
git clone https://github.com/moramjose/laravel58_docker.git
cd prueba_tecnica
````

### 2\. Levantar infraestructura

Esto construirá las imágenes de PHP y Node.js y levantará los servicios.

```bash
docker-compose up -d --build
```

### 3\. Configuración del Backend (Laravel)

Ejecute estos comandos para instalar dependencias de PHP y preparar la base de datos:

```bash
# Instalar dependencias
docker-compose exec app composer install

# Permisos de escritura
docker-compose exec app chmod -R 777 storage bootstrap/cache

# Base de datos y Migraciones
docker-compose exec app touch database/database.sqlite
docker-compose exec app php artisan migrate

# Claves de seguridad
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan jwt:secret
```

### 4\. Configuración del Frontend (Angular)

Instale las dependencias de Node.js dentro del contenedor:

```bash
docker-compose exec frontend npm install
```

*Nota: Una vez finalizado, es posible que deba reiniciar el contenedor del frontend si no carga inmediatamente:*

```bash
docker-compose restart frontend
```

-----

## 🖥️ Acceso y Uso

El sistema expone dos puntos de acceso principales:

### 1\. Cliente Web (Angular)

  * **URL:** `http://localhost:4200`
  * **Funcionalidades:**
      * **Registro/Login:** Cree una cuenta para obtener acceso.
      * **Dashboard:** Visualice y gestione autores.
      * **Operaciones:** Cree nuevos libros (esto disparará el Job en el backend) y descargue el reporte en Excel.

### 2\. API REST (Laravel)

  * **URL:** `http://localhost:8058`
  * **Testing:** Se adjunta el archivo `insomnia_collection.yaml` en la raíz para probar los endpoints directamente.

-----

## 📂 Estructura del Proyecto

```text
├── docker/                  # Configuración de infraestructura (PHP/Nginx)
├── src/                     # Código Fuente Backend (Laravel)
│   ├── app/Events/          # Lógica asíncrona
│   ├── app/Jobs/            # Workers en segundo plano
│   └── database/            # SQLite
├── client/                  # Código Fuente Frontend (Angular)
│   ├── src/app/components/  # Vistas (Login, Authors, Books)
│   ├── src/app/services/    # Comunicación HTTP
│   └── src/app/guards/      # Seguridad de rutas
└── docker-compose.yml       # Orquestación de servicios
```

-----

## 📄 Notas Adicionales

  * **Colas de Trabajo:** El entorno está configurado con `QUEUE_CONNECTION=sync` para que los Jobs de actualización de contadores se ejecuten inmediatamente.
  * **CORS:** Se ha configurado un Middleware personalizado en Laravel para permitir la comunicación fluida con el puerto 4200 de Angular.

<!-- end list -->

```
```