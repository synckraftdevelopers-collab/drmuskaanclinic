"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, HeartPulse, Activity, CheckCircle2, ShieldCheck, Clock3, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { CLINIC_SERVICES } from "../lib/content";

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

type ServiceId = "hair" | "skin" | "homeopathy" | "infertility";

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

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>("hair");

  const currentService =
    CLINIC_SERVICES.find((service) => service.id === selectedServiceId) ??
    CLINIC_SERVICES[0];
  const currentServiceImage = SERVICE_IMAGES[selectedServiceId];

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
            style={{ display: "block", margin: "auto" }}
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
    <section
      className="relative overflow-x-hidden bg-[linear-gradient(180deg,#F8FBFD_0%,#FFFFFF_46%,#F3F8FB_100%)] px-4 py-16 text-left sm:px-6 sm:py-20 lg:px-8"
      id="treatments-section"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-28 top-24 h-72 w-72 rounded-full bg-slate-teal/[0.06] blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-ocean-teal/[0.08] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-teal/20 to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.15,
              delayChildren: 0.1,
            },
          },
        }}
        className="mx-auto w-full max-w-7xl"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className="mb-8 text-center sm:mb-12"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
          >
            <span className="inline-block rounded-full bg-slate-teal/15 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-teal sm:px-3.5 sm:py-1.5 sm:text-xs">
              Clinical Catalog
            </span>
          </motion.div>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
            className="mt-4 px-2 font-serif text-2xl font-bold text-charcoal sm:mt-3 sm:px-0 sm:text-4xl lg:text-5xl"
          >
            Bespoke Medical & Holistic Care
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
            className="mx-auto mt-3 max-w-2xl px-2 text-xs leading-relaxed text-charcoal/70 sm:mt-2 sm:px-0 sm:text-base"
          >
            Explore our specialized treatments. We combine advanced dermo-cosmetic aesthetics with personalized constitutional homeopathy for permanent skin and hair health.
          </motion.p>
        </motion.div>

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto mb-10 grid w-full max-w-5xl grid-cols-2 gap-2 rounded-2xl border border-slate-teal/10 bg-white/80 p-2 shadow-[0_18px_50px_rgba(18,53,91,0.08)] backdrop-blur-sm lg:grid-cols-4"
          role="tablist"
          aria-label="Treatment categories"
        >
          {CLINIC_SERVICES.map((service) => {
            const serviceId = service.id as ServiceId;
            const isSelected = selectedServiceId === serviceId;

            return (
              <motion.button
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedServiceId(serviceId)}
                className={
                  "group relative flex min-h-20 items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50 sm:px-4 " +
                  (isSelected
                    ? "bg-slate-teal text-white shadow-[0_10px_24px_rgba(18,53,91,0.22)]"
                    : "text-charcoal hover:bg-linen/35")
                }
                role="tab"
                aria-selected={isSelected}
                aria-controls="sub-services-grid"
                id={"service-tab-" + service.id}
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/20 sm:h-14 sm:w-14">
                  <Image
                    src={SERVICE_IMAGES[serviceId].src}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover photo-clinical transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={
                      "absolute inset-0 " +
                      (isSelected ? "bg-slate-teal/15" : "bg-charcoal/10")
                    }
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span
                    className={
                      "mb-1 block text-[9px] font-extrabold uppercase tracking-[0.18em] " +
                      (isSelected ? "text-white/65" : "text-charcoal/45")
                    }
                  >
                    {service.subServices.length} treatments
                  </span>
                  <h3 className="font-serif text-xs font-bold leading-tight sm:text-sm">
                    {service.title}
                  </h3>
                </div>
                <span
                  className={
                    "absolute inset-x-4 bottom-0 h-0.5 rounded-full transition-opacity " +
                    (isSelected ? "bg-ocean-teal opacity-100" : "opacity-0")
                  }
                />
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid min-h-[900px] grid-cols-1 items-start gap-6 transition-all duration-300 sm:min-h-0 sm:gap-8 lg:grid-cols-3">
          <motion.div
            key={"main-info-" + currentService.id}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sticky top-24 z-10 w-full lg:col-span-1"
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
                boxShadow: [
                  "0 18px 45px rgba(15,23,42,0.08)",
                  "0 22px 50px rgba(13,148,136,0.12)",
                  "0 18px 45px rgba(15,23,42,0.08)",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                y: -10,
                scale: 1.03,
                boxShadow: "0 30px 70px rgba(15,23,42,0.14)",
                borderColor: "rgba(13,148,136,0.35)",
                transition: { duration: 0.3 },
              }}
              className="group relative w-full overflow-hidden rounded-xl border border-linen bg-[linear-gradient(180deg,#FFFFFF,#FCFEFF)] transition-all duration-300 hover:border-[rgba(13,148,136,0.35)] sm:rounded-2xl"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden photo-authentic">
                <Image
                  src={currentServiceImage.src}
                  alt={currentServiceImage.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover photo-clinical transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-teal backdrop-blur-sm">
                  {currentService.title} · Muskaan Clinic
                </span>
              </div>

              <div className="space-y-4 p-5 sm:space-y-6 sm:p-8">
                <div className="relative z-10 flex items-center space-x-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-teal text-white shadow-lg shadow-slate-teal/20 transition-all duration-500 group-hover:scale-[1.15] group-hover:rotate-10 sm:h-12 sm:w-12 sm:rounded-xl"
                  >
                    {getServiceIcon(currentService.id, "text-linen", 24)}
                  </motion.div>
                  <h3 className="font-serif text-xl font-bold leading-tight text-charcoal transition-colors duration-300 group-hover:text-slate-teal sm:text-2xl">
                    {currentService.title}
                  </h3>
                </div>

                <p className="relative z-10 text-sm font-semibold italic text-slate-teal opacity-[0.88]">
                  &ldquo;{currentService.tagline}&rdquo;
                </p>
                <p className="relative z-10 text-sm leading-relaxed text-charcoal/80 opacity-[0.88]">
                  {currentService.description}
                </p>

                <div className="relative z-10 space-y-2 rounded-xl border border-linen bg-linen/40 p-5 text-left">
                  <h4 className="flex items-center space-x-1.5 font-serif text-xs font-extrabold uppercase tracking-wide text-charcoal">
                    <ShieldCheck size={14} className="text-slate-teal" />
                    <span>The Homeopathic Synergy</span>
                  </h4>
                  <p className="text-xs leading-normal text-charcoal/70">
                    {currentService.homeopathicSynergy}
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    y: -3,
                    scale: 1.04,
                    boxShadow: "0 15px 30px -5px rgba(13,148,136,0.40)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenBooking(currentService.id)}
                  aria-label={"Book " + currentService.title + " Consult"}
                  style={{ background: "linear-gradient(135deg, #0D9488, #0F766E)" }}
                  className="relative z-10 w-full cursor-pointer rounded-xl px-4 py-3 text-center text-xs font-bold text-white shadow-md shadow-slate-teal/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50"
                  id={"service-book-btn-" + currentService.id}
                >
                  Book {currentService.title} Consult
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            key={currentService.id}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="w-full lg:col-span-2"
            id="sub-services-grid"
            role="tabpanel"
            aria-labelledby={"service-tab-" + currentService.id}
          >
            <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ocean-teal">
                  Available care plans
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-charcoal">
                  {currentService.title} treatments
                </h3>
              </div>
              <p className="text-sm font-medium text-charcoal/55">
                {currentService.subServices.length} personalized options
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {currentService.subServices.map((treatment, index) => (
                <motion.article
                  key={treatment.name}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  whileHover={{ y: -5 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-teal/10 bg-white shadow-[0_12px_35px_rgba(18,53,91,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-ocean-teal/30 hover:shadow-[0_22px_50px_rgba(18,53,91,0.13)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-linen/30 photo-authentic">
                    <Image
                      src={treatment.image}
                      alt={treatment.imageAlt}
                      fill
                      sizes="(min-width: 1280px) 390px, (min-width: 1024px) 66vw, 100vw"
                      className="object-cover object-center photo-treatment transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent" />
                    <span className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/30 bg-charcoal/55 px-2 text-[10px] font-extrabold tracking-wider text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-charcoal shadow-sm backdrop-blur-md">
                      <Clock3 size={12} className="text-ocean-teal" />
                      {treatment.duration}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                      <span className="rounded-full bg-ocean-teal px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white shadow-sm">
                        {treatment.priceEstimate || "Personalized care"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h4 className="font-serif text-xl font-bold leading-tight text-charcoal transition-colors duration-300 group-hover:text-ocean-teal">
                      {treatment.name}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                      {treatment.description}
                    </p>

                    <div className="mt-5 border-t border-linen/80 pt-4">
                      <h5 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-charcoal/50">
                        Key benefits
                      </h5>
                      <div className="mt-3 grid gap-2">
                        {treatment.benefits.map((benefit) => (
                          <div
                            key={benefit}
                            className="flex items-start gap-2 text-xs leading-relaxed text-charcoal/75"
                          >
                            <CheckCircle2
                              size={15}
                              className="mt-0.5 shrink-0 text-ocean-teal"
                              aria-hidden="true"
                            />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenBooking(currentService.id)}
                      className="mt-6 inline-flex w-full items-center justify-between rounded-xl bg-linen/35 px-4 py-3 text-xs font-bold text-charcoal transition-colors hover:bg-slate-teal hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50"
                      aria-label={"Book a consultation for " + treatment.name}
                    >
                      <span>Book consultation</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}