import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Muskaan Clinic | Hair, Skin & Homeopathy in Amravati',
    short_name: 'Muskaan Clinic',
    description: 'Official brand portal and interactive guide for Muskaan Clinic in Amravati, specializing in hair restoration, skin care, and personalized homeopathy services led by Dr. Mohammad Imran Shaikh.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1F4D',
    theme_color: '#0d9488',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      }
    ],
  };
}
