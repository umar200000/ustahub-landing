'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe, Phone } from 'lucide-react';

const languages = [
  { code: 'uz', label: "O'zbekcha" },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export default function Header({ settings = {}, lang = 'uz', onLangChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = {
    uz: ['Xizmatlar', 'Qanday ishlaydi', 'Afzalliklar', 'Sharhlar', 'FAQ'],
    ru: ['Услуги', 'Как работает', 'Преимущества', 'Отзывы', 'FAQ'],
    en: ['Services', 'How it works', 'Features', 'Reviews', 'FAQ'],
  };

  const navLinks = ['categories', 'how-it-works', 'features', 'testimonials', 'faq'];
  const items = navItems[lang] || navItems.uz;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Usta<span className="text-primary-500">Hub</span>
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {items.map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${navLinks[i]}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-primary-50 hover:text-primary-600 ${
                    scrolled ? 'text-gray-600' : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone */}
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className={`flex items-center gap-2 text-sm font-medium ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
                  <Phone size={16} />
                  {settings.phone}
                </a>
              )}

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <Globe size={16} />
                  {lang.toUpperCase()}
                  <ChevronDown size={14} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[140px]"
                    >
                      {languages.map(l => (
                        <button
                          key={l.code}
                          onClick={() => { onLangChange?.(l.code); setLangOpen(false); }}
                          className={`w-full px-4 py-2.5 text-sm text-left hover:bg-primary-50 hover:text-primary-600 transition-colors ${
                            lang === l.code ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <motion.a
                href="#download"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                {lang === 'ru' ? 'Скачать' : lang === 'en' ? 'Download' : 'Yuklab olish'}
              </motion.a>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="pt-24 px-6 space-y-2">
              {items.map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${navLinks[i]}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block px-4 py-3.5 text-lg font-medium text-gray-700 rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-all"
                >
                  {item}
                </motion.a>
              ))}
              <div className="pt-6 space-y-3">
                <div className="flex gap-2">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => { onLangChange?.(l.code); setMobileOpen(false); }}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        lang === l.code ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                <a
                  href="#download"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl"
                >
                  {lang === 'ru' ? 'Скачать приложение' : lang === 'en' ? 'Download App' : 'Ilovani yuklab olish'}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
