type Headline = { title: string; link: string; source: string; date: string };

export const googleNews = "https://news.google.com/search?q=GTA%206%20OR%20%22GTA%20VI%22%20OR%20%22GTA%20Online%22&hl=pt-BR&gl=BR&ceid=BR:pt-419";

function decode(raw: string) {
  return raw.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1").replace(
    /&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi,
    (entity) => {
      const basic: Record<string, string> = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'" };
      if (entity in basic) return basic[entity];
      const hex = entity.startsWith("&#x");
      const code = Number.parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    },
  ).trim();
}

export function readHeadlines(xml: string): Headline[] {
  const items: Headline[] = [];
  const seen = new Set<string>();
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const link = decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "");
    const source = decode(item.match(/<source\b[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "");
    const date = new Date(item.match(/<pubDate>([^<]*)<\/pubDate>/)?.[1] ?? "");
    if (!title || !/^https:\/\/news\.google\.com\/rss\/articles\/[\w-]+(?:\?[\w=&%-]+)?$/.test(link) ||
        !Number.isFinite(date.getTime()) || seen.has(link)) continue;
    seen.add(link);
    items.push({ title: title.slice(0, 300), link, source: source.slice(0, 100), date: date.toISOString() });
    if (items.length === 12) break;
  }
  return items.sort((a, b) => b.date.localeCompare(a.date));
}

export async function googleHeadlines() {
  try {
    const url = googleNews.replace("/search?", "/rss/search?");
    const response = await fetch(url, {
      signal: AbortSignal.timeout(4500),
      redirect: "error",
      next: { revalidate: 1800 },
    });
    if (!response.ok) return [];
    const raw = await response.text();
    return raw.length <= 2_000_000 ? readHeadlines(raw) : [];
  } catch {
    return [];
  }
}
