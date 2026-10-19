import type { Components } from 'react-markdown';
import { parseYouTubeUrl, type YouTubeVideo } from '../lib/youtube';

function YouTubeEmbed({ video }: { video: YouTubeVideo }) {
  const src = `https://www.youtube-nocookie.com/embed/${video.id}${video.start ? `?start=${video.start}` : ''}`;

  return (
    <div
      className={`my-6 overflow-hidden rounded-lg bg-stone-900 ${
        video.isShort ? 'mx-auto aspect-[9/16] max-w-sm' : 'aspect-video w-full'
      }`}
    >
      <iframe
        src={src}
        title="YouTube video"
        className="h-full w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

// 段落內只有一個 YouTube 連結時（例如單獨一行貼上網址），改為嵌入播放器；其餘照常顯示段落
export const MarkdownParagraph: Components['p'] = ({ node, children, ...props }) => {
  const meaningfulChildren = (node?.children ?? []).filter(
    (child) => !(child.type === 'text' && child.value.trim() === '')
  );

  if (meaningfulChildren.length === 1) {
    const only = meaningfulChildren[0];
    if (only.type === 'element' && only.tagName === 'a' && typeof only.properties.href === 'string') {
      const video = parseYouTubeUrl(only.properties.href);
      if (video) return <YouTubeEmbed video={video} />;
    }
  }

  return <p {...props}>{children}</p>;
};
