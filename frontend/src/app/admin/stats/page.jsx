'use client';
import { useState, useEffect } from 'react';
import { adminFetch, adminPost, adminPut, adminDelete } from '@/lib/api';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

export default function AdminStats() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ value: '', label_uz: '', label_ru: '', label_en: '', icon: '', sort_order: 0 });

  const load = () => adminFetch('stats').then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    try {
      if (editing === 'new') {
        await adminPost('stats', form);
      } else {
        await adminPut(`stats/${editing}`, form);
      }
      setEditing(null);
      setForm({ value: '', label_uz: '', label_ru: '', label_en: '', icon: '', sort_order: 0 });
      load();
    } catch (e) { alert(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) return;
    await adminDelete(`stats/${id}`);
    load();
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ value: item.value, label_uz: item.label_uz || '', label_ru: item.label_ru || '', label_en: item.label_en || '', icon: item.icon || '', sort_order: item.sort_order || 0 });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Statistika</h1>
          <p className="text-gray-500 mt-1">Raqamlar bo&apos;limini boshqarish</p>
        </div>
        <button
          onClick={() => { setEditing('new'); setForm({ value: '', label_uz: '', label_ru: '', label_en: '', icon: 'users', sort_order: items.length + 1 }); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-all"
        >
          <Plus size={18} /> Qo&apos;shish
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-white rounded-2xl p-6 border border-primary-200 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-4">{editing === 'new' ? 'Yangi statistika' : 'Tahrirlash'}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Qiymat (masalan: 12,500+)</label>
              <input value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Label (UZ)</label>
              <input value={form.label_uz} onChange={e => setForm(p => ({ ...p, label_uz: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Label (RU)</label>
              <input value={form.label_ru} onChange={e => setForm(p => ({ ...p, label_ru: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Label (EN)</label>
              <input value={form.label_en} onChange={e => setForm(p => ({ ...p, label_en: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Icon (users, heart, clipboard, grid)</label>
              <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Tartib</label>
              <input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600">
              <Save size={16} /> Saqlash
            </button>
            <button onClick={() => setEditing(null)} className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200">
              <X size={16} /> Bekor qilish
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Qiymat</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Label (UZ)</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Icon</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500">Tartib</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.value}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.label_uz}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{item.icon}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{item.sort_order}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Ma&apos;lumot topilmadi</div>
        )}
      </div>
    </div>
  );
}
