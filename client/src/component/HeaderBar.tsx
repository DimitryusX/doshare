import { Link } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function HeaderBar() {
  return (
    <header className="relative bg-gradient-to-r from-white/95 via-indigo-50/90 to-cyan-50/95 dark:from-slate-950 dark:via-indigo-950/95 dark:to-cyan-950/95 border-b border-indigo-200/50 dark:border-slate-800/50 backdrop-blur-lg sticky top-0 z-50 shadow-lg shadow-indigo-500/20 dark:shadow-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <div className="transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Logo />
            </div>
            <h1 className="text-2xl ml-3 font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-blue-600 dark:group-hover:from-purple-400 dark:group-hover:via-indigo-400 dark:group-hover:to-blue-400 transition-all duration-500">
              DoShare
            </h1>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
