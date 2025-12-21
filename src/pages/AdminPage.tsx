import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, User, Image } from 'lucide-react';
import { supabase, Post } from '../lib/supabase';

export function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
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
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPosts(posts.filter(post => post.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-light">內容管理</h1>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/images"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-md hover:bg-stone-50 transition-colors"
          >
            <Image className="w-4 h-4" />
            圖片庫
          </Link>
          <Link
            to="/admin/bio"
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-md hover:bg-stone-50 transition-colors"
          >
            <User className="w-4 h-4" />
            編輯自我介紹
          </Link>
          <Link
            to="/admin/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增文章
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-stone-200">
          <p className="text-stone-500 mb-6">還沒有文章，開始創作第一篇吧！</p>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            新增文章
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  標題
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  狀態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  網址代碼
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 tracking-wider">
                  建立日期
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      to={`/post/${post.slug}`}
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
                      {post.published ? '已發布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {post.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {new Date(post.created_at).toLocaleDateString('zh-TW')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/edit/${post.id}`}
                        className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                        title="編輯"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>

                      {deleteConfirm === post.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          >
                            確認刪除
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1 text-sm bg-stone-200 text-stone-700 rounded hover:bg-stone-300 transition-colors"
                          >
                            取消
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="p-2 text-stone-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="刪除"
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
