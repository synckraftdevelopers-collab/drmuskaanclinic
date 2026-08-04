"use client";

import React from "react";
import { MapPinned, PhoneCall } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CLINIC_INFO, DOCTOR_PROFILE } from "../lib/content";

interface ClinicProfileCardProps {
  className?: string;
}

export default function ClinicProfileCard({
  className = "",
}: ClinicProfileCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={
        "relative overflow-hidden rounded-3xl border border-linen bg-white p-6 shadow-[0_20px_60px_rgba(18,53,91,0.16)] sm:p-7 " +
        className
      }
      aria-label="Muskaan Clinic profile"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-seafoam/15"
        aria-hidden="true"
      />

      <h3 className="relative font-serif text-2xl font-bold text-charcoal">
        Clinic Profile
      </h3>

      <div className="relative mt-5 space-y-4">
        <div className="flex items-start gap-3.5 border-b border-linen pb-4 text-left">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-teal font-serif text-lg font-bold text-white">
            M
          </div>
          <div className="min-w-0">
            <h4 className="font-serif text-sm font-bold text-charcoal sm:text-base">
              {DOCTOR_PROFILE.name}
            </h4>
            <div className="mt-1.5 inline-flex max-w-full items-center gap-1.5 rounded-lg border border-slate-teal/30 bg-gradient-to-r from-slate-teal/15 to-seafoam/15 px-2.5 py-1 shadow-sm">
              <span className="text-xs text-amber-500" aria-hidden="true">
                🎓
              </span>
              <p className="truncate text-[10px] font-extrabold uppercase tracking-wider text-slate-teal sm:text-[11px]">
                {DOCTOR_PROFILE.credentials}
              </p>
            </div>
            <p className="mt-1.5 text-xs text-charcoal/60">
              {DOCTOR_PROFILE.experience}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-left text-xs leading-relaxed text-charcoal/70">
          <div className="flex items-start gap-2">
            <MapPinned size={15} className="mt-0.5 shrink-0 text-slate-teal" aria-hidden="true" />
            <span>
              Near Sabunpura Gandhi Chowk, Juna Motor Stand Road, Gandhi Chowk,
              Amravati-444601, Maharashtra
            </span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneCall size={15} className="shrink-0 text-slate-teal" aria-hidden="true" />
            <span>+91 {CLINIC_INFO.phone}</span>
          </div>
        </div>

        <div className="rounded-xl border border-linen bg-linen/30 p-3 text-center">
          <span className="mb-1.5 block text-[10px] font-extrabold uppercase text-slate-teal">
            Clinic Status
          </span>
          <motion.span
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [1, 0.76, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34,197,94,0)",
                      "0 0 0 5px rgba(34,197,94,0.12)",
                      "0 0 0 0 rgba(34,197,94,0)",
                    ],
                  }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" aria-hidden="true" />
            Accepting Priority Patients
          </motion.span>
        </div>
      </div>
    </motion.aside>
  );
}