'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trash2, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const content = {
  uz: {
    title: 'Hisobni o\'chirish',
    subtitle: 'Hisobingizni o\'chirish uchun telefon raqamingizni kiriting',
    backHome: 'Bosh sahifaga qaytish',
    phoneLabel: 'Telefon raqam',
    phonePlaceholder: '+998 __ ___ __ __',
    phoneHint: 'Faqat O\'zbekiston raqami: +998 va 9 ta raqam',
    deleteButton: 'Hisobni o\'chirish',
    invalidPhone: 'Iltimos, to\'liq telefon raqamni kiriting',
    warningTitle: 'Diqqat!',
    warningText: 'Hisobni o\'chirish so\'rovi adminlar tomonidan ko\'rib chiqiladi. Bu amal bekor qilinmaydi va barcha ma\'lumotlaringiz o\'chirib tashlanadi.',
    successTitle: 'So\'rov qabul qilindi',
    successText: 'Sizning so\'rovingiz qabul qilindi va adminlar tomonidan ko\'rib chiqiladi.',
    okButton: 'Tushundim',
  },
  ru: {
    title: 'Удалить аккаунт',
    subtitle: 'Введите ваш номер телефона для удаления аккаунта',
    backHome: 'На главную',
    phoneLabel: 'Номер телефона',
    phonePlaceholder: '+998 __ ___ __ __',
    phoneHint: 'Только узбекский номер: +998 и 9 цифр',
    deleteButton: 'Удалить аккаунт',
    invalidPhone: 'Пожалуйста, введите полный номер телефона',
    warningTitle: 'Внимание!',
    warningText: 'Запрос на удаление аккаунта будет рассмотрен администраторами. Это действие необратимо и все ваши данные будут удалены.',
    successTitle: 'Запрос принят',
    successText: 'Ваш запрос принят и будет рассмотрен администраторами.',
    okButton: 'Понятно',
  },
  en: {
    title: 'Delete Account',
    subtitle: 'Enter your phone number to delete your account',
    backHome: 'Back to Home',
    phoneLabel: 'Phone number',
    phonePlaceholder: '+998 __ ___ __ __',
    phoneHint: 'Uzbekistan number only: +998 and 9 digits',
    deleteButton: 'Delete account',
    invalidPhone: 'Please enter a complete phone number',
    warningTitle: 'Warning!',
    warningText: 'Your account deletion request will be reviewed by administrators. This action is irreversible and all your data will be deleted.',
    successTitle: 'Request received',
    successText: 'Your request has been received and will be reviewed by administrators.',
    okButton: 'Got it',
  },
};

function formatUzPhone(value) {
  const digits = value.replace(/\D/g, '');
  let core = digits;
  if (core.startsWith('998')) core = core.slice(3);
  core = core.slice(0, 9);

  let out = '+998';
  if (core.length > 0) out += ' ' + core.slice(0, 2);
  if (core.length > 2) out += ' ' + core.slice(2, 5);
  if (core.length > 5) out += ' ' + core.slice(5, 7);
  if (core.length > 7) out += ' ' + core.slice(7, 9);
  return out;
}

function getDigitCount(formatted) {
  const digits = formatted.replace(/\D/g, '');
  if (digits.startsWith('998')) return digits.slice(3).length;
  return digits.length;
}

export default function DeleteAccountPage() {
  const [lang, setLang] = useState('uz');
  const [phone, setPhone] = useState('+998 ');
  const [error, setError] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const t = content[lang];

  const handlePhoneChange = (e) => {
    const formatted = formatUzPhone(e.target.value);
    setPhone(formatted);
    if (error) setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && phone === '+998 ') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (getDigitCount(phone) !== 9) {
      setError(t.invalidPhone);
      return;
    }
    setShowDialog(true);
  };

  const handleClose = () => {
    setShowDialog(false);
    setPhone('+998 ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">{t.backHome}</span>
          </Link>

          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="UstaHub" className="w-8 h-8 rounded-lg object-contain" />
            <span className="font-bold text-gray-800">
              Usta<span className="text-[#02BDC6]">Hub</span>
            </span>
          </div>

          {/* Language switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {['uz', 'ru', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  lang === l
                    ? 'bg-white text-[#02BDC6] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Title block */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-10 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Trash2 size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
            </div>
            <p className="text-white/90 text-sm sm:text-base">{t.subtitle}</p>
          </div>

          {/* Form */}
          <div className="px-6 sm:px-10 py-8">
            {/* Warning */}
            <div className="flex gap-3 p-4 mb-6 rounded-xl bg-amber-50 border border-amber-200">
              <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 text-sm mb-1">{t.warningTitle}</h3>
                <p className="text-amber-800 text-sm leading-relaxed">{t.warningText}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.phoneLabel}
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={handleKeyDown}
                  placeholder={t.phonePlaceholder}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 text-base sm:text-lg font-medium tracking-wide focus:outline-none transition-colors ${
                    error
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-gray-200 focus:border-[#02BDC6] bg-white'
                  }`}
                  autoComplete="off"
                />
                {error ? (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    {error}
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-gray-500">{t.phoneHint}</p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/30 transition-all"
              >
                <Trash2 size={18} />
                {t.deleteButton}
              </motion.button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-10 py-6 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} UstaHub.{' '}
              {lang === 'ru'
                ? 'Все права защищены.'
                : lang === 'en'
                ? 'All rights reserved.'
                : 'Barcha huquqlar himoyalangan.'}
            </p>
          </div>
        </div>
      </main>

      {/* Success dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="px-6 sm:px-8 pt-10 pb-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', damping: 15, stiffness: 300 }}
                  className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                >
                  <CheckCircle2 size={44} className="text-white" strokeWidth={2.5} />
                </motion.div>

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  {t.successTitle}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {t.successText}
                </p>
              </div>

              <div className="px-6 sm:px-8 pb-6">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-[#02BDC6] hover:bg-[#019aa2] text-white font-semibold rounded-xl transition-colors"
                >
                  {t.okButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
