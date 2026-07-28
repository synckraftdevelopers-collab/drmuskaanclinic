"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Quote, User, Sparkles, RefreshCw, ThumbsUp, Send } from "lucide-react";
import { motion } from "motion/react";
import { Testimonial } from "../types";

function AnimatedRatingDisplay({ target }: { target: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Number(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{displayValue.toFixed(1)}</span>;
}

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Review Form States
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [service, setService] = useState("Hair Restoration");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("/api/feedback");
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim() || !comment.trim()) {
      setErrorMessage("Please complete both your name and your review message.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rating,
          comment,
          service
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit review.");
      }

      const newFeedback = await response.json();
      setSuccessMessage("Thank you! Your testimonial has been submitted successfully and published.");
      
      // Clear form
      setName("");
      setComment("");
      setRating(5);
      setHoverRating(0);
      
      // Refresh list
      fetchFeedbacks();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An error occurred while publishing your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingSummary = () => {
    if (feedbacks.length === 0) return { avg: 5.0, count: 0 };
    const total = feedbacks.reduce((acc, f) => acc + f.rating, 0);
    return {
      avg: Number((total / feedbacks.length).toFixed(1)),
      count: feedbacks.length
    };
  };

  const summary = getRatingSummary();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 relative overflow-hidden" id="testimonials-section-wrapper">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <Sparkles size={13} className="text-amber-500" />
            <span>Patient Chronicles</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3.5">
            Real Stories of Renewal
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2.5 leading-relaxed font-medium">
            Read testimonials from real patients in Amravati who have undergone advanced aesthetic procedures and classical homeopathy at Muskaan Clinic.
          </p>
        </div>

        {/* Rating and Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Rating summary & Leave a Review Form */}
          <div className="lg:col-span-5 space-y-8 relative">
            
            {/* Subtle Enterprise Health Decorative Background Layer (Opacity < 8%) */}
            <div className="absolute -inset-4 pointer-events-none overflow-hidden rounded-3xl -z-10 opacity-7">
              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 left-2 w-32 h-32 rounded-full bg-slate-teal blur-2xl"
              />
              <motion.div 
                animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 right-2 w-36 h-36 rounded-full bg-blue-600 blur-2xl"
              />
              <div className="absolute top-1/4 right-8 text-slate-teal text-3xl font-extrabold">+</div>
              <div className="absolute bottom-1/3 left-6 text-blue-600 text-2xl font-extrabold">+</div>
              <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-slate-teal/60 blur-[1px]" />
            </div>

            {/* Rating summary widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.15)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-md border border-linen rounded-2xl p-6 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-3">
                <h3 className="font-serif text-xs uppercase tracking-widest text-slate-teal font-extrabold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-500 animate-pulse" />
                  <span>Clinic Reputation</span>
                </h3>
                <div className="flex items-baseline space-x-2.5">
                  <span className="text-5xl sm:text-6xl font-serif font-extrabold text-[#0B1F4D] tracking-normal inline-block pr-1.5 py-1 -ml-0.5">
                    <AnimatedRatingDisplay target={summary.avg} />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50">out of 5.0</span>
                </div>
                <div className="flex items-center space-x-1.5 pt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={20} 
                      className={s <= Math.round(summary.avg) ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" : "text-charcoal/20"} 
                    />
                  ))}
                </div>
                <p className="text-xs text-charcoal/70 font-semibold pt-1">
                  Based on <span className="text-slate-teal font-bold">{summary.count}</span> verified patient reviews
                </p>
              </div>
              
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-slate-teal/15 via-seafoam/20 to-slate-teal/10 rounded-2xl flex items-center justify-center text-slate-teal shrink-0 shadow-[0_0_20px_rgba(13,148,136,0.25)] border border-slate-teal/30 relative overflow-hidden group"
              >
                <ThumbsUp size={30} className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(13,148,136,0.4)]" />
              </motion.div>
            </motion.div>

            {/* Submit a Review Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 35px -10px rgba(13, 148, 136, 0.12)", borderColor: "rgba(13, 148, 136, 0.4)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white/95 backdrop-blur-md border border-linen rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] space-y-5 transition-all"
              id="patient-review-form"
            >
              <div className="border-b border-linen/80 pb-3.5">
                <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
                  <MessageSquare size={18} className="text-slate-teal" />
                  <span>Share Your Experience</span>
                </h3>
                <p className="text-xs text-charcoal/60 mt-1 font-medium">
                  Your feedback helps others in Amravati make informed decisions about their clinical care.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Patient Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-3 text-charcoal/40" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-linen/80 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 shadow-2xs transition-all duration-300 font-semibold"
                      required
                    />
                  </div>
                </div>

                {/* Treatment category */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Treatment Received *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-white border border-linen/80 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 shadow-2xs transition-all duration-300 font-semibold"
                  >
                    <option value="Hair Restoration">Hair Restoration (PRP / Meso)</option>
                    <option value="Skin Care & Aesthetics">Skin Care (Peels / Hydra)</option>
                    <option value="Constitutional Homeopathy">Constitutional Homeopathy</option>
                    <option value="Integrated Dual Therapy">Integrated Dual Therapy</option>
                    <option value="General Check-up">General Check-up / Guidance</option>
                  </select>
                </div>

                {/* Interactive Star Selection */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Your Rating: {hoverRating || rating} Star{(hoverRating || rating) > 1 ? "s" : ""} *
                  </label>
                  <div 
                    className="flex items-center space-x-2 py-1.5"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHoverRating(s)}
                        whileHover={{ scale: 1.2, rotate: 6 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ duration: 0.25, type: "spring", stiffness: 300 }}
                        className="focus:outline-none cursor-pointer p-0.5"
                        id={`star-rating-btn-${s}`}
                      >
                        <Star 
                          size={26} 
                          className={s <= (hoverRating || rating) ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] transition-all duration-200" : "text-charcoal/20 transition-all duration-200"} 
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-extrabold text-charcoal/70 mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    placeholder="Describe Dr. Imran's service, your experience, and the results you achieved."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-linen/80 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:border-[#0D9488] focus:ring-4 focus:ring-[#0D9488]/10 shadow-2xs transition-all duration-300 resize-none font-semibold"
                    required
                  />
                </div>

                {successMessage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-500/15 text-emerald-800 rounded-xl text-xs font-bold text-center border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 backdrop-blur-md" 
                    id="feedback-success-msg"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-xs">✔</span>
                    <span>Verified Review Submitted</span>
                  </motion.div>
                )}

                {errorMessage && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3.5 bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center border border-red-200 shadow-xs" 
                    id="feedback-error-msg"
                  >
                    ⚠️ {errorMessage}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={isSubmitting ? {} : { y: -3, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.4)" }}
                  whileTap={isSubmitting ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ background: "linear-gradient(135deg, #0B1F4D, #1E3A8A)" }}
                  className="w-full flex items-center justify-center space-x-2.5 text-white font-bold py-3 px-5 rounded-xl text-xs transition-all cursor-pointer disabled:opacity-50 shadow-md group relative overflow-hidden"
                  id="submit-feedback-btn"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={15} className="animate-spin text-seafoam" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} className="text-seafoam transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="tracking-wide">Publish Verified Review</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

          </div>

          {/* Column 2: Testimonials List (4. Stagger Card Animation) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="lg:col-span-7 space-y-6" 
            id="testimonials-feed"
          >
            {isLoading ? (
              <div className="text-center py-10 bg-white border border-linen rounded-2xl">
                <RefreshCw size={30} className="animate-spin text-slate-teal mx-auto mb-2" />
                <p className="text-xs text-charcoal/50 font-bold">Fetching verified patient logs...</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-10 bg-white border border-linen rounded-2xl">
                <p className="text-xs text-charcoal/50 font-bold">No verified reviews available yet. Be the first to post!</p>
              </div>
            ) : (
              feedbacks.map((item) => (
                <motion.div 
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                  }}
                  className="bg-white border border-linen rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between"
                  id={`patient-testimonial-${item.id}`}
                >
                  <Quote size={40} className="absolute -top-1 -right-1 text-linen/30 rotate-180" />
                  
                  <div className="space-y-3">
                    {/* Header: Rating stars & Treatment label */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            size={14} 
                            className={s <= item.rating ? "text-amber-400 fill-amber-400" : "text-charcoal/20"} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-teal bg-slate-teal/15 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
                        {item.service}
                      </span>
                    </div>

                    {/* Testimony */}
                    <p className="text-sm italic text-charcoal/80 leading-relaxed font-serif pt-1">
                      "{item.comment}"
                    </p>
                  </div>

                  {/* Footer: Patient info & date */}
                  <div className="border-t border-linen mt-4 pt-3 flex justify-between items-center text-xs text-charcoal/50">
                    <span className="font-bold text-charcoal flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[10px] font-semibold">{item.date}</span>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
