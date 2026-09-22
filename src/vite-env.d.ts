/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RICK_AND_MORTY_API_URL?: string
  readonly VITE_JSON_PLACEHOLDER_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
