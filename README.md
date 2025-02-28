# Documentación para Configurar y Ejecutar el Proyecto

Esta documentación explica cómo instalar y ejecutar un proyecto basado en Node.js con un bundler, alojado en un repositorio de GitHub.

## 1. Clonar el Repositorio

Para obtener el código fuente del proyecto, clona el repositorio desde GitHub:

```sh
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

## 2. Instalar Dependencias

Este proyecto utiliza Node.js y gestiona sus dependencias con npm. Para instalar las dependencias necesarias, ejecuta:

```sh
npm install
```

Esto leerá el archivo `package.json` e instalará todas las librerías requeridas en la carpeta `node_modules`.

## 3. Estructura de Archivos

- La carpeta `src/` contiene los archivos estáticos (HTML, CSS y JavaScript). Estos archivos son la fuente del proyecto y deben modificarse si se desea realizar cambios en el código.
- La carpeta `dist/` es generada tras el proceso de bundleo y contiene los archivos optimizados listos para producción.

## 4. Generar el Bundle

Para compilar los archivos en `src/` y crear el bundle optimizado, usa el siguiente comando:

```sh
npm run build
```

Este proceso:
- Bundlea los archivos de `src/`
- Minifica el código
- Comprime las imágenes
- Genera la carpeta `dist/` con la versión optimizada del proyecto

## 5. Ejecutar el Proyecto Localmente

Una vez generado el bundle, puedes ejecutar el proyecto en el puerto 3000 con:

```sh
npm http-server dist -p 3000
```
o con el siguiente comando, dependiendo de tu instalación de http-server:
```sh
npx http-server dist -p 3000
```
Esto hará que la página optimizada (bundleada) corra en localhost:3000, para cerrar la conexión con este puerto, hacer ctrl + c en la terminal que tiene el proyecto abierto.


## 6. Actualizar el Bundle

Si realizas cambios en los archivos de `src/`, debes regenerar el bundle. Para ello:

1. Borra la carpeta `dist/`:
   ```sh
   rm -rf dist
   ```
2. Ejecuta nuevamente el comando de bundleo:
   ```sh
   npm run build
   ```

Ahora el bundle estará actualizado con los cambios realizados en `src/`.

---
Con esta documentación, podrás instalar, ejecutar y mantener actualizado el proyecto correctamente.

