import type { Block } from '@/sanity/queries'

export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ąàáâãäå]/g, 'a')
    .replace(/[ćčç]/g, 'c')
    .replace(/[ęèéêë]/g, 'e')
    .replace(/[łľĺ]/g, 'l')
    .replace(/[ńñň]/g, 'n')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[śšş]/g, 's')
    .replace(/[úùûü]/g, 'u')
    .replace(/[źżž]/g, 'z')
    .replace(/[ďđ]/g, 'd')
    .replace(/[řŕ]/g, 'r')
    .replace(/[ťţ]/g, 't')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function decodeHtmlEntities(text: string): string {
  const namedEntities: Record<string, string> = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
    nbsp: '\u00A0', ndash: '–', mdash: '—', laquo: '«', raquo: '»',
    bdquo: '„', ldquo: '\u201C', rdquo: '\u201D', lsquo: '\u2018', rsquo: '\u2019',
  }
  return text
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&(\w+);/g, (_m, name) => namedEntities[name] ?? _m)
}

export function extractTocFromBlocks(blocks: Block[]): { toc: TocItem[]; headingIds: Map<string, string> } {
  const toc: TocItem[] = []
  const headingIds = new Map<string, string>()
  const usedIds = new Set<string>()

  for (const block of blocks) {
    if (block._type !== 'block') continue
    if (block.style !== 'h2' && block.style !== 'h3') continue

    const rawText = (block.children ?? []).map((c) => c.text).join('').trim()
    if (!rawText) continue

    let id = slugify(rawText)
    if (usedIds.has(id)) {
      let i = 2
      while (usedIds.has(`${id}-${i}`)) i++
      id = `${id}-${i}`
    }
    usedIds.add(id)
    headingIds.set(block._key, id)

    toc.push({
      id,
      text: rawText,
      level: block.style === 'h2' ? 2 : 3,
    })
  }

  return { toc, headingIds }
}

export function parseHeadingsAndInjectIds(html: string): { content: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  const usedIds = new Set<string>()

  const content = html.replace(
    /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const rawText = inner.replace(/<[^>]*>/g, '').trim()
      const text = decodeHtmlEntities(rawText)
      let id = slugify(text)
      if (usedIds.has(id)) {
        let i = 2
        while (usedIds.has(`${id}-${i}`)) i++
        id = `${id}-${i}`
      }
      usedIds.add(id)

      const level = tag.toLowerCase() === 'h2' ? 2 : 3
      toc.push({ id, text, level })

      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
    },
  )

  return { content, toc }
}
