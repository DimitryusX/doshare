import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@fontsource-variable/montserrat';
import './index.scss'

// Initialize theme before rendering
const THEME_STORAGE_KEY = 'doshare-theme';
const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'auto';
const html = document.documentElement;

if (storedTheme === 'dark') {
  html.classList.add('dark');
} else if (storedTheme === 'light') {
  html.classList.remove('dark');
} else {
  // auto mode - use system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
