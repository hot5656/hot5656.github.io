import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, User, Image } from 'lucide-react';
import { supabase, Post } from '../lib/supabase';
import { useLocalePath } from '../hooks/useLocalePath';

export function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const localePath = useLocalePath();

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('roberthut_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from('roberthut_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert(t('admin.deleteFailed'));
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-stone-400">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light">{t('admin.title')}</h1>
        <div className="flex items-center gap-3">
          <Link
            to={localePath('/admin/images')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-md hover:bg-stone-50 transition-colors"
          >
            <Image className="w-4 h-4" />
            {t('admin.manageImages')}
          </Link>
          <Link
            to={localePath('/admin/bio')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-md hover:bg-stone-50 transition-colors"
          >
            <User className="w-4 h-4" />
            {t('admin.editBio')}
          </Link>
          <Link
            to={localePath('/admin/new')}
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('admin.newPost')}
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
          <p className="text-stone-500 mb-6">{t('admin.noPosts')}</p>
          <Link
            to={localePath('/admin/new')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('admin.newPost')}
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  {t('postEditor.title')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  {t('admin.published')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  {t('postEditor.slug')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  {i18n.language === 'zh-TW' ? '建立日期' : 'Created Date'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 tracking-wider">
                  {i18n.language === 'zh-TW' ? '操作' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={localePath(`/post/${post.slug}`)}
                      className="text-stone-900 hover:text-stone-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? t('admin.published') : t('admin.draft')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {post.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {new Date(post.created_at).toLocaleDateString(i18n.language === 'zh-TW' ? 'zh-TW' : 'en-US')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={localePath(`/admin/edit/${post.id}`)}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                        title={t('admin.edit')}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      {deleteConfirm === post.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            {t('common.confirm')} {t('admin.delete')}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 text-sm bg-stone-200 text-stone-700 rounded hover:bg-stone-300 transition-colors"
                          >
                            {t('common.cancel')}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="p-2 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title={t('admin.delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
