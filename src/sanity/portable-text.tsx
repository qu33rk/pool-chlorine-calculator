import type { Block } from './queries'

function renderMark(text: string, marks: string[], markDefs: Block['markDefs']) {
  let node: React.ReactNode = text

  if (marks.includes('strong')) node = <strong>{node}</strong>
  if (marks.includes('em')) node = <em>{node}</em>
  if (marks.includes('code')) node = <code className="bg-slate-100 rounded px-1 text-sm font-mono">{node}</code>
  if (marks.includes('underline')) node = <u>{node}</u>

  const linkMark = marks.find((m) => markDefs?.some((d) => d._key === m && d._type === 'link'))
  if (linkMark) {
    const def = markDefs?.find((d) => d._key === linkMark)
    node = (
      <a href={def?.href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer">
        {node}
      </a>
    )
  }

  return node
}

function BlockRenderer({ block }: { block: Block }) {
  if (block._type === 'image') {
    return (
      <figure className="my-8">
        <img
          src={block.asset?.url}
          alt={block.alt ?? ''}
          className="w-full rounded-2xl shadow-md"
        />
        {block.alt && (
          <figcaption className="mt-2 text-center text-sm text-slate-500">{block.alt}</figcaption>
        )}
      </figure>
    )
  }

  if (block._type !== 'block') return null

  const children = block.children?.map((child, i) => (
    <span key={child._key ?? i}>
      {renderMark(child.text, child.marks ?? [], block.markDefs)}
    </span>
  ))

  const cls = 'my-4'

  switch (block.style) {
    case 'h2': return <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h2>
    case 'h3': return <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">{children}</h3>
    case 'h4': return <h4 className="text-lg font-semibold text-slate-900 mt-6 mb-2">{children}</h4>
    case 'blockquote':
      return (
        <blockquote className="border-l-4 border-blue-400 pl-4 italic text-slate-600 my-6">
          {children}
        </blockquote>
      )
    default:
      return <p className={`text-slate-700 leading-relaxed ${cls}`}>{children}</p>
  }
}

export function PortableText({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose max-w-none">
      {blocks.map((block) => (
        <BlockRenderer key={block._key} block={block} />
      ))}
    </div>
  )
}
