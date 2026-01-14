import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, isAdmin, user } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">驗證中...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-light text-stone-900 mb-2">無權限訪問</h1>
          <p className="text-stone-600 mb-6">
            {user ? '您沒有管理員權限' : '此頁面僅限管理員訪問，請先登入'}
          </p>
          <div className="flex gap-3 justify-center">
            {!user && (
              <Link
                to="/login"
                className="inline-block px-6 py-2.5 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors"
              >
                前往登入
              </Link>
            )}
            <Link
              to="/"
              className="inline-block px-6 py-2.5 bg-stone-200 text-stone-900 rounded-md hover:bg-stone-300 transition-colors"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
