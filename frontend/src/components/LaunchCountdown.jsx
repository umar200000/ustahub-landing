'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Calendar, Bell } from 'lucide-react';

const LAUNCH_DATE = new Date('2026-05-10T00:00:00+05:00').getTime();

function getTimeLeft() {
  const diff = LAUNCH_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, launched: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    launched: false,
  };
}

const copy = {
  uz: {
    badge: "Tez kunda ishga tushamiz",
    title: 'Ilova 10-may 2026-yildan ishlay boshlaydi',
    subtitle: "UstaHub ilovasi rasmiy ravishda 10-may kuni ishga tushadi. Shu sanadan boshlab siz ilovani App Store va Google Play'dan yuklab olib, eng yaxshi ustalarni toposiz.",
    days: 'Kun',
    hours: 'Soat',
    minutes: 'Daqiqa',
    seconds: 'Soniya',
    launched: 'UstaHub ishga tushdi! 🎉',
    date: '10-may 2026',
  },
  ru: {
    badge: 'Скоро запуск',
    title: 'Приложение запускается 10 мая 2026 года',
    subtitle: 'Приложение UstaHub официально запускается 10 мая. С этого дня вы сможете скачать его в App Store и Google Play и найти лучших мастеров.',
    days: 'Дней',
    hours: 'Часов',
    minutes: 'Минут',
    seconds: 'Секунд',
    launched: 'UstaHub запущен! 🎉',
    date: '10 мая 2026',
  },
  en: {
    badge: 'Launching soon',
    title: 'The app launches on May 10, 2026',
    subtitle: 'UstaHub officially launches on May 10. From that day, download it from the App Store and Google Play to find the best masters around you.',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    launched: 'UstaHub is live! 🎉',
    date: 'May 10, 2026',
  },
};

export default function LaunchCountdown({ lang = 'uz' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, launched: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = copy[lang] || copy.uz;

  const units = [
    { value: time.days, label: t.days },
    { value: time.hours, label: t.hours },
    { value: time.minutes, label: t.minutes },
    { value: time.seconds, label: t.seconds },
  ];

  return (
    <section id="launch-countdown" ref={ref} className="relative py-20 bg-gradient-to-br from-[#013d40] via-[#015558] to-[#02BDC6] overflow-hidden scroll-mt-20">
      {/* Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-400/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl"
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium mb-6 border border-white/25 backdrop-blur-sm"
        >
          <Rocket size={16} />
          {t.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-white/80 mb-12 max-w-2xl mx-auto"
        >
          {t.subtitle}
        </motion.p>

        {time.launched ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-8 py-6 bg-white/15 backdrop-blur-md rounded-3xl border border-white/25"
          >
            <p className="text-3xl sm:text-4xl font-bold text-white">{t.launched}</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-3xl mx-auto mb-10"
          >
            {units.map((u, i) => (
              <motion.div
                key={u.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 shadow-2xl hover:bg-white/15 transition-colors">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tabular-nums tracking-tight">
                    {mounted ? String(u.value).padStart(2, '0') : '--'}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium mt-2 uppercase tracking-wider">
                    {u.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/80"
        >
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-white" />
            <span className="font-medium">{t.date}</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-white" />
            <span>App Store · Google Play</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
