"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PhoneCall, Clock3, MapPinned, ShieldCheck, Menu, X, CalendarCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CLINIC_INFO } from "../lib/content";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Treatments & Services" },
    { id: "doctor", label: "Dr. Imran Shaikh" },
    { id: "gallery", label: "Gallery" },
    { id: "testimonials", label: "Patient Reviews" },
    { id: "faq", label: "FAQs" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-linen shadow-xs">
      {/* Top bar with quick info */}
      <div className="hidden md:block bg-charcoal text-[rgba(255,255,255,0.85)] py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[14px] lg:text-[15px] leading-[1.5] tracking-[0.2px]">
          <div className="flex items-center md:space-x-[40px] lg:space-x-[56px]">
            <span className="flex items-center space-x-[10px] group transition-colors duration-[250ms] cursor-default">
              <PhoneCall size={18} className="text-[#2DD4BF] transition-transform duration-[250ms] group-hover:scale-[1.08]" aria-hidden="true" />
              <span className="transition-colors duration-[250ms] text-[rgba(255,255,255,0.85)] group-hover:text-[#FFFFFF]">
                <span className="font-[500]">Call: </span>
                <span className="font-[600] text-[#FFFFFF]">+91 {CLINIC_INFO.phone}</span>
              </span>
            </span>
            <span className="flex items-center space-x-[10px] group transition-colors duration-[250ms] cursor-default">
              <Clock3 size={18} className="text-[#2DD4BF] transition-transform duration-[250ms] group-hover:scale-[1.08]" aria-hidden="true" />
              <span className="transition-colors duration-[250ms] text-[rgba(255,255,255,0.85)] group-hover:text-[#FFFFFF]">
                <span className="font-[500]">Mon – Sat: </span>
                <span className="font-[600] text-[#FFFFFF]">10:00 AM – 2:30 PM | 6:30 PM – 9:30 PM</span>
              </span>
            </span>
          </div>
          <div className="flex items-center md:space-x-[40px] lg:space-x-[56px]">
            <span className="flex items-center space-x-[10px] group transition-colors duration-[250ms] cursor-default">
              <MapPinned size={18} className="text-[#2DD4BF] transition-transform duration-[250ms] group-hover:scale-[1.08]" aria-hidden="true" />
              <span className="font-[500] text-[rgba(255,255,255,0.85)] group-hover:text-[#FFFFFF] transition-colors duration-[250ms]">
                {CLINIC_INFO.city}, {CLINIC_INFO.state}
              </span>
            </span>
            <span className="flex items-center space-x-[10px] group transition-colors duration-[250ms] cursor-default">
              <ShieldCheck size={18} className="text-[#2DD4BF] transition-transform duration-[250ms] group-hover:scale-[1.08]" aria-hidden="true" />
              <span className="font-[600] text-[#FFFFFF] group-hover:text-[#FFFFFF] transition-colors duration-[250ms]">
                {CLINIC_INFO.experience} of Clinical Practice
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          className="flex items-center cursor-pointer group shrink-0"
          onClick={() => handleNavClick("home")}
          id="brand-logo"
        >
          <Image 
            src="/logo (2).png" 
            alt="Muskaan Clinic Logo" 
            width={480} 
            height={160} 
            className="h-[72px] sm:h-[88px] w-auto -my-3 sm:-my-5 object-contain object-left transition-transform group-hover:scale-105"
            priority
            quality={100}
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-medium text-xs sm:text-sm transition-colors relative py-1 cursor-pointer ${
                activeTab === item.id
                  ? "text-slate-teal font-bold"
                  : "text-charcoal/70 hover:text-slate-teal"
              }`}
              id={`nav-${item.id}`}
            >
              {item.label}
              {activeTab === item.id && (
                <motion.span 
                  layoutId="activeNavUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-teal rounded-full" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex items-center space-x-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center space-x-2 bg-gradient-to-r from-slate-teal to-[#0d7c73] hover:from-[#0b655e] hover:to-[#084b46] text-white font-semibold py-2.5 px-6 rounded-full shadow-[0_4px_14px_rgba(13,148,136,0.25)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 group focus:ring-4 focus:ring-slate-teal/20 outline-none text-xs sm:text-sm cursor-pointer"
            id="header-booking-btn"
          >
            <CalendarCheck size={16} className="text-seafoam transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-charcoal focus:outline-none p-1.5 rounded-md hover:bg-linen/50 transition-colors"
            id="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-linen bg-white py-4 px-4 shadow-inner overflow-hidden"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-medium py-2 px-3 rounded-lg transition-colors text-sm cursor-pointer ${
                    activeTab === item.id
                      ? "bg-linen text-slate-teal font-bold"
                      : "text-charcoal/80 hover:bg-linen/30 hover:text-slate-teal"
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-linen flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-teal to-[#0d7c73] hover:from-[#0b655e] hover:to-[#084b46] text-white font-bold py-3 px-4 rounded-full shadow-[0_4px_14px_rgba(13,148,136,0.25)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.4)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-102 group text-sm cursor-pointer"
                  id="mobile-booking-btn"
                >
                  <CalendarCheck size={16} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                  <span>Book Appointment</span>
                </button>
                <div className="text-center text-xs text-charcoal/60 pt-2 space-y-1">
                  <p>ðŸ“ž +91 {CLINIC_INFO.phone}</p>
                  <p>ðŸ“  Irwin Square, Amravati</p>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

