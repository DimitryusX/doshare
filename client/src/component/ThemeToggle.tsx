import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const themes: { value: 'light' | 'dark' | 'auto'; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'auto', label: 'Auto', icon: '💻' },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/20 transition-colors text-slate-900 dark:text-slate-50"
        aria-label="Toggle theme"
        title={`Current theme: ${currentTheme.label}`}
      >
        <span className="text-xl">{currentTheme.icon}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-lg shadow-lg z-50 overflow-hidden">
          {themes.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => {
                setTheme(t.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors ${
                theme === t.value
                  ? 'bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
              {theme === t.value && (
                <span className="ml-auto text-indigo-600 dark:text-indigo-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

