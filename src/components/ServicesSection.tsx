"use client";

import React, { useState } from "react";
import { Sparkles, HeartPulse, Activity, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { CLINIC_SERVICES } from "../lib/content";

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<"hair" | "skin" | "homeopathy">("hair");

  const currentService = CLINIC_SERVICES.find(s => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const getServiceIcon = (id: string, colorClass: string, size: number) => {
    switch (id) {
      case "hair":
        return <Sparkles className={colorClass} size={size} />;
      case "skin":
        return <HeartPulse className={colorClass} size={size} />;
      case "homeopathy":
        return <Activity className={colorClass} size={size} />;
      default:
        return <ShieldCheck className={colorClass} size={size} />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linen/25 text-left" id="treatments-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
            Clinical Catalog
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3">
            Bespoke Medical & Holistic Care
          </h2>
          <p className="text-charcoal/70 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Explore our specialized treatments. We combine advanced dermo-cosmetic aesthetics with personalized constitutional homeopathy for permanent skin and hair health.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10 max-w-4xl mx-auto">
          {CLINIC_SERVICES.map((serv) => (
            <button
              key={serv.id}
              onClick={() => setSelectedServiceId(serv.id as any)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border text-left transition-all cursor-pointer flex-1 ${
                selectedServiceId === serv.id
                  ? "bg-white border-slate-teal text-slate-teal ring-2 ring-slate-teal/20 shadow-md"
                  : "bg-white/60 border-linen hover:bg-white text-charcoal/70"
              }`}
              id={`service-tab-${serv.id}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                selectedServiceId === serv.id ? "bg-slate-teal text-white" : "bg-linen text-slate-teal"
              }`}>
                {getServiceIcon(serv.id, "", 20)}
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm leading-tight">{serv.title}</h3>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-charcoal/50 mt-0.5">{serv.id === 'homeopathy' ? 'Internal Healing' : 'Advanced Procedure'}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Highlight Banner of selected Service */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Info Column */}
          <div className="lg:col-span-1 bg-white border border-linen rounded-2xl p-6 sm:p-8 shadow-xs sticky top-24 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-teal rounded-xl flex items-center justify-center text-white">
                {getServiceIcon(currentService.id, "text-linen", 24)}
              </div>
              <h3 className="font-serif text-2xl font-bold text-charcoal">{currentService.title}</h3>
            </div>
            
            <p className="text-sm font-semibold text-slate-teal italic">
              "{currentService.tagline}"
            </p>

            <p className="text-sm text-charcoal/80 leading-relaxed">
              {currentService.description}
            </p>

            {/* Synergy box */}
            <div className="bg-linen/40 border border-linen p-5 rounded-xl space-y-2 text-left">
              <h4 className="font-serif text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center space-x-1.5">
                <ShieldCheck size={14} className="text-slate-teal" />
                <span>The Homeopathic Synergy</span>
              </h4>
              <p className="text-xs text-charcoal/70 leading-normal">
                {currentService.homeopathicSynergy}
              </p>
            </div>

            <button
              onClick={() => onOpenBooking(currentService.id)}
              className="w-full bg-slate-teal hover:bg-charcoal text-white font-bold py-3 px-4 rounded-xl transition-colors text-center text-xs shadow-md shadow-slate-teal/10 cursor-pointer"
              id={`service-book-btn-${currentService.id}`}
            >
              Book {currentService.title} Consult
            </button>
          </div>

          {/* Sub Services Detail Grid */}
          <div className="lg:col-span-2 space-y-6" id="sub-services-grid">
            {currentService.subServices.map((sub, idx) => (
              <div 
                key={idx}
                className="bg-white border border-linen rounded-2xl p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-charcoal">{sub.name}</h4>
                    <span className="inline-flex items-center space-x-1.5 text-xs text-charcoal/50 font-bold bg-linen/50 px-2.5 py-1 rounded-md mt-1.5">
                      <Clock size={12} className="text-slate-teal" />
                      <span>Est: {sub.duration}</span>
                    </span>
                  </div>
                  {sub.priceEstimate && (
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-teal bg-slate-teal/10 border border-slate-teal/20 px-2.5 py-1 rounded-full text-center shrink-0 self-start sm:self-auto">
                      {sub.priceEstimate}
                    </span>
                  )}
                </div>

                <p className="text-sm text-charcoal/70 leading-relaxed">
                  {sub.description}
                </p>

                <div className="border-t border-linen pt-4 text-left">
                  <h5 className="text-xs uppercase font-bold text-charcoal/60 tracking-wider mb-2">Key Clinical Benefits</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sub.benefits.map((ben, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2 text-xs text-charcoal/80">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
