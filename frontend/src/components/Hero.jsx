'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, CheckCircle2, ShieldCheck, Smartphone } from 'lucide-react';

function t(obj, lang) {
  return obj?.[`title_${lang}`] || obj?.[`title_uz`] || '';
}
function s(obj, lang) {
  return obj?.[`subtitle_${lang}`] || obj?.[`subtitle_uz`] || '';
}
function b(obj, lang) {
  return obj?.[`button_text_${lang}`] || obj?.[`button_text_uz`] || '';
}

export default function Hero({ data = {}, lang = 'uz' }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#013d40] to-gray-950" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-500/15 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary-400/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-3xl"
        />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              {lang === 'ru' ? '12,500+ активных мастеров' : lang === 'en' ? '12,500+ active masters' : '12,500+ faol ustalar'}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {t(data, lang) || (lang === 'ru'
                ? <>Найдите надёжных <span className="text-primary-400">мастеров</span> для любых услуг</>
                : lang === 'en'
                  ? <>Find trusted <span className="text-primary-400">masters</span> for any service</>
                  : <>Barcha xizmatlar uchun ishonchli <span className="text-primary-400">ustalarni</span> toping</>)}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl"
            >
              {s(data, lang) || (lang === 'ru'
                ? 'UstaHub — тысячи профессиональных мастеров в одном месте.'
                : lang === 'en'
                  ? 'UstaHub — thousands of professional masters in one place.'
                  : "UstaHub — minglab professional ustalar bir joyda. Qurilishdan go'zallikkacha, barcha xizmatlarni oson buyurtma qiling.")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a
                href="#download"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
              >
                <Smartphone size={18} />
                {b(data, lang) || (lang === 'ru' ? 'Скачать приложение' : lang === 'en' ? 'Download app' : 'Ilovani yuklab olish')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Play size={18} className="fill-current" />
                {lang === 'ru' ? 'Как это работает' : lang === 'en' ? 'How it works' : 'Qanday ishlaydi'}
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary-400" />
                {lang === 'ru' ? 'Проверенные мастера' : lang === 'en' ? 'Verified masters' : 'Tekshirilgan ustalar'}
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-accent-400 fill-accent-400" />
                4.9 {lang === 'ru' ? 'рейтинг' : lang === 'en' ? 'rating' : 'reyting'}
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary-400" />
                50,000+ {lang === 'ru' ? 'пользователей' : lang === 'en' ? 'users' : 'foydalanuvchilar'}
              </div>
            </motion.div>
          </div>

          {/* Right - Two Phone mockups with real screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-end"
          >
            <div className="relative flex items-end gap-0">
              {/* Phone 1 - Home screen (front, larger) */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20"
              >
                <div className="w-[260px] h-[530px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.8rem] p-[10px] shadow-2xl border border-gray-700/50">
                  <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-white">
                    <img
                      src="/images/app-home.jpg"
                      alt="UstaHub Home"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-gray-900 rounded-b-2xl" />
                </div>
              </motion.div>

              {/* Phone 2 - Detail screen (behind, offset) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="relative z-10 -ml-16 mb-6"
              >
                <div className="w-[230px] h-[470px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2.5rem] p-[9px] shadow-xl border border-gray-600/50 opacity-95">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
                    <img
                      src="/images/app-detail.jpg"
                      alt="UstaHub Detail"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl" />
                </div>
              </motion.div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-20 top-20 bg-white rounded-2xl p-4 shadow-2xl z-30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">
                      {lang === 'ru' ? 'Заказ принят!' : lang === 'en' ? 'Order accepted!' : 'Buyurtma qabul qilindi!'}
                    </p>
                    <p className="text-[10px] text-gray-400">2 {lang === 'ru' ? 'мин назад' : lang === 'en' ? 'min ago' : 'daqiqa oldin'}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute right-0 bottom-24 bg-white rounded-2xl p-4 shadow-2xl z-30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-accent-50 flex items-center justify-center">
                    <Star size={16} className="text-accent-500 fill-accent-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">4.9 / 5.0</p>
                    <p className="text-[10px] text-gray-400">
                      {lang === 'ru' ? '2,500+ оценок' : lang === 'en' ? '2,500+ ratings' : '2,500+ baho'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Glow behind phones */}
              <div className="absolute inset-0 -z-10 bg-primary-500/15 blur-[120px] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.8C384 29 480 34 576 41.2C672 48.3 768 57.7 864 55.8C960 54 1056 41 1152 36.2C1248 31.3 1344 34.7 1392 36.3L1440 38V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="#0a1a1b"/>
        </svg>
      </div>
    </section>
  );
}
