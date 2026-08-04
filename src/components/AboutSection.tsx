"use client";

import React from "react";
import Image from "next/image";
import { Award, Briefcase, Users, Calendar, BookOpen, Quote, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DOCTOR_PROFILE } from "../lib/content";
import { AnimatedCounter } from "./MuskaanApp";

interface AboutSectionProps {
  onOpenBooking: () => void;
}

const doctorGallery = [
  {
    src: "/doctor-gallery/dr-imran-clinic-portrait.jpg",
    alt: "Dr. Mohammad Imran Shaikh standing in his consultation room at Muskaan Clinic",
    position: "object-[62%_center]",
  },
  {
    src: "/doctor-gallery/dr-imran-consultation-portrait.jpg",
    alt: "Dr. Mohammad Imran Shaikh seated at his consultation desk",
    position: "object-center",
  },
  {
    src: "/doctor-gallery/dr-imran-at-work.jpg",
    alt: "Dr. Mohammad Imran Shaikh preparing clinical notes at his desk",
    position: "object-center",
  },
  {
    src: "/doctor-gallery/dr-imran-treatment-room.jpg",
    alt: "Dr. Mohammad Imran Shaikh in a Muskaan Clinic treatment room",
    position: "object-center",
  },
];

export default function AboutSection({ onOpenBooking }: AboutSectionProps) {
  const [[activeDoctorPhoto, slideDirection], setActiveDoctorPhoto] = React.useState<[number, number]>([0, 0]);
  const [isDoctorGalleryPaused, setIsDoctorGalleryPaused] = React.useState(false);

  React.useEffect(() => {
    if (isDoctorGalleryPaused) return;

    const autoSlideTimer = window.setTimeout(() => {
      setActiveDoctorPhoto(([currentPhoto]) => [
        (currentPhoto + 1) % doctorGallery.length,
        1,
      ]);
    }, 4500);

    return () => window.clearTimeout(autoSlideTimer);
  }, [activeDoctorPhoto, isDoctorGalleryPaused]);

  const moveDoctorPhoto = (direction: number) => {
    setActiveDoctorPhoto(([currentPhoto]) => [
      (currentPhoto + direction + doctorGallery.length) % doctorGallery.length,
      direction,
    ]);
  };

  const selectDoctorPhoto = (photoIndex: number) => {
    setActiveDoctorPhoto(([currentPhoto]) => [
      photoIndex,
      photoIndex >= currentPhoto ? 1 : -1,
    ]);
  };

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white text-left overflow-hidden" id="about-doctor-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Visual Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
            Chief Consultant
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3">
            Mastery Behind Muskaan Clinic
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2">
            Meet the doctor bringing the ultimate integration of modern medical aesthetics and classical homeopathy to Amravati.
          </p>
        </motion.div>

        {/* Doctor Bio Layout */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          
          {/* Column 1: Graphic / Metric Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Dr Profile card */}
            <motion.div variants={fadeInUp} className="col-span-2 bg-linen/30 border border-linen rounded-2xl flex flex-col overflow-hidden">
              <div
                className="relative h-[460px] w-full overflow-hidden"
                onMouseEnter={() => setIsDoctorGalleryPaused(true)}
                onMouseLeave={() => setIsDoctorGalleryPaused(false)}
                onFocusCapture={() => setIsDoctorGalleryPaused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setIsDoctorGalleryPaused(false);
                  }
                }}
              >
                <AnimatePresence initial={false} custom={slideDirection}>
                  <motion.div
                    key={doctorGallery[activeDoctorPhoto].src}
                    custom={slideDirection}
                    initial={{ opacity: 0, x: slideDirection >= 0 ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: slideDirection >= 0 ? -40 : 40 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) moveDoctorPhoto(1);
                      if (info.offset.x > 50) moveDoctorPhoto(-1);
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={doctorGallery[activeDoctorPhoto].src}
                      alt={doctorGallery[activeDoctorPhoto].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={"object-cover " + doctorGallery[activeDoctorPhoto].position}
                      priority={activeDoctorPhoto === 0}
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => moveDoctorPhoto(-1)}
                  className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-charcoal/45 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-slate-teal focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                  aria-label="Show previous doctor photo"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDoctorPhoto(1)}
                  className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-charcoal/45 p-2 text-white shadow-lg backdrop-blur-sm transition hover:bg-slate-teal focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                  aria-label="Show next doctor photo"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>

                <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5 rounded-full bg-charcoal/45 px-3 py-2 backdrop-blur-sm" aria-label={"Photo " + (activeDoctorPhoto + 1) + " of " + doctorGallery.length}>
                  {doctorGallery.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => selectDoctorPhoto(index)}
                      className={"h-2 rounded-full transition-all cursor-pointer " + (
                        activeDoctorPhoto === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"
                      )}
                      aria-label={"Show doctor photo " + (index + 1)}
                      aria-current={activeDoctorPhoto === index ? "true" : undefined}
                    />
                  ))}
                </div>

                <div 
                  className="absolute bottom-0 left-0 w-full h-[45%]" 
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82), rgba(0,0,0,0.45), rgba(0,0,0,0))' }} 
                />
                <div className="absolute bottom-0 left-0 z-10 p-8 sm:p-10 text-left w-full space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">{DOCTOR_PROFILE.name}</h3>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-blue-500/40 border border-emerald-400/50 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
                    <span className="text-amber-300 text-sm sm:text-base animate-pulse">🎓</span>
                    <p className="text-xs sm:text-sm text-emerald-200 font-extrabold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {DOCTOR_PROFILE.credentials}
                    </p>
                  </div>
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-white/90 pt-0.5">{DOCTOR_PROFILE.title}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-teal via-seafoam to-slate-teal p-4 border-t border-linen text-center font-bold text-white text-xs sm:text-sm shadow-inner tracking-wide flex items-center justify-center gap-2">
                <span className="text-amber-300 text-base">⭐</span>
                <span>{DOCTOR_PROFILE.credentials} — Maharashtra University of Health Sciences</span>
              </div>
            </motion.div>

            {/* Metric 1 */}
            <motion.div variants={fadeInUp} className="bg-white border border-linen p-5 rounded-2xl text-center space-y-2">
              <AnimatedCounter value={26} suffix="+" className="text-3xl font-serif font-bold text-slate-teal block tabular-nums" />
              <span className="text-[10px] uppercase font-extrabold text-charcoal/60 tracking-wider block">Years of Practice</span>
              <p className="text-xs text-charcoal/70">Continuous clinical service in Amravati</p>
            </motion.div>

            {/* Metric 2 */}
            <motion.div variants={fadeInUp} className="bg-white border border-linen p-5 rounded-2xl text-center space-y-2">
              <AnimatedCounter value={15000} suffix="+" className="text-3xl font-serif font-bold text-slate-teal block tabular-nums" />
              <span className="text-[10px] uppercase font-extrabold text-charcoal/60 tracking-wider block">Happy Patients</span>
              <p className="text-xs text-charcoal/70">Across Vidarbha and central India</p>
            </motion.div>

            {/* Trust badge */}
            <motion.div variants={fadeInUp} className="col-span-2 bg-charcoal text-white p-4 rounded-xl flex items-center space-x-3">
              <ShieldCheck className="text-seafoam shrink-0" size={24} />
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-seafoam font-bold">Clinical Philosophy</span>
                <p className="text-xs text-linen/90 leading-tight mt-0.5">Dual-mode constitutional healing focusing on permanent side-effect-free recoveries.</p>
              </div>
            </motion.div>

          </div>

          {/* Column 2: Biography & Philosophy details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dr Philosophy quote */}
            <motion.div variants={fadeInUp} className="bg-linen/20 border-l-4 border-slate-teal rounded-r-2xl p-6 relative">
              <Quote size={40} className="absolute top-2 right-2 text-slate-teal/10 rotate-180" />
              <h3 className="font-serif text-lg font-bold text-charcoal mb-2">My Message to Patients</h3>
              <p className="text-sm italic text-charcoal/80 leading-relaxed font-serif">
                "{DOCTOR_PROFILE.philosophy}"
              </p>
            </motion.div>

            {/* Bio text */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <h4 className="font-serif text-xl font-bold text-charcoal border-b border-linen pb-2 flex items-center space-x-2">
                <BookOpen size={18} className="text-slate-teal" />
                <span>Professional Biography</span>
              </h4>
              <p className="text-sm text-charcoal/75 leading-relaxed">
                {DOCTOR_PROFILE.bio}
              </p>
            </motion.div>

            {/* Areas of special expertise */}
            <motion.div variants={fadeInUp}>
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-charcoal/60 mb-3">Core Specialty Portfolios</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DOCTOR_PROFILE.specialties.map((spec, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center space-x-2 text-xs text-charcoal/80 font-semibold bg-linen/20 py-2 px-3 rounded-lg border border-linen"
                  >
                    <Sparkles size={14} className="text-slate-teal shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Accolades */}
            <motion.div variants={fadeInUp} className="border-t border-linen pt-6 space-y-3">
              <h4 className="font-serif text-xs uppercase tracking-wider font-bold text-charcoal/60">Selected Achievements & Milestones</h4>
              <ul className="space-y-2">
                {DOCTOR_PROFILE.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-charcoal/75 leading-tight text-left">
                    <span className="w-1.5 h-1.5 bg-slate-teal rounded-full mt-1.5 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="pt-4">
              <motion.button
                whileHover={{ y: -2, scale: 1.01, boxShadow: "0 15px 30px -5px rgba(13,148,136,0.40)" }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenBooking}
                style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)" }}
                className="text-white font-bold py-3 px-6 rounded-xl shadow-[0_4px_14px_rgba(13,148,136,0.25)] transition-all text-xs cursor-pointer inline-flex items-center space-x-2"
                id="doctor-profile-book-btn"
              >
                <span>Request Clinical Evaluation with Dr. Shaikh</span>
              </motion.button>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
