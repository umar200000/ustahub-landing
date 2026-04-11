'use client';
import { useState, useEffect } from 'react';
import { fetchAll } from '@/lib/api';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Categories from '@/components/Categories';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import AppDownload from '@/components/AppDownload';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const [data, setData] = useState(null);
  const [lang, setLang] = useState('uz');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        <div className="text-center">
          <img src="/logo.png" alt="UstaHub" className="w-16 h-16 rounded-2xl mx-auto mb-6 animate-pulse object-contain" />
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-primary-500 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Server bilan bog&apos;lanib bo&apos;lmadi</h2>
          <p className="text-gray-500 mb-4">Backend serverni ishga tushiring: <code className="bg-gray-100 px-2 py-1 rounded text-sm">cd backend && npm run seed && npm start</code></p>
          <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Header settings={data.settings} lang={lang} onLangChange={setLang} />
      <Hero data={data.hero} lang={lang} />
      <Stats data={data.stats} lang={lang} />
      <Categories data={data.categories} lang={lang} />
      <HowItWorks data={data.howItWorks} lang={lang} />
      <Features data={data.features} lang={lang} />
      <Testimonials data={data.testimonials} lang={lang} />
      <AppDownload appLinks={data.appLinks} lang={lang} />
      <FAQ data={data.faq} lang={lang} />
      <Footer settings={data.settings} appLinks={data.appLinks} lang={lang} />
    </main>
  );
}
