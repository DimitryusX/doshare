import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-cyan-900 dark:from-slate-950 dark:via-indigo-950 dark:to-cyan-950 text-white overflow-hidden">
      {/* Gradient overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-purple-400 to-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Navigation links */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          <Link to="/create" className="text-slate-300 hover:text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:text-shadow-glow">Create store</Link>
          <Link to="/terms-and-conditions" className="text-slate-300 hover:text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:text-shadow-glow">Terms of Service</Link>
          <Link to="/contact" className="text-slate-300 hover:text-white font-medium transition-all duration-300 hover:scale-[1.02] hover:text-shadow-glow">Contact</Link>
          <a
            href="https://www.buymeacoffee.com/dimitryusbn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 hover:from-amber-500 hover:via-orange-600 hover:to-red-600 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25 gap-2"
          >
            <span role="img" aria-label="coffee" className="text-lg">☕</span> 
            <span>Buy me a coffee</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-slate-700/50 pt-6">
          <span className="text-sm text-slate-400">
            © {(new Date()).getFullYear()} <Link to="/" className="hover:text-white font-medium transition-colors bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-indigo-300 hover:via-purple-300 hover:to-cyan-300">DoShare</Link>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}