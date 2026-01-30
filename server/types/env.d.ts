declare module 'nuxt/schema' {
  interface RuntimeConfig {
    connexe: {
      ingestSecret: string
    }
  }
}

declare module 'cloudflare:workers' {
  import type { VectorizeIndex, KVNamespace, Ai } from '@cloudflare/workers-types'

  interface Env {
    CONNEXE_CONTENT_VECTOR_INDEX: VectorizeIndex
    CONNEXE_DEVELOPER_VECTOR_INDEX: VectorizeIndex
    CONTENT_STORE: KVNamespace
    AI: Ai
  }
  export const env: Env
}
