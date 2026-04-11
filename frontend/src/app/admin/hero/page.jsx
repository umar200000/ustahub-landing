'use client';
import { useState, useEffect } from 'react';
import { adminFetch, adminPut } from '@/lib/api';
import { Save, CheckCircle } from 'lucide-react';

export default function AdminHero() {
  const [form, setForm] = useState({
    title_uz: '', title_ru: '', title_en: '',
    subtitle_uz: '', subtitle_ru: '', subtitle_en: '',
    button_text_uz: '', button_text_ru: '', button_text_en: '',
    image_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/hero')
      .then(r => r.json())
      .then(data => {
        if (data && data.id) {
          setForm({
            title_uz: data.title_uz || '', title_ru: data.title_ru || '', title_en: data.title_en || '',
            subtitle_uz: data.subtitle_uz || '', subtitle_ru: data.subtitle_ru || '', subtitle_en: data.subtitle_en || '',
            button_text_uz: data.button_text_uz || '', button_text_ru: data.button_text_ru || '', button_text_en: data.button_text_en || '',
            image_url: data.image_url || '',
          });
        }
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminPut('hero', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      alert('Xatolik: ' + e.message);
    }
    setSaving(false);
  };

  const Field = ({ label, field, textarea }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea
          rows={3}
          value={form[field]}
          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
        />
      ) : (
        <input
          type="text"
          value={form[field]}
          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
        />
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hero bo&apos;limi</h1>
          <p className="text-gray-500 mt-1">Asosiy bosh qism matni va rasmi</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 disabled:opacity-50 transition-all"
        >
          {saved ? <CheckCircle size={18} /> : <Save size={18} />}
          {saved ? 'Saqlandi!' : saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-8">
        {/* Titles */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Sarlavha</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="O'zbekcha" field="title_uz" />
            <Field label="Ruscha" field="title_ru" />
            <Field label="Inglizcha" field="title_en" />
          </div>
        </div>

        {/* Subtitles */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Qo&apos;shimcha matn</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="O'zbekcha" field="subtitle_uz" textarea />
            <Field label="Ruscha" field="subtitle_ru" textarea />
            <Field label="Inglizcha" field="subtitle_en" textarea />
          </div>
        </div>

        {/* Button text */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Tugma matni</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="O'zbekcha" field="button_text_uz" />
            <Field label="Ruscha" field="button_text_ru" />
            <Field label="Inglizcha" field="button_text_en" />
          </div>
        </div>
      </div>
    </div>
  );
}
