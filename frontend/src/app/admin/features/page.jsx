'use client';
import AdminCrud from '@/components/AdminCrud';

export default function AdminFeatures() {
  return (
    <AdminCrud
      endpoint="features"
      title="Afzalliklar"
      subtitle="Afzalliklar bo'limini boshqarish"
      fields={[
        { name: 'title_uz', label: 'Sarlavha (UZ)', default: '' },
        { name: 'title_ru', label: 'Sarlavha (RU)', default: '' },
        { name: 'title_en', label: 'Sarlavha (EN)', default: '' },
        { name: 'description_uz', label: 'Tavsif (UZ)', type: 'textarea', default: '' },
        { name: 'description_ru', label: 'Tavsif (RU)', type: 'textarea', default: '' },
        { name: 'description_en', label: 'Tavsif (EN)', type: 'textarea', default: '' },
        { name: 'icon', label: 'Icon (shield-check, badge-check, credit-card, headphones, tag, zap)', default: 'shield-check' },
        { name: 'sort_order', label: 'Tartib', type: 'number', default: 0 },
      ]}
      columns={[
        { label: 'Sarlavha (UZ)', field: 'title_uz' },
        { label: 'Sarlavha (RU)', field: 'title_ru' },
        { label: 'Icon', field: 'icon' },
        { label: 'Tartib', field: 'sort_order' },
      ]}
    />
  );
}
