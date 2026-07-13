import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muskaan Clinic | Hair, Skin & Homeopathy in Amravati",
  description:
    "Official brand portal and interactive guide for Muskaan Clinic in Amravati, specializing in hair restoration, skin care, and personalized homeopathy services led by Dr. Mohammad Imran Shaikh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
