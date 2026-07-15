"use client";

import React, { useState } from "react";
import { CLINIC_INFO } from "../lib/content";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]" id="contact-view-panel">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
            Clinical Registry
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3">
            Establish Contact
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2">
            Get in touch with us for priority consultations, treatment queries, or directions to our main Amravati premises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column 1: Info Blocks & Google Map (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between">
            
            {/* Quick Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Telephone card */}
              <a 
                href={`tel:+91${CLINIC_INFO.phone}`}
                className="bg-white border border-linen p-5 rounded-2xl flex items-start space-x-4 hover:border-slate-teal hover:shadow-xs transition-all text-left"
                id="contact-tel-card"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50">Clinical Dial</span>
                  <p className="text-sm font-bold text-charcoal">+91 {CLINIC_INFO.phone}</p>
                  <p className="text-[11px] text-charcoal/50">Click to call the registry desk</p>
                </div>
              </a>

              {/* WhatsApp card */}
              <a 
                href={`https://wa.me/${CLINIC_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-linen p-5 rounded-2xl flex items-start space-x-4 hover:border-emerald-500 hover:shadow-xs transition-all text-left"
                id="contact-wa-card"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50">WhatsApp Chat</span>
                  <p className="text-sm font-bold text-charcoal">Chat on WhatsApp</p>
                  <p className="text-[11px] text-charcoal/50">Send an instant message query</p>
                </div>
              </a>

              {/* Email card */}
              <a 
                href={`mailto:${CLINIC_INFO.email}`}
                className="bg-white border border-linen p-5 rounded-2xl flex items-start space-x-4 hover:border-slate-teal hover:shadow-xs transition-all text-left"
                id="contact-email-card"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50">Electronic Mail</span>
                  <p className="text-sm font-bold text-charcoal truncate max-w-[180px]">{CLINIC_INFO.email}</p>
                  <p className="text-[11px] text-charcoal/50">Replies within 1 business day</p>
                </div>
              </a>

              {/* Hours Card */}
              <div className="bg-white border border-linen p-5 rounded-2xl flex items-start space-x-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-linen text-charcoal flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-extrabold text-charcoal/50">Clinic Timing</span>
                  <p className="text-xs font-bold text-charcoal">10:00 AM – 2:30 PM</p>
                  <p className="text-xs font-bold text-charcoal">6:30 PM – 9:30 PM</p>
                  <p className="text-[10px] text-charcoal/40">Monday – Saturday</p>
                </div>
              </div>

            </div>

            {/* Address Block */}
            <div className="bg-white border border-linen p-6 rounded-2xl text-left flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-slate-teal/10 text-slate-teal flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold text-charcoal/50">Physical Location</span>
                <h3 className="font-serif font-bold text-base text-charcoal">Muskaan Clinic</h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  {CLINIC_INFO.address}
                </p>
                <p className="text-[11px] text-slate-teal font-semibold">
                  📍 Landmarks: Near Sabunpura Gandhi Chowk, Juna Motor Stand Road, Gandhi Chowk, Amravati-444601, Maharashtra.
                </p>
              </div>
            </div>

            {/* Map Frame */}
            <div className="bg-white border border-linen p-4 rounded-3xl overflow-hidden h-[300px] flex flex-col relative" id="contact-map-wrapper">
              <iframe 
                src={CLINIC_INFO.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: "20px" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Muskaan Clinic Google Maps Location"
              />
            </div>

          </div>

          {/* Column 2: Contact Form (5 Cols) */}
          <div className="lg:col-span-5 bg-white border border-linen rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-5">
              <div className="border-b border-linen pb-4">
                <h3 className="font-serif text-xl font-bold text-charcoal flex items-center space-x-2">
                  <Send size={18} className="text-slate-teal" />
                  <span>General Clinical Inquiry</span>
                </h3>
                <p className="text-xs text-charcoal/50 mt-1">
                  Have an offline query? Complete this card and it will auto-populate a direct text inquiry for the Dr.'s staff.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-charcoal/60 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-linen/20 border border-linen rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-slate-teal focus:ring-1 focus:ring-slate-teal/20 transition-all font-semibold"
                    required
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-charcoal/60 mb-1.5">
                    Your Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit Indian format (e.g. 9876543210)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-linen/20 border border-linen rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-slate-teal focus:ring-1 focus:ring-slate-teal/20 transition-all font-semibold"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-extrabold text-charcoal/60 mb-1.5">
                    Your Message / Query *
                  </label>
                  <textarea
                    placeholder="Please specify your health questions or procedures interested in."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-linen/20 border border-linen rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:border-slate-teal focus:ring-1 focus:ring-slate-teal/20 transition-all resize-none"
                    required
                  />
                </div>

                {successMessage && (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] font-bold border border-emerald-100 flex items-start space-x-2 animate-scale-up" id="contact-success-alert">
                      <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{successMessage}</span>
                    </div>
                    {lastSubmittedMessage && (
                      <div className="bg-linen/20 border border-linen rounded-xl p-4 text-left space-y-2 animate-scale-up">
                        <div className="flex justify-between items-center border-b border-linen/60 pb-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-teal">WhatsApp Message Preview (Aligned)</span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(lastSubmittedMessage);
                              setContactCopied(true);
                              setTimeout(() => setContactCopied(false), 2000);
                            }}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded transition-colors ${
                              contactCopied 
                                ? "bg-emerald-500 text-white" 
                                : "bg-slate-teal/10 text-slate-teal hover:bg-slate-teal hover:text-white"
                            }`}
                          >
                            {contactCopied ? "Copied! âœ“" : "Copy Message"}
                          </button>
                        </div>
                        <pre className="text-[11px] text-charcoal/80 whitespace-pre-wrap font-mono leading-relaxed bg-white p-3 rounded-lg border border-linen max-h-32 overflow-y-auto select-all">
                          {lastSubmittedMessage}
                        </pre>
                        <p className="text-[10px] text-charcoal/50 italic text-center mt-1">
                          If WhatsApp did not open automatically, copy this message and send it to our support staff.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg text-[11px] font-bold border border-red-100 flex items-start space-x-2" id="contact-error-alert">
                    <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-charcoal hover:bg-slate-teal text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
                  id="submit-contact-btn"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-seafoam" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="text-seafoam" />
                      <span>Send via WhatsApp Support</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

