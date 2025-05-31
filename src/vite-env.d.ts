/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIKES_COUNT_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
