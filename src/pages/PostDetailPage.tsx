import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { MarkdownParagraph } from '../components/MarkdownParagraph';
import { supabase, Post } from '../lib/supabase';
import { useLocalePath } from '../hooks/useLocalePath';
import 'highlight.js/styles/github-dark.css';

export function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const localePath = useLocalePath();

  useEffect(() => {
    if (slug) loadPost(slug);
  }, [slug]);

  async function loadPost(slug: string) {
    try {
      const { data, error } = await supabase
        .from('roberthut_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">{t('common.loading')}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-light text-stone-400 mb-4">
          {i18n.language === 'zh-TW' ? '找不到文章' : 'Post Not Found'}
        </h2>
        <Link to={localePath('/')} className="text-stone-600 hover:text-stone-900 transition-colors">
          {i18n.language === 'zh-TW' ? '← 返回首頁' : '← Back to Home'}
        </Link>
      </div>
    );
  }

  const isEnglish = i18n.language === 'en';
  const displayTitle = isEnglish && post.eng_title ? post.eng_title : post.title;
  const displayContent = isEnglish && post.eng_content ? post.eng_content : post.content;
  const displayTags = isEnglish && post.eng_tags ? post.eng_tags : post.tags;

  return (
    <article className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-0 py-6 sm:py-10">
      <Link
        to={localePath('/')}
        className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {i18n.language === 'zh-TW' ? '返回所有文章' : 'Back to All Posts'}
      </Link>

      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={displayTitle}
          className="w-full aspect-[16/9] object-cover rounded-xl mb-8"
          loading="lazy"
        />
      )}

      <header className="mb-10">
        <h1
          style={{ fontSize: 'clamp(28px, 2.6vw + 12px, 44px)' }}
          className="font-light leading-tight text-stone-900 mb-6"
        >
          {displayTitle}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-500">
          <time className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.created_at).toLocaleDateString(i18n.language === 'zh-TW' ? 'zh-TW' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          {displayTags && displayTags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <div className="flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="md-content max-w-none text-stone-800">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            p: MarkdownParagraph,
            img: ({ node, className, ...props }) => (
              <img
                {...props}
                loading="lazy"
                className={['w-full', className].filter(Boolean).join(' ')}
              />
            ),
            a: ({ node, className, ...props }) => (
              <a
                {...props}
                className={['transition-colors hover:text-stone-600', className]
                  .filter(Boolean)
                  .join(' ')}
              />
            ),
          }}
        >
          {displayContent}
        </ReactMarkdown>
      </div>
    </article>
  );
}

