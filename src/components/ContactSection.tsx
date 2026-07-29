"use client";

import React, { useState } from "react";
import { CLINIC_INFO } from "../lib/content";
import { motion } from "motion/react";
import { PhoneCall, Mail, MapPinned, Clock3, Send, MessageCircle, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { buildContactWhatsAppUrl, buildContactWhatsAppMessage } from "../lib/whatsapp";

export default function ContactSection() {
  // Contact Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmittedMessage, setLastSubmittedMessage] = useState("");
  const [contactCopied, setContactCopied] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLastSubmittedMessage("");

    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage("Please complete all fields in this inquiry card.");
      return;
    }

    // Phone format validation (10-digit Indian)
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phone.trim())) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate/Trigger saving to contact log or sending to support
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rating: 5,
          comment: `[Inquiry via Contact Form] ${message}`,
          service: "General Check-up"
        })
      });

      // Build the raw preview and URL
      const rawMessage = buildContactWhatsAppMessage({
        name,
        phone,
        message
      });
      setLastSubmittedMessage(rawMessage);

      // 2. Build the contact WhatsApp URL and redirect in a new tab as fallback
      const contactWhatsAppUrl = buildContactWhatsAppUrl({
        name,
        phone,
        message
      });

      window.open(contactWhatsAppUrl, "_blank", "noopener,noreferrer");

      setSuccessMessage("Thank you! Your general inquiry has been saved, and we have opened a WhatsApp message pre-filled with your message to send to Dr. Shaikh.");
      setName("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setErrorMessage("An error occurred. Please try sending via WhatsApp directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F0F7FC]/80 backdrop-blur-sm relative overflow-hidden" id="contact-view-panel">

      {/* 6. Page Background & 7. Decorative Elements (< 5% Opacity) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 opacity-5">
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-80 h-80 rounded-full bg-slate-teal blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-600 blur-3xl"
        />
        <div className="absolute top-1/4 right-1/4 text-slate-teal text-4xl font-extrabold">+</div>
        <div className="absolute bottom-1/3 left-1/4 text-blue-600 text-3xl font-extrabold">+</div>
        <div className="absolute top-1/2 left-10 text-slate-teal text-2xl font-extrabold">+</div>
        <div className="absolute top-20 right-20 w-4 h-4 rounded-full border-2 border-slate-teal" />
        <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-blue-600" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 1. Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <span>Contact Us</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3.5">
            Establish Contact
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2.5 font-medium leading-relaxed">
            Get in touch with us for priority consultations, treatment queries, or directions to our main Amravati premises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Column 1: Info Blocks & Google Map (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">

            {/* 2. Quick Contact Info Cards (Staggered Entrance & 6px Hover Lift) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10px" }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >

              {/* Telephone card */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.18)", borderColor: "#0D9488" }}
                transition={{ duration: 0.3 }}
                href={`tel:+91${CLINIC_INFO.phone}`}
                className="bg-white/95 backdrop-blur-md border border-linen p-5 rounded-2xl flex items-start space-x-4 transition-all text-left group shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
                id="contact-tel-card"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.10, rotate: 5, boxShadow: "0 0 15px rgba(13, 148, 136, 0.4)" }}
                  className="w-10 h-10 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                  <PhoneCall size={18} />
                </motion.div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50 group-hover:text-slate-teal transition-colors">Clinical Dial</span>
                  <p className="text-sm font-bold text-charcoal">+91 {CLINIC_INFO.phone}</p>
                  <p className="text-[11px] text-charcoal/50 font-medium">Click to call clinic reception</p>
                </div>
              </motion.a>

              {/* WhatsApp card */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 35px -10px rgba(16, 185, 129, 0.22)", borderColor: "#10B981" }}
                transition={{ duration: 0.3 }}
                href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 backdrop-blur-md border border-linen p-5 rounded-2xl flex items-start space-x-4 transition-all text-left group shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
                id="contact-wa-card"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.10, rotate: 5, boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)" }}
                  className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 animate-pulse"
                >
                  <MessageCircle size={18} />
                </motion.div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50 group-hover:text-emerald-600 transition-colors">WhatsApp Chat</span>
                  <p className="text-sm font-bold text-charcoal">Chat on WhatsApp</p>
                  <p className="text-[11px] text-charcoal/50 font-medium">Send an instant message query</p>
                </div>
              </motion.a>

              {/* Email card */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.18)", borderColor: "#0D9488" }}
                transition={{ duration: 0.3 }}
                href={`mailto:${CLINIC_INFO.email}`}
                className="bg-white/95 backdrop-blur-md border border-linen p-5 rounded-2xl flex items-start space-x-4 transition-all text-left group shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
                id="contact-email-card"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.10, rotate: 5, boxShadow: "0 0 15px rgba(13, 148, 136, 0.4)" }}
                  className="w-10 h-10 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                  <Mail size={18} />
                </motion.div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50 group-hover:text-slate-teal transition-colors">Electronic Mail</span>
                  <p className="text-sm font-bold text-charcoal truncate max-w-[180px]">{CLINIC_INFO.email}</p>
                  <p className="text-[11px] text-charcoal/50 font-medium">Replies within 1 business day</p>
                </div>
              </motion.a>

              {/* Hours Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.18)", borderColor: "#0D9488" }}
                transition={{ duration: 0.3 }}
                className="bg-white/95 backdrop-blur-md border border-linen p-5 rounded-2xl flex items-start space-x-4 transition-all text-left group shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  whileHover={{ scale: 1.10, rotate: 5, boxShadow: "0 0 15px rgba(13, 148, 136, 0.4)" }}
                  className="w-10 h-10 rounded-xl bg-linen text-charcoal flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                  <Clock3 size={18} />
                </motion.div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50 group-hover:text-slate-teal transition-colors">Clinic Timing</span>
                  <p className="text-xs font-bold text-charcoal">10:00 AM – 2:30 PM</p>
                  <p className="text-xs font-bold text-charcoal">6:30 PM – 9:30 PM</p>
                  <p className="text-[10px] text-charcoal/40 font-medium">Monday – Saturday</p>
                </div>
              </motion.div>

            </motion.div>

            {/* Address Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.18)", borderColor: "#0D9488" }}
              transition={{ duration: 0.3 }}
              className="bg-white/95 backdrop-blur-md border border-linen p-6 rounded-2xl text-left flex items-start space-x-4 transition-all group shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.10, rotate: 5, boxShadow: "0 0 15px rgba(13, 148, 136, 0.4)" }}
                className="w-12 h-12 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
              >
                <MapPinned size={22} />
              </motion.div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold text-charcoal/50 group-hover:text-slate-teal transition-colors">Physical Location</span>
                <h3 className="font-serif font-bold text-base text-charcoal">Muskaan Clinic</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed font-medium">
                  {CLINIC_INFO.address}
                </p>
                <p className="text-[11px] text-slate-teal font-semibold pt-1">
                  📍 Landmarks: Near Sabunpura Gandhi Chowk, Juna Motor Stand Road, Gandhi Chowk, Amravati-444601, Maharashtra.
                </p>
              </div>
            </motion.div>

            {/* 5. Google Map */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.22)", borderColor: "rgba(13, 148, 136, 0.6)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white/95 backdrop-blur-md border border-linen/80 p-4 rounded-3xl overflow-hidden h-[300px] flex flex-col relative shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all"
                id="contact-map-wrapper"
              >
                <iframe
                  src={CLINIC_INFO.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "20px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Muskaan Clinic Google Maps Location"
                  className="w-full h-full"
                />
              </motion.div>
              <div className="flex justify-start">
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  href="https://www.google.com/maps/dir/?api=1&destination=Dr.+Imran+Shaikh+(Muskaan+Clinic),+Near+Sabunpura+Gandhi+Chowk,+Juna+Motor+Stand+Road,+Amravati,+Maharashtra+444601"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Get Directions to Muskaan Clinic Amravati"
                  className="inline-flex items-center justify-center gap-[8px] h-[48px] px-[28px] py-[14px] rounded-[14px] text-[15px] font-semibold text-white cursor-pointer transition-all duration-300 ease-out border border-white/[0.08] shadow-[0_12px_30px_rgba(13,148,136,0.28)] hover:shadow-[0_18px_40px_rgba(13,148,136,0.40)] hover:-translate-y-[2px] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal btn-premium-cta"
                >
                  <MapPinned size={18} className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                  <span>Get Directions</span>
                </motion.a>
              </div>
            </div>

          </div>

          {/* 3. Contact Form (Column 2: 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 25px 45px -12px rgba(13, 148, 136, 0.12)", borderColor: "rgba(13, 148, 136, 0.4)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 bg-white/95 backdrop-blur-md border border-linen/80 rounded-3xl p-6 sm:p-8 shadow-[0_10px_35px_rgb(0,0,0,0.07)] transition-all"
          >
            <div className="space-y-5">
              <div className="border-b border-linen/80 pb-4">
                <h3 className="font-serif text-xl font-bold text-charcoal flex items-center space-x-2">
                  <Send size={18} className="text-slate-teal" />
                  <span>General Clinical Inquiry</span>
                </h3>
                <p className="text-xs text-charcoal/60 mt-1 font-medium">
                  Have an offline query? Complete this card and it will auto-populate a direct text inquiry for the Dr.'s staff.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-linen/80 rounded-xl px-4 py-3 text-xs text-charcoal outline-none focus:border-[#0D9488] focus:ring-0 focus:shadow-[0_0_0_4px_rgba(13,148,136,0.10)] shadow-2xs transition-all duration-300 font-semibold"
                    required
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Your Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit Indian format (e.g. 9876543210)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-linen/80 rounded-xl px-4 py-3 text-xs text-charcoal outline-none focus:border-[#0D9488] focus:ring-0 focus:shadow-[0_0_0_4px_rgba(13,148,136,0.10)] shadow-2xs transition-all duration-300 font-semibold"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Your Message / Query *
                  </label>
                  <textarea
                    placeholder="Please specify your health questions or procedures interested in."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-linen/80 rounded-xl px-4 py-3 text-xs text-charcoal outline-none focus:border-[#0D9488] focus:ring-0 focus:shadow-[0_0_0_4px_rgba(13,148,136,0.10)] shadow-2xs transition-all duration-300 resize-y font-semibold placeholder:text-charcoal/40"
                    required
                  />
                </div>

                {successMessage && (
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3.5 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-400/40 flex items-start space-x-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md"
                      id="contact-success-alert"
                    >
                      <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{successMessage}</span>
                    </motion.div>
                    {lastSubmittedMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/90 border border-linen/80 rounded-xl p-4 text-left space-y-2 shadow-xs"
                      >
                        <div className="flex justify-between items-center border-b border-linen/60 pb-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-teal">WhatsApp Message Preview (Aligned)</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(lastSubmittedMessage);
                              setContactCopied(true);
                              setTimeout(() => setContactCopied(false), 2000);
                            }}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded transition-colors cursor-pointer ${contactCopied
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-teal/10 text-slate-teal hover:bg-slate-teal hover:text-white"
                              }`}
                          >
                            {contactCopied ? "Copied! âœ“" : "Copy Message"}
                          </button>
                        </div>
                        <pre className="text-[11px] text-charcoal/80 whitespace-pre-wrap font-mono leading-relaxed bg-linen/20 p-3 rounded-lg border border-linen max-h-32 overflow-y-auto select-all">
                          {lastSubmittedMessage}
                        </pre>
                        <p className="text-[10px] text-charcoal/50 italic text-center mt-1">
                          If WhatsApp did not open automatically, copy this message and send it to our support staff.
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold border border-red-200 flex items-start space-x-2 shadow-xs"
                    id="contact-error-alert"
                  >
                    <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {/* 4. Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { y: -2, scale: 1.01, boxShadow: "0 15px 30px -5px rgba(29, 78, 216, 0.40)" }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ background: "linear-gradient(135deg, #0B1F4D, #1D4ED8)" }}
                  className="w-full flex items-center justify-center space-x-2.5 text-white font-bold py-3.5 px-5 rounded-xl text-xs transition-all cursor-pointer disabled:opacity-50 shadow-md group relative overflow-hidden"
                  id="submit-contact-btn"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin text-seafoam" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} className="text-seafoam transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="tracking-wide">Send via WhatsApp Support</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

