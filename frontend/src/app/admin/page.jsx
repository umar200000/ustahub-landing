'use client';
import { useState, useEffect } from 'react';
import { adminFetch } from '@/lib/api';
import { BarChart3, FolderOpen, MessageSquare, HelpCircle, Eye, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetch('stats').then(d => d.length),
      adminFetch('categories').then(d => d.length),
      adminFetch('features').then(d => d.length),
      adminFetch('testimonials').then(d => d.length),
      adminFetch('faq').then(d => d.length),
      adminFetch('how-it-works').then(d => d.length),
    ]).then(([stats, cats, features, reviews, faq, steps]) => {
      setStats({ stats, cats, features, reviews, faq, steps });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Statistikalar', value: stats.stats || 0, icon: BarChart3, color: 'bg-blue-50 text-blue-500', href: '/admin/stats' },
    { label: 'Kategoriyalar', value: stats.cats || 0, icon: FolderOpen, color: 'bg-violet-50 text-violet-500', href: '/admin/categories' },
    { label: 'Afzalliklar', value: stats.features || 0, icon: Settings, color: 'bg-amber-50 text-amber-500', href: '/admin/features' },
    { label: 'Sharhlar', value: stats.reviews || 0, icon: MessageSquare, color: 'bg-emerald-50 text-emerald-500', href: '/admin/testimonials' },
    { label: 'FAQ', value: stats.faq || 0, icon: HelpCircle, color: 'bg-rose-50 text-rose-500', href: '/admin/faq' },
    { label: 'Qadamlar', value: stats.steps || 0, icon: Eye, color: 'bg-cyan-50 text-cyan-500', href: '/admin/how-it-works' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">UstaHub landing page boshqaruv paneli</p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
              <div className="w-12 h-12 bg-gray-100 rounded-xl mb-4" />
              <div className="h-8 w-16 bg-gray-100 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <a
                key={i}
                href={card.href}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </a>
            );
          })}
        </div>
      )}

      {/* Quick info */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-4">Tezkor ma&apos;lumot</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="font-medium text-blue-700 mb-1">Backend API</p>
            <code className="text-blue-600 text-xs">http://localhost:5000/api</code>
          </div>
          <div className="p-4 bg-green-50 rounded-xl">
            <p className="font-medium text-green-700 mb-1">Frontend</p>
            <code className="text-green-600 text-xs">http://localhost:3000</code>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <p className="font-medium text-purple-700 mb-1">Admin login</p>
            <code className="text-purple-600 text-xs">admin / admin123</code>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl">
            <p className="font-medium text-amber-700 mb-1">API hujjat</p>
            <code className="text-amber-600 text-xs">GET /api/all — barcha content</code>
          </div>
        </div>
      </div>
    </div>
  );
}
