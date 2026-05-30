# Galactic Tournament - Frontend

## Descripción del Sistema

**Galactic Tournament** es una aplicación web moderna que gestiona un torneo intergaláctico donde diferentes especies compiten por la supremacía. El sistema permite:

- **Gestión de Especies:** Crear, editar y visualizar especies con atributos como nivel de poder y habilidades especiales.
- **Sistema de Combates:** Registrar y gestionar batallas entre especies.
- **Estadísticas y Rankings:** Ver el ranking de especies ordenadas por cantidad de victorias.

Este repositorio contiene el frontend del dashboard construido con Angular, Tailwind CSS y Angular Material. 

---

## Instrucciones para ejecutar el proyecto

A continuación tienes instrucciones claras y concisas para ejecutar el proyecto en desarrollo, construir una versión de producción y solucionar problemas comunes.

**Requisitos previos**
- **Node.js:** versión 20.x o superior (recomendado).
- **Gestor de paquetes:** `pnpm` recomendado (si usas `npm` también funciona).
- **Angular CLI (opcional):** para usar comandos `ng` globales: `npm install -g @angular/cli`.

**Clonar el repositorio (si aún no lo has hecho)**
```bash
git clone <ruta-del-repositorio>
cd angular-dashboard
```

**Instalar dependencias**
- Usando `pnpm` (recomendado):
```bash
pnpm install
```
- Usando `npm`:
```bash
npm install
```

**Iniciar servidor de desarrollo**
- Comando recomendado (verifica en `package.json` si existen scripts distintos):
```bash
pnpm start
# o
npm start
```
- Si el proyecto expone un script `dev`, puedes usar:
```bash
pnpm run dev
# o
npm run dev
```
- Alternativa con Angular CLI (si lo tienes instalado globalmente):
```bash
ng serve --open
```

Abre `http://localhost:4200` en tu navegador.

**Construir para producción**
```bash
pnpm build
# o
npm run build
```
El resultado se colocará en la carpeta `dist/` (nombre del subdirectorio según la configuración de `angular.json`).

**Servir la versión compilada (local)**
Después de construir, puedes servir los archivos estáticos con un servidor sencillo:
```bash
npx http-server ./dist/<nombre-del-proyecto> -p 8080
# o (si tienes 'serve' instalado)
npx serve ./dist/<nombre-del-proyecto>
```
Reemplaza `<nombre-del-proyecto>` por la carpeta que se haya generado dentro de `dist/`.

**Comandos útiles**
- Ejecutar tests (si existen): `pnpm test` o `npm test`.
- Lint: `pnpm run lint` o `npm run lint`.
- Formatear: `pnpm run format` o `npm run format`.

**Solución de problemas comunes**
- Puerto ocupado: si `4200` está en uso usa `--port`:
```bash
ng serve --port 4201
```
- Error tras ejecutar `npm run dev` o `pnpm start`: revisa la salida de la terminal para dependencias faltantes o errores de configuración. A menudo `pnpm install` o `npm install` resuelve problemas.
- Si ves warnings de Angular relacionados con versiones, asegúrate de usar Node.js 20+ y actualizar dependencias si fuera necesario.

**Notas**
- Este README contiene las instrucciones esenciales para ejecutar el proyecto. Para más información sobre características específicas o troubleshooting avanzado, consulta la documentación del proyecto.

**Última actualización**: Junio 2026