"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Baby,
  Calendar,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CLINIC_SERVICES } from "../lib/content";

type ServiceId = "hair" | "skin" | "homeopathy" | "infertility";

interface HomeDisciplinesShowcaseProps {
  onViewCatalog: (serviceId: ServiceId) => void;
  onBook: (serviceId: ServiceId) => void;
}

const SERVICE_IMAGES: Record<ServiceId, { src: string; alt: string }> = {
  hair: {
    src: "/services/hair-restoration.png",
    alt: "A clinician performing a modern scalp and hair assessment",
  },
  skin: {
    src: "/services/skin-care.png",
    alt: "A clinician carrying out a gentle facial skin assessment",
  },
  homeopathy: {
    src: "/services/homeopathy.png",
    alt: "A personalized homeopathic consultation with remedies and clinical notes",
  },
  infertility: {
    src: "/services/fertility-care.png",
    alt: "A couple receiving private and supportive fertility counseling",
  },
};

const SERVICE_LABELS: Record<ServiceId, string> = {
  hair: "Advanced Trichology",
  skin: "Clinical Aesthetics",
  homeopathy: "Constitutional Care",
  infertility: "Reproductive Wellness",
};

export default function HomeDisciplinesShowcase({
  onViewCatalog,
  onBook,
}: HomeDisciplinesShowcaseProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>("hair");

  const currentService =
    CLINIC_SERVICES.find((service) => service.id === selectedServiceId) ??
    CLINIC_SERVICES[0];
  const currentImage = SERVICE_IMAGES[selectedServiceId];

  const getServiceIcon = (serviceId: ServiceId, className: string) => {
    switch (serviceId) {
      case "hair":
        return <Sparkles size={21} className={className} aria-hidden="true" />;
      case "skin":
        return <HeartPulse size={21} className={className} aria-hidden="true" />;
      case "homeopathy":
        return <Leaf size={21} className={className} aria-hidden="true" />;
      case "infertility":
        return <Baby size={21} className={className} aria-hidden="true" />;
      default:
        return <Activity size={21} className={className} aria-hidden="true" />;
    }
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-80 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-8 h-56 w-56 rounded-full bg-ocean-teal/[0.08] blur-3xl" />
        <div className="absolute right-1/4 top-0 h-64 w-64 rounded-full bg-slate-teal/[0.06] blur-3xl" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative mb-8 flex flex-col gap-4 text-center sm:mb-10 lg:flex-row lg:items-end lg:justify-between lg:text-left"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-teal/10 bg-white/75 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-teal shadow-sm backdrop-blur-sm sm:text-xs">
            <ShieldCheck size={14} aria-hidden="true" />
            Treatment portfolios
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            Our Dedicated Disciplines
          </h2>
          <p className="mt-2 text-sm font-bold text-ocean-teal sm:text-base">
            Trusted, personalized care for 26+ years
          </p>
        </div>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-charcoal/60 lg:mx-0 lg:text-right">
          Select a specialty to preview its treatments, medical benefits, and consultation options.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[1.75rem] border border-slate-teal/10 bg-white shadow-[0_30px_90px_rgba(18,53,91,0.14)] sm:rounded-[2rem]"
      >
        <div className="grid lg:grid-cols-[0.72fr_1.55fr]">
          <div className="relative overflow-hidden bg-slate-teal p-4 sm:p-6 lg:min-h-[590px] lg:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 10% 0%, rgba(42,157,143,0.72), transparent 36%), linear-gradient(145deg, transparent 40%, rgba(255,255,255,0.08))",
              }}
            />

            <div className="relative">
              <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white/55 sm:mb-6">
                Select a specialty
              </p>
              <div
                className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
                role="tablist"
                aria-label="Homepage treatment disciplines"
              >
                {CLINIC_SERVICES.map((service, index) => {
                  const serviceId = service.id as ServiceId;
                  const isSelected = serviceId === selectedServiceId;

                  return (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(serviceId)}
                      whileHover={{ x: isSelected ? 0 : 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={
                        "group flex min-w-[230px] items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-300 lg:min-w-0 lg:w-full " +
                        (isSelected
                          ? "border-white bg-white text-slate-teal shadow-[0_14px_35px_rgba(0,0,0,0.18)]"
                          : "border-white/10 bg-white/[0.05] text-white hover:border-white/25 hover:bg-white/[0.1]")
                      }
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="home-discipline-panel"
                      id={"home-discipline-tab-" + service.id}
                    >
                      <span
                        className={
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 " +
                          (isSelected
                            ? "bg-ocean-teal text-white"
                            : "bg-white/10 text-white group-hover:bg-white/15")
                        }
                      >
                        {getServiceIcon(serviceId, "")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={
                            "block text-[9px] font-extrabold uppercase tracking-[0.18em] " +
                            (isSelected ? "text-ocean-teal" : "text-white/45")
                          }
                        >
                          {"0" + (index + 1)} · {service.subServices.length} treatments
                        </span>
                        <span className="mt-1 block font-serif text-sm font-bold leading-tight sm:text-base">
                          {service.title}
                        </span>
                      </span>
                      <ArrowRight
                        size={17}
                        className={
                          "shrink-0 transition-transform duration-300 " +
                          (isSelected
                            ? "text-ocean-teal"
                            : "-translate-x-1 text-white/50 group-hover:translate-x-0")
                        }
                        aria-hidden="true"
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-7 hidden border-t border-white/10 pt-6 lg:block">
              <p className="text-xs leading-relaxed text-white/60">
                Integrated clinical procedures and individualized homeopathic care under one trusted roof.
              </p>
            </div>
          </div>

          <div
            className="relative min-h-[590px] overflow-hidden bg-charcoal"
            id="home-discipline-panel"
            role="tabpanel"
            aria-labelledby={"home-discipline-tab-" + currentService.id}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="(min-width: 1024px) 68vw, 100vw"
                  className="object-cover photo-showcase"
                  priority={selectedServiceId === "hair"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d2f]/95 via-[#071d2f]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071d2f]/25 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={"content-" + currentService.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.42, delay: 0.08, ease: "easeOut" }}
                className="relative z-10 flex min-h-[590px] flex-col justify-end p-5 sm:p-8 lg:p-10"
              >
                <div className="max-w-3xl">
                  <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    {SERVICE_LABELS[selectedServiceId]}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                    {currentService.title}
                  </h3>
                  <p className="mt-3 text-sm font-bold text-seafoam sm:text-base">
                    {currentService.tagline}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                    {currentService.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {currentService.subServices.slice(0, 4).map((treatment) => (
                      <span
                        key={treatment.name}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white/90 backdrop-blur-md sm:text-xs"
                      >
                        {treatment.name}
                      </span>
                    ))}
                    {currentService.subServices.length > 4 && (
                      <span className="rounded-full border border-seafoam/40 bg-seafoam/15 px-3 py-1.5 text-[10px] font-extrabold text-seafoam backdrop-blur-md sm:text-xs">
                        +{currentService.subServices.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <motion.button
                      type="button"
                      onClick={() => onViewCatalog(selectedServiceId)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-extrabold text-slate-teal shadow-lg transition-colors hover:bg-seafoam hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      View full catalog
                      <ArrowRight size={16} aria-hidden="true" />
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => onBook(selectedServiceId)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-xs font-extrabold text-white backdrop-blur-md transition-colors hover:border-seafoam hover:bg-seafoam/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <Calendar size={16} aria-hidden="true" />
                      Book consultation
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}