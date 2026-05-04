/**
 * Schema.org structured data utilities for SEO
 */

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MP Doors & More",
    "image": "https://d2xsxph8kpxj0f.cloudfront.net/310519663550653372/5TbzSUw4BV9iqQ6METysLN/hero-banner-JGKqZgmMvV9heZ7iiLwaZQ.webp",
    "description": "Premium doors, windows, vinyl flooring, and trim & molding supplier in Sherman, TX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3200 N Texoma Pkwy",
      "addressLocality": "Sherman",
      "addressRegion": "TX",
      "postalCode": "75090",
      "addressCountry": "US"
    },
    "telephone": "(903) 421-1305",
    "url": "https://mpdoorsmore.com",
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "07:00",
        "closes": "15:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/p/MP-Doors-More-61550671844372/"
    ]
  };
};

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  brands: string[];
  rating?: number;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": product.brands.map(brand => ({
      "@type": "Brand",
      "name": brand
    })),
    ...(product.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "bestRating": "5",
        "worstRating": "1"
      }
    })
  };
};

export const injectSchema = (schema: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
