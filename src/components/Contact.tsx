import React from 'react';
import { Mail, Phone, MapPin, Copy } from 'lucide-react';

interface ContactProps {
  onShowToast: (message: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ onShowToast }) => {
  const email = 'facilityvivekkushwaha@gmail.com';
  const phone = '+91-7296074280';
  
  // Custom Pre-filled Email Template
  const mailtoLink = `mailto:${email}?subject=Project%20Inquiry%20-%20BIM%20Coordination&body=Hi%20Vivek,%0D%0A%0D%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20collaboration%20regarding%20BIM/CAD%20services.%0D%0A%0D%0AProject%20Details:%0D%0A-%20...%0D%0A%0D%0AThanks.`;

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copied to clipboard`);
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
        <div className="flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>07</span><span className="w-8 h-px bg-sky-500/50" /><span>Contact</span>
        </div>

        {/* Increased Heading Size */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-12">
          Ready to Coordinate?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {/* Email via pre-filled mailto */}
          <div className="p-6 bg-white dark:bg-[#0e131f] border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:border-sky-500/50 transition-colors">
            <Mail className="w-6 h-6 text-sky-500 mb-3" />
            <span className="text-xs font-mono text-slate-500 uppercase mb-2 font-bold">Email</span>
            <a href={mailtoLink} className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-500 truncate w-full mb-3">
              {email}
            </a>
            <button onClick={() => copyText(email)} className="text-[10px] uppercase font-bold text-slate-500 hover:text-sky-500 flex items-center gap-1 bg-slate-100 dark:bg-[#070a10] px-3 py-1.5 rounded-full">
              Copy <Copy className="w-3 h-3" />
            </button>
          </div>

          {/* Phone */}
          <div className="p-6 bg-white dark:bg-[#0e131f] border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center hover:border-sky-500/50 transition-colors">
            <Phone className="w-6 h-6 text-sky-500 mb-3" />
            <span className="text-xs font-mono text-slate-500 uppercase mb-2 font-bold">Phone</span>
            <a href={`tel:${phone.replace(/-/g, '')}`} className="text-sm font-bold text-slate-900 dark:text-white hover:text-sky-500 truncate w-full mb-3">
              {phone}
            </a>
            <button onClick={() => copyText(phone)} className="text-[10px] uppercase font-bold text-slate-500 hover:text-sky-500 flex items-center gap-1 bg-slate-100 dark:bg-[#070a10] px-3 py-1.5 rounded-full">
              Copy <Copy className="w-3 h-3" />
            </button>
          </div>

          {/* Location */}
          <div className="p-6 bg-white dark:bg-[#0e131f] border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center">
            <MapPin className="w-6 h-6 text-sky-500 mb-3" />
            <span className="text-xs font-mono text-slate-500 uppercase mb-2 font-bold">Location</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              New Delhi, India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};