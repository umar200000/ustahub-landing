'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const content = {
  uz: {
    title: 'Maxfiylik siyosati',
    lastUpdated: 'Oxirgi yangilanish: 2025-yil 1-may',
    backHome: 'Bosh sahifaga qaytish',
    sections: [
      {
        heading: '1. Umumiy ma\'lumot',
        text: 'UstaHub (keyingi o\'rinlarda "Platforma") foydalanuvchilarning shaxsiy ma\'lumotlarini himoya qilishga katta e\'tibor beradi. Ushbu Maxfiylik siyosati qanday ma\'lumotlar to\'planishi, ular qanday ishlatilishi va qanday himoya qilinishi haqida ma\'lumot beradi. Platformadan foydalanish orqali siz ushbu siyosatga rozilik bildirasiz.',
      },
      {
        heading: '2. To\'planadigan ma\'lumotlar',
        text: 'Biz quyidagi ma\'lumotlarni to\'laymiz:\n• Shaxsiy ma\'lumotlar: ism, familiya, telefon raqami, elektron pochta manzili.\n• To\'lov ma\'lumotlari: karta raqamlari (faqat oxirgi 4 raqam saqlanadi), to\'lov tarixi.\n• Qurilma ma\'lumotlari: qurilma turi, operatsion tizim, IP-manzil, FCM token.\n• Joylashuv ma\'lumotlari: foydalanuvchi ruxsati bilan GPS koordinatalari.\n• Foydalanish ma\'lumotlari: ilovadagi harakatlar, buyurtma tarixi, qidiruv so\'rovlari.',
      },
      {
        heading: '3. Ma\'lumotlardan foydalanish maqsadi',
        text: 'To\'plangan ma\'lumotlar quyidagi maqsadlarda ishlatiladi:\n• Hisob yaratish va autentifikatsiya qilish.\n• Xizmatlarni taqdim etish va buyurtmalarni qayta ishlash.\n• To\'lovlarni amalga oshirish (Atmos to\'lov tizimi orqali).\n• Push-bildirishnomalar yuborish (Firebase Cloud Messaging).\n• Platforma ishlashini yaxshilash va tahlil qilish.\n• Qonuniy majburiyatlarni bajarish.',
      },
      {
        heading: '4. Uchinchi tomon xizmatlari',
        text: 'Platforma quyidagi uchinchi tomon xizmatlaridan foydalanadi:\n• Firebase (Google) — autentifikatsiya, bildirishnomalar va tahlil.\n• Atmos — xavfsiz to\'lovlarni qayta ishlash.\n• AppsFlyer — marketing tahlili.\n• Microsoft Clarity — foydalanuvchi tajribasini yaxshilash.\nHar bir xizmat o\'z maxfiylik siyosatiga ega va ular bilan tanishishingizni tavsiya qilamiz.',
      },
      {
        heading: '5. Ma\'lumotlarni saqlash va himoya qilish',
        text: 'Shaxsiy ma\'lumotlaringiz xavfsiz serverlarimizda saqlanadi. Biz SSL shifrlash, tokenga asoslangan autentifikatsiya va kirish nazoratini qo\'llaymiz. To\'lov ma\'lumotlari PCI DSS standartlariga muvofiq himoya qilinadi. Ma\'lumotlar faqat zaruriy muddatda — odatda 3 yil — saqlanadi.',
      },
      {
        heading: '6. Ma\'lumotlarni uchinchi tomonlarga berish',
        text: 'Biz sizning shaxsiy ma\'lumotlaringizni uchinchi tomonlarga sotmaymiz yoki ijaraga bermaymiz. Ma\'lumotlar faqat quyidagi hollarda ulashilishi mumkin:\n• Xizmat ko\'rsatuvchi hamkorlarimiz (to\'lov tizimlari, bildirishnoma xizmatlari).\n• Qonun talabi yoki sud qarori asosida.\n• Kompaniya birlashishi yoki sotib olinishi holatida (foydalanuvchilar oldindan xabardor qilinadi).',
      },
      {
        heading: '7. Foydalanuvchi huquqlari',
        text: 'Siz quyidagi huquqlarga egasiz:\n• Shaxsiy ma\'lumotlaringizga kirish va ularni ko\'rish.\n• Ma\'lumotlaringizni yangilash yoki to\'g\'irlash.\n• Ma\'lumotlaringizni o\'chirishni so\'rash (hisob o\'chirish).\n• Ma\'lumotlarni qayta ishlashga rozilikni bekor qilish.\n• Ma\'lumotlaringizning ko\'chirib berilishini so\'rash.\nSo\'rovlar uchun: info@ustahub.uz',
      },
      {
        heading: '8. Bolalarning maxfiyligi',
        text: 'Platforma 18 yoshdan kichik shaxslarga mo\'ljallanmagan. Biz bilmasdan holda voyaga yetmaganlarning ma\'lumotlarini to\'lamaymiz. Agar bunday holat aniqlansa, ma\'lumotlar darhol o\'chiriladi.',
      },
      {
        heading: '9. Siyosatga o\'zgartirishlar',
        text: 'Ushbu siyosat vaqti-vaqti bilan yangilanishi mumkin. Muhim o\'zgarishlar haqida platforma orqali yoki elektron pochta orqali xabardor qilamiz. Yangilangan siyosat e\'lon qilingan kundan boshlab kuchga kiradi.',
      },
      {
        heading: '10. Aloqa',
        text: 'Savollaringiz bo\'lsa, biz bilan bog\'laning:\n📧 info@ustahub.uz\n📞 +998 71 200 00 00\n📍 Toshkent, O\'zbekiston',
      },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: 1 мая 2025 года',
    backHome: 'На главную',
    sections: [
      {
        heading: '1. Общие положения',
        text: 'UstaHub (далее — «Платформа») уделяет большое внимание защите персональных данных пользователей. Настоящая Политика конфиденциальности описывает, какие данные собираются, как они используются и как защищаются. Используя Платформу, вы соглашаетесь с данной Политикой.',
      },
      {
        heading: '2. Собираемые данные',
        text: 'Мы собираем следующие данные:\n• Личные данные: имя, фамилия, номер телефона, адрес электронной почты.\n• Платёжные данные: номера карт (хранятся только последние 4 цифры), история платежей.\n• Данные устройства: тип устройства, операционная система, IP-адрес, FCM-токен.\n• Данные о местоположении: GPS-координаты с разрешения пользователя.\n• Данные об использовании: действия в приложении, история заказов, поисковые запросы.',
      },
      {
        heading: '3. Цели использования данных',
        text: 'Собранные данные используются для:\n• Создания аккаунта и аутентификации.\n• Предоставления услуг и обработки заказов.\n• Проведения платежей (через платёжную систему Atmos).\n• Отправки push-уведомлений (Firebase Cloud Messaging).\n• Улучшения работы Платформы и аналитики.\n• Выполнения юридических обязательств.',
      },
      {
        heading: '4. Сторонние сервисы',
        text: 'Платформа использует следующие сторонние сервисы:\n• Firebase (Google) — аутентификация, уведомления и аналитика.\n• Atmos — безопасная обработка платежей.\n• AppsFlyer — маркетинговая аналитика.\n• Microsoft Clarity — улучшение пользовательского опыта.\nКаждый сервис имеет собственную политику конфиденциальности.',
      },
      {
        heading: '5. Хранение и защита данных',
        text: 'Ваши персональные данные хранятся на защищённых серверах. Мы применяем SSL-шифрование, аутентификацию на основе токенов и контроль доступа. Платёжные данные защищены в соответствии со стандартами PCI DSS. Данные хранятся только в течение необходимого срока — как правило, 3 года.',
      },
      {
        heading: '6. Передача данных третьим лицам',
        text: 'Мы не продаём и не сдаём в аренду ваши персональные данные. Данные могут быть переданы только в следующих случаях:\n• Нашим партнёрам-поставщикам услуг (платёжные системы, сервисы уведомлений).\n• По требованию закона или судебному решению.\n• В случае слияния или поглощения компании (пользователи будут уведомлены заблаговременно).',
      },
      {
        heading: '7. Права пользователей',
        text: 'Вы имеете следующие права:\n• Доступ к своим персональным данным и их просмотр.\n• Обновление или исправление своих данных.\n• Запрос на удаление данных (удаление аккаунта).\n• Отзыв согласия на обработку данных.\n• Запрос на перенос данных.\nДля запросов: info@ustahub.uz',
      },
      {
        heading: '8. Конфиденциальность детей',
        text: 'Платформа не предназначена для лиц младше 18 лет. Мы не собираем данные несовершеннолетних намеренно. При обнаружении таких данных они будут незамедлительно удалены.',
      },
      {
        heading: '9. Изменения в политике',
        text: 'Данная политика может периодически обновляться. О существенных изменениях мы уведомим через платформу или по электронной почте. Обновлённая политика вступает в силу с даты публикации.',
      },
      {
        heading: '10. Контакты',
        text: 'Если у вас есть вопросы, свяжитесь с нами:\n📧 info@ustahub.uz\n📞 +998 71 200 00 00\n📍 Ташкент, Узбекистан',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: May 1, 2025',
    backHome: 'Back to Home',
    sections: [
      {
        heading: '1. Introduction',
        text: 'UstaHub (hereinafter "Platform") places great importance on protecting users\' personal data. This Privacy Policy describes what data is collected, how it is used, and how it is protected. By using the Platform, you agree to this Policy.',
      },
      {
        heading: '2. Data We Collect',
        text: 'We collect the following data:\n• Personal data: first name, last name, phone number, email address.\n• Payment data: card numbers (only last 4 digits stored), payment history.\n• Device data: device type, operating system, IP address, FCM token.\n• Location data: GPS coordinates with user permission.\n• Usage data: in-app actions, order history, search queries.',
      },
      {
        heading: '3. How We Use Data',
        text: 'Collected data is used for:\n• Account creation and authentication.\n• Providing services and processing orders.\n• Processing payments (via Atmos payment system).\n• Sending push notifications (Firebase Cloud Messaging).\n• Improving Platform performance and analytics.\n• Fulfilling legal obligations.',
      },
      {
        heading: '4. Third-Party Services',
        text: 'The Platform uses the following third-party services:\n• Firebase (Google) — authentication, notifications, and analytics.\n• Atmos — secure payment processing.\n• AppsFlyer — marketing analytics.\n• Microsoft Clarity — improving user experience.\nEach service has its own privacy policy.',
      },
      {
        heading: '5. Data Storage and Security',
        text: 'Your personal data is stored on secure servers. We use SSL encryption, token-based authentication, and access control. Payment data is protected in accordance with PCI DSS standards. Data is retained only for the necessary period — typically 3 years.',
      },
      {
        heading: '6. Sharing Data with Third Parties',
        text: 'We do not sell or rent your personal data. Data may be shared only in the following cases:\n• Our service provider partners (payment systems, notification services).\n• By legal requirement or court order.\n• In case of company merger or acquisition (users will be notified in advance).',
      },
      {
        heading: '7. User Rights',
        text: 'You have the following rights:\n• Access to and viewing of your personal data.\n• Updating or correcting your data.\n• Requesting deletion of data (account deletion).\n• Withdrawing consent to data processing.\n• Requesting data portability.\nFor requests: info@ustahub.uz',
      },
      {
        heading: '8. Children\'s Privacy',
        text: 'The Platform is not intended for persons under 18 years of age. We do not knowingly collect data from minors. If such data is identified, it will be immediately deleted.',
      },
      {
        heading: '9. Changes to This Policy',
        text: 'This policy may be updated periodically. We will notify you of significant changes through the platform or by email. The updated policy takes effect from the date of publication.',
      },
      {
        heading: '10. Contact Us',
        text: 'If you have questions, please contact us:\n📧 info@ustahub.uz\n📞 +998 71 200 00 00\n📍 Tashkent, Uzbekistan',
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState('uz');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors font-medium"
          >
            <ArrowLeft size={18} />
            {t.backHome}
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Title block */}
          <div className="bg-gradient-to-r from-[#02BDC6] to-[#019aa2] px-8 py-10 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t.title}</h1>
            <p className="text-white/80 text-sm">{t.lastUpdated}</p>
          </div>

          {/* Sections */}
          <div className="px-6 sm:px-10 py-8 space-y-8">
            {t.sections.map((section, i) => (
              <section key={i}>
                <h2 className="text-lg font-bold text-gray-800 mb-3">{section.heading}</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {section.text}
                </p>
              </section>
            ))}
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
    </div>
  );
}
