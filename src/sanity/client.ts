import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const isSanityConfigured = Boolean(projectId)

export const client = isSanityConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion: '2024-01-01', useCdn: true })
  : null
