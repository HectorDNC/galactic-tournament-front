DOCKER — Cómo construir y ejecutar la aplicación con Docker

Resumen
- Esta guía explica cómo construir la imagen Docker de la SPA Angular y ejecutarla.
- La app sirve archivos estáticos generados por Angular y usa Nginx en tiempo de ejecución.

Requisitos
- Docker instalado (Docker Desktop o similar).
- pnpm y node (solo si quieres hacer builds locales fuera del contenedor).

1) Construir la imagen

- Usando valores embebidos en `src/app/environments/environment.ts` (valor por defecto):

```bash
docker build -t galactic-tournament-front .
```

- Pasando la URL de la API en tiempo de build (recomendado para esta SPA):

```bash
docker build --build-arg API_URL=http://mi-api.com:8080 -t galactic-tournament-front .
```

Explicación: Angular compila las variables de `environment.ts` dentro del bundle en tiempo de build. Por eso la variable `API_URL` se inyecta mediante `--build-arg` y un `sed` en el `Dockerfile` antes de ejecutar `ng build`.

2) Ejecutar el contenedor

```bash
docker run -d -p 4200:80 --name galactic-tournament-front galactic-tournament-front
```

- Ver logs:

```bash
docker logs -f galactic-app
```

- Detener:

```bash
docker stop galactic-app
```

3) Notas y soluciones a problemas comunes

- Error 403 Forbidden: normalmente ocurre cuando Nginx no encuentra `index.html` o no tiene permisos de lectura. El `Dockerfile` incluido realiza `chown -R nginx:nginx` y `chmod -R 755` sobre `/usr/share/nginx/html` para evitar problemas de permisos.

- Asegúrate de que la ruta de salida del build Angular coincide con la copia en el `Dockerfile`. Este repo usa `dist/ng-tailadmin/browser` como carpeta de salida.

4) Ejemplo con `docker-compose` (opcional)

Crea un `docker-compose.yml` con este contenido mínimo:

```yaml
version: '3.8'
services:
  web:
    image: galactic-tournament-front
    build:
      context: .
      args:
        API_URL: http://mi-api.com
    ports:
      - "4200:80"
    container_name: galactic-app
```

Usa:

```bash
docker compose up --build
```

5) Comandos útiles

- Eliminar imagen local:

```bash
docker rmi galactic-tournament-front
```

- Ver imágenes:

```bash
docker image ls
```

- Ver contenedores activos:

```bash
docker ps
```

