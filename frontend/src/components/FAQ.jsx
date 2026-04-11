'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus, HelpCircle, MessageCircleQuestion } from 'lucide-react';

export default function FAQ({ data = [], lang = 'uz' }) {
  const [openIndex, setOpenIndex] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const titles = {
    uz: { title: "Ko'p beriladigan savollar", subtitle: "Eng ko'p so'raladigan savollarga javoblar", badge: 'FAQ' },
    ru: { title: 'Часто задаваемые вопросы', subtitle: 'Ответы на самые популярные вопросы', badge: 'FAQ' },
    en: { title: 'Frequently asked questions', subtitle: 'Answers to the most popular questions', badge: 'FAQ' },
  };
  const t = titles[lang] || titles.uz;

  return (
    <section id="faq" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/[0.96] via-[#011f21]/95 to-gray-900/[0.97]" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute -top-20 left-1/3 w-[500px] h-[300px] bg-primary-500/8 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 right-1/4 w-[400px] h-[300px] bg-teal-500/8 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-500/15 text-primary-300 text-sm font-semibold mb-5 border border-primary-500/20"
          >
            <MessageCircleQuestion size={16} />
            {t.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">{t.title}</h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div
                  className={`rounded-2xl border backdrop-blur-xl transition-all duration-400 overflow-hidden ${
                    isOpen
                      ? 'bg-white/[0.1] border-primary-400/30 shadow-lg shadow-primary-500/5'
                      : 'bg-white/[0.05] border-white/10 hover:bg-white/[0.08] hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 sm:px-8 py-6 text-left gap-4"
                  >
                    {/* Number + Question */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isOpen
                          ? 'bg-primary-500 text-white'
                          : 'bg-white/10 text-gray-400'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                        isOpen ? 'text-primary-300' : 'text-white/90'
                      }`}>
                        {item[`question_${lang}`] || item.question_uz}
                      </span>
                    </div>

                    {/* Toggle icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-white/10 text-gray-400 hover:bg-white/15'
                      }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 pl-[4.5rem] sm:pl-20">
                          <div className="border-t border-white/10 pt-4">
                            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                              {item[`answer_${lang}`] || item.answer_uz}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">
            {lang === 'ru' ? 'Не нашли ответ на свой вопрос?' : lang === 'en' ? "Didn't find the answer?" : 'Savolingizga javob topmadingizmi?'}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/35 transition-all"
          >
            <HelpCircle size={18} />
            {lang === 'ru' ? 'Связаться с нами' : lang === 'en' ? 'Contact us' : 'Biz bilan bog\'lanish'}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
