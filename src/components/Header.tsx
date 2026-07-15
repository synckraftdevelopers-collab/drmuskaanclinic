"use client";

import React, { useState } from "react";
import { Smile, Phone, Clock, Menu, X, Calendar } from "lucide-react";
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
      <div className="hidden md:block bg-charcoal text-linen/90 py-2 px-6 text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <Phone size={14} className="text-seafoam" />
              <span>Call: +91 {CLINIC_INFO.phone}</span>
            </span>
            <span className="flex items-center space-x-2">
              <Clock size={14} className="text-seafoam" />
              <span>Mon – Sat: 10:00 AM – 2:30 PM, 6:30 PM – 9:30 PM</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-slate-teal/40 text-seafoam font-medium px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              {CLINIC_INFO.city}, {CLINIC_INFO.state}
            </span>
            <span className="text-[11px] font-semibold text-white">
              {CLINIC_INFO.experience} of Clinical Practice
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handleNavClick("home")}
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-slate-teal flex items-center justify-center shadow-md shadow-slate-teal/20 transition-transform group-hover:scale-105">
            <Smile className="text-linen" size={24} />
          </div>
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-2xl font-bold tracking-tight text-charcoal">Muskaan</span>
              <span className="text-slate-teal font-sans font-bold tracking-wide text-lg">Clinic</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-teal/70 font-semibold -mt-1">
              Skin & Homeopathy
            </p>
          </div>
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
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-teal rounded-full animate-fade-in" />
              )}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center space-x-4">
          <button
            onClick={onOpenBooking}
            className="flex items-center space-x-2 bg-slate-teal hover:bg-charcoal text-white font-semibold py-2.5 px-5 rounded-full shadow-md shadow-slate-teal/10 hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm cursor-pointer"
            id="header-booking-btn"
          >
            <Calendar size={16} className="text-seafoam" />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-charcoal focus:outline-none p-1.5 rounded-md hover:bg-linen/50 transition-colors"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-linen bg-white py-4 px-4 shadow-inner animate-fade-in">
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
                className="flex items-center justify-center space-x-2 bg-slate-teal text-white font-bold py-3 px-4 rounded-full shadow-md text-sm cursor-pointer"
                id="mobile-booking-btn"
              >
                <Calendar size={16} />
                <span>Book Appointment</span>
              </button>
              <div className="text-center text-xs text-charcoal/60 pt-2 space-y-1">
                <p>ðŸ“ž +91 {CLINIC_INFO.phone}</p>
                <p>ðŸ“ Irwin Square, Amravati</p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

