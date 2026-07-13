import { CLINIC_INFO } from "./content";

/**
 * Returns structured JSON-LD schemas as objects.
 * These can be rendered into a <script type="application/ld+json"> tag.
 */

export function getMedicalClinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": CLINIC_INFO.name,
    "description": "Premium integrated hair restoration, skin care aesthetics, and classical constitutional homeopathy in Amravati.",
    "url": "https://muskaanclinic.com",
    "logo": "https://muskaanclinic.com/logo.png",
    "image": "https://muskaanclinic.com/images/clinic_interior.jpg",
    "telephone": `+91 ${CLINIC_INFO.phone}`,
    "email": CLINIC_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Irwin Square",
      "addressLocality": CLINIC_INFO.city,
      "addressRegion": CLINIC_INFO.state,
      "postalCode": CLINIC_INFO.postalCode,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.934948",
      "longitude": "77.755490"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "13:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "16:30",
        "closes": "20:30"
      }
    ],
    "sameAs": [
      CLINIC_INFO.socialLinks.facebook,
      CLINIC_INFO.socialLinks.instagram,
      CLINIC_INFO.socialLinks.youtube
    ]
  };
}

export function getPhysicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": CLINIC_INFO.doctor,
    "image": "https://muskaanclinic.com/images/doctor_imran_shaikh.jpg",
    "medicalSpecialty": [
      "Dermatology",
      "CosmeticClinicalMedicine",
      "Homeopathy"
    ],
    "credentials": CLINIC_INFO.credentials,
    "telephone": `+91 ${CLINIC_INFO.phone}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Irwin Square",
      "addressLocality": CLINIC_INFO.city,
      "addressRegion": CLINIC_INFO.state,
      "postalCode": CLINIC_INFO.postalCode,
      "addressCountry": "IN"
    },
    "knowsAbout": [
      "Hair PRP Restoration",
      "Chemical Peels",
      "Classical constitutional homeopathy",
      "Autoimmune skin conditions",
      "Acne therapy"
    ]
  };
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": CLINIC_INFO.name,
    "image": "https://muskaanclinic.com/images/clinic_interior.jpg",
    "telephone": `+91 ${CLINIC_INFO.phone}`,
    "email": CLINIC_INFO.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Irwin Square",
      "addressLocality": CLINIC_INFO.city,
      "addressRegion": CLINIC_INFO.state,
      "postalCode": CLINIC_INFO.postalCode,
      "addressCountry": "IN"
    }
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
