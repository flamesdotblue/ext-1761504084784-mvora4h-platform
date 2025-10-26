import { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PlateCustomizer from './components/PlateCustomizer';
import CarScene from './components/CarScene';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [plateType, setPlateType] = useState('AL'); // 'AL' | 'UK'
  const [plateText, setPlateText] = useState('AB123CD');
  const [side, setSide] = useState('front'); // 'front' | 'rear'

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 transition-colors">
      <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <HeroSection onStart={() => {
          const el = document.getElementById('customizer');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        <section id="customizer" className="relative py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PlateCustomizer
              plateType={plateType}
              setPlateType={setPlateType}
              plateText={plateText}
              setPlateText={setPlateText}
              side={side}
              setSide={setSide}
            />
            <CarScene plateType={plateType} plateText={plateText} side={side} />
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 py-8">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Custom Plates — Albania & UK</p>
          <a href="#customizer" className="hover:text-neutral-900 dark:hover:text-neutral-200">Start customizing</a>
        </div>
      </footer>
    </div>
  );
}
