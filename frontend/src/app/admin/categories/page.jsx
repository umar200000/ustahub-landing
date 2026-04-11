'use client';
import AdminCrud from '@/components/AdminCrud';

export default function AdminCategories() {
  return (
    <AdminCrud
      endpoint="categories"
      title="Kategoriyalar"
      subtitle="Xizmat kategoriyalarini boshqarish"
      fields={[
        { name: 'name_uz', label: "Nomi (UZ)", default: '' },
        { name: 'name_ru', label: 'Nomi (RU)', default: '' },
        { name: 'name_en', label: 'Nomi (EN)', default: '' },
        { name: 'icon', label: 'Icon (building, car, wrench, home, book, sparkles, megaphone, scale)', default: 'wrench' },
        { name: 'sort_order', label: 'Tartib', type: 'number', default: 0 },
      ]}
      columns={[
        { label: 'Nomi (UZ)', field: 'name_uz' },
        { label: 'Nomi (RU)', field: 'name_ru' },
        { label: 'Icon', field: 'icon' },
        { label: 'Tartib', field: 'sort_order' },
      ]}
    />
  );
}
