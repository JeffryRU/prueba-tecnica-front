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

- **[PokeAPI](https://pokeapi.co/docs/v2)** – API principal de lectura: listado de Pokémon, tipos, estadísticas, habilidades, especie y cadena evolutiva.
- **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** – Única API de la lista que acepta `POST`/`PUT`/`PATCH`/`DELETE`; se usa para formularios y el CRUD.

> JSONPlaceholder responde como si guardara los cambios, pero **no los persiste**. Por eso el CRUD actualiza la caché de RTK Query de forma manual/optimista (`updateQueryData`) en lugar de volver a pedir los datos.

**Relación entre ambas (nivel 3):** cada usuario de JSONPlaceholder tiene un Pokémon compañero (avatar, tipos y enlace a su ficha) y cada post puede etiquetar un Pokémon, de modo que las publicaciones muestran datos combinados de las dos fuentes.

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

- [x] Listado de Pokémon (imagen, número, nombre y tipos) desde PokeAPI.
- [x] Consumo con RTK Query (`createApi` + `fetchBaseQuery`).
- [x] Interfaz con Tailwind: grid de tarjetas responsivo.
- [x] Búsqueda por nombre o número (con _debounce_) y filtro por tipo.
- [x] Estados de carga, vacío y error.

### Nivel 2 – Intermedio · rama `nivel-2`

> Interfaz más interactiva con navegación, validaciones y detalle de elementos.

- [x] Todo lo del nivel 1.
- [x] Vista de detalle al hacer clic en un Pokémon (`/pokemon/:name`): estadísticas, habilidades, especie y evoluciones.
- [x] Rutas con React Router (layout común, página 404).
- [x] Paginación sincronizada con la URL (`?page=&q=&type=`).
- [x] Formulario para crear un post en JSONPlaceholder con React Hook Form + Zod.

### Nivel 3 – Avanzado · rama `nivel-3`

> SPA completa con arquitectura escalable y lógica avanzada.

- [x] Todo lo del nivel 2.
- [x] CRUD completo de **posts** (crear, listar, ver detalle, actualizar, eliminar).
  - [x] RTK Query _mutations_ para crear, editar y eliminar, con actualización de caché.
  - [x] Formularios validados con Zod.
- [x] Manejo de errores personalizado: notificaciones (toasts), estados de error por pantalla y _error boundary_ de rutas.
- [x] Integración con la segunda API: autores con Pokémon compañero y posts etiquetados con un Pokémon de PokeAPI.
- [x] Modularización avanzada por _features_ (slices, endpoints inyectados, hooks personalizados).
- [x] UI pulida con componentes reutilizables (Button, Input, Card, Modal, Pagination, Skeleton…).
- [x] Animaciones sutiles de transición y feedback (opcional).

## Arquitectura

```
src/
├── app/                      # store (combineSlices + middlewares), router (rutas lazy) y hooks tipados
├── features/                 # un módulo por dominio
│   ├── pokemon/              # api (endpoints inyectados en PokeAPI), components, hooks, types, utils
│   ├── posts/                # api (queries + mutations), store (slice de cambios locales), hooks, schemas, utils
│   ├── users/                # api, AuthorAvatar/AuthorCard y relación usuario → Pokémon compañero
│   └── notifications/        # slice de toasts, Toaster, useNotify y listener global de errores
├── pages/                    # pantallas asociadas a rutas (pokedex, pokemon-detail, posts, error, not-found)
└── shared/
    ├── api/                  # APIs base de RTK Query y traducción de errores
    ├── components/           # UI reutilizable: Button, Card, Pagination, ConfirmDialog, Skeleton, FormField…
    ├── hooks/                # useDebounce, useDebouncedSync, useUrlParams
    ├── layouts/              # MainLayout (navegación, barra de progreso, transiciones, toasts)
    └── utils/                # cn, paginación, localStorage seguro
```

### Flujo de datos

```
Pantalla (pages) ──▶ hook de feature (usePosts, usePokemonSearch…) ──▶ RTK Query ──▶ API
                              │                                           │
                              └──── slice (cambios locales) ◀── mutation ─┘ (onQueryStarted)
```

- **Una API base por origen** (`pokeApi` y `jsonPlaceholderApi`). Cada feature le inyecta sus endpoints con `injectEndpoints`, así que las APIs no conocen a los features.
- **Estado en la URL**: los filtros y la página de la Pokédex y de las publicaciones viven en la query string (`useUrlParams`), de modo que se pueden compartir, se conservan al recargar y funcionan con atrás/adelante.
- **Code splitting**: cada ruta se carga bajo demanda (`lazy`). Una barra de progreso indica la navegación.

### CRUD sobre una API que no persiste

JSONPlaceholder responde a `POST`/`PUT`/`DELETE`, pero no guarda los cambios. Para que el CRUD sea coherente:

1. Las mutations llaman a la API real y, **cuando esta confirma**, `onQueryStarted` registra el cambio en el slice `posts` (creados, editados y eliminados).
2. `usePosts` y `usePost` combinan las respuestas del servidor con esos cambios (`mergePostsPage`): los posts nuevos aparecen al inicio de la primera página, se aplican las ediciones, desaparecen los eliminados y el total se ajusta según los filtros.
3. La API siempre devuelve `id: 101` al crear, así que se asigna un id local único. Los posts creados en la app no existen en el servidor (un `PUT` devolvería 500), por lo que se editan y eliminan sin petición.
4. Los cambios se guardan en `localStorage` y sobreviven a una recarga.

### Manejo de errores

- **Queries**: cada pantalla muestra su propio estado de error con reintento (y "no encontrado" diferenciado del error de red).
- **Mutations**: un _listener middleware_ global captura cualquier mutation rechazada y muestra una notificación con un mensaje legible (`getErrorMessage`).
- **Errores de render**: `errorElement` en la ruta raíz actúa como _error boundary_.
- Las acciones correctas se confirman con notificaciones de éxito.

### Integración de las dos APIs

- Cada usuario de JSONPlaceholder tiene un **Pokémon compañero** (relación determinista usuario → Pokémon) que se usa como avatar. En el detalle del post se muestra con sus tipos y un enlace a su ficha.
- Cada post puede **etiquetar un Pokémon**: el formulario ofrece autocompletado con la Pokédex y Zod valida que exista en PokeAPI.

### Principios

- **SOLID**: componentes y hooks con una sola responsabilidad (`useDeletePost` gestiona el flujo de borrado, `PostActions` solo la UI). `PostForm` sirve para crear y editar sin cambios, y los features dependen de las APIs base, no al revés.
- **DRY**: `useUrlParams`, `useDebouncedSync`, `Pagination`, `FormField`, `StatusMessage` y `ConfirmDialog` se reutilizan en la Pokédex y en las publicaciones.
- **KISS**: sin librerías extra para toasts, modales o estado de URL; se usan `<dialog>` nativo, Redux Toolkit y React Router.

## Ejecución

Requisitos: Node.js 20.19+ o 22.12+.

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
| `npm test`          | Tests unitarios con Vitest    |
| `npm run format`    | Formatea con Prettier         |
| `npm run preview`   | Sirve el build de producción  |
