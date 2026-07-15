"use client";

import React from "react";
import { Award, Briefcase, Users, Calendar, BookOpen, Quote, Sparkles, ShieldCheck } from "lucide-react";
import { DOCTOR_PROFILE } from "../lib/content";

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-left" id="about-doctor-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Visual Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
            Chief Consultant
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3">
            Mastery Behind Muskaan Clinic
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2">
            Meet the doctor bringing the ultimate integration of modern medical aesthetics and classical homeopathy to Amravati.
          </p>
        </div>

        {/* Doctor Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Column 1: Graphic / Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Dr Profile card */}
            <div className="col-span-2 bg-linen/30 border border-linen rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 bg-slate-teal/5 rounded-full -ml-6 -mt-6" />
              <div className="w-20 h-20 rounded-full bg-slate-teal/10 border border-slate-teal/20 flex items-center justify-center mx-auto shadow-xs">
                <Users size={36} className="text-slate-teal" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">{DOCTOR_PROFILE.name}</h3>
                <p className="text-xs text-slate-teal font-semibold mt-0.5">{DOCTOR_PROFILE.credentials}</p>
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-charcoal/50 mt-1">{DOCTOR_PROFILE.title}</p>
              </div>
              <div className="border-t border-linen pt-3 text-xs font-semibold text-charcoal/70">
                ⭐ BHMS CCMP Nasik University
              </div>
            </div>

            {/* Metric 1 */}
            <div className="bg-white border border-linen p-5 rounded-2xl text-center space-y-2">
              <span className="text-3xl font-serif font-bold text-slate-teal block">26+</span>
              <span className="text-[10px] uppercase font-extrabold text-charcoal/60 tracking-wider block">Years of Practice</span>
              <p className="text-xs text-charcoal/70">Continuous clinical service in Amravati</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-white border border-linen p-5 rounded-2xl text-center space-y-2">
              <span className="text-3xl font-serif font-bold text-slate-teal block">15,000+</span>
              <span className="text-[10px] uppercase font-extrabold text-charcoal/60 tracking-wider block">Happy Patients</span>
              <p className="text-xs text-charcoal/70">Across Vidarbha and central India</p>
            </div>

            {/* Trust badge */}
            <div className="col-span-2 bg-charcoal text-white p-4 rounded-xl flex items-center space-x-3">
              <ShieldCheck className="text-seafoam shrink-0" size={24} />
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-seafoam font-bold">Clinical Philosophy</span>
                <p className="text-xs text-linen/90 leading-tight mt-0.5">Dual-mode constitutional healing focusing on permanent side-effect-free recoveries.</p>
              </div>
            </div>

          </div>

          {/* Column 2: Biography & Philosophy details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dr Philosophy quote */}
            <div className="bg-linen/20 border-l-4 border-slate-teal rounded-r-2xl p-6 relative">
              <Quote size={40} className="absolute top-2 right-2 text-slate-teal/10 rotate-180" />
              <h3 className="font-serif text-lg font-bold text-charcoal mb-2">My Message to Patients</h3>
              <p className="text-sm italic text-charcoal/80 leading-relaxed font-serif">
                "{DOCTOR_PROFILE.philosophy}"
              </p>
            </div>

            {/* Bio text */}
            <div className="space-y-3">
              <h4 className="font-serif text-xl font-bold text-charcoal border-b border-linen pb-2 flex items-center space-x-2">
                <BookOpen size={18} className="text-slate-teal" />
                <span>Professional Biography</span>
              </h4>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {DOCTOR_PROFILE.bio}
              </p>
            </div>

            {/* Areas of special expertise */}
            <div>
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-charcoal/60 mb-3">Core Specialty Portfolios</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DOCTOR_PROFILE.specialties.map((spec, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-charcoal/80 font-semibold bg-linen/20 py-2 px-3 rounded-lg border border-linen">
                    <Sparkles size={14} className="text-slate-teal shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accolades */}
            <div className="border-t border-linen pt-6 space-y-3">
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-charcoal/60">Selected Achievements & Milestones</h4>
              <ul className="space-y-2">
                {DOCTOR_PROFILE.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal/75 leading-tight text-left">
                    <span className="w-1.5 h-1.5 bg-slate-teal rounded-full mt-1.5 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="bg-slate-teal hover:bg-charcoal text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors text-xs cursor-pointer inline-flex items-center space-x-2"
                id="doctor-profile-book-btn"
              >
                <span>Request Clinical Evaluation with Dr. Shaikh</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
