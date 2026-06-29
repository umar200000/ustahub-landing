import './globals.css';

export const metadata = {
  metadataBase: new URL('https://ustahub.net'),
  title: 'UstaHub — Ishonchli ustalar platformasi',
  description: 'UstaHub — minglab professional ustalar bir joyda. Qurilishdan go\'zallikkacha, barcha xizmatlarni oson buyurtma qiling.',
  keywords: 'ustalar, xizmatlar, qurilish, ta\'mirlash, santexnik, elektrik, Uzbekistan, Toshkent, UstaHub',
  applicationName: 'UstaHub',
  authors: [{ name: 'UstaHub' }],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://ustahub.net',
    siteName: 'UstaHub',
    title: 'UstaHub — Ishonchli ustalar platformasi',
    description: 'UstaHub — minglab professional ustalar bir joyda. Qurilishdan go\'zallikkacha, barcha xizmatlarni oson buyurtma qiling.',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'UstaHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UstaHub — Ishonchli ustalar platformasi',
    description: 'UstaHub — minglab professional ustalar bir joyda. Barcha xizmatlarni oson buyurtma qiling.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
