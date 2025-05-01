/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  readonly VITE_API_URL_PRODUCTION: string
  readonly VITE_AUTH_CLIENT_ID: string
  readonly VITE_AUTH_CLIENT_SECRET: string
  readonly VITE_GA_TRACKING_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
