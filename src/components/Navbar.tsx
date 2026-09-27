import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#expertise' },
  { label: 'Lifecycle', href: '#workflow' },
  { label: 'Software', href: '#software' },
  { label: 'Global', href: '#exposure' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mailtoLink = "mailto:facilityvivekkushwaha@gmail.com?subject=Project%20Inquiry%20-%20BIM%20Coordination&body=Hi%20Vivek,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20potential%20collaboration...%0D%0A%0D%0AThank%20you.";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${isScrolled ? 'bg-white/95 dark:bg-[#070a10]/95 backdrop-blur-md border-slate-200 dark:border-slate-800' : 'bg-white/80 dark:bg-[#070a10]/80 backdrop-blur-sm border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Full Name Updated */}
        <a href="#" className="font-extrabold tracking-widest text-slate-900 dark:text-white text-sm sm:text-base">
          VIVEK KUSHWAHA
        </a>

        <nav className="hidden lg:flex gap-6 text-xs font-semibold uppercase tracking-wider">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">{link.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Removed Theme Toggle Button */}
          
          <a href={mailtoLink} className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase text-slate-950 bg-sky-400 hover:bg-sky-300">
            Let's Talk <ArrowUpRight className="w-3 h-3" />
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};