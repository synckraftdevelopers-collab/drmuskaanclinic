import React from 'react';
import { CLINIC_INFO, CLINIC_FAQS, DOCTOR_PROFILE, CLINIC_SERVICES } from '@/lib/content';

export default function JsonLd() {
  const baseUrl = 'https://muskaanclinic.com';

  const medicalClinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: CLINIC_INFO.name,
    image: `${baseUrl}/icon.png`,
    '@id': baseUrl,
    url: baseUrl,
    telephone: `+91${CLINIC_INFO.phone}`,
    email: CLINIC_INFO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINIC_INFO.address.split(',')[0],
      addressLocality: CLINIC_INFO.city,
      addressRegion: CLINIC_INFO.state,
      postalCode: CLINIC_INFO.postalCode,
      addressCountry: CLINIC_INFO.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.932, // Amravati approximate coords, should ideally be precise
      longitude: 77.7523,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '10:00',
        closes: '14:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '18:30',
        closes: '21:30'
      }
    ],
    sameAs: [
      CLINIC_INFO.socialLinks.facebook,
      CLINIC_INFO.socialLinks.instagram,
      CLINIC_INFO.socialLinks.youtube,
      CLINIC_INFO.googleBusinessProfileUrl
    ],
    priceRange: '$$',
    medicalSpecialty: [
      'Dermatology',
      'Homeopathic',
      'Hair Restoration',
      'Aesthetic Medicine'
    ],
    areaServed: {
      '@type': 'City',
      name: CLINIC_INFO.city
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CLINIC_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
