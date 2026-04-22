const db = require('./database');
const bcrypt = require('bcryptjs');

// Seed admin
const adminPassword = bcrypt.hashSync('admin123', 10);
const insertAdmin = db.prepare('INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)');
insertAdmin.run('admin', adminPassword);

// Seed hero
db.prepare('DELETE FROM hero').run();
db.prepare(`INSERT INTO hero (title_uz, title_ru, title_en, subtitle_uz, subtitle_ru, subtitle_en, button_text_uz, button_text_ru, button_text_en) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
  'Barcha xizmatlar uchun ishonchli ustalarni toping',
  'Найдите надежных мастеров для любых услуг',
  'Find trusted masters for any service',
  'UstaHub — minglab professional ustalar bir joyda. Qurilishdan go\'zallikkacha, barcha xizmatlarni oson buyurtma qiling.',
  'UstaHub — тысячи профессиональных мастеров в одном месте. Закажите любые услуги от строительства до красоты.',
  'UstaHub — thousands of professional masters in one place. Order any service from construction to beauty easily.',
  'Usta topish',
  'Найти мастера',
  'Find a master'
);

// Seed stats
db.prepare('DELETE FROM stats').run();
const insertStat = db.prepare('INSERT INTO stats (value, label_uz, label_ru, label_en, icon, sort_order) VALUES (?, ?, ?, ?, ?, ?)');
insertStat.run('12,500+', 'Professional ustalar', 'Профессиональных мастеров', 'Professional masters', 'users', 1);
insertStat.run('98%', 'Mijozlar mamnuniyati', 'Довольных клиентов', 'Client satisfaction', 'heart', 2);
insertStat.run('350+', 'Kunlik buyurtmalar', 'Заказов в день', 'Daily orders', 'clipboard', 3);
insertStat.run('50+', 'Xizmat turlari', 'Видов услуг', 'Service types', 'grid', 4);

// Seed categories
db.prepare('DELETE FROM subcategories').run();
db.prepare('DELETE FROM categories').run();
const insertCat = db.prepare('INSERT INTO categories (name_uz, name_ru, name_en, icon, sort_order) VALUES (?, ?, ?, ?, ?)');
const insertSub = db.prepare('INSERT INTO subcategories (category_id, name_uz, name_ru, name_en) VALUES (?, ?, ?, ?)');

const categories = [
  { uz: 'Qurilish va ta\'mirlash', ru: 'Строительство и ремонт', en: 'Construction & Repair', icon: 'building', subs: [
    { uz: 'Chilangarlik', ru: 'Слесарные работы', en: 'Locksmith' },
    { uz: 'Elektr ishlari', ru: 'Электрика', en: 'Electrical work' },
    { uz: 'Suvoq va bo\'yoq', ru: 'Штукатурка и покраска', en: 'Plastering & Painting' },
    { uz: 'Santexnika', ru: 'Сантехника', en: 'Plumbing' },
  ]},
  { uz: 'Avto xizmatlar', ru: 'Авто услуги', en: 'Auto Services', icon: 'car', subs: [
    { uz: 'Avtoelektrik', ru: 'Автоэлектрик', en: 'Auto Electrician' },
    { uz: 'Dvigatel ta\'mirlash', ru: 'Ремонт двигателя', en: 'Engine Repair' },
    { uz: 'Kuzov ishlari', ru: 'Кузовные работы', en: 'Body Work' },
  ]},
  { uz: 'Texnikani ta\'mirlash', ru: 'Ремонт техники', en: 'Tech Repair', icon: 'wrench', subs: [
    { uz: 'Konditsioner', ru: 'Кондиционеры', en: 'Air Conditioners' },
    { uz: 'Kir yuvish mashinasi', ru: 'Стиральные машины', en: 'Washing Machines' },
    { uz: 'Muzlatgich', ru: 'Холодильники', en: 'Refrigerators' },
  ]},
  { uz: 'Maishiy xizmatlar', ru: 'Бытовые услуги', en: 'Household Services', icon: 'home', subs: [
    { uz: 'Uy tozalash', ru: 'Уборка дома', en: 'House Cleaning' },
    { uz: 'Mebel ta\'mirlash', ru: 'Ремонт мебели', en: 'Furniture Repair' },
    { uz: 'Ko\'chirish xizmati', ru: 'Переезд', en: 'Moving Service' },
  ]},
  { uz: 'Ta\'lim va kurslar', ru: 'Образование и курсы', en: 'Education & Courses', icon: 'book', subs: [
    { uz: 'Matematika', ru: 'Математика', en: 'Mathematics' },
    { uz: 'Ingliz tili', ru: 'Английский язык', en: 'English Language' },
    { uz: 'Dasturlash', ru: 'Программирование', en: 'Programming' },
  ]},
  { uz: 'Go\'zallik va salomatlik', ru: 'Красота и здоровье', en: 'Beauty & Health', icon: 'sparkles', subs: [
    { uz: 'Sartarosh', ru: 'Парикмахер', en: 'Barber' },
    { uz: 'Massaj', ru: 'Массаж', en: 'Massage' },
    { uz: 'Qosh ustasi', ru: 'Мастер бровей', en: 'Brow Master' },
  ]},
  { uz: 'Reklama va marketing', ru: 'Реклама и маркетинг', en: 'Advertising & Marketing', icon: 'megaphone', subs: [
    { uz: 'Grafik dizayn', ru: 'Графический дизайн', en: 'Graphic Design' },
    { uz: 'SMM', ru: 'SMM', en: 'SMM' },
    { uz: 'Brending', ru: 'Брендинг', en: 'Branding' },
  ]},
  { uz: 'Yuristlar va moliya', ru: 'Юристы и финансы', en: 'Legal & Finance', icon: 'scale', subs: [
    { uz: 'Yuridik maslahat', ru: 'Юридическая консультация', en: 'Legal Consultation' },
    { uz: 'Buxgalteriya', ru: 'Бухгалтерия', en: 'Accounting' },
    { uz: 'Soliq maslahat', ru: 'Налоговая консультация', en: 'Tax Consultation' },
  ]},
];

categories.forEach((cat, i) => {
  const result = insertCat.run(cat.uz, cat.ru, cat.en, cat.icon, i + 1);
  cat.subs.forEach(sub => {
    insertSub.run(result.lastInsertRowid, sub.uz, sub.ru, sub.en);
  });
});

// Seed how it works
db.prepare('DELETE FROM how_it_works').run();
const insertStep = db.prepare('INSERT INTO how_it_works (step_number, title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
insertStep.run(1, 'Xizmatni tanlang', 'Выберите услугу', 'Choose a service', 'Sizga kerakli xizmat turini tanlang yoki qidiruvdan foydalaning', 'Выберите нужный тип услуги или воспользуйтесь поиском', 'Select the service type you need or use the search', 'search', 1);
insertStep.run(2, 'Ustani toping', 'Найдите мастера', 'Find a master', 'Reytinglar va sharhlarni o\'qib, eng yaxshi ustani tanlang', 'Читайте рейтинги и отзывы, выбирайте лучшего мастера', 'Read ratings and reviews, choose the best master', 'user-check', 2);
insertStep.run(3, 'Buyurtma bering', 'Оформите заказ', 'Place an order', 'Qulay vaqtni tanlang va buyurtmani tasdiqlang', 'Выберите удобное время и подтвердите заказ', 'Choose a convenient time and confirm your order', 'calendar', 3);
insertStep.run(4, 'Natijadan rohatlaning', 'Наслаждайтесь результатом', 'Enjoy the result', 'Sifatli xizmatdan foydalaning va ustaga baho bering', 'Пользуйтесь качественным сервисом и оцените мастера', 'Enjoy quality service and rate the master', 'star', 4);

// Seed features
db.prepare('DELETE FROM features').run();
const insertFeature = db.prepare('INSERT INTO features (title_uz, title_ru, title_en, description_uz, description_ru, description_en, icon, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
insertFeature.run('Tekshirilgan ustalar', 'Проверенные мастера', 'Verified masters', 'Barcha ustalar tekshiruvdan o\'tgan va sertifikatlangan', 'Все мастера прошли проверку и сертифицированы', 'All masters are verified and certified', 'shield-check', 1);
insertFeature.run('Kafolatli xizmat', 'Гарантия качества', 'Quality guarantee', 'Har bir xizmatga sifat kafolati beriladi', 'На каждую услугу предоставляется гарантия качества', 'Quality guarantee provided for every service', 'badge-check', 2);
insertFeature.run('Qulay to\'lov', 'Удобная оплата', 'Convenient payment', 'Naqd va kartadan onlayn to\'lov imkoniyati', 'Оплата наличными и онлайн с карты', 'Cash and online card payment options', 'credit-card', 3);
insertFeature.run('24/7 Qo\'llab-quvvatlash', 'Поддержка 24/7', '24/7 Support', 'Har qanday savolingizga tezkor javob oling', 'Быстрые ответы на любые вопросы', 'Get quick answers to any questions', 'headphones', 4);
insertFeature.run('Shaffof narxlar', 'Прозрачные цены', 'Transparent pricing', 'Narxlarni oldindan bilib, taqqoslash imkoniyati', 'Возможность узнать и сравнить цены заранее', 'Know and compare prices in advance', 'tag', 5);
insertFeature.run('Tezkor xizmat', 'Быстрый сервис', 'Fast service', 'Ustalar bir necha daqiqada javob beradi', 'Мастера отвечают в течение нескольких минут', 'Masters respond within minutes', 'zap', 6);

// Seed testimonials
db.prepare('DELETE FROM testimonials').run();
const insertTest = db.prepare('INSERT INTO testimonials (client_name, master_name, rating, review_count, comment_uz, comment_ru, comment_en, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
insertTest.run('Sevara', 'Arsen Papikyan', 5, 61, 'Usta juda yaxshi. Tez keldi, ishni sifatli qildi. Tavsiya qilaman!', 'Мастер отличный. Приехал быстро, работу выполнил качественно. Рекомендую!', 'Excellent master. Arrived quickly, did quality work. Recommended!', '150,000 so\'m');
insertTest.run('Ilhom', 'Xasan Ildar', 5, 15, 'Dush kabinasini ta\'mirlab berdi. Onlayn to\'lov juda qulay ekan.', 'Отремонтировал душевую кабину. Онлайн оплата очень удобная.', 'Fixed the shower cabin. Online payment is very convenient.', '200,000 so\'m');
insertTest.run('Ezoza', 'Abibulaev Aider', 5, 12, 'Elektr ishlarini yaxshi bajardi. Hammasi ishlayapti.', 'Хорошо выполнил электромонтажные работы. Всё работает.', 'Did good electrical work. Everything is working.', '170,000 so\'m');
insertTest.run('Roman', 'Boltaev G\'ayrat', 5, 73, 'Konditsionerni o\'rnatdi va zaryadladi. Natijadan to\'liq mamnunman.', 'Установил и заправил кондиционер. Полностью доволен результатом.', 'Installed and recharged AC. Completely satisfied with the result.', '200,000 so\'m');
insertTest.run('Shohruh', 'Sunnatillaev G\'iyosidin', 5, 173, 'Santexnik muammoni topdi va tuzatdi. Professional usta.', 'Сантехник нашёл и устранил проблему. Профессиональный мастер.', 'Plumber found and fixed the problem. Professional master.', '180,000 so\'m');
insertTest.run('Nelya', 'Usmanov Nurillo', 4, 8, 'Tez keldi, ehtiyot qismlarni o\'zi olib keldi. Yaxshi xizmat.', 'Приехал быстро, запчасти привёз сам. Хороший сервис.', 'Arrived quickly, brought spare parts himself. Good service.', '150,000 so\'m');

// Seed FAQ
db.prepare('DELETE FROM faq').run();
const insertFaq = db.prepare('INSERT INTO faq (question_uz, question_ru, question_en, answer_uz, answer_ru, answer_en, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)');
insertFaq.run(
  'UstaHub qanday ishlaydi?',
  'Как работает UstaHub?',
  'How does UstaHub work?',
  'UstaHub — bu mijozlar va professional ustalarni bog\'lovchi platforma. Siz kerakli xizmatni tanlaysiz, ustalarning reytingi va sharhlarini ko\'rib, eng mosini tanlaysiz va buyurtma berasiz.',
  'UstaHub — это платформа, связывающая клиентов с профессиональными мастерами. Вы выбираете нужную услугу, просматриваете рейтинги и отзывы мастеров и делаете заказ.',
  'UstaHub is a platform connecting clients with professional masters. You choose the service you need, view master ratings and reviews, and place an order.',
  1
);
insertFaq.run(
  'Ro\'yxatdan o\'tish bepulmi?',
  'Регистрация бесплатная?',
  'Is registration free?',
  'Ha, mijozlar uchun ro\'yxatdan o\'tish va ilovadan foydalanish to\'liq bepul. Ustalar uchun maxsus tarif rejalari mavjud.',
  'Да, регистрация и использование приложения полностью бесплатны для клиентов. Для мастеров предусмотрены специальные тарифные планы.',
  'Yes, registration and app usage is completely free for clients. Special pricing plans are available for masters.',
  2
);
insertFaq.run(
  'To\'lov qanday amalga oshiriladi?',
  'Как происходит оплата?',
  'How is payment processed?',
  'To\'lovni naqd yoki UzCard/Humo kartalari orqali onlayn amalga oshirishingiz mumkin. Barcha tranzaksiyalar xavfsiz va himoyalangan.',
  'Оплату можно произвести наличными или онлайн через карты UzCard/Humo. Все транзакции безопасны и защищены.',
  'You can pay in cash or online via UzCard/Humo cards. All transactions are safe and secure.',
  3
);
insertFaq.run(
  'Agar xizmat sifati yomon bo\'lsa nima qilaman?',
  'Что делать, если качество услуги плохое?',
  'What if the service quality is poor?',
  'Biz har bir xizmatga sifat kafolati beramiz. Agar muammo bo\'lsa, qo\'llab-quvvatlash xizmatiga murojaat qiling va biz muammoni hal qilamiz.',
  'Мы предоставляем гарантию качества на каждую услугу. Если возникнет проблема, обратитесь в службу поддержки, и мы решим вопрос.',
  'We provide a quality guarantee for every service. If there\'s an issue, contact support and we\'ll resolve it.',
  4
);
insertFaq.run(
  'Qaysi shaharlarda xizmat ko\'rsatiladi?',
  'В каких городах работает сервис?',
  'In which cities is the service available?',
  'UstaHub hozirda Toshkent, Samarqand, Buxoro, Namangan, Andijon, Farg\'ona va boshqa yirik shaharlarda ishlaydi. Biz doimo kengaymoqdamiz!',
  'UstaHub работает в Ташкенте, Самарканде, Бухаре, Намангане, Андижане, Фергане и других крупных городах. Мы постоянно расширяемся!',
  'UstaHub currently operates in Tashkent, Samarkand, Bukhara, Namangan, Andijan, Fergana and other major cities. We\'re constantly expanding!',
  5
);
insertFaq.run(
  'Usta bo\'lib qanday ro\'yxatdan o\'taman?',
  'Как зарегистрироваться мастером?',
  'How do I register as a master?',
  'UstaHub ilovasini yuklab oling, \"Usta sifatida ro\'yxatdan o\'tish\" tugmasini bosing va kerakli ma\'lumotlarni to\'ldiring. Tekshiruvdan so\'ng siz buyurtmalarni qabul qilishingiz mumkin.',
  'Скачайте приложение UstaHub, нажмите \"Зарегистрироваться как мастер\" и заполните необходимые данные. После проверки вы сможете принимать заказы.',
  'Download the UstaHub app, tap "Register as a master" and fill in the required details. After verification, you can start accepting orders.',
  6
);

// Seed settings
db.prepare('DELETE FROM settings').run();
const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
insertSetting.run('site_name', 'UstaHub');
insertSetting.run('phone', '+998971379722');
insertSetting.run('email', 'company@ustahub.net');
insertSetting.run('address_uz', 'Toshkent shahri, Chilonzor tumani');
insertSetting.run('address_ru', 'г. Ташкент, Чиланзарский район');
insertSetting.run('address_en', 'Tashkent city, Chilanzar district');
insertSetting.run('telegram', 'https://t.me/ustahub_net');
insertSetting.run('instagram', 'https://instagram.com/ustahub');
insertSetting.run('facebook', 'https://facebook.com/ustahub');
insertSetting.run('youtube', 'https://youtube.com/@ustahub');

// Seed app links
db.prepare('DELETE FROM app_links').run();
const insertLink = db.prepare('INSERT INTO app_links (platform, url) VALUES (?, ?)');
insertLink.run('ios', 'https://apps.apple.com/uz/app/ustahub/id6745017870');
insertLink.run('android', 'https://play.google.com/store/apps/details?id=com.asoschi.sazu_market');

console.log('Database seeded successfully!');
