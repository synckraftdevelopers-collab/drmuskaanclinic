"use client";

import React from "react";
import { Smile, MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ExternalLink } from "lucide-react";
import { CLINIC_INFO, DOCTOR_PROFILE } from "../lib/content";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActiveTab, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 border-t-4 border-slate-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: About the Clinic */}
          <div className="space-y-4 text-left" id="footer-about">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-teal flex items-center justify-center">
                <Smile className="text-linen" size={20} />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Muskaan Clinic
              </span>
            </div>
            <p className="text-linen/80 text-sm leading-relaxed">
              Experience the perfect harmony of premium clinical hair restorations, skin care aesthetics, andclassical, safe constitutional homeopathy. Restoring patient confidence and permanent health for over 26 years.
            </p>
            <div className="flex items-center space-x-2 text-xs text-seafoam">
              <ShieldCheck size={16} />
              <span>Registered Medical Practitioner (Amravati)</span>
            </div>
          </div>

          {/* Column 2: Clinical Services */}
          <div className="space-y-4 text-left" id="footer-services">
            <h3 className="font-serif text-lg font-semibold border-b border-white/10 pb-2 text-seafoam">
              Our Specialties
            </h3>
            <ul className="space-y-2 text-sm text-linen/80">
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-seafoam hover:underline text-left transition-all cursor-pointer"
                >
                  Platelet-Rich Plasma (PRP)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-seafoam hover:underline text-left transition-all cursor-pointer"
                >
                  Advanced Chemical Peels
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-seafoam hover:underline text-left transition-all cursor-pointer"
                >
                  Skin Toning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-seafoam hover:underline text-left transition-all cursor-pointer"
                >
                  Constitutional Homeopathy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab("services")} 
                  className="hover:text-seafoam hover:underline text-left transition-all cursor-pointer"
                >
                  Chronic Skin Care (Psoriasis/Eczema)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinic Hours */}
          <div className="space-y-4 text-left" id="footer-hours">
            <h3 className="font-serif text-lg font-semibold border-b border-white/10 pb-2 text-seafoam">
              Clinic Timing
            </h3>
            <div className="space-y-3 text-sm text-linen/80">
              {CLINIC_INFO.hours.map((h, i) => (
                <div key={i} className="flex flex-col space-y-0.5">
                  <span className="font-semibold text-white flex items-center space-x-1.5">
                    <Clock size={14} className="text-seafoam" />
                    <span>{h.days}</span>
                  </span>
                  <span className="pl-5 text-xs text-linen/75">{h.timings}</span>
                </div>
              ))}
              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="w-full bg-slate-teal hover:bg-linen hover:text-charcoal text-white font-semibold py-2 px-4 rounded-lg transition-colors text-xs text-center cursor-pointer"
                >
                  Book Priority Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4 text-left" id="footer-contact">
            <h3 className="font-serif text-lg font-semibold border-b border-white/10 pb-2 text-seafoam">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-linen/80">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-seafoam shrink-0 mt-1" />
                <span className="leading-tight">{CLINIC_INFO.address}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone size={16} className="text-seafoam shrink-0 mt-1" />
                <span>
                  Primary: +91 {CLINIC_INFO.phone}<br />
                  WhatsApp: +91 {CLINIC_INFO.phone}
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-seafoam shrink-0" />
                <span className="truncate">{CLINIC_INFO.email}</span>
              </li>
              <li className="pt-2">
                <a 
                  href={CLINIC_INFO.googleBusinessProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs text-seafoam hover:underline font-bold"
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
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center text-left">
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-inner h-48 bg-white/5 relative border border-white/15">
            <iframe 
              src={CLINIC_INFO.mapEmbedUrl}
              width="100%" 
              height="100%" 
              style={{ border: 0, opacity: 0.85 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Muskaan Clinic Amravati Location Map"
            />
          </div>
          <div className="space-y-3 text-sm text-linen/80 bg-white/5 p-5 rounded-xl border border-white/10">
            <h4 className="font-serif text-white font-bold">Clinical Philosophy</h4>
            <p className="text-xs leading-relaxed italic">
              "We combine the rapid external revitalization of advanced aesthetics with the gentle, deep systemic restoration of classical homeopathy to provide healthy smiles that last."
            </p>
            <p className="text-xs font-semibold text-right text-seafoam">— {DOCTOR_PROFILE.name}</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-linen/60">
          <p>© {currentYear} Muskaan Clinic (Skin & Homeopathy). All Rights Reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Made with</span>
            <Heart size={12} className="text-red-400 fill-red-400" />
            <span>in Amravati, Maharashtra</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
