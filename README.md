# Prueba Técnica – Frontend Developer

SPA en React que consume APIs públicas y muestra la información de forma dinámica, atractiva y funcional. El desarrollo avanza por **niveles** (básico → intermedio → avanzado); cada nivel es un punto de control que se reporta a un líder o co-líder.

## Stack

| Tecnología                | Uso                                  |
| ------------------------- | ------------------------------------ |
| React + TypeScript (Vite) | Base de la aplicación                |
| React Router              | Navegación entre pantallas           |
| Redux Toolkit / RTK Query | Consumo de API, caché y mutations    |
| React Hook Form           | Formularios                          |
| Zod                       | Validación de esquemas y formularios |
| Tailwind CSS              | Estilos                              |

## APIs

- **[Rick and Morty API](https://rickandmortyapi.com/documentation)** – API principal de lectura: listado de personajes con paginación nativa, búsqueda por nombre y filtros por estado/especie, vista de detalle.
- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** – Única API de la lista que acepta `POST`/`PUT`/`PATCH`/`DELETE`; se usa para formularios y el CRUD.

> JSONPlaceholder responde como si guardara los cambios, pero **no los persiste**. Por eso el CRUD actualiza la caché de RTK Query de forma manual/optimista (`updateQueryData`) en lugar de volver a pedir los datos.

**Relación entre ambas (nivel 3):** los usuarios/autores de JSONPlaceholder se enlazan con personajes de Rick and Morty (avatar, estado, especie), de modo que cada post muestra datos combinados de las dos fuentes.

## Estrategia de ramas

```
main      ── plan (este README) ──────────────────────────── versión final (nivel 3)
develop   ── estructura base ──●──────────●──────────●
                                \ nivel-1 / \ nivel-2 / \ nivel-3 /
```

| Rama                              | Contenido                                                                 |
| --------------------------------- | ------------------------------------------------------------------------- |
| `main`                            | Plan de trabajo. Al terminar recibe la versión final.                     |
| `develop`                         | Integración. Parte de la estructura base y acumula cada nivel.            |
| `nivel-1` / `nivel-2` / `nivel-3` | Trabajo de cada punto de control. Sale de `develop` y vuelve a él por PR. |

Cada nivel terminado se etiqueta (`v1.0-nivel-1`, `v2.0-nivel-2`, `v3.0-nivel-3`) para poder revisar su estado exacto en cualquier momento. Commits con [Conventional Commits](https://www.conventionalcommits.org/es/).

## Plan por nivel

### Nivel 1 – Básico · rama `nivel-1`

> Mostrar una lista de elementos desde una API con información básica.

- [ ] Listado de personajes de Rick and Morty.
- [ ] Consumo con RTK Query (`createApi` + `fetchBaseQuery`).
- [ ] Interfaz con Tailwind: grid de tarjetas responsivo.
- [ ] Búsqueda por nombre (con _debounce_) y filtro simple por estado.
- [ ] Estados de carga, vacío y error.

### Nivel 2 – Intermedio · rama `nivel-2`

> Interfaz más interactiva con navegación, validaciones y detalle de elementos.

- [ ] Todo lo del nivel 1.
- [ ] Vista de detalle al hacer clic en un personaje (`/characters/:id`).
- [ ] Rutas con React Router (layout común, página 404).
- [ ] Paginación con la paginación nativa de la API, sincronizada con la URL (`?page=&name=`).
- [ ] Formulario para crear un post en JSONPlaceholder con React Hook Form + Zod.

### Nivel 3 – Avanzado · rama `nivel-3`

> SPA completa con arquitectura escalable y lógica avanzada.

- [ ] Todo lo del nivel 2.
- [ ] CRUD completo de **posts** (crear, listar, ver detalle, actualizar, eliminar).
  - [ ] RTK Query _mutations_ para crear, editar y eliminar, con actualización de caché.
  - [ ] Formularios validados con Zod.
- [ ] Manejo de errores personalizado: notificaciones (toasts), estados de error por pantalla y _error boundary_ de rutas.
- [ ] Integración con la segunda API: posts/autores enriquecidos con personajes de Rick and Morty.
- [ ] Modularización avanzada por _features_ (slices, endpoints inyectados, hooks personalizados).
- [ ] UI pulida con componentes reutilizables (Button, Input, Card, Modal, Pagination, Skeleton…).
- [ ] Animaciones sutiles de transición y feedback (opcional).

## Estructura prevista

```
src/
├── app/            # store, router, providers
├── features/       # un módulo por dominio (characters, posts…): api, components, hooks, schemas, pages
├── shared/         # componentes UI, hooks y utilidades reutilizables
└── main.tsx
```

## Ejecución

```bash
npm install
cp .env.example .env   # opcional: las URLs de las APIs tienen valores por defecto
npm run dev
```

| Script              | Descripción                   |
| ------------------- | ----------------------------- |
| `npm run dev`       | Servidor de desarrollo (Vite) |
| `npm run build`     | Verificación de tipos + build |
| `npm run typecheck` | Solo verificación de tipos    |
| `npm run lint`      | Lint con oxlint               |
| `npm run format`    | Formatea con Prettier         |
| `npm run preview`   | Sirve el build de producción  |
