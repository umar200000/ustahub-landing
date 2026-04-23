'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Smartphone, Bell, Shield, Zap } from 'lucide-react';

export default function AppDownload({ appLinks = [], lang = 'uz' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const titles = {
    uz: {
      title: 'Ilovani yuklab oling',
      subtitle: "Bizning ilovamiz — sizning cho'ntagingizda shaxsiy yordamchi. Istalgan vaqtda, istalgan joyda usta toping.",
      badge: 'Mobil ilova',
      soon: '10-may 2026-dan',
    },
    ru: {
      title: 'Скачайте приложение',
      subtitle: 'Наше приложение — ваш личный помощник в кармане. Найдите мастера в любое время и в любом месте.',
      badge: 'Мобильное приложение',
      soon: 'С 10 мая 2026',
    },
    en: {
      title: 'Download the app',
      subtitle: 'Our app is your personal assistant in your pocket. Find a master anytime, anywhere.',
      badge: 'Mobile app',
      soon: 'From May 10, 2026',
    },
  };

  const t = titles[lang] || titles.uz;

  const scrollToCountdown = (e) => {
    e.preventDefault();
    const el = document.getElementById('launch-countdown');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const benefits = {
    uz: ['Tezkor qidiruv', 'Xavfsiz to\'lov', 'Real-time bildirishnomalar'],
    ru: ['Быстрый поиск', 'Безопасная оплата', 'Уведомления в реальном времени'],
    en: ['Fast search', 'Secure payment', 'Real-time notifications'],
  };

  const b = benefits[lang] || benefits.uz;
  const bIcons = [Zap, Shield, Bell];

  return (
    <section id="download" ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-[#013d40] via-[#015558] to-[#013d40] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-500/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary-400/10 blur-2xl" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.4) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/15 text-primary-300 text-sm font-medium mb-6 border border-primary-500/20"
              >
                <Smartphone size={16} />
                {t.badge}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                {t.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/70 mb-8 max-w-md"
              >
                {t.subtitle}
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                {b.map((benefit, i) => {
                  const BIcon = bIcons[i];
                  return (
                    <div key={i} className="flex items-center gap-2 text-white/80 text-sm">
                      <div className="w-7 h-7 rounded-lg bg-primary-500/20 flex items-center justify-center">
                        <BIcon size={14} className="text-primary-300" />
                      </div>
                      {benefit}
                    </div>
                  );
                })}
              </motion.div>

              {/* Download buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#launch-countdown"
                  onClick={scrollToCountdown}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-accent-500 text-[10px] font-bold text-white shadow-lg">
                    {t.soon}
                  </span>
                  <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500">Download on the</p>
                    <p className="text-sm font-semibold text-gray-900">App Store</p>
                  </div>
                </motion.a>

                <motion.a
                  href="#launch-countdown"
                  onClick={scrollToCountdown}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-lg"
                >
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-accent-500 text-[10px] font-bold text-white shadow-lg">
                    {t.soon}
                  </span>
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4"/>
                    <path d="M17.556 8.222L5.89.95a1.003 1.003 0 00-1.063-.029l9.58 9.58 3.15-2.28z" fill="#EA4335"/>
                    <path d="M17.556 15.778l-3.15-2.28-9.58 9.58c.33.187.737.2 1.063-.029l11.667-7.271z" fill="#34A853"/>
                    <path d="M20.997 12c0-.376-.126-.754-.372-1.063L17.556 8.222l-3.15 2.28 3.15 2.276 3.07-2.715A1.363 1.363 0 0020.996 12z" fill="#FBBC04"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500">GET IT ON</p>
                    <p className="text-sm font-semibold text-gray-900">Google Play</p>
                  </div>
                </motion.a>
              </motion.div>
            </div>

            {/* Right - Two phone mockups with real screenshots */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:flex justify-center items-end"
            >
              <div className="relative flex items-end">
                {/* Phone 1 - Home */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-20"
                >
                  <div className="w-[220px] h-[450px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.4rem] p-[8px] shadow-2xl border border-gray-700/50">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
                      <img src="/images/app-home.jpg" alt="UstaHub Home" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl" />
                  </div>
                </motion.div>

                {/* Phone 2 - Detail */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="relative z-10 -ml-12 mb-8"
                >
                  <div className="w-[200px] h-[400px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2.2rem] p-[7px] shadow-xl border border-gray-600/50">
                    <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-white">
                      <img src="/images/app-detail.jpg" alt="UstaHub Detail" className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-b-xl" />
                  </div>
                </motion.div>

                {/* Glow */}
                <div className="absolute inset-0 -z-10 bg-primary-500/15 blur-[100px] rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
