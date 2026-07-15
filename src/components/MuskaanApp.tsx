"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, HeartPulse, Activity, Calendar, Clock, MapPin, Phone, 
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

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>(undefined);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>([]);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  
  // Home Testimonial mini-carousel state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
    else if (activeTab === "contact") items.push({ name: "Contact Us & Registry", id: "contact" });
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
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-charcoal font-sans relative antialiased selection:bg-slate-teal/10 selection:text-slate-teal">
      
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
            <div className="text-[10px] uppercase tracking-wider text-slate-teal font-extrabold bg-slate-teal/10 px-2 py-0.5 rounded-md self-start sm:self-auto">
              Verified Medical Board
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PANEL */}
        {activeTab === "home" && (
          <div className="space-y-16 pb-16" id="home-view-panel">
            
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-linen/20 to-seafoam/15 py-16 sm:py-20 md:py-24 border-b border-linen">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-seafoam/10 via-transparent to-transparent opacity-80" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left content text */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center space-x-2 bg-slate-teal/10 text-slate-teal font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider border border-slate-teal/15">
                    <Sparkles size={14} className="text-slate-teal animate-pulse" />
                    <span>Amravati's Premier Integrated Clinic</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight tracking-tight">
                    Ethical Hair, Skin & <br />
                    <span className="text-slate-teal italic relative font-serif">
                      Homeopathic Restorations
                    </span>
                  </h1>

                  <p className="text-charcoal/70 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                    Led by <span className="font-bold text-charcoal">{CLINIC_INFO.doctor}</span> with over {CLINIC_INFO.experience} of dedicated clinical practice, we combine state-of-the-art visual aesthetic medicine with gentle, permanent constitutional homeopathy.
                  </p>

                  {/* Brand Quote Card */}
                  <div className="bg-white/80 backdrop-blur-xs border border-linen p-5 rounded-2xl max-w-lg shadow-xs">
                    <p className="text-xs sm:text-sm font-serif italic text-charcoal/80 leading-relaxed">
                      "To improve patients' confidence and health through ethical Hair, Skin, and Homeopathic treatments."
                    </p>
                    <p className="text-[10px] uppercase font-extrabold tracking-wider text-slate-teal/70 mt-2 text-right">
                      — Clinic Vision
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => handleOpenBooking()}
                      className="flex items-center justify-center space-x-2 bg-slate-teal hover:bg-charcoal text-white font-bold py-3.5 px-8 rounded-xl shadow-md shadow-slate-teal/10 hover:shadow-lg transition-all text-sm cursor-pointer"
                      id="hero-book-btn"
                    >
                      <Calendar size={16} />
                      <span>Book Slot Today</span>
                    </button>
                    <button
                      onClick={() => setAiAssistantOpen(true)}
                      className="flex items-center justify-center space-x-2 bg-white hover:bg-linen/30 text-slate-teal border border-slate-teal/20 font-bold py-3.5 px-8 rounded-xl transition-all text-sm cursor-pointer"
                      id="hero-ai-chat-btn"
                    >
                      <Bot size={16} />
                      <span>Chat with Muskaan AI Guide</span>
                    </button>
                  </div>
                </div>

                {/* Right side teaser card */}
                <div className="lg:col-span-5">
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
                          <p className="text-[10px] uppercase text-slate-teal font-extrabold mt-0.5">{DOCTOR_PROFILE.credentials}</p>
                          <p className="text-xs text-charcoal/60 mt-1">{DOCTOR_PROFILE.experience}</p>
                        </div>
                      </div>

                      {/* Info Points */}
                      <div className="space-y-2.5 text-xs text-charcoal/70 text-left">
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} className="text-slate-teal shrink-0" />
                          <span>Near Irwin Square, {CLINIC_INFO.city}, MH</span>
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

                      {/* Direct action list */}
                      <div className="bg-linen/30 border border-linen rounded-xl p-3 text-center">
                        <span className="text-[10px] font-extrabold uppercase text-slate-teal block mb-1">Clinic Status</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          🟢 Accepting Priority Patients
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* EXPERIENCE STATS BADGES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border border-linen rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row justify-evenly items-center gap-6 text-center">
                {CLINIC_STATS.map((st, i) => (
                  <div key={i} className="flex-1 w-full flex flex-col items-center justify-center space-y-2">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-teal">
                      {st.value}{st.suffix}
                    </span>
                    <p className="text-[10px] sm:text-xs uppercase font-extrabold text-charcoal/50 leading-tight">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* WHY CHOOSE US SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                  Clinical Standards
                </span>
                <h2 className="font-serif text-3xl font-bold text-charcoal mt-3">Why Patients Trust Muskaan</h2>
                <p className="text-xs sm:text-sm text-charcoal/60 mt-1 max-w-md mx-auto">Discover the foundational pillars that make Dr. Imran's clinical guidance supreme in Amravati.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {WHY_CHOOSE_US.map((wc, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-linen p-6 rounded-2xl shadow-xs text-left space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center">
                      {idx === 0 && <Award size={20} />}
                      {idx === 1 && <Activity size={20} />}
                      {idx === 2 && <ShieldCheck size={20} />}
                      {idx === 3 && <Sparkles size={20} />}
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
                      </div>
                      <h3 className="font-serif text-xl font-bold text-charcoal">{serv.title}</h3>
                      <p className="text-xs text-charcoal/60 leading-relaxed font-semibold">"{serv.tagline}"</p>
                      <p className="text-xs text-charcoal/70 leading-relaxed line-clamp-3">{serv.description}</p>
                    </div>

                    <div className="border-t border-linen mt-6 pt-4 flex justify-between items-center">
                      <button
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
                        className="text-slate-teal font-bold text-xs hover:underline inline-flex items-center space-x-1"
                      >
                        <span>View Catalog</span>
                        <ChevronRight size={14} />
                      </button>
                      <button
                        onClick={() => handleOpenBooking(serv.id)}
                        className="bg-linen/50 text-charcoal hover:bg-slate-teal hover:text-white font-semibold py-1.5 px-3.5 rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Book Consult
                      </button>
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
                      <div className="px-5 pb-5 pt-1 text-xs text-charcoal/70 border-t border-linen/30 bg-[#FAFAFA] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setActiveTab("faq")}
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
                  <button
                    onClick={() => handleOpenBooking()}
                    className="inline-flex items-center space-x-2 bg-slate-teal hover:bg-white hover:text-charcoal text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all text-sm cursor-pointer"
                  >
                    <Calendar size={16} />
                    <span>Initiate Priority Booking</span>
                  </button>
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
                    Need assistance changing your timing? Please contact the clinical registry desk at 📞 +91 {CLINIC_INFO.phone}
                  </p>
                </div>
              </section>
            )}

            {/* CONTACT PREVIEW SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-linen rounded-3xl p-6 sm:p-8 text-left">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
                    Clinic Coordinates
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-charcoal">Location & Hours</h3>
                  <p className="text-xs sm:text-sm text-charcoal/60 leading-relaxed">
                    We are conveniently nested near **Irwin Square, Amravati**. If you require transport guides, our reception desk is open for live directions on dial.
                  </p>
                  
                  <div className="space-y-3 pt-2 text-xs text-charcoal/70">
                    <p className="flex items-start space-x-2.5">
                      <MapPin size={16} className="text-slate-teal shrink-0 mt-0.5" />
                      <span>{CLINIC_INFO.address}</span>
                    </p>
                    <p className="flex items-center space-x-2.5">
                      <Phone size={16} className="text-slate-teal shrink-0" />
                      <span>+91 {CLINIC_INFO.phone}</span>
                    </p>
                    <p className="flex items-center space-x-2.5">
                      <Clock size={16} className="text-slate-teal shrink-0" />
                      <span>{CLINIC_INFO.timings}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("contact")}
                    className="bg-linen/50 hover:bg-linen text-charcoal font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer inline-flex items-center space-x-1"
                  >
                    <span>View Interactive Maps & Details</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Map Frame right side */}
                <div className="lg:col-span-7 h-[280px] rounded-2xl overflow-hidden border border-linen relative shadow-inner">
                  <iframe 
                    src={CLINIC_INFO.mapEmbedUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Home Clinic Coordinates Irwin Square Amravati"
                  />
                </div>
              </div>
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
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/75 border-t border-linen/50 bg-[#FAFAFA] animate-fade-in leading-relaxed text-left">
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
          <div className="bg-charcoal text-white text-[11px] font-semibold py-1.5 px-3 rounded-xl shadow-md border border-slate-teal/30 hidden sm:block animate-pulse">
            ✨ Chat with Muskaan AI Guide
          </div>
        )}
        <button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="w-14 h-14 rounded-full bg-slate-teal hover:bg-charcoal text-white flex items-center justify-center shadow-lg shadow-slate-teal/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border border-seafoam/20"
          id="floating-ai-guide-toggle"
          aria-label="Toggle Muskaan AI assistant guide drawer"
        >
          {aiAssistantOpen ? <X size={24} /> : <Bot size={24} className="text-linen" />}
        </button>
      </div>

      {/* Slide-out Drawer Panel for AI Guide */}
      {aiAssistantOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-linen animate-slide-in">
          <AIGuide 
            onClose={() => setAiAssistantOpen(false)} 
            onOpenBooking={() => {
              setAiAssistantOpen(false);
              handleOpenBooking();
            }}
          />
        </div>
      )}

      {/* Scheduling overlay Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl animate-scale-up">
            <AppointmentForm 
              preSelectedServiceId={preSelectedServiceId}
              onClose={() => setBookingOpen(false)}
              onAppointmentCreated={handleAppointmentCreated}
            />
          </div>
        </div>
      )}

    </div>
  );
}
