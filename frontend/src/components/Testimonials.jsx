'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, MessageSquare } from 'lucide-react';

export default function Testimonials({ data = [], lang = 'uz' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const titles = {
    uz: { title: 'Mijozlar fikrlari', subtitle: 'Bizning xizmatimizdan foydalangan mijozlar nima deydi' },
    ru: { title: 'Отзывы клиентов', subtitle: 'Что говорят клиенты о нашем сервисе' },
    en: { title: 'Client reviews', subtitle: 'What clients say about our service' },
  };
  const t = titles[lang] || titles.uz;

  const avatarColors = ['bg-blue-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500', 'bg-rose-500', 'bg-cyan-500'];

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
            <MessageSquare size={16} />
            {lang === 'ru' ? 'Отзывы' : lang === 'en' ? 'Reviews' : 'Sharhlar'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((review, i) => (
            <motion.div
              key={review.id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-primary-100 mb-4 group-hover:text-primary-200 transition-colors" />

              {/* Comment */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                &ldquo;{review[`comment_${lang}`] || review.comment_uz}&rdquo;
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">({review.review_count})</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
                    {review.client_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.client_name}</p>
                    <p className="text-xs text-gray-400">
                      {lang === 'ru' ? 'Мастер:' : lang === 'en' ? 'Master:' : 'Usta:'} {review.master_name}
                    </p>
                  </div>
                </div>
                {review.price && (
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {review.price}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
