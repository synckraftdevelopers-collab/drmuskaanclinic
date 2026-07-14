"use client";

import React, { useState } from "react";
import { GALLERY_CATEGORIES, GALLERY_IMAGES, CLINIC_CONFIG } from "../lib/content";
import { Sparkles, HeartPulse, Award, CheckCircle2, Image as ImageIcon, Smile, BookOpen, Activity } from "lucide-react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case "clinic": return <Smile size={14} className="text-slate-teal" />;
      case "equipment": return <Activity size={14} className="text-slate-teal" />;
      case "treatment": return <HeartPulse size={14} className="text-slate-teal" />;
      case "certificates": return <Award size={14} className="text-slate-teal" />;
      case "before_after": return <CheckCircle2 size={14} className="text-slate-teal" />;
      default: return <ImageIcon size={14} className="text-slate-teal" />;
    }
  };

  const getCategoryImagePlaceholder = (img: any) => {
    // Generate a beautiful, high-fidelity clinical icon vector representation
    let bgGradient = "from-slate-500/10 to-charcoal/10";
    let iconColor = "text-slate-teal";
    let illustration = null;

    if (img.category === "clinic") {
      bgGradient = "from-teal-500/10 to-emerald-500/10";
      iconColor = "text-teal-600";
      illustration = <Smile size={48} className={`${iconColor} opacity-70 animate-pulse`} />;
    } else if (img.category === "equipment") {
      bgGradient = "from-blue-500/10 to-indigo-500/10";
      iconColor = "text-blue-600";
      illustration = <Activity size={48} className={`${iconColor} opacity-70`} />;
    } else if (img.category === "treatment") {
      bgGradient = "from-rose-500/10 to-purple-500/10";
      iconColor = "text-rose-600";
      illustration = <HeartPulse size={48} className={`${iconColor} opacity-70`} />;
    } else if (img.category === "certificates") {
      bgGradient = "from-amber-500/10 to-yellow-500/10";
      iconColor = "text-amber-600";
      illustration = <Award size={48} className={`${iconColor} opacity-70`} />;
    } else if (img.category === "before_after") {
      bgGradient = "from-emerald-500/10 to-teal-500/10";
      iconColor = "text-emerald-600";
      illustration = <Sparkles size={48} className={`${iconColor} opacity-70`} />;
    }

    return (
      <div className={`w-full aspect-video bg-gradient-to-br ${bgGradient} border-b border-linen flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-102 transition-transform duration-300`}>
        {illustration}
        <span className="text-[9px] uppercase font-bold tracking-widest text-charcoal/40 absolute bottom-3">
          Clinical Visual Asset
        </span>
      </div>
    );
  };

  // Filter categories. If beforeAfterApproved flag in CLINIC_CONFIG is false, filter out "before_after" category!
  const visibleCategories = GALLERY_CATEGORIES.filter(cat => {
    if (cat.requiresApproval) {
      return CLINIC_CONFIG.beforeAfterApproved;
    }
    return true;
  });

  const filteredImages = GALLERY_IMAGES.filter(img => {
    // If the category requires approval and beforeAfterApproved is false, hide the image completely
    const categoryObj = GALLERY_CATEGORIES.find(cat => cat.id === img.category);
    if (categoryObj?.requiresApproval && !CLINIC_CONFIG.beforeAfterApproved) {
      return false;
    }

    if (activeCategory === "all") return true;
    return img.category === activeCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="gallery-view-panel">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-slate-teal font-extrabold bg-slate-teal/15 px-3.5 py-1.5 rounded-full">
            Clinical Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mt-3">
            A Glimpse Into Muskaan
          </h2>
          <p className="text-charcoal/70 text-sm max-w-xl mx-auto mt-2">
            Explore our state-of-the-art facility near Irwin Square, Amravati. Witness our sterile procedure bays, advanced aesthetic devices, and clinical certifications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-slate-teal text-white shadow-xs"
                : "bg-linen/30 hover:bg-linen/60 text-charcoal"
            }`}
            id="gallery-cat-all-btn"
          >
            <ImageIcon size={14} />
            <span>Show All Portfolio</span>
          </button>
          
          {visibleCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-slate-teal text-white shadow-xs"
                  : "bg-linen/30 hover:bg-linen/60 text-charcoal"
              }`}
              id={`gallery-cat-${cat.id}-btn`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>


        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-images-container">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              className="bg-white border border-linen rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col text-left"
              id={`gallery-item-${img.id}`}
            >
              {/* Image Container with SVG illustration representing the space */}
              {getCategoryImagePlaceholder(img)}

              {/* Text metadata */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-teal bg-slate-teal/10 px-2 py-0.5 rounded">
                    {img.category.replace("_", " ")}
                  </span>
                  <h3 className="font-serif text-base font-bold text-charcoal mt-2 leading-tight">
                    {img.title}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1.5 leading-relaxed">
                    {img.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
