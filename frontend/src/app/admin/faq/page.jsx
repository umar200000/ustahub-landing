'use client';
import AdminCrud from '@/components/AdminCrud';

export default function AdminFAQ() {
  return (
    <AdminCrud
      endpoint="faq"
      title="FAQ"
      subtitle="Ko'p beriladigan savollarni boshqarish"
      fields={[
        { name: 'question_uz', label: 'Savol (UZ)', default: '' },
        { name: 'question_ru', label: 'Savol (RU)', default: '' },
        { name: 'question_en', label: 'Savol (EN)', default: '' },
        { name: 'answer_uz', label: 'Javob (UZ)', type: 'textarea', default: '' },
        { name: 'answer_ru', label: 'Javob (RU)', type: 'textarea', default: '' },
        { name: 'answer_en', label: 'Javob (EN)', type: 'textarea', default: '' },
        { name: 'sort_order', label: 'Tartib', type: 'number', default: 0 },
      ]}
      columns={[
        { label: 'Savol (UZ)', field: 'question_uz' },
        { label: 'Savol (RU)', field: 'question_ru' },
        { label: 'Tartib', field: 'sort_order' },
      ]}
    />
  );
}
