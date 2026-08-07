import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://muskaanclinic.com"),
  title: {
    default: "Muskaan Clinic | Hair, Skin & Homeopathy in Amravati",
    template: "%s | Muskaan Clinic",
  },
  description:
    "Official brand portal and interactive guide for Muskaan Clinic in Amravati, specializing in hair restoration, skin care, and personalized homeopathy services led by Dr. Mohammad Imran Shaikh.",
  applicationName: "Muskaan Clinic",
  authors: [{ name: "Dr. Mohammad Imran Shaikh" }],
  creator: "Muskaan Clinic",
  publisher: "Muskaan Clinic",
  category: "Medical Clinic",
  referrer: "origin-when-cross-origin",
  keywords: ["Muskaan Clinic", "Homeopathy Amravati", "Skin Clinic Amravati", "Hair Restoration", "Dr. Imran Shaikh", "Dermatology Amravati"],
  openGraph: {
    title: "Muskaan Clinic | Hair, Skin & Homeopathy in Amravati",
    description: "Official brand portal for Muskaan Clinic in Amravati, specializing in hair restoration, skin care, and personalized homeopathy.",
    url: "https://muskaanclinic.com",
    siteName: "Muskaan Clinic",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "Muskaan Clinic Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muskaan Clinic | Hair, Skin & Homeopathy in Amravati",
    description: "Official brand portal for Muskaan Clinic in Amravati.",
    creator: "@muskaanclinic",
    site: "@muskaanclinic",
    images: ["/icon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden max-w-full bg-global-medical-gradient">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="min-h-full w-full max-w-full flex flex-col overflow-x-hidden bg-global-medical-gradient">
        {children}
      </body>
    </html>
  );
}
