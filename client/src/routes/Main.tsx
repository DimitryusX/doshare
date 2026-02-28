import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function MainPage() {
  return (
    <>
      <Helmet>
        <title>DO Share your files</title>
        <meta name="description" content="Quickly upload and transfer files with ease using our temporary file sharing service. Secure and simple, share files and text via a unique link. Only those with the link can access your uploaded information. Perfect for colleagues, friends, and clients." />
      </Helmet>

      <div className="relative">
        <div className="m-auto flex flex-col max-w-4xl gap-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-5">
              Fast, Secure & Effortless File Sharing
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-base mb-6 max-w-2xl mx-auto">
              Instantly upload files or text and share them with a single secure link. No registration, no hassle — just simple and private sharing for your everyday needs.
            </p>

            <Link 
              to="/create" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/25 dark:hover:shadow-indigo-900/50 text-base"
            >
              🚀 Create new store
            </Link>
          </div>

          {/* Features Section */}
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent text-center mb-6">
              Why Choose DO Share?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-200">Lightning Fast:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Upload and share files or text in seconds.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-200">Private & Secure:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Only those with your unique link can access your content.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏳</span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-200">Temporary Storage:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Files are automatically deleted after the specified time.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🗑️</span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-200">Complete Data Removal:</strong>
                  <p className="text-slate-600 dark:text-slate-400">When time expires, your data is permanently deleted.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">🖇️</span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-200">Versatile:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Share files, text, or both — perfect for any use case.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <strong className="text-slate-700 dark:text-slate-200">Mobile Friendly:</strong>
                  <p className="text-slate-600 dark:text-slate-400">Fully responsive and easy to use on any device.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 p-4 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-cyan-50/50 dark:from-indigo-900/50 dark:via-purple-900/50 dark:to-cyan-900/50 rounded-xl border border-indigo-200/30 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-400 text-base">
                <strong className="text-slate-700 dark:text-slate-200">🆓 No Registration:</strong> Start sharing instantly, no sign-up required.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-3">
                Take control of your file and text sharing. Your data's privacy is guaranteed — we don't keep anything longer than you specify, and once deleted, it's gone forever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

