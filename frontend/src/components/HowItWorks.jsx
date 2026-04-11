'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, UserCheck, CalendarRange, Award } from 'lucide-react';

const iconMap = {
  'search': Search,
  'user-check': UserCheck,
  'calendar': CalendarRange,
  'star': Award,
};

const stepColors = [
  { bg: 'bg-primary-500', light: 'bg-primary-50', text: 'text-primary-500', ring: 'ring-primary-200' },
  { bg: 'bg-teal-500', light: 'bg-teal-50', text: 'text-teal-500', ring: 'ring-teal-200' },
  { bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-500', ring: 'ring-amber-200' },
  { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-500', ring: 'ring-emerald-200' },
];

export default function HowItWorks({ data = [], lang = 'uz' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const titles = {
    uz: { title: 'Bu qanday ishlaydi?', subtitle: 'Atigi 4 oson qadamda kerakli ustani toping' },
    ru: { title: 'Как это работает?', subtitle: 'Найдите нужного мастера всего за 4 простых шага' },
    en: { title: 'How does it work?', subtitle: 'Find the right master in just 4 easy steps' },
  };

  const t = titles[lang] || titles.uz;

  return (
    <section id="how-it-works" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
            {lang === 'ru' ? 'Процесс' : lang === 'en' ? 'Process' : 'Jarayon'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary-200 via-teal-200 via-amber-200 to-emerald-200" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.map((step, i) => {
              const Icon = iconMap[step.icon] || Search;
              const colors = stepColors[i % stepColors.length];

              return (
                <motion.div
                  key={step.id || i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center group"
                >
                  {/* Step number & icon */}
                  <div className="relative inline-flex mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-20 h-20 rounded-3xl ${colors.light} flex items-center justify-center ring-4 ${colors.ring} relative z-10 group-hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon size={32} className={colors.text} />
                    </motion.div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 ${colors.bg} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg z-20`}>
                      {step.step_number || i + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step[`title_${lang}`] || step.title_uz}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {step[`description_${lang}`] || step.description_uz}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
