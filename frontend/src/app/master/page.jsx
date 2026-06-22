'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HardHat, Star, Coins, PlayCircle, Calendar, Users,
  Fingerprint, UserCog, Camera, PackageCheck, ShoppingBag, ImagePlus, UserCheck,
  Rocket, ShieldCheck, CheckCircle2, Zap, Handshake, Gift, Timer,
  BookOpen, Video, Newspaper, ChevronRight, Wrench, Sparkles, Paintbrush, Hammer,
  Car, Sofa, Package, Plus, Minus, ArrowLeft, Send, Home,
} from 'lucide-react';

// App store links (UstaHub Pro — the master app)
const APP_IOS = 'https://apps.apple.com/us/app/ustahub-pro/id6767654801';
const APP_ANDROID = 'https://play.google.com/store/apps/details?id=net.ustahub.master';

// Reusable App Store + Google Play download buttons
function StoreButtons({ className = '' }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <motion.a
        href={APP_IOS}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-lg"
      >
        <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
        <div className="text-left">
          <p className="text-[10px] text-gray-500">Download on the</p>
          <p className="text-sm font-semibold text-gray-900">App Store</p>
        </div>
      </motion.a>
      <motion.a
        href={APP_ANDROID}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-lg"
      >
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
    </div>
  );
}

// ─── Data (text identical to reference, design is ours) ──────────────────────

const steps = [
  { icon: Fingerprint, title: "myID dan o'ting", desc: 'Shaxsingizni myID orqali tez va xavfsiz tasdiqlang.' },
  { icon: UserCog, title: "Profilni to'ldiring", desc: "Tajriba, foto, xizmatlar va ish hududlarini qo'shing." },
  { icon: Camera, title: "Ish fotolarini qo'shing", desc: "Portfolioyingizni ko'rsating — ko'proq ishonch, ko'proq buyurtma." },
  { icon: PackageCheck, title: 'Birinchi buyurtmalarni oling', desc: "Moderatsiyadan keyin buyurtma olib, token to'plashni boshlang." },
];

const tokenRows = [
  { icon: Coins, title: 'Profil uchun bonus', desc: "Usta profilini ajratib ko'rsatish uchun bonus", amount: '+150' },
  { icon: UserCheck, title: "To'ldirilgan profil", desc: "Profil 80% gacha to'ldirilgandan so'ng", amount: '+40' },
  { icon: ImagePlus, title: 'Ish fotolari', desc: "Ish fotolari yuklangandan so'ng (kamida 3 ta)", amount: '+30' },
  { icon: ShoppingBag, title: 'Birinchi buyurtmalar', desc: "Birinchi 3 ta buyurtmadan so'ng", amount: '+30' },
];

const deadlineFeats = [
  { icon: Rocket, text: 'Ishga tushishga tayyor profil' },
  { icon: ShieldCheck, text: "Ko'proq ishonch va buyurtma" },
  { icon: Users, text: 'UstaHub ustalarining birinchi to\'lqini' },
  { icon: Coins, text: "250 token boshlang'ich bonus" },
];

const tokenInfo = [
  'Token — bu ustaning ichki valyutasi',
  'Pullik arizalar va premium xizmatlarda yechiladi',
  "Ular buyurtmalarni targ'ib qilish uchun kerak",
  "Agar sarflab, aloqa chiqmasa — qo'llab-quvvatlash xizmati yordam beradi",
  'Pullik arizalarda yechib olinadi',
];

const guides = [
  { icon: BookOpen, title: "Mini-qo'llanmalar va maslahatlar", desc: 'Foydali materiallar va tavsiyalar' },
  { icon: Zap, title: 'Tezkor Xizmat', desc: 'Shoshilinch arizalarni qanday tez qabul qilish' },
  { icon: Video, title: 'Bepul darslar', desc: 'Ekspertlardan video darslar' },
  { icon: Newspaper, title: 'Foydali maqolalar', desc: 'Ustalar uchun yangiliklar va maslahatlar' },
];

const spheres = [
  { icon: Wrench, label: 'Santexnik' },
  { icon: Zap, label: 'Elektrik' },
  { icon: Sparkles, label: 'Tozalash' },
  { icon: Paintbrush, label: "Bo'yoqchi" },
  { icon: Hammer, label: "Ta'mirlash" },
  { icon: Car, label: 'Avto-xizmatlar' },
  { icon: Sofa, label: 'Mebelchi' },
  { icon: Package, label: 'Boshqa xizmatlar' },
];

const faqs = [
  { q: 'Buyurtmalar qachon kela boshlaydi?', a: "Profil moderatsiyadan o'tib tasdiqlangach, siz buyurtmalarni qabul qilishni boshlaysiz." },
  { q: 'myID nima?', a: "myID — shaxsingizni tez va xavfsiz tasdiqlash uchun rasmiy raqamli identifikatsiya tizimi." },
  { q: 'Tezkor Xizmat nima?', a: "Bu mijozning shoshilinch so'rovini eng yaqin va mos ustaga tezda yo'naltiruvchi xizmat." },
  { q: 'Referal tokenlarni qanday olish mumkin?', a: "Taklif havolangiz orqali ro'yxatdan o'tgan har bir usta uchun +10 token olasiz." },
];

const sphereAccents = [
  'from-primary-500/15 to-teal-500/10 text-primary-500',
  'from-amber-500/15 to-orange-500/10 text-amber-500',
  'from-cyan-500/15 to-blue-500/10 text-cyan-500',
  'from-violet-500/15 to-purple-500/10 text-violet-500',
  'from-rose-500/15 to-pink-500/10 text-rose-500',
  'from-emerald-500/15 to-green-500/10 text-emerald-500',
  'from-indigo-500/15 to-blue-500/10 text-indigo-500',
  'from-teal-500/15 to-primary-500/10 text-teal-500',
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function MasterPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const howRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const tokRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const dlRef = useInView({ triggerOnce: true, threshold: 0.15 });
  const infoRef = useInView({ triggerOnce: true, threshold: 0.15 });
  const duoRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const guideRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const sphRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const faqRef = useInView({ triggerOnce: true, threshold: 0.1 });
  const ctaRef = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <main className="bg-white">
      {/* ═══ Header ═══ */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-200/50 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="UstaHub" className="w-10 h-10 rounded-xl shadow-lg shadow-primary-500/30 object-contain" />
            <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Usta<span className="text-primary-500">Hub</span>
            </span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                scrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <Home size={16} />
              Asosiy sahifa
            </a>
            <motion.a
              href={APP_ANDROID}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
            >
              <HardHat size={16} />
              Usta bo&apos;lish
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* ═══ Hero ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-[#013d40] to-gray-950" />
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
        </div>
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-6"
              >
                <HardHat size={16} />
                Ustalar uchun
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              >
                UstaHub ustasi bo&apos;ling va <span className="text-primary-400">250 token</span> oling
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="text-lg text-gray-300 leading-relaxed mb-3 max-w-xl"
              >
                Birinchi 1 000 ta usta 250 tokendan bonus oladi.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl"
              >
                20-iyulgacha profilni tayyorlaymiz, moderatsiyadan o&apos;tamiz va barqaror buyurtmalar olishni boshlaymiz.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-4 mb-8"
              >
                <StoreButtons />
                <motion.a
                  href="#tokens"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="self-start flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <PlayCircle size={18} />
                  Tokenlarni qanday olaman
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-3"
              >
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-gray-200">
                  <Calendar size={16} className="text-primary-400" />
                  <span className="font-semibold text-white">20-iyulgacha</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.07] border border-white/10 text-sm text-gray-200">
                  <Users size={16} className="text-primary-400" />
                  <span className="font-semibold text-white">Birinchi 1 000 usta</span>
                </div>
              </motion.div>
            </div>

            {/* Right - two phone mockups with master app screenshots */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:flex justify-center lg:justify-end items-end"
            >
              <div className="relative flex items-end">
                {/* Phone 1 - Orders (front, larger) */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-20"
                >
                  <div className="w-[250px] h-[510px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.8rem] p-[9px] shadow-2xl border border-gray-700/50">
                    <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-white">
                      <img src="/images/master-orders.jpg" alt="UstaHub Usta — Buyurtmalar" className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                </motion.div>

                {/* Phone 2 - Services (behind, offset) */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="relative z-10 -ml-14 mb-8"
                >
                  <div className="w-[220px] h-[450px] bg-gradient-to-b from-gray-700 to-gray-800 rounded-[2.5rem] p-[8px] shadow-xl border border-gray-600/50 opacity-95">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white">
                      <img src="/images/master-services.jpg" alt="UstaHub Usta — Xizmatlar" className="w-full h-full object-cover object-top" />
                    </div>
                  </div>
                </motion.div>

                {/* Floating token card */}
                <motion.div
                  animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -left-8 top-16 bg-white rounded-2xl p-4 shadow-2xl z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
                      <Coins size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold text-gray-900 leading-none">250</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Tokenlar</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating rating card */}
                <motion.div
                  animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-4 bottom-24 bg-white rounded-2xl p-4 shadow-2xl z-30"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-accent-50 flex items-center justify-center">
                      <Star size={16} className="text-accent-500 fill-accent-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">4.9 / 5.0</p>
                      <p className="text-[10px] text-gray-400">Usta reytingi</p>
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
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50L48 45.7C96 41.3 192 32.7 288 30.8C384 29 480 34 576 41.2C672 48.3 768 57.7 864 55.8C960 54 1056 41 1152 36.2C1248 31.3 1344 34.7 1392 36.3L1440 38V100H0V50Z" fill="#ffffff"/>
          </svg>
        </div>
      </section>

      {/* ═══ How it works ═══ */}
      <section ref={howRef.ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={howRef.inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-4">
              Jarayon
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Bu qanday ishlaydi</h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary-200 via-teal-200 to-emerald-200" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={howRef.inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="text-center group"
                  >
                    <div className="relative inline-flex mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-3xl bg-primary-50 flex items-center justify-center ring-4 ring-primary-100 relative z-10 group-hover:shadow-lg transition-all duration-300"
                      >
                        <Icon size={32} className="text-primary-500" />
                      </motion.div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg z-20">
                        {i + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ How to get tokens ═══ */}
      <section id="tokens" ref={tokRef.ref} className="py-20 bg-gray-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={tokRef.inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 text-accent-600 text-sm font-semibold mb-4">
              <Coins size={15} />
              Bonus
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">250 tokenni qanday olish mumkin</h2>
          </motion.div>

          <div className="space-y-4">
            {tokenRows.map((row, i) => {
              const Icon = row.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={tokRef.inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-primary-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900">{row.title}</h3>
                    <p className="text-sm text-gray-500">{row.desc}</p>
                  </div>
                  <div className="ml-auto text-right flex-shrink-0">
                    <div className="text-2xl sm:text-3xl font-extrabold text-accent-500 leading-none">{row.amount}</div>
                    <div className="text-[11px] font-bold text-accent-500 tracking-wider">TOKEN</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Deadline banner ═══ */}
      <section ref={dlRef.ref} className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={dlRef.inView ? { opacity: 1, y: 0 } : {}}
            className="relative rounded-3xl bg-gradient-to-br from-[#013d40] via-[#015558] to-[#013d40] p-8 sm:p-12 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-500/15 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />
            <div className="absolute right-8 top-8 hidden sm:block">
              <Timer size={56} className="text-white/20" />
            </div>

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 max-w-2xl">
                Nega 20-iyulgacha ro&apos;yxatdan o&apos;tish kerak
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {deadlineFeats.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={dlRef.inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                      className="flex flex-col gap-3"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                        <Icon size={20} className="text-primary-300" />
                      </div>
                      <p className="text-sm text-white/85 leading-snug">{f.text}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ What are tokens ═══ */}
      <section ref={infoRef.ref} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={infoRef.inView ? { opacity: 1, y: 0 } : {}}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
                <Coins size={22} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Token nima</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {tokenInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={infoRef.inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={20} className="text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Tezkor Xizmat + Referral ═══ */}
      <section ref={duoRef.ref} className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {/* Tezkor Xizmat */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={duoRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 border border-gray-100 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center">
                <Zap size={22} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Tezkor Xizmat</h3>
            </div>
            <p className="text-gray-500 mb-2">Daqiqalar ichida ustani shoshilinch chaqirish.</p>
            <p className="text-gray-500 mb-5">
              Mijozda favqulodda vaziyat yuz bersa — u Tezkor Xizmatga so&apos;rov yuboradi. Shoshilinch arizalar uchun mos kelsangiz — bu sizning imkoniyatingiz!
            </p>
            <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-100 p-5 text-center mb-6">
              <div className="text-3xl font-extrabold text-gray-900 tracking-widest tabular-nums">02:45</div>
              <div className="text-xs text-primary-600 font-medium mt-1">daqiqa</div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
            >
              Batafsil
              <ChevronRight size={16} />
            </a>
          </motion.div>

          {/* Referral */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={duoRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="relative bg-gradient-to-br from-[#013d40] to-[#015558] rounded-3xl p-8 overflow-hidden flex flex-col"
          >
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-primary-500/20 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }} />

            <div className="relative flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                  <Handshake size={22} className="text-primary-300" />
                </div>
                <h3 className="text-xl font-bold text-white">Referal dastur</h3>
              </div>
              <p className="text-white/75">Ustalarni taklif qiling — birga o&apos;samiz va birga daromad qilamiz!</p>

              {/* Hero gift */}
              <div className="flex-grow flex items-center justify-center py-8">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  {/* glow */}
                  <div className="absolute inset-0 bg-primary-400/40 blur-2xl rounded-full scale-125" />
                  {/* rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-4 rounded-full border border-dashed border-white/20"
                  />
                  {/* gift badge */}
                  <div className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-primary-500/40 ring-4 ring-white/10">
                    <Gift size={60} className="text-white" />
                  </div>
                  {/* floating accents */}
                  <motion.div
                    animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-3 w-9 h-9 rounded-xl bg-accent-400 flex items-center justify-center shadow-lg text-gray-900"
                  >
                    <Coins size={18} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                    className="absolute -bottom-2 -left-4 text-accent-300"
                  >
                    <Sparkles size={22} />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
                    className="absolute top-2 -left-6 text-primary-200"
                  >
                    <Sparkles size={14} />
                  </motion.div>
                </motion.div>
              </div>

              {/* token badge */}
              <div className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold shadow-lg shadow-primary-500/25">
                <Coins size={18} />
                Har bir taklif uchun +10 token
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Guides ═══ */}
      <section ref={guideRef.ref} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={guideRef.inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Qo&apos;llanmalar va o&apos;qitish</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, y: 30 }}
                  animate={guideRef.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                    <Icon size={22} className="text-primary-500" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 leading-snug">{g.title}</h4>
                    <p className="text-sm text-gray-500">{g.desc}</p>
                  </div>
                  <ChevronRight size={18} className="ml-auto text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ Spheres ═══ */}
      <section ref={sphRef.ref} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sphRef.inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">UstaHub qaysi sohalar uchun mos</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {spheres.map((sp, i) => {
              const Icon = sp.icon;
              const accent = sphereAccents[i % sphereAccents.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={sphRef.inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className={`h-24 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center mb-3 border border-gray-100`}>
                    <Icon size={34} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{sp.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section ref={faqRef.ref} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-[#011f21] to-gray-950" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.5) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
        <div className="absolute -top-20 left-1/3 w-[500px] h-[300px] bg-primary-500/8 rounded-full blur-[120px]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={faqRef.inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Tez-tez beriladigan savollar</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={faqRef.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <div className={`rounded-2xl border backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                    isOpen ? 'bg-white/[0.1] border-primary-400/30' : 'bg-white/[0.05] border-white/10 hover:bg-white/[0.08]'
                  }`}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-6 sm:px-8 py-6 text-left gap-4"
                    >
                      <span className={`text-base sm:text-lg font-semibold transition-colors ${isOpen ? 'text-primary-300' : 'text-white/90'}`}>
                        {item.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isOpen ? 'bg-primary-500 text-white' : 'bg-white/10 text-gray-400'
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
                          <div className="px-6 sm:px-8 pb-6">
                            <div className="border-t border-white/10 pt-4">
                              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{item.a}</p>
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
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section ref={ctaRef.ref} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaRef.inView ? { opacity: 1, y: 0 } : {}}
            className="relative rounded-3xl bg-gradient-to-br from-[#013d40] via-[#015558] to-[#013d40] p-8 sm:p-12 lg:p-14 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary-500/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-primary-400/10 blur-2xl" />
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle, rgba(2,189,198,0.4) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }} />

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/15 text-primary-300 text-sm font-medium mb-5 border border-primary-500/20">
                  <Rocket size={15} />
                  Birinchi to&apos;lqin
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  UstaHub ustalarining birinchi to&apos;lqiniga qo&apos;shiling
                </h2>
                <p className="text-white/75 text-lg">
                  Hozir ro&apos;yxatdan o&apos;ting, profilni 20-iyulgacha tayyorlang va 250 token oling.
                </p>
              </div>
              <StoreButtons className="flex-shrink-0" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <a href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="UstaHub" className="w-9 h-9 rounded-lg object-contain" />
              <span className="text-lg font-bold text-white">Usta<span className="text-primary-400">Hub</span></span>
            </a>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 md:mx-auto text-sm">
              <a href="#" className="hover:text-white transition-colors">Bu qanday ishlaydi</a>
              <a href="#tokens" className="hover:text-white transition-colors">Tokenlar</a>
              <a href="#" className="hover:text-white transition-colors">Tezkor Xizmat</a>
              <a href="#" className="hover:text-white transition-colors">Savol-javob</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="https://t.me/ustahub_net" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-primary-500/20 flex items-center justify-center hover:text-primary-400 transition-all">
                <Send size={16} />
              </a>
              <a href="https://www.instagram.com/ustahub.uz/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-pink-500/20 flex items-center justify-center hover:text-pink-400 transition-all">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 mt-8">
            &copy; 2025 UstaHub. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>
    </main>
  );
}
