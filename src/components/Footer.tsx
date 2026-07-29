"use client";

import React from "react";
import { Smile, MapPinned, PhoneCall, Mail, Clock3, ShieldCheck, Heart, ExternalLink, CalendarCheck } from "lucide-react";
import { motion } from "motion/react";
import { CLINIC_INFO, DOCTOR_PROFILE } from "../lib/content";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActiveTab, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <footer className="bg-[#0B1F4D] text-white pt-16 pb-8 border-t-4 border-slate-teal overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: About the Clinic */}
          <div className="space-y-4 text-left" id="footer-about">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                <Smile className="text-white" size={20} />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Muskaan Clinic
              </span>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
              Experience the perfect harmony of premium clinical hair restorations, skin care aesthetics, and classical, safe constitutional homeopathy. Restoring patient confidence and permanent health for over 26 years.
            </p>
            <div className="flex items-center space-x-2 text-xs text-teal-400">
              <ShieldCheck size={16} />
              <span>Registered Medical Practitioner (Amravati)</span>
            </div>
          </div>

          {/* Column 2: Clinical Services */}
          <div className="space-y-4 text-left" id="footer-services">
            <h3 className="font-serif text-lg font-semibold border-b border-white/20 pb-2 text-teal-400">
              Our Specialties
            </h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-teal-300 hover:underline text-left transition-all cursor-pointer"
                >
                  Skin Toning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-teal-300 hover:underline text-left transition-all cursor-pointer"
                >
                  Constitutional Homeopathy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-teal-300 hover:underline text-left transition-all cursor-pointer"
                >
                  Chronic Skin Care (Psoriasis/Eczema)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinic Hours */}
          <div className="space-y-4 text-left" id="footer-hours">
            <h3 className="font-serif text-lg font-semibold border-b border-white/20 pb-2 text-teal-400">
              Clinic Timing
            </h3>
            <div className="space-y-3 text-sm text-gray-200">
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="flex flex-col space-y-0.5">
                  <span className="font-semibold text-white flex items-center space-x-1.5">
                    <Clock3 size={14} className="text-teal-400" />
                    <span>{h.days}</span>
                  </span>
                  <span className="pl-5 text-xs text-gray-300">{h.timings}</span>
                </div>
              ))}
              <div className="pt-3 w-full">
                <button
                  onClick={onOpenBooking}
                  aria-label="Book Priority Appointment"
                  className="w-full inline-flex items-center justify-center gap-[6px] h-[44px] px-[18px] py-[10px] rounded-[12px] text-[14px] font-semibold text-white cursor-pointer transition-all duration-300 ease-out shadow-[0_10px_30px_rgba(13,148,136,0.30)] hover:shadow-[0_18px_40px_rgba(13,148,136,0.40)] hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal bg-gradient-to-r from-teal-500 to-[#0d7c73] hover:from-[#0b655e] hover:to-[#084b46] group"
                >
                  <CalendarCheck size={16} className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                  <span>Book Priority Appointment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4 text-left" id="footer-contact">
            <h3 className="font-serif text-lg font-semibold border-b border-white/20 pb-2 text-teal-400">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-200">
              <li className="flex items-start space-x-2.5">
                <MapPinned size={16} className="text-teal-400 shrink-0 mt-1" />
                <span className="leading-tight">{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <PhoneCall size={16} className="text-teal-400 shrink-0 mt-1" />
                <span>
                  Primary: +91 {CLINIC_INFO.phone}<br />
                  WhatsApp: +91 {CLINIC_INFO.phone}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-teal-400 shrink-0" />
                <span className="truncate">{CLINIC_INFO.email}</span>
              </li>
              <li className="pt-2">
                <a 
                  href={CLINIC_INFO.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-teal-400 hover:text-teal-300 hover:underline font-bold transition-colors"
                  id="footer-google-business-link"
                >
                  <span>Google Business Profile</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Map Embed and Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center text-left">
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <div className="rounded-xl overflow-hidden shadow-inner h-48 bg-white/5 relative border border-white/20 w-full hover:shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-shadow duration-300">
              <iframe 
                src={CLINIC_INFO.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, opacity: 0.95 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Muskaan Clinic Amravati Location Map"
                className="w-full h-full"
              />
            </div>
            <div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Dr.+Imran+Shaikh+(Muskaan+Clinic),+Amravati"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get Directions to Muskaan Clinic Amravati"
                className="inline-flex items-center justify-center gap-[8px] h-[48px] px-[28px] py-[14px] rounded-[14px] text-[15px] font-semibold text-white cursor-pointer transition-all duration-300 ease-out border border-white/[0.08] shadow-[0_12px_30px_rgba(13,148,136,0.28)] hover:shadow-[0_18px_40px_rgba(13,148,136,0.40)] hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1F4D] bg-gradient-to-r from-teal-500 to-[#0d7c73] hover:from-[#0b655e] hover:to-[#084b46] group"
              >
                <MapPinned size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-200 bg-white/10 p-5 rounded-xl border border-white/20 hover:bg-white/[0.12] transition-colors duration-300">
            <h4 className="font-serif !text-white font-bold text-lg">Clinical Philosophy</h4>
            <p className="text-sm leading-relaxed italic text-gray-200">
              "We combine the rapid external revitalization of advanced aesthetics with the gentle, deep systemic restoration of classical homeopathy to provide healthy smiles that last."
            </p>
            <p className="text-xs font-semibold text-right text-teal-400">— {DOCTOR_PROFILE.name}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p className="text-gray-300">© {currentYear} Muskaan Clinic (Skin & Homeopathy). All Rights Reserved.</p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-white transition-colors cursor-pointer underline underline-offset-4 font-semibold text-teal-400 hover:scale-105 transform duration-200"
          >
            ↑ Back to top
          </button>
          <p className="flex items-center space-x-1 text-gray-300">
            <span>Made with</span>
            <Heart size={12} className="text-red-400 fill-red-400 animate-pulse" />
            <span>in Amravati, Maharashtra</span>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
