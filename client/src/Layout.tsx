import { Outlet } from 'react-router-dom';
import HeaderBar from './component/HeaderBar';
import Footer from './component/Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex flex-col relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-300 dark:from-purple-900 dark:to-blue-900 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-200 to-indigo-300 dark:from-cyan-900 dark:to-indigo-900 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-300 dark:from-blue-900 dark:to-purple-900 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <HeaderBar />
      <main className="flex-1 relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}