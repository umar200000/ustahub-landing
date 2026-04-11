'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { UserCheck, ThumbsUp, CalendarCheck2, Layers } from 'lucide-react';

const iconMap = {
  users: UserCheck,
  heart: ThumbsUp,
  clipboard: CalendarCheck2,
  grid: Layers,
};

function parseNumber(val) {
  const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
}

function getSuffix(val) {
  if (val.includes('%')) return '%';
  if (val.includes('+')) return '+';
  return '';
}

export default function Stats({ data = [], lang = 'uz' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative py-20 -mt-1 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-[#013d40]/90 to-gray-900/95" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-400/15 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/15 text-primary-300 text-sm font-semibold mb-4 border border-primary-500/20">
            {lang === 'ru' ? 'Наши достижения' : lang === 'en' ? 'Our achievements' : 'Bizning yutuqlarimiz'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {lang === 'ru' ? 'Цифры говорят сами за себя' : lang === 'en' ? 'Numbers speak for themselves' : 'Raqamlar o\'zi gapiradi'}
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {lang === 'ru' ? 'Тысячи довольных клиентов доверяют нам каждый день' : lang === 'en' ? 'Thousands of satisfied clients trust us every day' : 'Minglab mamnun mijozlar har kuni bizga ishonadi'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.map((stat, i) => {
            const Icon = iconMap[stat.icon] || UserCheck;

            return (
              <motion.div
                key={stat.id || i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative group"
              >
                <div className="relative bg-white/[0.07] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-primary-400/30 transition-all duration-500 overflow-hidden text-center">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Top line accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-400/10 flex items-center justify-center mx-auto mb-5 border border-primary-400/20 group-hover:border-primary-400/40 transition-colors duration-300"
                    >
                      <Icon size={28} className="text-primary-400 group-hover:text-primary-300 transition-colors" />
                    </motion.div>

                    {/* Number */}
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                      {inView ? (
                        <>
                          <CountUp end={parseNumber(stat.value)} duration={2.5} separator="," />
                          <span className="text-primary-400">{getSuffix(stat.value)}</span>
                        </>
                      ) : '0'}
                    </div>

                    {/* Label */}
                    <p className="text-sm sm:text-base font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
                      {stat[`label_${lang}`] || stat.label_uz}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
