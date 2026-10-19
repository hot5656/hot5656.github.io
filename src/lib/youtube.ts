export interface YouTubeVideo {
  id: string;
  start?: number;
  isShort: boolean;
}

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

// 解析 t / start 參數：支援 "90"、"90s"、"1m30s"、"1h2m3s"
function parseStartTime(value: string | null): number | undefined {
  if (!value) return undefined;
  if (/^\d+s?$/.test(value)) return parseInt(value, 10) || undefined;

  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return undefined;
  const [, h, m, s] = match;
  const total = (parseInt(h || '0', 10) * 3600) + (parseInt(m || '0', 10) * 60) + parseInt(s || '0', 10);
  return total || undefined;
}

// 解析 YouTube 網址，非 YouTube 影片網址回傳 null
// 支援 youtube.com/watch?v=、youtu.be/、youtube.com/shorts/、/embed/、/live/
export function parseYouTubeUrl(rawUrl: string): YouTubeVideo | null {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^(www\.|m\.)/, '');
  const segments = url.pathname.split('/').filter(Boolean);
  let id: string | undefined;
  let isShort = false;

  if (host === 'youtu.be') {
    id = segments[0];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (segments[0] === 'watch') {
      id = url.searchParams.get('v') ?? undefined;
    } else if (['shorts', 'embed', 'live'].includes(segments[0])) {
      id = segments[1];
      isShort = segments[0] === 'shorts';
    }
  }

  if (!id || !VIDEO_ID_PATTERN.test(id)) return null;

  return {
    id,
    start: parseStartTime(url.searchParams.get('t') ?? url.searchParams.get('start')),
    isShort,
  };
}
