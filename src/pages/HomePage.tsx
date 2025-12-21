import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { supabase, Post } from '../lib/supabase';

export function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="text-stone-400">載入中...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-4">最新文章</h1>
        <p className="text-lg text-stone-600">思考、故事與靈感</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
          <h2 className="text-2xl font-light text-stone-400 mb-4">還沒有文章</h2>
          <p className="text-stone-500 mb-8">開始創作你的第一篇文章吧</p>
          <Link
            to="/admin/new"
            className="inline-block px-6 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            新增文章
          </Link>
        </div>
      ) : (
        <div></div>
      )}

      <div className="space-y-12">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group border-b border-stone-200 pb-12 last:border-0"
          >
            {post.cover_image_url && (
              <Link to={`/post/${post.slug}`}>
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-lg mb-6 group-hover:opacity-90 transition-opacity"
                />
              </Link>
            )}

            <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
              <time className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('zh-TW', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>

              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-stone-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to={`/post/${post.slug}`}>
              <h2 className="text-3xl font-light mb-3 group-hover:text-stone-600 transition-colors">
                {post.title}
              </h2>
            </Link>

            {post.excerpt && (
              <p className="text-stone-600 leading-relaxed mb-4">
                {post.excerpt}
              </p>
            )}

            <Link
              to={`/post/${post.slug}`}
              className="inline-block text-sm text-stone-900 hover:text-stone-600 transition-colors"
            >
              閱讀全文 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
