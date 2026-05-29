'use client';
import { useState, useEffect, useCallback } from 'react';
import { Zap, Pencil, Check, X, RefreshCw, LogIn } from 'lucide-react';
import { ustahubLogin, ustahubFetch, ustahubPatch, getUstahubToken, clearUstahubToken } from '@/lib/api';

function formatPrice(val) {
  if (val == null) return '—';
  return Number(val).toLocaleString('uz-UZ') + ' so\'m';
}

export default function ExpressServicesPage() {
  const [authed, setAuthed] = useState(false);
  const [loginForm, setLoginForm] = useState({ login: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ base_price: '', max_price: '' });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (getUstahubToken()) setAuthed(true);
  }, []);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ustahubFetch('superadmin/services/?status_filter=active&limit=100');
      const list = data?.data ?? [];
      setServices(list.filter(s => s.service_type === 'express' || s.category_name_uz));
    } catch (e) {
      if (e.message === 'SESSION_EXPIRED') { setAuthed(false); return; }
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadServices();
  }, [authed, loadServices]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await ustahubLogin(loginForm.login, loginForm.password);
      setAuthed(true);
    } catch {
      setLoginError('Login yoki parol noto\'g\'ri');
    } finally {
      setLoginLoading(false);
    }
  };

  const startEdit = (svc) => {
    setEditingId(svc.id);
    setEditForm({
      base_price: svc.base_price ?? '',
      max_price: svc.max_price ?? '',
    });
    setSaveError('');
  };

  const cancelEdit = () => { setEditingId(null); setSaveError(''); };

  const saveEdit = async (id) => {
    setSaving(true);
    setSaveError('');
    try {
      const payload = {};
      if (editForm.base_price !== '') payload.base_price = Number(editForm.base_price);
      if (editForm.max_price !== '') payload.max_price = Number(editForm.max_price);
      await ustahubPatch(`superadmin/services/${id}/price/`, payload);
      setEditingId(null);
      await loadServices();
    } catch (e) {
      if (e.message === 'SESSION_EXPIRED') { setAuthed(false); return; }
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-16">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Zap size={22} className="text-primary-500" />
            <h2 className="text-lg font-bold text-gray-900">UstaHub Superadmin</h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Tezkor xizmat narxlarini boshqarish uchun superadmin akkauntingiz bilan kiring.
          </p>
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Login"
              value={loginForm.login}
              onChange={e => setLoginForm(p => ({ ...p, login: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              required
            />
            <input
              type="password"
              placeholder="Parol"
              value={loginForm.password}
              onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none text-sm"
              required
            />
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              {loginLoading ? 'Kirish...' : 'Kirish'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Zap size={20} className="text-yellow-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Express Xizmat Narxlari</h1>
            <p className="text-sm text-gray-500">Tezkor xizmatlar uchun narxlarni belgilang</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadServices}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Yangilash
          </button>
          <button
            onClick={() => { clearUstahubToken(); setAuthed(false); }}
            className="px-4 py-2 text-sm font-medium text-red-500 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            Chiqish
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 text-sm text-yellow-800">
        <strong>Eslatma:</strong> Bu yerda belgilangan narxlar master va client ilovalarda avtomatik ko'rinadi.
        Narx o'zgarishi darhol kuchga kiradi.
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
          Tezkor xizmatlar topilmadi
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Xizmat</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kategoriya</th>
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Provider</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Boshlang'ich narx</th>
                <th className="text-right px-5 py-3.5 font-semibold text-gray-600">Maksimal narx</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map(svc => (
                <tr key={svc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap size={12} className="text-yellow-600" />
                      </div>
                      <span className="font-medium text-gray-900 line-clamp-1">
                        {svc.title_uz || '—'}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{svc.category_name_uz || '—'}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{svc.provider_name || '—'}</td>

                  {editingId === svc.id ? (
                    <>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          value={editForm.base_price}
                          onChange={e => setEditForm(p => ({ ...p, base_price: e.target.value }))}
                          placeholder="masalan: 80000"
                          className="w-32 px-3 py-1.5 border border-primary-400 rounded-lg text-right text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          value={editForm.max_price}
                          onChange={e => setEditForm(p => ({ ...p, max_price: e.target.value }))}
                          placeholder="masalan: 150000"
                          className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-right text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                        />
                        {saveError && (
                          <p className="text-red-500 text-xs mt-1">{saveError}</p>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 justify-end">
                          <button
                            onClick={() => saveEdit(svc.id)}
                            disabled={saving}
                            className="w-8 h-8 bg-primary-500 text-white rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-60"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-4 text-right font-semibold text-gray-900">
                        {formatPrice(svc.base_price)}
                      </td>
                      <td className="px-5 py-4 text-right text-gray-500">
                        {formatPrice(svc.max_price)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <button
                            onClick={() => startEdit(svc)}
                            className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            <Pencil size={14} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
