'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Xatolik yuz berdi</h2>
        <p className="text-gray-500 mb-4">{error?.message || 'Kutilmagan xatolik'}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Qayta urinish
        </button>
      </div>
    </div>
  );
}
