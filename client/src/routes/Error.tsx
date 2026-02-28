import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title>DO Share | 404</title>
      </Helmet>

      <div className="relative">
        <div className="p-6 max-w-2xl m-auto">
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-3">
              404
            </h1>
            
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Page Not Found
            </h2>
            
            <p className="text-slate-600 dark:text-slate-300 text-base mb-6">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/25 dark:hover:shadow-indigo-900/50"
              >
                🏠 Go Home
              </Link>
              
              <Link 
                to="/create" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border border-slate-300 dark:border-slate-600"
              >
                🚀 Create Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
