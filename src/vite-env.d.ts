/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POKE_API_URL?: string
  readonly VITE_JSON_PLACEHOLDER_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
