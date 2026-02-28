/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BACK_HOST: string
  readonly VITE_APP_FILES_LIMIT: string
  readonly VITE_APP_TEXT_LIMIT: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_GA_KEY: string
  readonly VITE_APP_GA_TAG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
