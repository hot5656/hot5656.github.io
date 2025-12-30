import { Link, Outlet } from 'react-router-dom';
import { BookOpen, Home, Settings, User } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-stone-800 to-stone-600 p-2.5 rounded-lg shadow-md group-hover:shadow-lg transition-shadow">
              <BookOpen className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight text-stone-900">
                Robert hut
              </span>
              <span className="text-xs text-stone-500 tracking-wide">
                創作者的小屋
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              <span>首頁</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              <User className="w-4 h-4" />
              <span>關於我</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} Robert hut. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-stone-900 transition-colors">Twitter</a>
              <a href="#" className="hover:text-stone-900 transition-colors">GitHub</a>
              <a href="#" className="hover:text-stone-900 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
