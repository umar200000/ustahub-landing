'use client';
import { useState, useEffect } from 'react';
import { adminFetch, adminPost, adminPut, adminDelete } from '@/lib/api';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';

export default function AdminCrud({ endpoint, title, subtitle, fields, columns }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const emptyForm = () => {
    const obj = {};
    fields.forEach(f => { obj[f.name] = f.default ?? ''; });
    return obj;
  };

  const load = () => adminFetch(endpoint).then(setItems).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    try {
      if (editing === 'new') {
        await adminPost(endpoint, form);
      } else {
        await adminPut(`${endpoint}/${editing}`, form);
      }
      setEditing(null);
      setForm({});
      load();
    } catch (e) { alert(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) return;
    await adminDelete(`${endpoint}/${id}`);
    load();
  };

  const startEdit = (item) => {
    setEditing(item.id);
    const f = {};
    fields.forEach(field => { f[field.name] = item[field.name] ?? field.default ?? ''; });
    setForm(f);
  };

  const startNew = () => {
    setEditing('new');
    setForm(emptyForm());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <button onClick={startNew} className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-all">
          <Plus size={18} /> Qo&apos;shish
        </button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl p-6 border border-primary-200 mb-6 shadow-lg">
          <h3 className="font-semibold text-gray-900 mb-4">{editing === 'new' ? 'Yangi qo\'shish' : 'Tahrirlash'}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {fields.map(field => (
              <div key={field.name} className={field.wide ? 'sm:col-span-2 lg:col-span-3' : ''}>
                <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={form[field.name] ?? ''}
                    onChange={e => setForm(p => ({ ...p, [field.name]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"
                  />
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    value={form[field.name] ?? ''}
                    onChange={e => setForm(p => ({ ...p, [field.name]: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"
                  />
                ) : (
                  <input
                    type="text"
                    value={form[field.name] ?? ''}
                    onChange={e => setForm(p => ({ ...p, [field.name]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"
                  />
                )}
              </div>
            ))}
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

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{col.label}</th>
                ))}
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  {columns.map((col, j) => (
                    <td key={j} className={`px-6 py-4 text-sm ${j === 0 ? 'font-semibold text-gray-900' : 'text-gray-600'} max-w-[200px] truncate`}>
                      {col.render ? col.render(item) : item[col.field]}
                    </td>
                  ))}
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
        </div>
        {items.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Ma&apos;lumot topilmadi</div>
        )}
      </div>
    </div>
  );
}
