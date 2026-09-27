import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Expertise } from './components/Expertise';
import { Tools } from './components/Tools';
import { Workflow } from './components/Workflow';
import { InternationalExposure } from './components/InternationalExposure';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2800);
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#070a10] text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-400 transition-colors duration-200">
        
        {/* Consistent Global Background Animation */}
        <div className="fixed inset-0 cad-grid-pattern z-0 pointer-events-none" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Hero />
            <About />
            <Experience />
            <Expertise />
            <Workflow />
            <Tools />
            <InternationalExposure />
            <Contact onShowToast={showToast} />
          </main>
          <Footer />
          <Toast message={toastMessage} />
        </div>
      </div>
    </ThemeProvider>
  );
}