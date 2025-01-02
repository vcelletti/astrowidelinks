import React, { useEffect, useState } from 'react';

/* Sun Icon */
function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      fill="none"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
      />
    </svg>
  );
}

/* Moon Icon */
function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  // Track whether we’re mounted, to avoid mismatch between SSR & client
  const [mounted, setMounted] = useState(false);
  // Track the current theme, 'light' or 'dark'
  const [resolvedTheme, setResolvedTheme] = useState('light');

  useEffect(() => {
    setMounted(true); // we are now in the client
    // Check localStorage or OS preference:
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setResolvedTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setResolvedTheme('light');
    }
  }, []);

  // Switch theme
  function handleClick() {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setResolvedTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle('dark');
  }

  const otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const label = mounted
    ? `Switch to ${otherTheme} theme`
    : 'Toggle theme';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleClick}
      className="group rounded-full px-2.5 py-2.5 bg-white dark:bg-zinc-900 ring-1 ring-zinc-300 dark:ring-zinc-700 shadow hover:shadow-md"
    >
      {/* Sun icon (visible in light mode, hidden in dark mode) */}
      <SunIcon
        className={`h-5 w-5 stroke-zinc-600 fill-zinc-50 hover:stroke-black 
        ${resolvedTheme === 'dark' ? 'hidden' : 'block'}`}
      />

      {/* Moon icon (visible in dark mode, hidden in light mode) */}
      <MoonIcon
        className={`h-5 w-5 fill-zinc-300 hover:fill-white transition
        ${resolvedTheme === 'dark' ? 'block' : 'hidden'}`}
      />
    </button>
  );
}
