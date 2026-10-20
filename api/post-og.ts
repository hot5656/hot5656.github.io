// Vercel Function: serves index.html for /post/:slug and /zh-tw/post/:slug with
// the post's own Open Graph tags, because social crawlers don't run the SPA's JS.

declare const process: { env: Record<string, string | undefined> };

interface PostRow {
  title: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  eng_title: string | null;
  eng_excerpt: string | null;
  eng_content: string | null;
  created_at: string;
}

const SITE_NAME = 'Robert Hut';
const DEFAULT_IMAGE = '/roberthut-og-banner.png?v=2';
const DESCRIPTION_LENGTH = 160;

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug') ?? '';
  const isZh = url.searchParams.get('locale') === 'zh-TW';

  const indexRes = await fetch(new URL('/index.html', url.origin));
  const html = await indexRes.text();

  const post = slug ? await fetchPost(slug).catch(() => null) : null;
  if (!post) return htmlResponse(html);

  const title = (!isZh && post.eng_title) || post.title;
  const content = (!isZh && post.eng_content) || post.content;
  const excerpt = (!isZh && post.eng_excerpt) || post.excerpt;
  const description = excerpt?.trim() || toPlainText(content).slice(0, DESCRIPTION_LENGTH);
  const pageUrl = `${url.origin}${isZh ? '/zh-tw' : ''}/post/${encodeURIComponent(slug)}`;
  const postImage =
    post.cover_image_url || firstImageUrl(content) || firstImageUrl(post.content);
  const image = new URL(postImage || DEFAULT_IMAGE, url.origin).href;

  const tags = [
    `<title>${escapeHtml(`${title} | ${SITE_NAME}`)}</title>`,
    meta('name', 'description', description),
    meta('property', 'og:url', pageUrl),
    meta('property', 'og:type', 'article'),
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:image', image),
    ...(postImage
      ? []
      : [meta('property', 'og:image:width', '1138'), meta('property', 'og:image:height', '765')]),
    meta('property', 'article:published_time', post.created_at),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', image),
  ].join('\n    ');

  const withoutDefaults = html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+(?:property="og:[^"]*"|name="twitter:[^"]*"|name="description")[^>]*>\s*/gi, '');

  return htmlResponse(withoutDefaults.replace('</head>', `    ${tags}\n  </head>`));
}

async function fetchPost(slug: string): Promise<PostRow | null> {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) return null;

  const query = new URLSearchParams({
    slug: `eq.${slug}`,
    published: 'eq.true',
    select: 'title,excerpt,content,cover_image_url,eng_title,eng_excerpt,eng_content,created_at',
    limit: '1',
  });
  const res = await fetch(`${supabaseUrl}/rest/v1/roberthut_posts?${query}`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
  });
  if (!res.ok) return null;

  const rows = (await res.json()) as PostRow[];
  return rows[0] ?? null;
}

// First markdown image, e.g. ![alt](https://... "title")
function firstImageUrl(markdown: string | null): string | null {
  const match = markdown?.match(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/);
  return match ? match[1] : null;
}

function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[#>*_`~|-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function meta(attr: 'name' | 'property', key: string, value: string): string {
  return `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function htmlResponse(html: string): Response {
  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
    },
  });
}
