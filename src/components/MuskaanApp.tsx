"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
  AnimatePresence
} from "motion/react";
import {
  Sparkles, HeartPulse, Activity, Calendar, CalendarCheck, Clock, MapPin, Phone,
  ChevronRight, Star, HelpCircle, Bot, X, ShieldCheck, Award,
  MessageSquare, Users, Trash2, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import AppointmentForm from "./AppointmentForm";
import AIGuide from "./AIGuide";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import FeedbackSection from "./FeedbackSection";
import GallerySection from "./GallerySection";
import ContactSection from "./ContactSection";
import ContentSectionBackground from "./ContentSectionBackground";

import {
  CLINIC_INFO,
  CLINIC_FAQS,
  CLINIC_SERVICES,
  DOCTOR_PROFILE,
  CLINIC_STATS,
  WHY_CHOOSE_US,
  CLINIC_CONFIG
} from "../lib/content";
import { Appointment } from "../types";
import {
  getMedicalClinicSchema,
  getPhysicianSchema,
  getLocalBusinessSchema,
  getBreadcrumbSchema
} from "../lib/schema";

// Reusable Animated Counter Component for Statistics (5. Counter Animation)
export interface AnimatedCounterProps {
  value: number;
  suffix: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix,
  className = "text-3xl sm:text-4xl font-serif font-bold text-slate-teal inline-block tabular-nums"
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const formatNumber = (num: number) => num.toLocaleString('en-US');
    if (shouldReduceMotion) {
      ref.current.textContent = `${formatNumber(value)}${suffix}`;
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!ref.current) return;
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOutCubic * value);

      ref.current.textContent = `${formatNumber(current)}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        ref.current.textContent = `${formatNumber(value)}${suffix}`;
      }
    };

    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isInView, value, suffix, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
};

// Reusable Magnetic Button Component for CTAs (6. CTA Magnetic Hover)
export interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  id?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, onClick, className, id }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || (typeof window !== 'undefined' && window.innerWidth < 768)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = Math.max(-8, Math.min(8, (e.clientX - centerX) * 0.25));
    const distanceY = Math.max(-8, Math.min(8, (e.clientY - centerY) * 0.25));
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: shouldReduceMotion ? 0 : smoothX,
        y: shouldReduceMotion ? 0 : smoothY,
      }}
      whileHover={{ scale: shouldReduceMotion ? 1 : 1.03 }}
      whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// Reusable Word Reveal Heading Component (3. Text Reveal Animation)
interface WordRevealHeadingProps {
  line1: string;
  line2: string;
  className?: string;
}

const WordRevealHeading: React.FC<WordRevealHeadingProps> = ({ line1, line2, className }) => {
  const shouldReduceMotion = useReducedMotion();
  const words1 = line1.split(" ");
  const words2 = line2.split(" ");

  if (shouldReduceMotion) {
    return (
      <h1 className={className}>
        {line1} <br />
        <span className="text-slate-teal italic relative font-serif">{line2}</span>
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
          hidden: {}
        }}
        className="block"
      >
        {words1.map((w, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            className="inline-block mr-[0.25em]"
          >
            {w}
          </motion.span>
        ))}
        <br />
        <span className="text-slate-teal italic relative font-serif inline-block">
          {words2.map((w, i) => (
            <motion.span
              key={i + words1.length}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </span>
      </motion.span>
    </h1>
  );
};

// Reusable Floating Particles Component (8. Floating Particles)
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: (i % 3 + 2) * 2,
  left: `${(i * 17 + 13) % 90 + 5}%`,
  top: `${(i * 23 + 19) % 80 + 10}%`,
  duration: 20 + (i % 5) * 5,
  delay: (i % 4) * 2,
}));

const FloatingParticles: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -30, 10, 0],
            x: [0, 15, -15, 0],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-slate-teal/30 blur-[1px]"
        />
      ))}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>([]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Home Testimonial mini-carousel state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Hero Section Parallax & Stagger setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // 7. Scroll Indicator progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const parallaxSpringConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothMouseX = useSpring(mouseX, parallaxSpringConfig);
  const smoothMouseY = useSpring(mouseY, parallaxSpringConfig);

  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0] as const,
      },
    },
  };

  // In-memory or saved test reviews
  const defaultReviews = [
    {
      id: "r1",
      name: "Amit Deshmukh",
      rating: 5,
      comment: "Dr. Imran's dual approach is magical. My active hair shedding stopped completely within 3 PRP sessions, and the homeopathic sweet pills resolved my chronic acidity as well!",
      service: "Hair Restoration",
      date: "2026-06-15"
    },
    {
      id: "r2",
      name: "Prerna Joshi",
      rating: 5,
      comment: "I had stubborn hyperpigmentation for 4 years. The medical peels here under Dr. Imran's direct guidance worked wonders. Very safe and highly professional care.",
      service: "Skin Care & Aesthetics",
      date: "2026-06-28"
    },
    {
      id: "r3",
      name: "Sanjay Wankhede",
      rating: 5,
      comment: "My 8-year-old son suffered from constant allergic asthma. Classical homeopathic treatment here boosted his immunity remarkably. No steroid inhalers needed anymore!",
      service: "Constitutional Homeopathy",
      date: "2026-07-02"
    }
  ];

  // Load appointments on startup
  useEffect(() => {
    const loadAppointments = () => {
      const saved = localStorage.getItem("muskaan_appointments");
      if (saved) {
        try {
          setLocalAppointments(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse appointments", e);
        }
      }
    };
    loadAppointments();

    // Check if URL has hash or parameter
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "services", "doctor", "gallery", "testimonials", "faq", "contact"].includes(hash)) {
        setActiveTab(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    setPreSelectedServiceId(serviceId);
    setBookingOpen(true);
  };

  const handleAppointmentCreated = (newApp: Appointment) => {
    // Refresh appointment list in App state
    const saved = localStorage.getItem("muskaan_appointments");
    if (saved) {
      setLocalAppointments(JSON.parse(saved));
    }
  };

  const handleCancelAppointment = (id?: string) => {
    if (!id) return;
    const confirmed = window.confirm("Are you sure you want to cancel this consultation slot?");
    if (!confirmed) return;

    const saved = localStorage.getItem("muskaan_appointments");
    if (saved) {
      const current = JSON.parse(saved) as Appointment[];
      const filtered = current.filter(app => app.id !== id);
      localStorage.setItem("muskaan_appointments", JSON.stringify(filtered));
      setLocalAppointments(filtered);
    }
  };

  const getServiceColor = (id: string) => {
    if (id.toLowerCase().includes("hair")) return "bg-amber-50 text-amber-800 border-amber-200";
    if (id.toLowerCase().includes("skin") || id.toLowerCase().includes("peel")) return "bg-rose-50 text-rose-800 border-rose-200";
    if (id.toLowerCase().includes("homeopath") || id.toLowerCase().includes("medicine")) return "bg-emerald-50 text-emerald-800 border-emerald-200";
    return "bg-linen text-charcoal border-linen-dark";
  };

  // Breadcrumbs Generator for internal pages
  const getBreadcrumbs = () => {
    const items = [{ name: "Home", id: "home" }];
    if (activeTab === "services") items.push({ name: "Treatments & Services", id: "services" });
    else if (activeTab === "doctor") items.push({ name: "Dr. Imran Shaikh", id: "doctor" });
    else if (activeTab === "gallery") items.push({ name: "Gallery Portfolio", id: "gallery" });
    else if (activeTab === "testimonials") items.push({ name: "Patient Reviews", id: "testimonials" });
    else if (activeTab === "faq") items.push({ name: "FAQs & Guides", id: "faq" });
    else if (activeTab === "contact") items.push({ name: "Contact Us", id: "contact" });
    return items;
  };

  const breadcrumbs = getBreadcrumbs();

  // JSON-LD structured schemas
  const clinicSchema = getMedicalClinicSchema();
  const physicianSchema = getPhysicianSchema();
  const businessSchema = getLocalBusinessSchema();
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs.map(b => ({
    name: b.name,
    url: `https://muskaanclinic.com/#${b.id}`
  })));

  return (
    <div className="min-h-screen w-full flex flex-col bg-global-medical-gradient text-charcoal font-sans relative antialiased selection:bg-slate-teal/10 selection:text-slate-teal">

      {/* 7. Scroll Indicator: Thin top progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-slate-teal via-seafoam to-amber-500 z-50 pointer-events-none"
      />

      {/* Dynamic SEO JSON-LD Injections */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Inner View Breadcrumbs Header */}
      {activeTab !== "home" && (
        <div className="bg-white border-b border-linen py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <nav className="flex items-center space-x-2 text-xs text-charcoal/50 font-medium">
              {breadcrumbs.map((b, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-charcoal/30">/</span>}
                  <button
                    onClick={() => setActiveTab(b.id)}
                    className={`hover:text-slate-teal transition-colors cursor-pointer ${idx === breadcrumbs.length - 1 ? "text-slate-teal font-bold" : ""}`}
                  >
                    {b.name}
                  </button>
                </React.Fragment>
              ))}
            </nav>
            <style>{`
              @keyframes premiumBadgePulse {
                0% { box-shadow: 0 8px 20px rgba(37,99,235,0.10), 0 0 0 0 rgba(13,148,136,0.20); }
                15% { box-shadow: 0 8px 20px rgba(37,99,235,0.10), 0 0 0 10px rgba(13,148,136,0); }
                100% { box-shadow: 0 8px 20px rgba(37,99,235,0.10), 0 0 0 0 rgba(13,148,136,0); }
              }
              .hover-shadow-strong:hover {
                box-shadow: 0 12px 28px rgba(37,99,235,0.18) !important;
                animation: none !important;
                border-color: #0D9488 !important;
              }
              @keyframes premiumDotPulse {
                0% { transform: scale(1); opacity: 0.8; }
                20% { transform: scale(1.8); opacity: 0; }
                100% { transform: scale(1); opacity: 0; }
              }
            `}</style>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              tabIndex={0}
              aria-label="Verified Medical Board"
              className="group relative flex items-center self-start sm:self-auto h-[28px] sm:h-[30px] px-[12px] sm:px-[14px] rounded-full cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:ring-offset-2 transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] bg-[linear-gradient(135deg,#FFFFFF,#F6FBFF)] border border-[rgba(37,99,235,0.18)] hover-shadow-strong"
              style={{
                animation: "premiumBadgePulse 8s infinite ease-out"
              }}
            >
              <div className="relative flex items-center justify-center mr-2">
                <div 
                  className="absolute -top-0.5 -left-1 w-1 h-1 rounded-full bg-[#22C55E]"
                  style={{ animation: "premiumDotPulse 6s infinite ease-out" }}
                />
                <ShieldCheck 
                  size={15} 
                  className="text-[#0D9488] transition-transform duration-300 group-hover:rotate-[5deg]" 
                />
              </div>
              <span className="text-[10px] sm:text-[11px] font-[700] tracking-[0.5px] uppercase text-[#0B1F4D] whitespace-nowrap">
                Verified Medical Board
              </span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow w-full">

        {/* VIEW 1: HOME PANEL */}
        {activeTab === "home" && (
          <div className="space-y-16 pb-16 bg-[#DCEEF5] w-full" id="home-view-panel">

            {/* HERO SECTION */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-16 w-full">
              <section
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
                className="relative w-full overflow-hidden bg-gradient-to-br from-white via-linen/20 to-seafoam/15 py-16 sm:py-20 md:py-24 border-b border-linen"
              >
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-seafoam/10 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-seafoam/10 via-transparent to-transparent opacity-80" />

                {/* 8. Floating Particles */}
                <FloatingParticles />

                {/* 1. Floating Background Gradients */}
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    x: [0, 40, -30, 0],
                    y: [0, -40, 30, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-slate-teal/12 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    x: [0, 50, -40, 0],
                    y: [0, -50, 40, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/3 -left-20 w-[28rem] h-[28rem] bg-seafoam/15 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    x: [0, -50, 40, 0],
                    y: [0, 50, -40, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/3 -right-20 w-[28rem] h-[28rem] bg-seafoam/15 rounded-full blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={shouldReduceMotion ? {} : {
                    x: [0, 30, -40, 0],
                    y: [0, 40, -30, 0],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-20 left-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                  {/* Left content text */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    {/* Stagger Item 1: Badge */}
                    <motion.div variants={fadeUpItem} className="inline-flex items-center space-x-2 bg-slate-teal/10 text-slate-teal font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-slate-teal/15">
                      <Sparkles size={14} className="text-slate-teal animate-pulse" />
                      <span>Amravati's Premier Integrated Clinic</span>
                    </motion.div>

                    {/* Stagger Item 2: Heading (with 3. Text Reveal Animation) */}
                    <WordRevealHeading
                      line1="Ethical Hair, Skin &"
                      line2="Homeopathic Restorations"
                      className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight tracking-tight"
                    />

                    {/* Stagger Item 3: Description */}
                    <div className="space-y-6">
                      <motion.p variants={fadeUpItem} className="text-charcoal/70 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                        Led by <span className="font-bold text-charcoal">{CLINIC_INFO.doctor}</span> with over {CLINIC_INFO.experience} of dedicated clinical practice, we combine state-of-the-art visual aesthetic medicine with gentle, permanent constitutional homeopathy.
                      </motion.p>

                      {/* Brand Quote Card */}
                      <div className="relative max-w-lg">
                        {/* 6. SOFT BACKGROUND GLOW */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            x: [0, 15, -15, 0],
                            y: [0, -10, 10, 0],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ opacity: 0.08 }}
                          className="absolute -inset-2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-teal via-seafoam to-transparent rounded-3xl blur-xl pointer-events-none -z-10"
                        />

                        {/* Card Container with 1. SECTION REVEAL & 5. CARD HOVER */}
                        <motion.div
                          initial={shouldReduceMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          whileHover={(shouldReduceMotion || isMobile) ? {} : {
                            y: -4,
                            scale: 1.01,
                            boxShadow: "0 10px 25px -5px rgba(15, 92, 77, 0.15), 0 8px 10px -6px rgba(15, 92, 77, 0.08)",
                            transition: { duration: 0.3, ease: "easeOut" },
                          }}
                          className="bg-white/80 backdrop-blur-xs border border-linen p-5 rounded-2xl shadow-xs transition-colors duration-300 cursor-default"
                        >
                          {/* 2. QUOTE TEXT REVEAL & 3. QUOTATION MARKS */}
                          <motion.p
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-20px" }}
                            variants={{
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.12,
                                  delayChildren: 0.6,
                                }
                              }
                            }}
                            className="text-xs sm:text-sm font-serif italic text-charcoal/80 leading-relaxed pl-2 sm:pl-3"
                          >
                            <motion.span
                              variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                              }}
                              className="block"
                            >
                              <motion.span
                                initial={shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="inline-block align-baseline -ml-2 sm:-ml-3"
                              >"</motion.span>To improve patients' confidence and health
                            </motion.span>
                            <motion.span
                              variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                              }}
                              className="block"
                            >
                              through ethical Hair, Skin, and
                            </motion.span>
                            <motion.span
                              variants={{
                                hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                              }}
                              className="block"
                            >
                              Homeopathic treatments.<motion.span
                                initial={shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                                className="inline-block align-baseline"
                              >"</motion.span>
                            </motion.span>
                          </motion.p>

                          {/* 4. CLINIC VISION LABEL */}
                          <motion.p
                            initial={shouldReduceMotion ? { opacity: 0, x: 0 } : { opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
                            className="text-[10px] uppercase font-extrabold tracking-wider text-slate-teal/70 mt-2 text-right"
                          >
                            — Clinic Vision
                          </motion.p>
                        </motion.div>
                      </div>
                    </div>

                    {/* Stagger Item 4: CTA Buttons (with 4. CTA Magnetic Hover) */}
                    <motion.div variants={fadeUpItem} className="flex flex-col sm:flex-row gap-3 pt-2">
                      <MagneticButton
                        onClick={() => handleOpenBooking()}
                        className="flex items-center justify-center space-x-2 bg-slate-teal hover:bg-charcoal text-white font-bold py-3.5 px-8 rounded-xl shadow-md shadow-slate-teal/10 hover:shadow-lg transition-all text-sm cursor-pointer"
                        id="hero-book-btn"
                      >
                        <Calendar size={16} />
                        <span>Book Slot Today</span>
                      </MagneticButton>
                      <MagneticButton
                        onClick={() => setAiAssistantOpen(true)}
                        className="flex items-center justify-center space-x-2 bg-white hover:bg-linen/30 text-slate-teal border border-slate-teal/20 font-bold py-3.5 px-8 rounded-xl transition-all text-sm cursor-pointer"
                        id="hero-ai-chat-btn"
                      >
                        <Bot size={16} />
                        <span>Chat with Muskaan AI Guide</span>
                      </MagneticButton>
                    </motion.div>
                  </div>

                  {/* Right side teaser card — premium animated background */}
                  <div className="lg:col-span-5">
                    {/* ── ANIMATED BACKGROUND LAYER (behind card, z-0) ── */}
                    <motion.div
                      className="relative"
                      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {/* Parallax container for decorative elements */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none overflow-visible"
                        style={(!shouldReduceMotion && !isMobile) ? {
                          x: parallaxX,
                          y: parallaxY,
                        } : {}}
                      >
                        {/* Large soft radial glow behind card */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            scale: [1, 1.06, 1],
                            opacity: [0.18, 0.28, 0.18],
                          }}
                          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(18,53,91,0.18)_0%,_rgba(42,157,143,0.10)_45%,_transparent_75%)] blur-2xl"
                        />

                        {/* Outer thin ring 1 */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            scale: [1, 1.04, 1],
                            opacity: [0.14, 0.22, 0.14],
                            rotate: [0, 8, 0],
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -inset-8 rounded-full border border-slate-teal/15"
                        />

                        {/* Outer thin ring 2 */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            scale: [1, 1.03, 1],
                            opacity: [0.08, 0.16, 0.08],
                            rotate: [0, -5, 0],
                          }}
                          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                          className="absolute -inset-16 rounded-full border border-seafoam/12"
                        />

                        {/* Outer thin ring 3 — outermost */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            scale: [1, 1.025, 1],
                            opacity: [0.05, 0.10, 0.05],
                          }}
                          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 6 }}
                          className="absolute -inset-24 rounded-full border border-slate-teal/08"
                        />

                        {/* Ambient teal glow top-right */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            x: [0, 12, -8, 0],
                            y: [0, -12, 8, 0],
                            opacity: [0.20, 0.35, 0.20],
                          }}
                          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-seafoam/20 blur-2xl"
                        />

                        {/* Ambient navy glow bottom-left */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            x: [0, -10, 14, 0],
                            y: [0, 14, -10, 0],
                            opacity: [0.15, 0.25, 0.15],
                          }}
                          transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-slate-teal/15 blur-2xl"
                        />

                        {/* Floating medical cross — top-right */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, -10, 4, 0],
                            x: [0, 4, -4, 0],
                            opacity: [0.18, 0.32, 0.18],
                          }}
                          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                          className="absolute -top-6 right-4 text-slate-teal/25 text-2xl font-bold select-none"
                          aria-hidden="true"
                        >
                          +
                        </motion.div>

                        {/* Floating medical cross — bottom-left */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, 8, -6, 0],
                            x: [0, -6, 6, 0],
                            opacity: [0.12, 0.22, 0.12],
                          }}
                          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 7 }}
                          className="absolute -bottom-8 left-2 text-seafoam/25 text-xl font-bold select-none"
                          aria-hidden="true"
                        >
                          +
                        </motion.div>

                        {/* Floating medical cross — mid-left */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, -6, 10, 0],
                            opacity: [0.10, 0.20, 0.10],
                          }}
                          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 10 }}
                          className="absolute top-1/2 -left-8 text-slate-teal/20 text-lg font-bold select-none"
                          aria-hidden="true"
                        >
                          +
                        </motion.div>

                        {/* Tiny floating dot 1 */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, -14, 6, 0],
                            x: [0, 6, -6, 0],
                            opacity: [0.20, 0.40, 0.20],
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                          className="absolute top-4 -right-4 w-2 h-2 rounded-full bg-seafoam/40"
                        />

                        {/* Tiny floating dot 2 */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, 10, -8, 0],
                            opacity: [0.15, 0.30, 0.15],
                          }}
                          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                          className="absolute bottom-6 -left-4 w-1.5 h-1.5 rounded-full bg-slate-teal/35"
                        />

                        {/* Tiny floating dot 3 */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, -8, 12, 0],
                            x: [0, -4, 4, 0],
                            opacity: [0.12, 0.24, 0.12],
                          }}
                          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 8 }}
                          className="absolute top-1/3 -right-6 w-1 h-1 rounded-full bg-seafoam/50"
                        />

                        {/* Tiny floating dot 4 */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            y: [0, 12, -6, 0],
                            opacity: [0.10, 0.22, 0.10],
                          }}
                          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 11 }}
                          className="absolute -top-4 left-1/3 w-1.5 h-1.5 rounded-full bg-slate-teal/30"
                        />

                        {/* Heartbeat / circle medical ring */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            scale: [1, 1.15, 1],
                            opacity: [0.08, 0.16, 0.08],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute -bottom-6 right-8 w-5 h-5 rounded-full border border-seafoam/30"
                        />

                        {/* Medical circle decorative — top area */}
                        <motion.div
                          animate={shouldReduceMotion ? {} : {
                            scale: [1, 1.08, 1],
                            opacity: [0.06, 0.14, 0.06],
                          }}
                          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 9 }}
                          className="absolute -top-8 left-8 w-8 h-8 rounded-full border border-slate-teal/20"
                        />
                      </motion.div>

                      {/* ── THE CARD (unchanged, lifted on hover, z-10) ── */}
                      <motion.div
                        whileHover={(shouldReduceMotion || isMobile) ? {} : {
                          y: -4,
                          scale: 1.01,
                          boxShadow: "0 20px 60px -12px rgba(18,53,91,0.18), 0 8px 24px -8px rgba(42,157,143,0.12), 0 0 0 1px rgba(18,53,91,0.06)",
                          transition: { duration: 0.3, ease: "easeOut" },
                        }}
                        className="relative z-10"
                        style={{
                          boxShadow: "0 8px 32px -8px rgba(18,53,91,0.12), 0 2px 8px -2px rgba(18,53,91,0.06)",
                        }}
                      >
                        <div className="bg-white border border-linen rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-seafoam/15 rounded-full -mr-12 -mt-12" />

                          <h3 className="font-serif text-2xl font-bold text-charcoal mb-4">Clinic Profile</h3>

                          <div className="space-y-4">
                            {/* Doctor Profile Mini */}
                            <div className="flex items-start space-x-3.5 border-b border-linen pb-4 text-left">
                              <div className="w-10 h-10 rounded-full bg-slate-teal text-white flex items-center justify-center shrink-0 font-bold font-serif text-lg">
                                M
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-sm text-charcoal">{DOCTOR_PROFILE.name}</h4>
                                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-slate-teal/15 to-seafoam/15 border border-slate-teal/30 px-2.5 py-1 rounded-lg mt-1.5 shadow-2xs">
                                  <span className="text-amber-500 text-xs">🎓</span>
                                  <p className="text-[11px] uppercase text-slate-teal font-extrabold tracking-wider">{DOCTOR_PROFILE.credentials}</p>
                                </div>
                                <p className="text-xs text-charcoal/60 mt-1.5">{DOCTOR_PROFILE.experience}</p>
                              </div>
                            </div>

                            {/* Info Points */}
                            <div className="space-y-2.5 text-xs text-charcoal/70 text-left">
                              <div className="flex items-center space-x-2">
                                <MapPin size={14} className="text-slate-teal shrink-0" />
                                <span>Near Sabunpura Gandhi Chowk, Juna Motor Stand Road, Gandhi Chowk, Amravati-444601, Maharashtra</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone size={14} className="text-slate-teal shrink-0" />
                                <span>+91 {CLINIC_INFO.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock size={14} className="text-slate-teal shrink-0" />
                                <span>{CLINIC_INFO.timings}</span>
                              </div>
                            </div>

                            {/* Status badge with pulse glow */}
                            <div className="bg-linen/30 border border-linen rounded-xl p-3 text-center">
                              <span className="text-[10px] font-extrabold uppercase text-slate-teal block mb-1">Clinic Status</span>
                              <motion.span
                                animate={shouldReduceMotion ? {} : {
                                  opacity: [1, 0.72, 1],
                                  boxShadow: [
                                    "0 0 0 0 rgba(34,197,94,0)",
                                    "0 0 0 5px rgba(34,197,94,0.12)",
                                    "0 0 0 0 rgba(34,197,94,0)",
                                  ],
                                }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800"
                              >
                                🟢 Accepting Priority Patients
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                </div>

                {/* 6. Scroll Indicator */}
                <div className="hidden md:flex justify-center w-full mt-12 pt-2 relative z-10">
                  <button
                    onClick={() => {
                      document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    aria-label="Scroll to next section"
                    className="group flex flex-col items-center gap-2 text-charcoal/50 hover:text-slate-teal transition-colors duration-300 focus:outline-none cursor-pointer"
                  >
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                      Explore Clinic
                    </span>
                    <div className="w-6 h-10 rounded-full border-2 border-charcoal/20 group-hover:border-slate-teal flex justify-center pt-1.5 p-1 transition-colors duration-300 shadow-xs bg-white/60 backdrop-blur-xs">
                      <motion.div
                        animate={shouldReduceMotion ? {} : { y: [0, 8, 0], opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1 h-2.5 bg-slate-teal rounded-full"
                      />
                    </div>
                  </button>
                </div>
              </section>
            </motion.div>

            {/* FULL-WIDTH CONTENT AREA BACKGROUND WRAPPER */}
            <div className="relative w-full overflow-hidden bg-[#DCEEF5] !mt-0 pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-16" id="home-content-wrapper">
              <ContentSectionBackground />
              <div className="relative z-10 space-y-16 w-full">
                {/* EXPERIENCE STATS BADGES (Stagger Item 5: Statistics, with 5. Counter Animation) */}
                <motion.section id="stats-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-white border border-linen rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row justify-evenly items-center gap-6 text-center">
                    {CLINIC_STATS.map((st, i) => (
                      <div key={i} className="flex-1 w-full flex flex-col items-center justify-center space-y-2">
                        <AnimatedCounter value={st.value} suffix={st.suffix} />
                        <p className="text-[10px] sm:text-xs uppercase font-extrabold text-charcoal/50 leading-tight">
                          {st.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>

                {/* WHY CHOOSE US SECTION */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <div className="text-center mb-10">
                    <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                      Clinical Standards
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-charcoal mt-3">Why Patients Trust Muskaan</h2>
                    <p className="text-xs sm:text-sm text-charcoal/60 mt-1 max-w-md mx-auto">Discover the foundational pillars that make Dr. Imran's clinical guidance supreme in Amravati.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {WHY_CHOOSE_US.map((wc, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-linen p-6 rounded-2xl shadow-xs text-left space-y-3"
                      >
                        <div className="w-10 h-10 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center">
                          {idx === 0 && <Award size={20} />}
                          {idx === 1 && <Activity size={20} />}
                          {idx === 2 && <Sparkles size={20} />}
                        </div>
                        <h3 className="font-serif font-bold text-sm text-charcoal">{wc.title}</h3>
                        <p className="text-xs text-charcoal/60 leading-relaxed">{wc.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* TREATMENTS CATALOG GRID */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                      Treatment Portfolios
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-charcoal mt-3">Our Dedicated Disciplines</h2>
                    <p className="text-xs sm:text-sm text-charcoal/60 mt-1 max-w-md mx-auto">Click any specialty to view comprehensive treatment descriptions, session timings, and medical benefits.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CLINIC_SERVICES.map((serv) => (
                      <div
                        key={serv.id}
                        className="bg-white border border-linen p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left"
                      >
                        <div className="space-y-4">
                          <div className="w-10 h-10 rounded-full bg-slate-teal/10 text-slate-teal flex items-center justify-center">
                            {serv.id === 'hair' && <Sparkles size={20} />}
                            {serv.id === 'skin' && <HeartPulse size={20} />}
                            {serv.id === 'homeopathy' && <Activity size={20} />}
                            {serv.id === 'infertility' && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#2A9D8F"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M 12 13 v 8" />
                                <path d="M 9 18 h 6" />
                                <path d="M 2.2 10.5 c -1.3 -0.6 -1.3 -2.6 0 -3.3 l 1.6 -1.1 a 2.8 2.8 0 0 1 3.6 0.4 l 3 3 c 0.4 0.4 1 0.4 1.4 0 l 3 -3 a 2.8 2.8 0 0 1 3.6 -0.4 l 1.6 1.1 c 1.3 0.7 1.3 2.7 0 3.3 l -3.3 1.8 c -1.3 0.7 -3.7 1.2 -6.1 1.2 s -4.8 -0.5 -6.1 -1.2 Z" />
                              </svg>
                            )}
                          </div>
                          <h3 className="font-serif text-xl font-bold text-charcoal">{serv.title}</h3>
                          <p className="text-xs text-charcoal/60 leading-relaxed font-semibold">"{serv.tagline}"</p>
                          <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-3">{serv.description}</p>
                        </div>

                        <div className="border-t border-linen mt-6 pt-4 flex justify-between items-center">
                          <motion.button
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{ y: -2 }}
                            onClick={() => {
                              setActiveTab("services");
                              // Dispatch virtual click on service tabs if loaded
                              setTimeout(() => {
                                const btn = document.getElementById(`service-tab-${serv.id}`);
                                if (btn) btn.click();

                                setTimeout(() => {
                                  const targetSection = document.getElementById('treatments-section');
                                  if (targetSection) {
                                    const yOffset = -80;
                                    const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                  } else {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }, 50);
                              }, 100);
                            }}
                            className="group relative text-slate-teal font-bold text-xs inline-flex items-center space-x-1 cursor-pointer transition-all duration-300 ease-out after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-slate-teal hover:after:w-full after:transition-all after:duration-300 after:ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50 rounded-xs"
                          >
                            <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">View Catalog</span>
                            <ChevronRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:rotate-3" />
                          </motion.button>
                          <motion.button
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                            whileHover={{ y: -2, scale: 1.03 }}
                            whileTap={{ scale: 0.97, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                            onClick={() => handleOpenBooking(serv.id)}
                            aria-label={`Book Consult for ${serv.title}`}
                            className="btn-ripple-effect bg-linen/50 text-charcoal hover:bg-slate-teal hover:text-white hover:brightness-110 hover:shadow-[0_10px_30px_rgba(13,148,136,0.20)] font-semibold py-1.5 px-3.5 rounded-lg text-xs transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50"
                          >
                            Book Consult
                          </motion.button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* TESTIMONIALS CAROUSEL PREVIEW */}
                <section className="bg-linen/10 py-16 px-4 sm:px-6 lg:px-8 border-y border-linen/60">
                  <div className="max-w-4xl mx-auto text-center space-y-6">
                    <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                      Verified Patient Stories
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">Real Journeys of Renewal</h2>

                    {/* Carousel Card */}
                    <div className="bg-white border border-linen p-6 sm:p-10 rounded-3xl shadow-xs relative text-left">
                      <span className="text-6xl text-linen/40 font-serif absolute top-4 left-6 leading-none">“</span>
                      <div className="space-y-4 relative z-10">
                        <p className="font-serif italic text-sm sm:text-base md:text-lg text-charcoal/80 leading-relaxed pt-2">
                          "{defaultReviews[testimonialIndex].comment}"
                        </p>
                        <div className="border-t border-linen pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-bold text-sm text-charcoal">{defaultReviews[testimonialIndex].name}</span>
                            <span className="text-xs text-charcoal/40">({defaultReviews[testimonialIndex].service})</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-end space-x-2 mt-4 pt-2">
                        <button
                          onClick={() => setTestimonialIndex(testimonialIndex === 0 ? defaultReviews.length - 1 : testimonialIndex - 1)}
                          className="p-1.5 rounded-full bg-linen/20 border border-linen hover:bg-linen/50 transition-colors cursor-pointer text-charcoal"
                          aria-label="Previous story"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setTestimonialIndex(testimonialIndex === defaultReviews.length - 1 ? 0 : testimonialIndex + 1)}
                          className="p-1.5 rounded-full bg-linen/20 border border-linen hover:bg-linen/50 transition-colors cursor-pointer text-charcoal"
                          aria-label="Next story"
                        >
                          <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("testimonials")}
                      className="text-slate-teal font-bold text-xs hover:underline"
                    >
                      Read All Verified Testimonials & Submit Yours
                    </button>
                  </div>
                </section>
              </div>
            </div>

            {/* FAQ ACCORDION TOP 5 */}
            <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                  FAQ Board
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mt-3">Common Patient Concerns</h2>
              </div>

              <div className="space-y-3">
                {CLINIC_FAQS.slice(0, 4).map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-linen rounded-2xl overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex justify-between items-center hover:bg-linen/10 transition-colors cursor-pointer"
                      id={`faq-btn-${idx}`}
                    >
                      <h3 className="font-serif font-bold text-xs sm:text-sm text-charcoal pr-4 leading-normal">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        size={16}
                        className={`text-slate-teal shrink-0 transition-transform ${expandedFaqIndex === idx ? "rotate-180" : ""}`}
                      />
                    </button>

                    {expandedFaqIndex === idx && (
                      <div className="px-5 pb-5 pt-1 text-xs text-charcoal/70 border-t border-linen/30 bg-[#F0F7FC] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setActiveTab("faq");
                    setTimeout(() => {
                      const targetSection = document.getElementById("faq-view-panel");
                      if (targetSection) {
                        const yOffset = -80;
                        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                      } else {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }, 50);
                  }}
                  className="text-slate-teal font-bold text-xs hover:underline"
                >
                  View Complete List of FAQs
                </button>
              </div>
            </section>

            {/* APPOINTMENT CTA BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-charcoal text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-left border-b-4 border-slate-teal">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10 max-w-2xl space-y-4">
                  <span className="text-xs uppercase tracking-widest text-seafoam font-extrabold bg-slate-teal/40 px-3 py-1 rounded-full">
                    Priority Reservation Gate
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold">Secure Your Consultation Today</h3>
                  <p className="text-sm text-linen/80 leading-relaxed">
                    Skip waiting queues. Select your procedure and secure a priority slot. Your timing will be registered directly onto our clinical boards and opened on WhatsApp to Dr. Shaikh's cabin crew.
                  </p>
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onClick={() => handleOpenBooking()}
                    aria-label="Initiate Priority Booking"
                    className="inline-flex items-center justify-center gap-[8px] h-[48px] px-[28px] py-[14px] rounded-[14px] text-[15px] font-semibold text-white cursor-pointer transition-all duration-300 ease-out border border-white/[0.08] shadow-[0_12px_30px_rgba(13,148,136,0.28)] hover:shadow-[0_18px_40px_rgba(13,148,136,0.40)] hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal btn-premium-cta"
                  >
                    <CalendarCheck size={18} className="shrink-0" />
                    <span>Initiate Priority Booking</span>
                  </motion.button>
                </div>
              </div>
            </section>

            {/* PERSISTENT LOCAL APPOINTMENTS MONITOR */}
            {localAppointments.length > 0 && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-charcoal text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border-b-4 border-slate-teal" id="patient-active-bookings">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />

                  <div className="border-b border-white/10 pb-4 mb-6 flex justify-between items-center">
                    <div className="text-left">
                      <span className="text-[10px] uppercase text-seafoam font-bold tracking-wider">Patient Portal</span>
                      <h3 className="font-serif text-2xl font-bold">Your Booked Consultation Slots</h3>
                    </div>
                    <span className="text-xs font-bold bg-slate-teal text-white py-1 px-3 rounded-full">
                      {localAppointments.length} Active Visit{localAppointments.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {localAppointments.map((app) => (
                      <div
                        key={app.id}
                        className="bg-white/10 border border-white/10 p-5 rounded-2xl relative flex flex-col justify-between text-left"
                      >
                        <button
                          onClick={() => handleCancelAppointment(app.id)}
                          className="absolute top-4 right-4 text-white/40 hover:text-red-400 p-1.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
                          title="Cancel Booking"
                          id={`cancel-app-btn-${app.id}`}
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="space-y-2">
                          <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border inline-block ${getServiceColor(app.service || "hair")}`}>
                            {app.service}
                          </span>
                          <h4 className="font-bold text-sm text-white">{app.name}</h4>
                          <p className="text-xs text-linen/75 font-medium truncate">{app.subService}</p>

                          <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px] text-linen/85 font-semibold">
                            <div className="flex items-center space-x-1">
                              <Calendar size={12} className="text-seafoam" />
                              <span>{app.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={12} className="text-seafoam" />
                              <span>{app.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/10 mt-4 pt-3 flex justify-between items-center text-[10px] text-linen/60">
                          <span>Ref ID: MC-{app.id?.slice(-6)}</span>
                          <span className="text-emerald-400 font-bold uppercase tracking-wider">🟢 Confirmed</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-linen/60 mt-6 text-center">
                    Need assistance changing your timing? Please contact the clinic reception desk at 📞 +91 {CLINIC_INFO.phone}
                  </p>
                </div>
              </section>
            )}

            {/* CONTACT PREVIEW SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="animate-card-breathing-shadow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-linen rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden"
              >
                {/* Premium Apple-Style Background Layer */}
                <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden rounded-3xl">
                  <div className="animate-loc-bg-radial absolute -inset-4 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-slate-teal/10 via-seafoam/5 to-transparent blur-2xl opacity-40" />
                  <span className="absolute top-4 left-10 text-slate-teal/15 text-xs font-bold select-none animate-icon-idle-float">+</span>
                  <span className="absolute bottom-6 left-1/3 text-slate-teal/15 text-sm font-bold select-none animate-icon-idle-float" style={{ animationDelay: "1.5s" }}>+</span>
                  <span className="absolute top-1/2 right-12 text-slate-teal/15 text-xs font-bold select-none animate-icon-idle-float" style={{ animationDelay: "3s" }}>+</span>
                  <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-slate-teal/20 animate-icon-idle-float" style={{ animationDelay: "0.8s" }} />
                  <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-seafoam/30 animate-icon-idle-float" style={{ animationDelay: "2.2s" }} />
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.2,
                      }
                    }
                  }}
                  className="lg:col-span-5 space-y-4 z-10"
                >
                  <motion.div variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>
                    <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                      Clinic Coordinates
                    </span>
                  </motion.div>
                  <motion.h3
                    variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                    className="font-serif text-2xl font-bold text-charcoal"
                  >
                    Location & Hours
                  </motion.h3>
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                    className="text-xs sm:text-sm text-charcoal/60 leading-relaxed"
                  >
                    We are conveniently nested near **Irwin Square, Amravati**. If you require transport guides, our reception desk is open for live directions on dial.
                  </motion.p>

                  <div className="space-y-3 pt-2 text-xs text-charcoal/70">
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                      className="group flex items-start space-x-2.5"
                    >
                      <MapPin size={16} className="text-slate-teal shrink-0 mt-0.5 animate-icon-idle-float transition-all duration-300 group-hover:scale-[1.15] group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(13,148,136,0.5)]" />
                      <span>{CLINIC_INFO.address}</span>
                    </motion.p>
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                      className="group flex items-center space-x-2.5"
                    >
                      <Phone size={16} className="text-slate-teal shrink-0 animate-icon-idle-float transition-all duration-300 group-hover:scale-[1.15] group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(13,148,136,0.5)]" style={{ animationDelay: "1s" }} />
                      <span>+91 {CLINIC_INFO.phone}</span>
                    </motion.p>
                    <motion.p
                      variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                      className="group flex items-center space-x-2.5"
                    >
                      <Clock size={16} className="text-slate-teal shrink-0 animate-icon-idle-float transition-all duration-300 group-hover:scale-[1.15] group-hover:rotate-[5deg] group-hover:drop-shadow-[0_0_8px_rgba(13,148,136,0.5)]" style={{ animationDelay: "2s" }} />
                      <span>{CLINIC_INFO.timings}</span>
                    </motion.p>
                  </div>

                  <motion.div variants={{ hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }} className="pt-1">
                    <motion.button
                      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      onClick={() => setActiveTab("contact")}
                      className="group bg-[linear-gradient(135deg,#0F766E_0%,#0D9488_100%)] hover:bg-[linear-gradient(135deg,#0D9488_0%,#11A89D_100%)] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-[0_8px_24px_rgba(13,148,136,0.25)] hover:shadow-[0_14px_32px_rgba(13,148,136,0.40)] transition-all duration-300 ease-out cursor-pointer inline-flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-teal/50"
                    >
                      <span>View Interactive Maps & Details</span>
                      <ChevronRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-[6px] shrink-0" />
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Map Frame right side */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  whileHover={(shouldReduceMotion || isMobile) ? {} : {
                    scale: 1.01,
                    boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.3), 0 10px 15px -5px rgba(13, 148, 136, 0.15)",
                    borderColor: "rgba(13, 148, 136, 0.6)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="animate-map-border-glow map-reflection-container lg:col-span-7 h-[280px] rounded-2xl overflow-hidden border border-linen relative shadow-inner transition-colors duration-300 z-10"
                >
                  <iframe
                    src={CLINIC_INFO.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Home Clinic Coordinates Irwin Square Amravati"
                    className="w-full h-full"
                  />
                </motion.div>
              </motion.div>
            </section>

          </div>
        )}

        {/* VIEW 2: TREATMENTS & SERVICES CATALOG */}
        {activeTab === "services" && (
          <div className="animate-fade-in">
            <ServicesSection onOpenBooking={(id) => handleOpenBooking(id)} />
          </div>
        )}

        {/* VIEW 3: DR PROFILE AND QUALIFICATIONS */}
        {activeTab === "doctor" && (
          <div className="animate-fade-in">
            <AboutSection onOpenBooking={() => handleOpenBooking()} />
          </div>
        )}

        {/* VIEW 4: GALLERY CATEGORIZED GRID */}
        {activeTab === "gallery" && (
          <div className="animate-fade-in">
            <GallerySection />
          </div>
        )}

        {/* VIEW 5: TESTIMONIAL FEEDBACK LOGGER */}
        {activeTab === "testimonials" && (
          <div className="animate-fade-in">
            <FeedbackSection />
          </div>
        )}

        {/* VIEW 6: DYNAMIC COLLAPSIBLE ACCORDION FAQS */}
        {activeTab === "faq" && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linen/10 animate-fade-in" id="faq-view-panel">
            <div className="max-w-3xl mx-auto">

              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                  Educational Board
                </span>
                <h2 className="font-serif text-3xl font-bold text-charcoal mt-3">
                  Frequently Clinical Inquiries
                </h2>
                <p className="text-charcoal/70 text-xs sm:text-sm mt-1">
                  Get scientific insights regarding our custom combined treatment procedures.
                </p>
              </div>

              <div className="space-y-4">
                {CLINIC_FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-linen rounded-2xl overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                      className="w-full text-left p-5 flex justify-between items-center hover:bg-linen/10 transition-colors cursor-pointer"
                      id={`faq-btn-${idx}`}
                    >
                      <h3 className="font-serif font-bold text-sm sm:text-base text-charcoal pr-4">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        size={18}
                        className={`text-slate-teal shrink-0 transition-transform ${expandedFaqIndex === idx ? "rotate-180" : ""}`}
                      />
                    </button>

                    {expandedFaqIndex === idx && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/75 border-t border-linen/50 bg-[#F0F7FC] animate-fade-in leading-relaxed text-left">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Consultation appeal */}
              <div className="mt-10 bg-white border border-linen rounded-2xl p-6 text-center space-y-4">
                <h3 className="font-serif font-bold text-lg text-charcoal">Have a specific medical query?</h3>
                <p className="text-xs text-charcoal/60">
                  Everyone's clinical blue-print is unique. You can ask our Muskaan AI Guide right now, or schedule a physical consultation in our Amravati premises.
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => setAiAssistantOpen(true)}
                    className="bg-linen/40 border border-linen text-slate-teal font-bold text-xs py-2 px-4 rounded-xl hover:bg-linen/70 transition-colors cursor-pointer"
                  >
                    Ask AI Guide
                  </button>
                  <button
                    onClick={() => handleOpenBooking()}
                    className="bg-slate-teal text-white font-bold text-xs py-2 px-4 rounded-xl hover:bg-charcoal transition-colors cursor-pointer"
                  >
                    Book Priority Visit
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* VIEW 7: CONTACT DETAILS & FORM */}
        {activeTab === "contact" && (
          <div className="animate-fade-in">
            <ContactSection />
          </div>
        )}

      </main>

      {/* PERSISTENT FOOTER */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* --- FLOATING CONTROLS --- */}

      {/* Persistent AI Assistant Bubble */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end space-y-2">
        {/* Helper pop tooltip */}
        {!aiAssistantOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-charcoal text-white text-[11px] font-semibold py-1.5 px-3 rounded-xl shadow-md border border-slate-teal/30 hidden sm:block animate-pulse"
          >
            ✨ Chat with Muskaan AI Guide
          </motion.div>
        )}
        <motion.button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="w-14 h-14 rounded-full bg-slate-teal hover:bg-charcoal text-white flex items-center justify-center shadow-lg shadow-slate-teal/20 transition-colors cursor-pointer border border-seafoam/20 relative"
          id="floating-ai-guide-toggle"
          aria-label="Toggle Muskaan AI assistant guide drawer"
        >
          {aiAssistantOpen ? <X size={24} /> : <Bot size={24} className="text-linen" />}
        </motion.button>
      </div>

      {/* Slide-out Drawer Panel for AI Guide */}
      <AnimatePresence>
        {aiAssistantOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-linen"
          >
            <AIGuide
              onClose={() => setAiAssistantOpen(false)}
              onOpenBooking={() => {
                setAiAssistantOpen(false);
                handleOpenBooking();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scheduling overlay Modal */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ background: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(16px)" }}
            className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
          >
            {/* Soft radial glow behind the modal */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" aria-hidden="true">
              <div className="w-[550px] h-[550px] bg-slate-teal/25 rounded-full blur-[120px] animate-pulse" />
            </div>

            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-2xl relative z-10"
            >
              <AppointmentForm
                preSelectedServiceId={preSelectedServiceId}
                onClose={() => setBookingOpen(false)}
                onAppointmentCreated={handleAppointmentCreated}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
