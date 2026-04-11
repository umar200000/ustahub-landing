'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Hammer, Car, Settings, Home, GraduationCap, HeartPulse, TrendingUp, Briefcase, ChevronRight, ArrowRight } from 'lucide-react';

const iconMap = {
  building: Hammer,
  car: Car,
  wrench: Settings,
  home: Home,
  book: GraduationCap,
  sparkles: HeartPulse,
  megaphone: TrendingUp,
  scale: Briefcase,
};

const gradients = [
  'from-primary-500 to-teal-500',
  'from-teal-500 to-emerald-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-green-500',
  'from-cyan-500 to-blue-500',
  'from-pink-500 to-rose-500',
  'from-violet-500 to-purple-500',
  'from-slate-500 to-gray-500',
];

export default function Categories({ data = [], lang = 'uz' }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const titles = {
    uz: { title: 'Xizmat turlari', subtitle: 'Sizga kerakli xizmatni oson toping', badge: 'Kategoriyalar' },
    ru: { title: 'Виды услуг', subtitle: 'Легко найдите нужную услугу', badge: 'Категории' },
    en: { title: 'Service types', subtitle: 'Easily find the service you need', badge: 'Categories' },
  };

  const t = titles[lang] || titles.uz;

  return (
    <section id="categories" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background with image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary-100/40 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(2,189,198,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(2,189,198,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-5 border border-primary-100 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            {t.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Hammer;
            const isActive = activeCategory === cat.id;

            return (
              <motion.div
                key={cat.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <motion.div
                  onClick={() => setActiveCategory(isActive ? null : cat.id)}
                  whileHover={{ y: -6 }}
                  className={`relative cursor-pointer rounded-2xl transition-all duration-400 overflow-hidden ${
                    isActive
                      ? 'bg-white shadow-2xl shadow-primary-500/10 ring-2 ring-primary-500/20'
                      : 'bg-white shadow-md shadow-gray-200/60 hover:shadow-xl hover:shadow-gray-200/80'
                  }`}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${gradients[i % gradients.length]} opacity-80`} />

                  <div className="p-5">
                    <div className="flex items-center gap-4 mb-1">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center shadow-lg shadow-primary-500/10 flex-shrink-0`}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-[15px] truncate">
                          {cat[`name_${lang}`] || cat.name_uz}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {cat.subcategories?.length || 0} {lang === 'ru' ? 'услуг' : lang === 'en' ? 'services' : 'xizmat'}
                        </p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive ? 'bg-primary-500 text-white rotate-90' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }`}>
                        <ChevronRight size={16} />
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && cat.subcategories?.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-3 border-t border-gray-100 space-y-1">
                            {cat.subcategories.map((sub, j) => (
                              <motion.div
                                key={sub.id || j}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: j * 0.06 }}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-primary-50 transition-all group/sub cursor-pointer"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover/sub:scale-125 transition-transform" />
                                <span className="text-sm text-gray-600 group-hover/sub:text-primary-600 transition-colors flex-1">
                                  {sub[`name_${lang}`] || sub.name_uz}
                                </span>
                                <ArrowRight size={12} className="text-gray-300 group-hover/sub:text-primary-400 group-hover/sub:translate-x-1 transition-all" />
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
