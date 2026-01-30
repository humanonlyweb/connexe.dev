import { z } from 'zod'

export const ContentItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  url: z.url(),
  tags: z.array(z.string()).optional(),
  lang: z.string().default('en'),
})

export const ContentIngestSchema = z.array(ContentItemSchema)

export const ContentRecommendationQuerySchema = z.object({
  topic: z.string(),
  limit: z.coerce.number().max(20).optional().default(1),
  lang: z.string().optional().default('en'),
})

export const DeveloperItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.url(),
  intro: z.string(),
  skills: z.array(z.string()),
  linkToPortfolio: z.url(),
  lang: z.string().default('en'),
})

export const DeveloperIngestSchema = z.array(DeveloperItemSchema)

export const DeveloperRecommendationQuerySchema = z.object({
  skills: z.string().optional().default('vue,nuxt'),
  limit: z.coerce.number().max(20).optional().default(1),
  lang: z.string().optional().default('en'),
})
