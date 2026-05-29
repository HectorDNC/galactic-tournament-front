# Instrucciones para ejecutar el proyecto

Este repositorio contiene undashboard construido con Angular y Tailwind. A continuación tienes instrucciones claras y concisas para ejecutar el proyecto en desarrollo, construir una versión de producción y solucionar problemas comunes.

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
- Este README ha sido simplificado para centrar las instrucciones de ejecución. Para más información sobre la plantilla, diseño o archivos de ejemplo revisa la documentación del proyecto o los comentarios en el código.

Si quieres, puedo:
- Ejecutar los comandos de instalación en tu máquina (necesito que confirmes).
- Abrir y revisar `package.json` para ajustar las instrucciones exactas de los scripts (recomendado para precisión).

---
Archivo modificado: `README.md`
