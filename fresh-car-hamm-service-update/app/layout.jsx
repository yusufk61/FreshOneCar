import './globals.css';

const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Fresh%20Car%20Hamm%2C%20Bockelweg%2073%2C%2059073%20Hamm&query_place_id=ChIJx8TN0B11uUcR-3FXFlMySGk';

export const metadata = {
  title: 'Fresh Car Hamm | Fahrzeugaufbereitung & Politur',
  description: 'Fahrzeugaufbereitung, Innenraumreinigung, Außenpflege und Politur in Hamm-Heessen. Optionaler Abhol- & Bringservice gegen Aufpreis. Bockelweg 73, 59073 Hamm.',
  openGraph: {
    title: 'Fresh Car Hamm',
    description: 'Dein Auto. Frisch wie neu. Fahrzeugpflege in Hamm.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  name: 'Fresh Car Hamm',
  description: 'Fahrzeugaufbereitung, Innenraumreinigung, Außenpflege, Politur sowie optionaler Abhol- und Bringservice in Hamm.',
  telephone: '+49 176 70988025',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bockelweg 73',
    postalCode: '59073',
    addressLocality: 'Hamm',
    addressCountry: 'DE',
  },
  hasMap: googleMapsUrl,
  sameAs: [
    'https://www.instagram.com/freshcarhamm/',
    googleMapsUrl,
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '4',
    bestRating: '5',
    worstRating: '1',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
