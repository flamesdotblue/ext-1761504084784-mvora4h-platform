import { Moon, Sun } from 'lucide-react';

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60 bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-purple-600" />
          <span className="font-semibold tracking-tight">PlateForge</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#customizer" className="hover:text-neutral-900 dark:hover:text-neutral-100">Customize</a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100">Pricing</a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text-neutral-100">Support</a>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={onToggleTheme}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
