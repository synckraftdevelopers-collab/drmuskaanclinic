"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GALLERY_CATEGORIES, GALLERY_IMAGES, CLINIC_CONFIG } from "../lib/content";
import { Sparkles, HeartPulse, Award, CheckCircle2, Image as ImageIcon, Smile, BookOpen, Activity } from "lucide-react";
import { motion } from "motion/react";

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [allPortfolioItems] = useState(GALLERY_IMAGES);
  const [filteredPortfolioItems, setFilteredPortfolioItems] = useState(GALLERY_IMAGES);

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
    if (img.id === "g1") {
      return (
        <div className="relative h-[240px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/Reception & Waiting Lounge.png"
            alt={img.title || "Reception & Waiting Lounge"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

    if (img.id === "equipment-2") {
      return (
        <div className="relative h-[240px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/Hair Growth Helmet System.png"
            alt={img.title || "Hair Growth Helmet System"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

    if (img.id === "treatment-1") {
      return (
        <div className="relative h-[240px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/PRP & Trichology Procedure Bay.png"
            alt={img.title || "PRP & Trichology Procedure Bay"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

    if (img.id === "treatment-2") {
      return (
        <div className="relative h-[240px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/Cosmetology & Clinical Peels Suite.png"
            alt={img.title || "Cosmetology & Clinical Peels Suite"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

    if (img.id === "g2") {
      return (
        <div className="relative h-[220px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/consulting.jpeg"
            alt="Doctor's Consulting Suite"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

    if (img.id === "certificates-2") {
      return (
        <div className="relative h-[220px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/26 Years Clinical Excellence Citation.jpeg"
            alt="26 Years Clinical Excellence Citation"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-[center_20%] transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

    if (img.id === "equipment-1") {
      return (
        <div className="relative h-[240px] w-full overflow-hidden rounded-t-xl">
          <Image
            src="/High-Frequency Scalp & PRP Stimulator (2).png"
            alt={img.title || "High-Frequency Scalp & PRP Stimulator"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>
      );
    }

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

  const handleFilterClick = (catId: string) => {
    const cleanCatId = catId.trim();
    setActiveCategory(cleanCatId);

    let newFiltered = [];
    if (cleanCatId === "all") {
      newFiltered = [...allPortfolioItems];
    } else {
      newFiltered = allPortfolioItems.filter(img => {
        // Robust check: match by id or label, case-insensitive, no extra spaces
        const imgCat = img.category.trim().toLowerCase();
        const catTarget = cleanCatId.toLowerCase();
        const idMatch = imgCat === catTarget;
        const categoryObj = GALLERY_CATEGORIES.find(c => c.id === cleanCatId);
        const labelMatch = categoryObj ? imgCat === categoryObj.label.trim().toLowerCase() : false;
        
        return idMatch || labelMatch;
      });
    }

    // Apply before_after approval check
    newFiltered = newFiltered.filter(img => {
      const categoryObj = GALLERY_CATEGORIES.find(cat => cat.id === img.category);
      if (categoryObj?.requiresApproval && !CLINIC_CONFIG.beforeAfterApproved) {
        return false;
      }
      return true;
    });

    console.log("--- Portfolio Debug ---");
    console.log("Selected category:", cleanCatId);
    console.log("Total portfolio items:", allPortfolioItems.length);
    console.log("Filtered items count:", newFiltered.length);

    setFilteredPortfolioItems(newFiltered);
  };

  useEffect(() => {
    handleFilterClick("all");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            Explore our state-of-the-art facility near Sabunpura Gandhi Chowk, Juna Motor Stand Road, Gandhi Chowk, Amravati-444601, Maharashtra. Witness our sterile procedure bays, advanced aesthetic devices, and clinical certifications.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => handleFilterClick("all")}
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
              onClick={() => handleFilterClick(cat.id)}
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


        {/* Images Grid (4. Stagger Card Animation) */}
        {filteredPortfolioItems.length > 0 ? (
          <motion.div 
            key={activeCategory} // Force re-mount to re-trigger stagger animation
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]" 
            id="gallery-images-container"
          >
            {filteredPortfolioItems.map((img) => (
            <motion.div 
              key={img.id}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: "0 15px 35px -5px rgba(13,148,136,0.12)", borderColor: "rgba(13,148,136,0.3)" }}
              className="bg-white border border-linen rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all group flex flex-col text-left"
              id={`gallery-item-${img.id}`}
            >
              {/* Image Container with SVG illustration representing the space */}
              {getCategoryImagePlaceholder(img)}

              {/* Text metadata */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-2">
                <div>
                  {img.id !== "certificates-2" && (
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-slate-teal bg-slate-teal/10 px-2 py-0.5 rounded">
                      {img.category.replace("_", " ")}
                    </span>
                  )}
                  <h3 className="font-serif text-base font-bold text-charcoal mt-2 leading-tight">
                    {img.title}
                  </h3>
                  <p className="text-xs text-charcoal/60 mt-1.5 leading-relaxed">
                    {img.alt}
                  </p>
                </div>
              </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-linen/20 rounded-2xl border border-linen min-h-[300px]">
            <ImageIcon size={48} className="text-slate-teal/30 mb-4" />
            <h3 className="text-xl font-bold text-charcoal">No portfolio available</h3>
            <p className="text-sm text-charcoal/60 mt-2">There are currently no items to display in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
}
