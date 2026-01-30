import { env } from 'cloudflare:workers'
import type { VectorizeVector } from '@cloudflare/workers-types'
import { createError } from 'evlog'
import { DeveloperIngestSchema } from '#shared/utils/validation-schema'

export default defineEventHandler(async event => {
  const { connexe } = useRuntimeConfig(event)
  const log = useLogger(event)

  if (event.headers.get('x-connexe-ingest-secret') !== connexe.ingestSecret) {
    throw createError({
      status: 401,
      message: 'Unauthorized',
      why: 'Invalid ingest secret',
      fix: 'Check your ingest secret',
    })
  }

  const developers = await readValidatedBody(event, data => DeveloperIngestSchema.parse(data))

  try {
    log.set({ step: 'starting_ingestion', developerCount: developers.length })
    const vectors: VectorizeVector[] = []

    for (const dev of developers) {
      log.set({ step: 'processing_developer', developerId: dev.id })

      const textToEmbed = `${dev.name}: ${dev.intro} (Skills: ${dev.skills.join(', ')})`

      log.set({ step: 'generating_embedding', developerId: dev.id, textLength: textToEmbed.length })
      const embeddings = (await env.AI.run('@cf/baai/bge-large-en-v1.5', {
        text: [textToEmbed],
      })) as { shape: number[]; data: number[][]; pooling?: 'mean' | 'cls' }

      if (!embeddings.data[0]) {
        log.set({ error: 'embedding_generation_failed', developerId: dev.id })
        throw createError({
          status: 500,
          message: 'Failed to generate embeddings',
          why: `AI model did not return embedding data for developer: ${dev.id}`,
          fix: 'Check AI Workers status',
        })
      }

      log.set({
        step: 'embedding_generated',
        developerId: dev.id,
        embeddingLength: embeddings.data[0].length,
      })

      vectors.push({
        id: dev.id,
        values: embeddings.data[0],
        metadata: {
          name: dev.name,
          intro: dev.intro,
          skills: dev.skills.join(','),
          lang: dev.lang,
          type: 'developer',
        },
      })

      log.set({ step: 'storing_in_kv', developerId: dev.id })
      await env.CONTENT_STORE.put(`developer:${dev.id}`, JSON.stringify(dev))
      log.set({ step: 'kv_stored', developerId: dev.id })
    }

    log.set({ step: 'upserting_vectors', vectorCount: vectors.length })
    await env.CONNEXE_DEVELOPER_VECTOR_INDEX.upsert(vectors)
    log.set({ step: 'vectors_upserted', count: vectors.length })

    return {
      success: true,
      count: developers.length,
    }
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error) throw error

    log.set({
      step: 'error_handler',
      developers,
      error: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    })

    throw createError({
      status: 500,
      message: 'Failed to ingest developers',
      why: error instanceof Error ? error.message : 'Unknown error occurred',
      fix: 'Check the logs for specific step failure',
    })
  }
})
