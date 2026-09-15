import React, { useEffect } from 'react';
import { RESTAURANT_INFO, OPERATING_HOURS, INITIAL_MENU_ITEMS } from '../data/restaurantData';

export const SeoStructuredData: React.FC = () => {
  useEffect(() => {
    const existingScript = document.getElementById('restaurant-schema-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: RESTAURANT_INFO.name,
      description: RESTAURANT_INFO.description,
      image: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
      ],
      telephone: RESTAURANT_INFO.phone,
      email: RESTAURANT_INFO.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: RESTAURANT_INFO.address,
        addressLocality: RESTAURANT_INFO.city,
        addressRegion: RESTAURANT_INFO.state,
        postalCode: RESTAURANT_INFO.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.7891,
        longitude: -122.3995,
      },
      url: window.location.origin,
      servesCuisine: ['Californian', 'French', 'Modern Contemporary', 'Wood-Fired Grill'],
      priceRange: '$$$$',
      acceptsReservations: 'True',
      openingHoursSpecification: OPERATING_HOURS.filter((h) => !h.isClosed).map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][h.dayOfWeek],
        opens: h.openTime,
        closes: h.closeTime,
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: RESTAURANT_INFO.rating.toString(),
        reviewCount: RESTAURANT_INFO.reviewCount.toString(),
      },
      hasMenu: {
        '@type': 'Menu',
        name: 'Aura Autumn Tasting & A La Carte Menu',
        hasMenuItem: INITIAL_MENU_ITEMS.slice(0, 6).map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          offers: {
            '@type': 'Offer',
            price: item.price.toString(),
            priceCurrency: 'USD',
          },
        })),
      },
    };

    const script = document.createElement('script');
    script.id = 'restaurant-schema-jsonld';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('restaurant-schema-jsonld');
      if (el) el.remove();
    };
  }, []);

  return null;
};
