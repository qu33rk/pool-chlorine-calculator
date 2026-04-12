import type { QueryParams } from 'next-sanity'
import { client } from './client'

async function sanityFetch<T>(query: string, params?: QueryParams): Promise<T> {
  if (!client) return [] as unknown as T
  if (params !== undefined) return client.fetch<T>(query, params)
  return client.fetch<T>(query)
}

export type PostListItem = {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  publishedAt: string
  mainImage?: {
    asset: { url: string }
    alt?: string
  }
  categories?: { title: string }[]
}

export type Post = PostListItem & {
  body: Block[] | string | null
  author?: { name: string }
  seoTitle?: string
  seoDescription?: string
}

export type Block = {
  _type: string
  _key: string
  style?: string
  children?: { _type: string; _key: string; text: string; marks?: string[] }[]
  asset?: { url: string }
  alt?: string
  markDefs?: { _key: string; _type: string; href?: string }[]
}

const POST_LIST_FIELDS = `
  _id,
  title,
  slug,
  "excerpt": metaDescription,
  publishedAt,
  "mainImage": featuredImage { "asset": asset->{ url }, alt },
  "categories": categories[]->{ title }
`

export async function getAllPosts(): Promise<PostListItem[]> {
  return sanityFetch<PostListItem[]>(
    `*[_type == "article"] | order(publishedAt desc) { ${POST_LIST_FIELDS} }`,
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await sanityFetch<Post | null>(
    `*[_type == "article" && slug.current == $slug][0] {
      ${POST_LIST_FIELDS},
      "body": content,
      "author": author->{ name },
      "seoTitle": metaTitle,
      "seoDescription": metaDescription
    }`,
    { slug },
  )
  return post ?? null
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await sanityFetch<{ slug: { current: string } }[]>(
    `*[_type == "article"]{ slug }`,
  )
  return Array.isArray(posts) ? posts.map((p) => p.slug.current) : []
}
