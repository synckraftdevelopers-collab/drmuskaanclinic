"use client";

import React from "react";
import Image from "next/image";
import { MapPinned, PhoneCall, Mail, Clock3, ShieldCheck, Heart, ExternalLink, CalendarCheck } from "lucide-react";
import { motion } from "motion/react";
import { CLINIC_INFO, DOCTOR_PROFILE } from "../lib/content";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActiveTab, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-4 border-[#F86008] bg-[linear-gradient(180deg,#FFFFFF_0%,#FBF6FC_55%,#FFF4EC_100%)] pt-16 pb-8 text-[#2F3542]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 text-left" id="footer-about">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-[150px] shrink-0">
                <Image
                  src="/muskaan-clinic-logo.png"
                  alt="Muskaan Clinic logo"
                  fill
                  sizes="150px"
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#2F3542]/78">
              Experience the perfect harmony of premium clinical hair restorations, skin care aesthetics, and classical, safe constitutional homeopathy. Restoring patient confidence and permanent health for over 26 years.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#500868]">
              <ShieldCheck size={16} className="text-[#F86008]" />
              <span>Registered Medical Practitioner (Amravati)</span>
            </div>
          </div>

          <div className="space-y-4 text-left" id="footer-services">
            <h3 className="border-b border-[#500868]/12 pb-2 font-serif text-lg font-semibold text-[#500868]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[#2F3542]/78">
              <li>
                <button onClick={() => setActiveTab("services")} className="text-left transition-all hover:text-[#F86008] hover:underline cursor-pointer">Treatments &amp; Services</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("doctor")} className="text-left transition-all hover:text-[#F86008] hover:underline cursor-pointer">About Dr. Imran Shaikh</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("gallery")} className="text-left transition-all hover:text-[#F86008] hover:underline cursor-pointer">Clinic Gallery</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("testimonials")} className="text-left transition-all hover:text-[#F86008] hover:underline cursor-pointer">Patient Stories</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("faq")} className="text-left transition-all hover:text-[#F86008] hover:underline cursor-pointer">FAQs &amp; Guides</button>
              </li>
              <li>
                <button onClick={() => setActiveTab("contact")} className="text-left transition-all hover:text-[#F86008] hover:underline cursor-pointer">Contact &amp; Directions</button>
              </li>
            </ul>
            <div className="pt-2 space-y-1">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#500868]/50 pb-1">Follow Us</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Instagram", href: CLINIC_INFO.socialLinks.instagram },
                  { label: "Facebook", href: CLINIC_INFO.socialLinks.facebook },
                  { label: "YouTube", href: CLINIC_INFO.socialLinks.youtube },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-[#500868]/12 bg-white px-3 py-1.5 text-[11px] font-bold text-[#500868] transition-all hover:border-[#F86008]/40 hover:text-[#F86008]"
                  >
                    {s.label}
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left" id="footer-hours">
            <h3 className="border-b border-[#500868]/12 pb-2 font-serif text-lg font-semibold text-[#500868]">
              Clinic Timing
            </h3>
            <div className="space-y-3 text-sm text-[#2F3542]/78">
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="flex flex-col space-y-0.5">
                  <span className="flex items-center gap-1.5 font-semibold text-[#2F3542]">
                    <Clock3 size={14} className="text-[#F86008]" />
                    <span>{h.days}</span>
                  </span>
                  <span className="pl-5 text-xs text-[#2F3542]/62">{h.timings}</span>
                </div>
              ))}
              <div className="pt-3 w-full">
                <button
                  onClick={onOpenBooking}
                  aria-label="Book Priority Appointment"
                  className="group inline-flex h-[44px] w-full items-center justify-center gap-[6px] rounded-[12px] border border-[#500868]/8 bg-[linear-gradient(135deg,#500868_0%,#F86008_100%)] px-[18px] py-[10px] text-[14px] font-semibold text-white shadow-[0_10px_30px_rgba(80,8,104,0.18)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_18px_40px_rgba(248,96,8,0.22)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F86008] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer"
                >
                  <CalendarCheck size={16} className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                  <span>Book Priority Appointment</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left" id="footer-contact">
            <h3 className="border-b border-[#500868]/12 pb-2 font-serif text-lg font-semibold text-[#500868]">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-[#2F3542]/78">
              <li className="flex items-start gap-2.5">
                <MapPinned size={16} className="mt-1 shrink-0 text-[#F86008]" />
                <span className="leading-tight">{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneCall size={16} className="mt-1 shrink-0 text-[#F86008]" />
                <span>
                  Primary: +91 {CLINIC_INFO.phone}<br />
                  WhatsApp: +91 {CLINIC_INFO.phone}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-[#F86008]" />
                <span className="truncate">{CLINIC_INFO.email}</span>
              </li>
              <li className="pt-2">
                <a
                  href={CLINIC_INFO.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#500868] transition-colors hover:text-[#F86008] hover:underline"
                  id="footer-google-business-link"
                >
                  <span>Google Business Profile</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-8 border-t border-[#500868]/12 pt-8 text-left lg:grid-cols-3">
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-[#500868]/12 bg-white shadow-[0_8px_28px_rgba(80,8,104,0.08)] transition-shadow duration-300 hover:shadow-[0_14px_34px_rgba(80,8,104,0.12)]">
              <iframe
                src={CLINIC_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, opacity: 0.95 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Muskaan Clinic Amravati Location Map"
                className="h-full w-full"
              />
            </div>
            <div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Dr.+Imran+Shaikh+(Muskaan+Clinic),+Amravati"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Directions to Muskaan Clinic Amravati"
                className="group inline-flex h-[48px] items-center justify-center gap-[8px] rounded-[14px] border border-[#500868]/8 bg-[linear-gradient(135deg,#500868_0%,#F86008_100%)] px-[28px] py-[14px] text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(80,8,104,0.18)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_18px_40px_rgba(248,96,8,0.22)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F86008] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <MapPinned size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
          <div className="space-y-3 rounded-xl border border-[#500868]/12 bg-white/90 p-5 text-sm text-[#2F3542]/78 shadow-[0_8px_28px_rgba(80,8,104,0.08)]">
            <h4 className="font-serif text-lg font-bold text-[#500868]">Clinical Philosophy</h4>
            <p className="text-sm leading-relaxed italic text-[#2F3542]/78">
              "We combine the rapid external revitalization of advanced aesthetics with the gentle, deep systemic restoration of classical homeopathy to provide healthy smiles that last."
            </p>
            <p className="text-right text-xs font-semibold text-[#F86008]">- {DOCTOR_PROFILE.name}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#500868]/12 pt-6 text-xs text-[#2F3542]/62 sm:flex-row">
          <p>&copy; {currentYear} Muskaan Clinic (Skin & Homeopathy). All Rights Reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-semibold text-[#500868] underline underline-offset-4 transition-colors duration-200 hover:text-[#F86008] cursor-pointer"
          >
            Back to top
          </button>
          <p className="flex items-center gap-1 text-[#2F3542]/62">
            <span>Made with</span>
            <Heart size={12} className="fill-[#F86008] text-[#F86008]" />
            <span>in Amravati, Maharashtra</span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
