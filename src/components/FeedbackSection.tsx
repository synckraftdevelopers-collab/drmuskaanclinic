"use client";

import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Quote, User, Sparkles, RefreshCw, ThumbsUp, Send } from "lucide-react";
import { Testimonial } from "../types";

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Review Form States
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50" id="testimonials-section-wrapper">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
            Patient Chronicles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3">
            Real Stories of Renewal
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2">
            Read testimonials from real patients in Amravati who have undergone advanced aesthetic procedures and classical homeopathy at Muskaan Clinic.
          </p>
        </div>

        {/* Rating and Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Rating summary & Leave a Review Form */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Rating summary widget */}
            <div className="bg-white border border-linen rounded-2xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm uppercase tracking-wider text-charcoal/60 font-bold">Clinic Reputation</h3>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-4xl font-serif font-bold text-charcoal">{summary.avg}</span>
                  <span className="text-sm text-charcoal/50">out of 5.0</span>
                </div>
                <div className="flex items-center space-x-1 mt-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      size={16} 
                      className={s <= Math.round(summary.avg) ? "text-amber-400 fill-amber-400" : "text-charcoal/20"} 
                    />
                  ))}
                </div>
                <p className="text-xs text-charcoal/60 mt-3 font-semibold">
                  Based on {summary.count} verified patient reviews
                </p>
              </div>
              
              <div className="w-16 h-16 bg-linen rounded-full flex items-center justify-center text-slate-teal shrink-0">
                <ThumbsUp size={28} />
              </div>
            </div>

            {/* Submit a Review Form */}
            <div className="bg-white border border-linen rounded-2xl p-6 sm:p-8 shadow-xs space-y-5" id="patient-review-form">
              <div className="border-b border-linen pb-3">
                <h3 className="font-serif text-lg font-bold text-charcoal flex items-center space-x-2">
                  <MessageSquare size={18} className="text-slate-teal" />
                  <span>Share Your Experience</span>
                </h3>
                <p className="text-xs text-charcoal/50 mt-1">
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
                    <User size={14} className="absolute left-3 top-3 text-charcoal/40" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-linen/20 border border-linen rounded-xl pl-9 pr-3 py-2 text-xs text-charcoal focus:outline-none focus:border-slate-teal focus:ring-1 focus:ring-slate-teal/20 transition-all font-semibold"
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
                    className="w-full bg-linen/20 border border-linen rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-slate-teal focus:ring-1 focus:ring-slate-teal/20 transition-all font-semibold"
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
                    Your Rating: {rating} Star{rating > 1 ? "s" : ""} *
                  </label>
                  <div className="flex items-center space-x-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="focus:outline-none cursor-pointer transition-transform hover:scale-110"
                        id={`star-rating-btn-${s}`}
                      >
                        <Star 
                          size={24} 
                          className={s <= rating ? "text-amber-400 fill-amber-400" : "text-charcoal/20"} 
                        />
                      </button>
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
                    className="w-full bg-linen/20 border border-linen rounded-xl px-3 py-2.5 text-xs text-charcoal focus:outline-none focus:border-slate-teal focus:ring-1 focus:ring-slate-teal/20 transition-all resize-none"
                    required
                  />
                </div>

                {successMessage && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-bold text-center border border-emerald-100" id="feedback-success-msg">
                    ✨ {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-[11px] font-bold text-center" id="feedback-error-msg">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 bg-charcoal hover:bg-slate-teal text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
                  id="submit-feedback-btn"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={14} className="animate-spin text-seafoam" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="text-seafoam" />
                      <span>Publish Verified Review</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* Column 2: Testimonials List */}
          <div className="lg:col-span-7 space-y-6" id="testimonials-feed">
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
                <div 
                  key={item.id}
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
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
