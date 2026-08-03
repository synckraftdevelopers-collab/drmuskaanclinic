"use client";

import React, { useState } from "react";
import { Sparkles, HeartPulse, Activity, CheckCircle2, ShieldCheck, Baby } from "lucide-react";
import { motion } from "motion/react";
import { CLINIC_SERVICES } from "../lib/content";

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<"hair" | "skin" | "homeopathy" | "infertility">("hair");

  const currentService = CLINIC_SERVICES.find(s => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const getServiceIcon = (id: string, colorClass: string, size: number) => {
    switch (id) {
      case "hair":
        return <Sparkles className={colorClass} size={size} />;
      case "skin":
        return <HeartPulse className={colorClass} size={size} />;
      case "homeopathy":
        return <Activity className={colorClass} size={size} />;
      case "infertility":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={colorClass}
            style={{ display: 'block', margin: 'auto' }}
          >
            <path d="M 12 13 v 8" />
            <path d="M 9 18 h 6" />
            <path d="M 2.2 10.5 c -1.3 -0.6 -1.3 -2.6 0 -3.3 l 1.6 -1.1 a 2.8 2.8 0 0 1 3.6 0.4 l 3 3 c 0.4 0.4 1 0.4 1.4 0 l 3 -3 a 2.8 2.8 0 0 1 3.6 -0.4 l 1.6 1.1 c 1.3 0.7 1.3 2.7 0 3.3 l -3.3 1.8 c -1.3 0.7 -3.7 1.2 -6.1 1.2 s -4.8 -0.5 -6.1 -1.2 Z" />
          </svg>
        );
      default:
        return <ShieldCheck className={colorClass} size={size} />;
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-linen/25 text-left overflow-x-hidden relative" id="treatments-section">
      <style>{`
        @keyframes cardShine {
          0% { transform: translateX(-100%) skewX(-20deg); }
          15% { transform: translateX(200%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }
      `}</style>
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-slate-teal rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-slate-teal rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-teal/20 via-transparent to-transparent" />
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={{ 
          hidden: { opacity: 0, y: 30 }, 
          visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.15, delayChildren: 0.1 } } 
        }}
        className="max-w-7xl mx-auto w-full"
      >
        
        {/* Section Header */}
        <motion.div 
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } }}>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full inline-block">
              Clinical Catalog
            </span>
          </motion.div>
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-4 sm:mt-3 px-2 sm:px-0"
          >
            Bespoke Medical & Holistic Care
          </motion.h2>
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            className="text-charcoal/70 text-xs sm:text-base max-w-2xl mx-auto mt-3 sm:mt-2 px-2 sm:px-0 leading-relaxed"
          >
            Explore our specialized treatments. We combine advanced dermo-cosmetic aesthetics with personalized constitutional homeopathy for permanent skin and hair health.
          </motion.p>
        </motion.div>

        {/* Categories Tab Selector */}
        <motion.div 
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8 sm:mb-10 max-w-4xl mx-auto w-full px-1 sm:px-0 relative z-10"
        >
          {CLINIC_SERVICES.map((serv, idx) => (
            <motion.button
              key={serv.id}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 15px 30px rgba(13,148,136,0.15)", borderColor: "rgba(13,148,136,0.3)", transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedServiceId(serv.id as any)}
              className={`w-full sm:w-auto flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 cursor-pointer flex-1 group relative overflow-hidden ${
                selectedServiceId === serv.id
                  ? "bg-slate-teal/5 sm:bg-white border-slate-teal text-slate-teal ring-2 ring-slate-teal/20 shadow-[0_10px_30px_rgba(13,148,136,0.15)]"
                  : "bg-white/60 border-linen hover:bg-white hover:border-[rgba(13,148,136,0.35)] text-charcoal/70 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
              }`}
              id={`service-tab-${serv.id}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-[0.06] pointer-events-none" style={{ animation: 'cardShine 8s ease-in-out infinite' }} />
              <div className={`w-10 h-10 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-[1.15] group-hover:rotate-6 relative z-10 ${
                selectedServiceId === serv.id ? "bg-slate-teal text-white" : "bg-linen text-slate-teal"
              }`}>
                {getServiceIcon(serv.id, "", 20)}
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <h3 className="font-serif font-bold text-sm sm:text-sm leading-tight break-words transition-colors duration-300 group-hover:text-slate-teal group-hover:tracking-[0.2px]">{serv.title}</h3>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-charcoal/50 mt-0.5 break-words">{serv.id === 'homeopathy' ? 'Internal Healing' : serv.id === 'infertility' ? "Specialized Women's Health" : 'Advanced Procedure'}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Highlight Banner of selected Service */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-start min-h-[900px] sm:min-h-0 transition-all duration-300">
          
          {/* Main Info Column */}
          <motion.div 
            key={`main-info-outer-${currentService.id}`}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-1 sticky top-24 w-full relative z-10"
          >
            <motion.div
              animate={{ 
                y: [0, -6, 0], 
                boxShadow: ["0 18px 45px rgba(15,23,42,0.08)", "0 22px 50px rgba(13,148,136,0.12)", "0 18px 45px rgba(15,23,42,0.08)"] 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 30px 70px rgba(15,23,42,0.14)", borderColor: "rgba(13,148,136,0.35)", transition: { duration: 0.3 } }}
              className="bg-[linear-gradient(180deg,#FFFFFF,#FCFEFF)] border border-linen hover:border-[rgba(13,148,136,0.35)] rounded-xl sm:rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-6 w-full relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-[0.06] pointer-events-none" style={{ animation: 'cardShine 8s ease-in-out infinite' }} />

            <div className="flex items-center space-x-3 relative z-10">
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-teal rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-teal/20 transition-all duration-500 group-hover:scale-[1.15] group-hover:rotate-10 group-hover:shadow-[0_0_15px_rgba(13,148,136,0.6)]"
              >
                <div>
                  {getServiceIcon(currentService.id, "text-linen", 24)}
                </div>
              </motion.div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal break-words leading-tight transition-colors duration-300 group-hover:text-slate-teal group-hover:tracking-[0.2px]">{currentService.title}</h3>
            </div>
            
            <p className="text-sm font-semibold text-slate-teal italic transition-opacity duration-300 opacity-[0.88] group-hover:opacity-100 relative z-10">
              "{currentService.tagline}"
            </p>

            <p className="text-sm text-charcoal/80 leading-relaxed transition-opacity duration-300 opacity-[0.88] group-hover:opacity-100 relative z-10">
              {currentService.description}
            </p>

            {/* Synergy box */}
            <div className="bg-linen/40 border border-linen p-5 rounded-xl space-y-2 text-left relative z-10">
              <h4 className="font-serif text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center space-x-1.5">
                <ShieldCheck size={14} className="text-slate-teal" />
                <span>The Homeopathic Synergy</span>
              </h4>
              <p className="text-xs text-charcoal/70 leading-normal">
                {currentService.homeopathicSynergy}
              </p>
            </div>

            <motion.button
              whileHover={{ y: -3, scale: 1.04, boxShadow: "0 15px 30px -5px rgba(13,148,136,0.40)" }}
              whileTap={{ scale: 0.97, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              onClick={() => onOpenBooking(currentService.id)}
              aria-label={`Book ${currentService.title} Consult`}
              style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)" }}
              className="btn-ripple-effect w-full text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 ease-out text-center text-xs shadow-md shadow-slate-teal/10 hover:shadow-[0_10px_30px_rgba(13,148,136,0.20)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50 relative z-10"
              id={`service-book-btn-${currentService.id}`}
            >
              Book {currentService.title} Consult
            </motion.button>
            </motion.div>
          </motion.div>

          {/* Sub Services Detail Grid (4. Stagger Card Animation) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="lg:col-span-2 space-y-4 sm:space-y-6 w-full" 
            id="sub-services-grid"
          >
            {currentService.subServices.map((sub, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="w-full relative z-10"
              >
                <motion.div
                  animate={{ 
                    y: [0, -6, 0], 
                    boxShadow: ["0 18px 45px rgba(15,23,42,0.08)", "0 22px 50px rgba(13,148,136,0.12)", "0 18px 45px rgba(15,23,42,0.08)"] 
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: idx * 0.25 }}
                  whileHover={{ y: -10, scale: 1.03, boxShadow: "0 30px 70px rgba(15,23,42,0.14)", borderColor: "rgba(13,148,136,0.35)", transition: { duration: 0.3 } }}
                  className="bg-[linear-gradient(180deg,#FFFFFF,#FCFEFF)] border border-linen hover:border-[rgba(13,148,136,0.35)] rounded-xl sm:rounded-2xl p-5 sm:p-6 space-y-3 sm:space-y-4 overflow-hidden w-full group relative cursor-pointer transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-[0.06] pointer-events-none" style={{ animation: 'cardShine 8s ease-in-out infinite' }} />
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-2 relative z-10">
                  <div className="min-w-0">
                    <h4 className="font-serif text-lg sm:text-lg font-bold text-charcoal break-words leading-tight transition-colors duration-300 group-hover:text-slate-teal group-hover:tracking-[0.2px]">{sub.name}</h4>
                  </div>
                  {sub.priceEstimate && (
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-teal bg-slate-teal/10 border border-slate-teal/20 px-2.5 py-1 rounded-full text-center shrink-0 self-start">
                      {sub.priceEstimate}
                    </span>
                  )}
                </div>

                <p className="text-sm text-charcoal/70 leading-relaxed transition-opacity duration-300 opacity-[0.88] group-hover:opacity-100 relative z-10">
                  {sub.description}
                </p>

                <div className="border-t border-linen pt-4 text-left relative z-10">
                  <h5 className="text-xs uppercase font-bold text-charcoal/60 tracking-wider mb-2">Key Clinical Benefits</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sub.benefits.map((ben, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2 text-xs text-charcoal/80">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-[1.15] group-hover:rotate-6 group-hover:drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" style={{ animationDelay: `${bIdx * 0.15}s` }} />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}
