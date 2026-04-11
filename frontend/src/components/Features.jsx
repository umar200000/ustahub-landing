'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, BadgeCheck, Wallet, Headset, Tag, Zap, CheckCircle2 } from 'lucide-react';

const iconMap = {
  'shield-check': ShieldCheck,
  'badge-check': BadgeCheck,
  'credit-card': Wallet,
  'headphones': Headset,
  'tag': Tag,
  'zap': Zap,
};

const cardAccents = [
  { gradient: 'from-primary-500 to-teal-500', bg: 'bg-primary-500', light: 'from-primary-500/10 to-teal-500/5' },
  { gradient: 'from-emerald-500 to-green-500', bg: 'bg-emerald-500', light: 'from-emerald-500/10 to-green-500/5' },
  { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-500', light: 'from-amber-500/10 to-orange-500/5' },
  { gradient: 'from-violet-500 to-purple-500', bg: 'bg-violet-500', light: 'from-violet-500/10 to-purple-500/5' },
  { gradient: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500', light: 'from-cyan-500/10 to-blue-500/5' },
  { gradient: 'from-rose-500 to-pink-500', bg: 'bg-rose-500', light: 'from-rose-500/10 to-pink-500/5' },
];

export default function Features({ data = [], lang = 'uz' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const titles = {
    uz: { title: 'Nega aynan UstaHub?', subtitle: 'Bizni boshqalardan ajratib turadigan afzalliklarimiz', badge: 'Afzalliklar' },
    ru: { title: 'Почему именно UstaHub?', subtitle: 'Наши преимущества, которые выделяют нас', badge: 'Преимущества' },
    en: { title: 'Why choose UstaHub?', subtitle: 'Our advantages that set us apart', badge: 'Advantages' },
  };
  const t = titles[lang] || titles.uz;

  return (
    <section id="features" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/[0.97] via-[#012d30]/95 to-gray-900/[0.97]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(2,189,198,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(2,189,198,0.4) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary-500/15 text-primary-300 text-sm font-semibold mb-5 border border-primary-500/20"
          >
            <CheckCircle2 size={16} />
            {t.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">{t.title}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((feature, i) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            const accent = cardAccents[i % cardAccents.length];

            return (
              <motion.div
                key={feature.id || i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative bg-white/[0.06] backdrop-blur-xl rounded-2xl p-7 border border-white/10 hover:border-primary-400/25 transition-all duration-500 overflow-hidden h-full">
                  {/* Hover gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent.light} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  {/* Left accent line */}
                  <div className={`absolute top-6 bottom-6 left-0 w-[3px] bg-gradient-to-b ${accent.gradient} rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <Icon size={26} className="text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                      {feature[`title_${lang}`] || feature.title_uz}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {feature[`description_${lang}`] || feature.description_uz}
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
