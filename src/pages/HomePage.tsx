import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Tag } from 'lucide-react';
import { supabase, Post } from '../lib/supabase';
import { useLocalePath } from '../hooks/useLocalePath';

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const localePath = useLocalePath();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const { data, error } = await supabase
        .from('roberthut_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">{t('home.loading')}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-4">{t('home.title')}</h1>
        <p className="text-lg text-stone-600">{t('home.subtitle')}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
          <h2 className="text-2xl font-light text-stone-400 mb-4">{t('home.noPosts')}</h2>
          <p className="text-stone-500 mb-8">{t('home.noPostsSubtitle')}</p>
          <Link
            to={localePath('/admin/new')}
            className="inline-block px-6 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            {t('home.createPost')}
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {post.cover_image_url && (
              <Link to={localePath(`/post/${post.slug}`)}>
                <div className="w-full aspect-[2/1] overflow-hidden">
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            )}

            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                <time className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.created_at).toLocaleDateString(i18n.language === 'zh-TW' ? 'zh-TW' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-stone-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to={localePath(`/post/${post.slug}`)}>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-stone-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </Link>

              {post.excerpt && (
                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              <Link
                to={localePath(`/post/${post.slug}`)}
                className="inline-block text-sm text-stone-900 hover:text-stone-600 transition-colors font-medium"
              >
                {t('home.readMore')} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
