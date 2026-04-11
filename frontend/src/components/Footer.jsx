'use client';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowUp, Send } from 'lucide-react';

export default function Footer({ settings = {}, appLinks = [], lang = 'uz' }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = {
    uz: {
      company: { title: 'Kompaniya', items: ['Biz haqimizda', 'Qanday ishlaydi', 'Blog', 'Bog\'lanish'] },
      services: { title: 'Xizmatlar', items: ['Qurilish', 'Avto xizmatlar', 'Texnika', 'Go\'zallik'] },
      support: { title: 'Yordam', items: ['FAQ', 'Qoidalar', 'Maxfiylik', 'Aloqa'] },
    },
    ru: {
      company: { title: 'Компания', items: ['О нас', 'Как работает', 'Блог', 'Связаться'] },
      services: { title: 'Услуги', items: ['Строительство', 'Авто услуги', 'Техника', 'Красота'] },
      support: { title: 'Помощь', items: ['FAQ', 'Правила', 'Конфиденциальность', 'Контакты'] },
    },
    en: {
      company: { title: 'Company', items: ['About us', 'How it works', 'Blog', 'Contact'] },
      services: { title: 'Services', items: ['Construction', 'Auto services', 'Tech', 'Beauty'] },
      support: { title: 'Support', items: ['FAQ', 'Terms', 'Privacy', 'Contact'] },
    },
  };

  const links = footerLinks[lang] || footerLinks.uz;

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary-500 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="relative -mt-0 pt-16 pb-12 border-b border-gray-800">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                {lang === 'ru' ? 'Готовы начать?' : lang === 'en' ? 'Ready to start?' : 'Boshlashga tayyormisiz?'}
              </h3>
              <p className="text-gray-400">
                {lang === 'ru'
                  ? 'Присоединяйтесь к тысячам довольных клиентов'
                  : lang === 'en'
                    ? 'Join thousands of satisfied customers'
                    : 'Minglab mamnun mijozlarga qo\'shiling'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <motion.a
                href="#download"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30"
              >
                {lang === 'ru' ? 'Скачать приложение' : lang === 'en' ? 'Download app' : 'Ilovani yuklab olish'}
              </motion.a>
              <motion.a
                href={settings.telegram || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/20 transition-colors"
              >
                <Send size={18} />
                Telegram
              </motion.a>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="UstaHub" className="w-10 h-10 rounded-xl object-contain" />
              <span className="text-xl font-bold">Usta<span className="text-primary-400">Hub</span></span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              {lang === 'ru'
                ? 'Платформа для поиска надёжных мастеров. Все услуги в одном месте.'
                : lang === 'en'
                  ? 'Platform for finding reliable masters. All services in one place.'
                  : 'Ishonchli ustalarni topish uchun platforma. Barcha xizmatlar bir joyda.'}
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {settings.phone && (
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <Phone size={16} className="text-primary-400" />
                  {settings.phone}
                </a>
              )}
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <Mail size={16} className="text-primary-400" />
                  {settings.email}
                </a>
              )}
              {settings[`address_${lang}`] && (
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <MapPin size={16} className="text-primary-400" />
                  {settings[`address_${lang}`]}
                </div>
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(links).map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} UstaHub. {lang === 'ru' ? 'Все права защищены.' : lang === 'en' ? 'All rights reserved.' : 'Barcha huquqlar himoyalangan.'}
          </p>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {settings.telegram && (
              <a href={settings.telegram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-500/20 flex items-center justify-center text-gray-400 hover:text-primary-400 transition-all">
                <Send size={16} />
              </a>
            )}
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-pink-500/20 flex items-center justify-center text-gray-400 hover:text-pink-400 transition-all">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-500/20 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            )}
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-500 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
