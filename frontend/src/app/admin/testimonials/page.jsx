'use client';
import AdminCrud from '@/components/AdminCrud';

export default function AdminTestimonials() {
  return (
    <AdminCrud
      endpoint="testimonials"
      title="Sharhlar"
      subtitle="Mijozlar sharhlarini boshqarish"
      fields={[
        { name: 'client_name', label: 'Mijoz ismi', default: '' },
        { name: 'master_name', label: 'Usta ismi', default: '' },
        { name: 'rating', label: 'Reyting (1-5)', type: 'number', default: 5 },
        { name: 'review_count', label: 'Sharhlar soni', type: 'number', default: 0 },
        { name: 'comment_uz', label: 'Sharh (UZ)', type: 'textarea', default: '' },
        { name: 'comment_ru', label: 'Sharh (RU)', type: 'textarea', default: '' },
        { name: 'comment_en', label: 'Sharh (EN)', type: 'textarea', default: '' },
        { name: 'price', label: 'Narx (masalan: 150,000 so\'m)', default: '' },
      ]}
      columns={[
        { label: 'Mijoz', field: 'client_name' },
        { label: 'Usta', field: 'master_name' },
        { label: 'Reyting', field: 'rating' },
        { label: 'Narx', field: 'price' },
      ]}
    />
  );
}
