"use client";

import React, { useState, useEffect, useRef } from "react";
import { Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, ArrowRight, X, Sparkles, RefreshCw, MapPin, Upload, Video, Wifi, Globe, Activity, Pill, AlertCircle, Hospital, MonitorSmartphone } from "lucide-react";
import { CLINIC_SERVICES, TIME_SLOTS } from "../lib/content";
import { Appointment } from "../types";
import { buildWhatsAppUrl, buildWhatsAppMessage, ConsultationFormData } from "../lib/whatsapp";
import { db, storage } from "../lib/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "motion/react";

interface AppointmentFormProps {
  onClose?: () => void;
  onAppointmentCreated?: (app: Appointment) => void;
  preSelectedServiceId?: string;
}

export default function AppointmentForm({ onClose, onAppointmentCreated, preSelectedServiceId }: AppointmentFormProps) {
  // Step 1: Mode Selection
  const [consultationMode, setConsultationMode] = useState<"Online" | "Offline" | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [city, setCity] = useState("Amravati");
  const [serviceCategory, setServiceCategory] = useState(preSelectedServiceId || CLINIC_SERVICES[0].id);
  const [subService, setSubService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  // Online Specific Fields
  const [meetingPlatform, setMeetingPlatform] = useState("Google Meet");
  const [symptoms, setSymptoms] = useState("");
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [takingMedicines, setTakingMedicines] = useState("No");
  const [medicineDetails, setMedicineDetails] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  
  // Status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bookedAppointment, setBookedAppointment] = useState<ConsultationFormData | null>(null);
  const [copied, setCopied] = useState(false);
  const hasNotifiedDoctor = useRef(false);

  // Selected Service configuration
  const selectedService = CLINIC_SERVICES.find(s => s.id === serviceCategory) || CLINIC_SERVICES[0];

  // Sync subService selection default
  useEffect(() => {
    if (selectedService) {
      setSubService(selectedService.subServices[0].name);
    }
  }, [serviceCategory, selectedService]);

  // Auto-redirect to WhatsApp after 3 seconds on successful booking
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (bookedAppointment) {
      const whatsappUrl = buildWhatsAppUrl(bookedAppointment);
      timeoutId = setTimeout(() => {
        // Try multiple methods to force redirect, avoiding popup blockers by opening in self
        try {
          window.location.replace(whatsappUrl);
        } catch (e) {
          window.location.assign(whatsappUrl);
        }
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [bookedAppointment]);

  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleConditionToggle = (condition: string) => {
    if (condition === "None") {
      setMedicalConditions(["None"]);
      return;
    }
    
    setMedicalConditions(prev => {
      const newConds = prev.filter(c => c !== "None");
      if (newConds.includes(condition)) {
        return newConds.filter(c => c !== condition);
      } else {
        return [...newConds, condition];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!consultationMode) {
      setErrorMessage("Please select a Consultation Mode.");
      return;
    }
    
    if (!name.trim() || !phone.trim() || !date || !time) {
      setErrorMessage("Please fill in all required fields marked with an asterisk (*).");
      return;
    }

    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phone.trim())) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    
    if (consultationMode === "Online" && emergencyContact && !indianPhoneRegex.test(emergencyContact.trim())) {
      setErrorMessage("Please enter a valid 10-digit Indian emergency contact number.");
      return;
    }

    const selectedDate = new Date(date);
    if (selectedDate.getDay() === 0) {
      setErrorMessage("Appointments cannot be booked on Sundays as the clinic is closed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const consultationData = {
        consultationMode,
        patientName: name,
        mobile: phone,
        age,
        gender,
        city,
        category: selectedService.title,
        procedure: subService,
        date,
        time,
        status: "Pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        
        // Online specific
        ...(consultationMode === "Online" && {
          meetingPlatform,
          symptoms,
          medicalConditions,
          medicineDetails: takingMedicines === "Yes" ? medicineDetails : "",
          emergencyContact
        })
      };

      // Save to Firestore with timeout to prevent infinite hang on misconfiguration
      try {
        const savePromise = addDoc(collection(db, "consultations"), consultationData);
        let timeoutId: NodeJS.Timeout;
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error("Firestore save timed out")), 3000);
        });
        
        // Prevent unhandled rejection if race finishes first but timeout triggers later
        timeoutPromise.catch(() => {});
        
        const docRef = await Promise.race([savePromise, timeoutPromise]) as any;
        clearTimeout(timeoutId!);
        
        if (docRef && docRef.id) {
          console.log("Document written with ID: ", docRef.id);
        }
      } catch (err) {
        console.warn("Firebase Firestore save failed or timed out. Proceeding to WhatsApp generation.");
      }
      
      const formDataForWhatsApp: ConsultationFormData = {
        consultationMode,
        name,
        phone,
        age,
        gender,
        city,
        date,
        time,
        service: selectedService.title,
        subService,
        message: symptoms,
        meetingPlatform
      };

      // Notify the doctor via WhatsApp API Route (prevent duplicate sends)
      if (!hasNotifiedDoctor.current) {
        hasNotifiedDoctor.current = true;
        try {
          fetch('/api/notify-doctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              patientName: name,
              mobile: phone,
              consultationMode,
              date,
              time,
              message: symptoms
            })
          }).catch(err => {
            console.warn("Failed to notify doctor, but proceeding silently.", err);
          });
        } catch (notifyErr) {
          console.warn("Notification error swallowed to ensure booking succeeds.", notifyErr);
        }
      }

      setBookedAppointment(formDataForWhatsApp);
      
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An error occurred while booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookedAppointment) {
    const generatedMsg = buildWhatsAppMessage(bookedAppointment);
    const whatsappUrl = buildWhatsAppUrl(bookedAppointment);

    const handleCopy = () => {
      navigator.clipboard.writeText(generatedMsg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-linen shadow-xl max-w-2xl mx-auto text-center animate-scale-up relative overflow-y-auto max-h-[90vh]">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="text-emerald-600" size={36} />
        </div>
        <h2 className="font-serif text-3xl font-bold text-charcoal mb-2">
          Thank You!
        </h2>
        
        <div className="bg-linen/20 rounded-xl p-6 text-left mb-6 border border-linen">
          <p className="text-sm text-charcoal/80 mb-2 font-semibold">Dear {bookedAppointment.name},</p>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-2">
            Thank you for choosing Muskaan Clinic. Your consultation request has been received successfully.
          </p>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-2">
            Dr. Imran Shaikh and our team will review your appointment shortly. We are committed to providing you with the best care.
          </p>
          <p className="text-sm text-charcoal/80 font-medium italic mt-4">
            Thank you for trusting Muskaan Clinic.
          </p>
        </div>

        <div className="mb-6">
          <span className="inline-block bg-slate-teal/10 text-slate-teal font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-4 border border-slate-teal/20">
            {bookedAppointment.consultationMode} Consultation
          </span>
          
          <div className="bg-white border border-linen rounded-xl p-5 text-left grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm shadow-sm">
             <div>
              <span className="text-[10px] uppercase text-charcoal/50 block font-bold mb-0.5">Patient Name</span>
              <span className="font-semibold text-charcoal">{bookedAppointment.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-charcoal/50 block font-bold mb-0.5">Mobile</span>
              <span className="font-semibold text-charcoal">{bookedAppointment.phone}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-charcoal/50 block font-bold mb-0.5">Date & Time</span>
              <span className="font-semibold text-charcoal">{bookedAppointment.date}, {bookedAppointment.time}</span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] uppercase text-charcoal/50 block font-bold mb-0.5">Procedure</span>
              <span className="font-semibold text-charcoal">{bookedAppointment.service} - {bookedAppointment.subService}</span>
            </div>
            {bookedAppointment.consultationMode === "Online" && (
              <div>
                <span className="text-[10px] uppercase text-charcoal/50 block font-bold mb-0.5">Meeting Platform</span>
                <span className="font-semibold text-charcoal">{bookedAppointment.meetingPlatform}</span>
              </div>
            )}
            <div>
              <span className="text-[10px] uppercase text-charcoal/50 block font-bold mb-0.5">City</span>
              <span className="font-semibold text-charcoal">{bookedAppointment.city}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center mt-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>{bookedAppointment.consultationMode === "Online" ? "Join WhatsApp" : "Open WhatsApp"}</span>
          </a>

          <button
            onClick={() => {
              if (onClose) onClose();
            }}
            className="bg-slate-teal hover:bg-charcoal text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors"
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  }

  const isSunday = date ? new Date(date).getDay() === 0 : false;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-global-medical-gradient rounded-[28px] border border-slate-teal/10 p-6 sm:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] max-w-3xl mx-auto relative overflow-y-auto max-h-[90vh] custom-scrollbar" 
      style={{ boxShadow: "0 30px 80px rgba(15,23,42,0.18)", borderColor: "rgba(13,148,136,0.08)" }}
      id="appointment-booking-form"
    >
      {/* Subtle background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-teal/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/5 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

      {onClose && (
        <motion.button 
          onClick={onClose}
          whileHover={{ rotate: 90, backgroundColor: "rgba(15,23,42,0.06)" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute top-4 right-4 text-charcoal/40 hover:text-charcoal w-9 h-9 flex items-center justify-center rounded-full border border-linen/60 transition-colors z-10"
          aria-label="Close booking modal"
        >
          <X size={18} />
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
          Muskaan Clinic
        </span>
        <h3 className="font-serif text-3xl font-bold text-charcoal">
          Book Consultation
        </h3>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-sm text-charcoal/60 max-w-md mx-auto mt-2"
        >
          Choose your preferred mode of consultation and secure your appointment with Dr. Imran Shaikh.
        </motion.p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 0: Consultation Mode */}
        <div>
          <label className="block text-sm uppercase tracking-widest font-bold text-slate-teal mb-4 text-center">
            Select Consultation Mode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Offline Card — Soft Navy Blue (Light) */}
            <motion.button
              type="button"
              onClick={() => setConsultationMode("Offline")}
              whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(11,31,77,0.18)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between h-44 cursor-pointer"
              style={{
                background: consultationMode === "Offline"
                  ? "linear-gradient(135deg, #DBEAFE 0%, #EEF2FF 100%)"
                  : "linear-gradient(135deg, #EFF6FF 0%, #F0F4FF 100%)",
                boxShadow: consultationMode === "Offline"
                  ? "0 16px 40px -8px rgba(30,58,138,0.18), 0 0 0 2px rgba(59,130,246,0.35)"
                  : "0 4px 20px -4px rgba(11,31,77,0.10)",
                border: consultationMode === "Offline"
                  ? "2px solid rgba(59,130,246,0.40)"
                  : "2px solid rgba(147,197,253,0.50)"
              }}
            >
              {/* Decorative glow blob */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-200/40 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-100/30 rounded-full blur-xl pointer-events-none" aria-hidden="true" />

              <div className="flex items-start space-x-3 relative z-10">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ background: "linear-gradient(135deg, #BFDBFE, #C7D2FE)", border: "1px solid rgba(59,130,246,0.25)", color: "#1E3A8A" }}
                  aria-hidden="true"
                >
                  <Hospital size={24} strokeWidth={2} />
                </motion.div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold block mb-0.5" style={{ color: "#3B82F6" }}>In-Person</span>
                  <h4 className="text-base font-bold mb-1" style={{ color: "#1E3A8A" }}>Offline Consultation</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#3B5899" }}>
                    Visit Muskaan Clinic personally for examination and treatment.
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="flex items-center justify-end relative z-10 mt-3">
                {consultationMode === "Offline" ? (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <CheckCircle2 size={20} strokeWidth={2} style={{ color: "#3B82F6" }} />
                  </motion.div>
                ) : (
                  <ArrowRight size={16} style={{ color: "#93C5FD" }} />
                )}
              </div>
            </motion.button>

            {/* Online Card — Soft Teal (Light) */}
            <motion.button
              type="button"
              onClick={() => setConsultationMode("Online")}
              whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(13,148,136,0.20)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between h-44 cursor-pointer"
              style={{
                background: consultationMode === "Online"
                  ? "linear-gradient(135deg, #CCFBF1 0%, #D1FAE5 100%)"
                  : "linear-gradient(135deg, #F0FDF9 0%, #ECFDF5 100%)",
                boxShadow: consultationMode === "Online"
                  ? "0 16px 40px -8px rgba(13,148,136,0.20), 0 0 0 2px rgba(20,184,166,0.35)"
                  : "0 4px 20px -4px rgba(13,148,136,0.10)",
                border: consultationMode === "Online"
                  ? "2px solid rgba(20,184,166,0.45)"
                  : "2px solid rgba(110,231,183,0.50)"
              }}
            >
              {/* Decorative glow blob */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-teal-200/40 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-100/30 rounded-full blur-xl pointer-events-none" aria-hidden="true" />

              <div className="flex items-start space-x-3 relative z-10">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{ background: "linear-gradient(135deg, #99F6E4, #A7F3D0)", border: "1px solid rgba(20,184,166,0.30)", color: "#0F766E" }}
                  aria-hidden="true"
                >
                  <MonitorSmartphone size={24} strokeWidth={2} />
                </motion.div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-extrabold block mb-0.5" style={{ color: "#14B8A6" }}>Video & WhatsApp</span>
                  <h4 className="text-base font-bold mb-1" style={{ color: "#0F766E" }}>Online Consultation</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#167A6E" }}>
                    Consult Dr. Imran Shaikh through secure Video Call or WhatsApp from your home.
                  </p>
                </div>
              </div>

              {/* Bottom tag */}
              <div className="flex items-center justify-end relative z-10 mt-3">
                {consultationMode === "Online" ? (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <CheckCircle2 size={20} strokeWidth={2} style={{ color: "#14B8A6" }} />
                  </motion.div>
                ) : (
                  <ArrowRight size={16} style={{ color: "#5EEAD4" }} />
                )}
              </div>
            </motion.button>
          </div>
        </div>

        {consultationMode && (
          <div className="animate-fade-in space-y-8 pt-4 border-t border-linen">
            
            {/* Category & Procedure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">
                  1. Select Care Category *
                </label>
                <div className="flex flex-col space-y-2">
                  {CLINIC_SERVICES.map((serv) => (
                    <label key={serv.id} className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl border border-linen hover:bg-linen/30 transition-colors">
                      <input 
                        type="radio" 
                        name="serviceCategory"
                        checked={serviceCategory === serv.id}
                        onChange={() => setServiceCategory(serv.id)}
                        className="text-slate-teal focus:ring-slate-teal w-4 h-4"
                      />
                      <span className="text-sm font-semibold text-charcoal">{serv.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2">
                  2. Choose Procedure *
                </label>
                <select
                  value={subService}
                  onChange={(e) => setSubService(e.target.value)}
                  className="w-full bg-white border border-linen rounded-xl px-4 py-3.5 text-sm text-charcoal focus:outline-none focus:border-slate-teal focus:ring-2 focus:ring-slate-teal/20 transition-all font-medium"
                >
                  {selectedService.subServices.map((sub, idx) => (
                    <option key={idx} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                  <option value="General Consultation">General Consultation</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-linen pt-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2 flex items-center space-x-1.5">
                  <CalendarIcon size={14} className="text-slate-teal" />
                  <span>3. Choose Date *</span>
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal transition-all font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-charcoal/70 mb-2 flex items-center space-x-1.5">
                  <Clock size={14} className="text-slate-teal" />
                  <span>4. Choose Time Slot *</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal transition-all font-semibold"
                  required
                  disabled={isSunday}
                >
                  <option value="">{isSunday ? "Clinic Closed on Sunday" : "-- Choose Time Slot --"}</option>
                  {!isSunday && TIME_SLOTS.map((slot, idx) => (
                    <option key={idx} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Information */}
            <div className="space-y-5 border-t border-linen pt-6">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-teal flex items-center space-x-2">
                <User size={16} />
                <span>5. Patient Information</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Patient's Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Age *</label>
                  <input
                    type="number"
                    placeholder="Years"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Gender *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal font-semibold"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Online Consultation Specific Fields */}
            {consultationMode === "Online" && (
              <div className="space-y-6 border-t border-linen pt-6 bg-slate-teal/5 p-6 rounded-2xl">
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-teal flex items-center space-x-2">
                  <Video size={16} />
                  <span>Online Consultation Details</span>
                </label>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Preferred Meeting Platform</label>
                    <select
                      value={meetingPlatform}
                      onChange={(e) => setMeetingPlatform(e.target.value)}
                      className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal font-semibold"
                    >
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom">Zoom</option>
                      <option value="WhatsApp Video Call">WhatsApp Video Call</option>
                      <option value="Phone Call">Phone Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Describe Your Health Concern</label>
                  <textarea
                    placeholder="Explain your symptoms or concern briefly."
                    maxLength={1000}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal resize-none"
                  />
                  <p className="text-[10px] text-right text-charcoal/40 mt-1">{symptoms.length}/1000</p>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-2">Existing Medical Conditions</label>
                  <div className="flex flex-wrap gap-3">
                    {["Diabetes", "Blood Pressure", "Heart Disease", "Thyroid", "None"].map(cond => (
                      <label key={cond} className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-linen text-sm">
                        <input 
                          type="checkbox"
                          checked={medicalConditions.includes(cond)}
                          onChange={() => handleConditionToggle(cond)}
                          className="text-slate-teal rounded focus:ring-slate-teal"
                        />
                        <span>{cond}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-2">Are You Taking Medicines?</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="takingMedicines"
                        value="Yes"
                        checked={takingMedicines === "Yes"}
                        onChange={(e) => setTakingMedicines(e.target.value)}
                        className="text-slate-teal focus:ring-slate-teal w-4 h-4"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="takingMedicines"
                        value="No"
                        checked={takingMedicines === "No"}
                        onChange={(e) => setTakingMedicines(e.target.value)}
                        className="text-slate-teal focus:ring-slate-teal w-4 h-4"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>

                {takingMedicines === "Yes" && (
                  <div className="animate-fade-in">
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Medicine Details</label>
                    <textarea
                      placeholder="List the medicines you are currently taking."
                      value={medicineDetails}
                      onChange={(e) => setMedicineDetails(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/50 mb-1">Emergency Contact Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    className="w-full bg-white border border-linen rounded-xl px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-slate-teal"
                  />
                </div>

              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold flex items-center space-x-2 border border-red-100">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={isSubmitting ? {} : { scale: 1.01 }}
                whileTap={isSubmitting ? {} : { scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-slate-teal hover:bg-charcoal text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all cursor-pointer text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={20} className="animate-spin text-seafoam" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="text-seafoam" />
                    <span>Submit Request</span>
                    <ArrowRight size={20} className="ml-1" />
                  </>
                )}
              </motion.button>
            </div>

          </div>
        )}

      </form>
    </motion.div>
  );
}
