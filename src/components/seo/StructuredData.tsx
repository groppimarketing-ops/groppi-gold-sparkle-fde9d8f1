import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://groppi.be';

/**
 * Organization + LocalBusiness + WebSite JSON-LD
 * Rendered once in the root layout (Index page).
 */
const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'GROPPI',
        legalName: 'GROPPI Marketing Bureau',
        url: SITE_URL,
        logo: `${SITE_URL}/images/hero-poster.png`,
        sameAs: [
          'https://x.com/Groppimarketing',
          'https://www.facebook.com/profile.php?id=61582782063217',
          'https://www.instagram.com/groppimarketingbureau/',
          'https://www.linkedin.com/in/groppi-marketing-bureau/',
          'https://www.youtube.com/@GroppiMarketing',
          'https://www.tiktok.com/@groppimarketingbureau',
          'https://nl.pinterest.com/GroppiMarketingBureau/',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+32-494-31-11-19',
            contactType: 'sales',
            areaServed: ['BE', 'NL', 'DE', 'FR', 'EU'],
            availableLanguage: ['Dutch', 'English', 'French', 'German', 'Arabic'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+32-14-63-50-05',
            contactType: 'customer service',
            areaServed: 'BE',
            availableLanguage: ['Dutch', 'English'],
          },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'GROPPI Marketing Bureau',
        image: `${SITE_URL}/images/hero-poster.png`,
        url: SITE_URL,
        telephone: '+32 494 31 11 19',
        email: 'info@groppi.be',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Het Steeke 5A',
          addressLocality: 'Merksplas',
          postalCode: '2330',
          addressCountry: 'BE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.3547,
          longitude: 4.8547,
        },
        priceRange: '€€',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '6',
          bestRating: '5',
        },
        review: [
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Mehdi Vanden Berghe' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody: 'GROPPI heeft onze online zichtbaarheid volledig getransformeerd. Binnen 3 maanden zagen we 200% meer leads via Google.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Sophie Baert' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody: 'Professioneel, creatief en altijd bereikbaar. Onze social media is eindelijk consistent en het levert echt klanten op.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Kevin De Smet' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody: 'De website die GROPPI voor ons bouwde converteert 3x beter dan onze vorige. Aanrader voor elke KMO.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Jana Hermans' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody: 'Van strategie tot uitvoering, alles wordt tot in de puntjes verzorgd. Eindelijk een bureau dat doet wat het belooft.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Luc Peeters' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody: 'Onze Google Ads campagnes werden volledig geoptimaliseerd. ROAS ging van 2x naar 6x in twee maanden.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Amina Deboeck' },
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            reviewBody: 'GROPPI denkt mee als partner, niet als leverancier. Ze snappen onze markt en leveren content die écht aanslaat.',
          },
        ],
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'GROPPI',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['nl-BE', 'en', 'fr', 'de', 'ar', 'es', 'it', 'pt', 'pl', 'ru', 'tr', 'bn', 'hi', 'ur', 'zh'],
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Breadcrumb JSON-LD
 */
interface BreadcrumbItem {
  name: string;
  path: string;
}

const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://groppi.be${item.path}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Service JSON-LD
 */
const ServiceSchema = ({ name, description, priceRange }: { name: string; description: string; priceRange?: string }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': 'https://groppi.be/#organization' },
    areaServed: { '@type': 'Country', name: 'Belgium' },
    ...(priceRange && { priceRange }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export { OrganizationSchema, BreadcrumbSchema, ServiceSchema };
