import { env } from 'cloudflare:workers'
import { createError } from 'evlog'
import type { IndexQueryResponse } from '#server/types/vectorize'
import { DeveloperRecommendationQuerySchema } from '#shared/utils/validation-schema'

export default defineEventHandler(async event => {
  const { skills, limit, lang } = await getValidatedQuery(event, data =>
    DeveloperRecommendationQuerySchema.parse(data),
  )
  const log = useLogger(event)

  try {
    log.set({ step: 'generating_embeddings', skills })
    const embeddings = (await env.AI.run('@cf/baai/bge-large-en-v1.5', { text: [skills] })) as {
      shape: number[]
      data: number[][]
      pooling?: 'mean' | 'cls'
    }

    if (!embeddings.data[0]) {
      log.set({ error: 'embeddings_generation_failed', embeddings })
      throw createError({
        status: 500,
        message: 'Failed to generate embeddings',
        why: 'AI model did not return embedding data',
        fix: 'Try again later? 😩',
      })
    }

    log.set({
      step: 'embeddings_generated',
      embeddingLength: embeddings.data[0].length,
      shape: embeddings.shape,
    })

    log.set({ step: 'querying_vector_index', filter: { lang }, topK: limit })
    const matchedResults = (await env.CONNEXE_DEVELOPER_VECTOR_INDEX.query(embeddings.data[0], {
      topK: limit,
      returnMetadata: 'all',
      filter: { lang },
    })) as IndexQueryResponse

    log.set({
      step: 'vector_query_complete',
      matchCount: matchedResults.matches?.length ?? 0,
      matchIds: matchedResults.matches?.map(m => m.id),
    })

    if (!matchedResults.matches || matchedResults.matches.length === 0) {
      log.set({ warning: 'no_vector_matches', skills, lang })
      return { recommendations: [] }
    }

    log.set({ step: 'fetching_developers_from_kv' })
    const recommendations = (
      await Promise.all(
        matchedResults.matches.map(async match => {
          const developerJson = await env.CONTENT_STORE.get(`developer:${match.id}`)
          if (!developerJson) {
            log.set({ warning: 'developer_not_found_in_kv', developerId: match.id })
            return null
          }
          return Object.assign(JSON.parse(developerJson), { score: match.score })
        }),
      )
    ).flatMap(item => (item ? [item] : []))

    log.set({
      step: 'recommendations_ready',
      count: recommendations.length,
    })

    event.headers.set('Access-Control-Allow-Origin', '*')

    return { recommendations }
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'status' in error) throw error

    log.set({
      step: 'error_handler',
      requestedData: { skills, limit, lang },
      error: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
    })

    throw createError({
      status: 500,
      message: 'Failed to generate developer recommendations',
      why: error instanceof Error ? error.message : 'Unknown error occurred',
      fix: 'Check the logs for more details and try again',
    })
  }
})
