import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'auto';

interface ThemeState {
  theme: Theme;
  systemPreference: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
}

// Get initial theme from localStorage or default to 'auto'
function getInitialTheme(): Theme {
  if (!browser) return 'auto';
  
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark' || stored === 'auto') {
    return stored;
  }
  return 'auto';
}

// Get system preference
function getSystemPreference(): 'light' | 'dark' {
  if (!browser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Create the theme store
function createThemeStore() {
  const initialTheme = getInitialTheme();
  const systemPreference = getSystemPreference();
  const resolvedTheme = initialTheme === 'auto' ? systemPreference : initialTheme;

  const { subscribe, set, update } = writable<ThemeState>({
    theme: initialTheme,
    systemPreference,
    resolvedTheme
  });

  return {
    subscribe,
    setTheme: (newTheme: Theme) => {
      if (browser) {
        localStorage.setItem('theme', newTheme);
      }
      
      update(state => {
        const resolvedTheme = newTheme === 'auto' ? state.systemPreference : newTheme;
        return {
          ...state,
          theme: newTheme,
          resolvedTheme
        };
      });
    },
    updateSystemPreference: () => {
      const systemPreference = getSystemPreference();
      update(state => ({
        ...state,
        systemPreference,
        resolvedTheme: state.theme === 'auto' ? systemPreference : state.resolvedTheme
      }));
    }
  };
}

export const themeStore = createThemeStore(); 