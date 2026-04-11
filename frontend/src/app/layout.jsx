import './globals.css';

export const metadata = {
  title: 'UstaHub — Ishonchli ustalar platformasi',
  description: 'UstaHub — minglab professional ustalar bir joyda. Qurilishdan go\'zallikkacha, barcha xizmatlarni oson buyurtma qiling.',
  keywords: 'ustalar, xizmatlar, qurilish, ta\'mirlash, Uzbekistan, UstaHub',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
