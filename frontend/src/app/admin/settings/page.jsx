'use client';
import { useState, useEffect } from 'react';
import { adminFetch, adminPut } from '@/lib/api';
import { Save, CheckCircle } from 'lucide-react';

const settingFields = [
  { key: 'site_name', label: 'Sayt nomi' },
  { key: 'phone', label: 'Telefon raqam' },
  { key: 'email', label: 'Email' },
  { key: 'address_uz', label: 'Manzil (UZ)' },
  { key: 'address_ru', label: 'Manzil (RU)' },
  { key: 'address_en', label: 'Manzil (EN)' },
  { key: 'telegram', label: 'Telegram link' },
  { key: 'instagram', label: 'Instagram link' },
  { key: 'facebook', label: 'Facebook link' },
  { key: 'youtube', label: 'YouTube link' },
];

export default function AdminSettings() {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminFetch('settings').then(setForm).catch(console.error);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await adminPut('settings', form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) { alert(e.message); }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sozlamalar</h1>
          <p className="text-gray-500 mt-1">Sayt umumiy sozlamalari</p>
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

      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="grid sm:grid-cols-2 gap-4">
          {settingFields.map(f => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                type="text"
                value={form[f.key] || ''}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
