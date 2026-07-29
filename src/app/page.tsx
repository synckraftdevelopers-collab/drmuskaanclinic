import { Metadata } from "next";
import MuskaanApp from "@/components/MuskaanApp";

export const metadata: Metadata = {
  title: "Muskaan Clinic | Hair, Skin & Homeopathy in Amravati",
  description: "Official brand portal and interactive guide for Muskaan Clinic in Amravati, specializing in hair restoration, skin care, and personalized homeopathy.",
  alternates: {
    canonical: "https://muskaanclinic.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function Home() {
  return <MuskaanApp />;
}
