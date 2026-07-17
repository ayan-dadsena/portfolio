export interface MediumPost {
  title: string
  link: string
  pubDate: string
}

function extractCdata(xml: string, tag: string): string {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  const plainRe = new RegExp(`<${tag}[^>]*>([^<]+)<\\/${tag}>`)
  const m = xml.match(cdataRe) ?? xml.match(plainRe)
  return m ? m[1].trim() : ''
}

function extractLink(itemXml: string): string {
  // Medium uses <guid isPermaLink="false"> for the canonical article URL
  const guid = itemXml.match(/<guid[^>]*isPermaLink="true"[^>]*>([^<]+)<\/guid>/)
  if (guid) return guid[1].trim()
  const plain = itemXml.match(/<link>([^<]+)<\/link>/)
  return plain ? plain[1].trim() : ''
}

export async function fetchMediumPosts(username: string): Promise<MediumPost[]> {
  try {
    const res = await fetch(`https://medium.com/feed/${username}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const xml = await res.text()
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? []

    return items.slice(0, 6).map((item) => ({
      title: extractCdata(item, 'title'),
      link: extractLink(item),
      pubDate: extractCdata(item, 'pubDate'),
    }))
  } catch {
    return []
  }
}

export function fmtDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
