import { env } from 'cloudflare:workers'
import type { VectorizeVector } from '@cloudflare/workers-types'
import { createError } from 'evlog'
import { ContentIngestSchema } from '#shared/utils/validation-schema'

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

  const ingestItems = await readValidatedBody(event, data => ContentIngestSchema.parse(data))

  try {
    log.set({ step: 'starting_ingestion', itemCount: ingestItems.length })
    const vectors: VectorizeVector[] = []

    for (const item of ingestItems) {
      log.set({ step: 'processing_item', itemId: item.id })

      const textToEmbed = `${item.title}: (Tags: ${item.tags?.join(', ')})`

      log.set({ step: 'generating_embedding', itemId: item.id, textLength: textToEmbed.length })
      const embeddings = (await env.AI.run('@cf/baai/bge-large-en-v1.5', {
        text: [textToEmbed],
      })) as { shape: number[]; data: number[][]; pooling?: 'mean' | 'cls' }

      if (!embeddings.data[0]) {
        log.set({ error: 'embedding_generation_failed', itemId: item.id })
        throw createError({
          status: 500,
          message: 'Failed to generate embeddings',
          why: `AI model did not return embedding data for item: ${item.id}`,
          fix: 'Check AI Workers status',
        })
      }

      log.set({
        step: 'embedding_generated',
        itemId: item.id,
        embeddingLength: embeddings.data[0].length,
      })

      vectors.push({
        id: item.id,
        values: embeddings.data[0],
        metadata: {
          title: item.title,
          url: item.url,
          lang: item.lang,
          tags: item.tags?.join(',') || '',
        },
      })

      log.set({ step: 'storing_in_kv', itemId: item.id })
      await env.CONTENT_STORE.put(`content:${item.id}`, JSON.stringify(item))
      log.set({ step: 'kv_stored', itemId: item.id })
    }

    log.set({ step: 'upserting_vectors', vectorCount: vectors.length })
    await env.CONNEXE_CONTENT_VECTOR_INDEX.upsert(vectors)
    log.set({ step: 'vectors_upserted', count: vectors.length })

    return {
      success: true,
      count: ingestItems.length,
    }
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error) throw error

    log.set({
      step: 'error_handler',
      ingestItems,
      error: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    })

    throw createError({
      status: 500,
      message: 'Failed to ingest content',
      why: error instanceof Error ? error.message : 'Unknown error occurred',
      fix: 'Check the logs for specific step failure',
    })
  }
})
