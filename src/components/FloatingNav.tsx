import React from 'react';
import { Heart } from 'lucide-react';

interface FloatingNavProps {
  activeSection?: string;
}

export const FloatingNav: React.FC<FloatingNavProps> = () => {
  const navItems = [
    { label: '♡', href: '#top', title: 'Top' },
    { label: 'Us', href: '#us', title: 'Us' },
    { label: 'Memories', href: '#memories', title: 'Memories' },
    { label: 'Reasons', href: '#reasons', title: 'Reasons' },
    { label: 'Letter', href: '#letter', title: 'Love Letter' },
    { label: 'Song', href: '#song', title: 'Our Song' },
    { label: 'Wish', href: '#wish', title: 'Make a Wish' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <div className="pointer-events-auto px-4 py-2 rounded-full glass-panel border border-rose-300/20 shadow-2xl flex items-center gap-1 sm:gap-2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            title={item.title}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-300 hover:text-rose-200 hover:bg-white/10 ${
              item.label === '♡' ? 'text-rose-400 font-bold text-sm' : 'text-ivory-200/80 font-light'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
