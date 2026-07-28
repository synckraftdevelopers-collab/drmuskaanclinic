"use client";

import React from "react";

export default function ContentSectionBackground() {
  // 48 tiny circles for floating particles across the full height
  const particles = [
    { left: "4%", top: "85%", size: 6, delay: "0s", anim: "animate-content-particle-1" },
    { left: "12%", top: "70%", size: 4, delay: "3s", anim: "animate-content-particle-2" },
    { left: "19%", top: "90%", size: 8, delay: "7s", anim: "animate-content-particle-3" },
    { left: "26%", top: "60%", size: 5, delay: "2s", anim: "animate-content-particle-4" },
    { left: "33%", top: "80%", size: 7, delay: "9s", anim: "animate-content-particle-1" },
    { left: "39%", top: "50%", size: 4, delay: "4s", anim: "animate-content-particle-2" },
    { left: "47%", top: "75%", size: 9, delay: "1s", anim: "animate-content-particle-3" },
    { left: "54%", top: "65%", size: 5, delay: "6s", anim: "animate-content-particle-4" },
    { left: "61%", top: "85%", size: 6, delay: "11s", anim: "animate-content-particle-1" },
    { left: "68%", top: "55%", size: 4, delay: "3s", anim: "animate-content-particle-2" },
    { left: "76%", top: "92%", size: 8, delay: "8s", anim: "animate-content-particle-3" },
    { left: "83%", top: "72%", size: 5, delay: "5s", anim: "animate-content-particle-4" },
    { left: "89%", top: "62%", size: 7, delay: "10s", anim: "animate-content-particle-1" },
    { left: "95%", top: "88%", size: 4, delay: "2s", anim: "animate-content-particle-2" },
    { left: "7%", top: "40%", size: 6, delay: "13s", anim: "animate-content-particle-3" },
    { left: "15%", top: "25%", size: 5, delay: "15s", anim: "animate-content-particle-4" },
    { left: "22%", top: "35%", size: 9, delay: "12s", anim: "animate-content-particle-1" },
    { left: "29%", top: "15%", size: 4, delay: "14s", anim: "animate-content-particle-2" },
    { left: "36%", top: "45%", size: 7, delay: "17s", anim: "animate-content-particle-3" },
    { left: "44%", top: "20%", size: 5, delay: "16s", anim: "animate-content-particle-4" },
    { left: "51%", top: "30%", size: 8, delay: "18s", anim: "animate-content-particle-1" },
    { left: "58%", top: "10%", size: 4, delay: "19s", anim: "animate-content-particle-2" },
    { left: "66%", top: "42%", size: 6, delay: "21s", anim: "animate-content-particle-3" },
    { left: "73%", top: "22%", size: 5, delay: "23s", anim: "animate-content-particle-4" },
    { left: "81%", top: "32%", size: 7, delay: "20s", anim: "animate-content-particle-1" },
    { left: "88%", top: "18%", size: 4, delay: "22s", anim: "animate-content-particle-2" },
    { left: "94%", top: "38%", size: 8, delay: "24s", anim: "animate-content-particle-3" },
    { left: "9%", top: "58%", size: 5, delay: "25s", anim: "animate-content-particle-4" },
    { left: "24%", top: "52%", size: 6, delay: "27s", anim: "animate-content-particle-1" },
    { left: "41%", top: "68%", size: 4, delay: "26s", anim: "animate-content-particle-2" },
    { left: "56%", top: "48%", size: 7, delay: "29s", anim: "animate-content-particle-3" },
    { left: "71%", top: "78%", size: 5, delay: "28s", anim: "animate-content-particle-4" },
    { left: "86%", top: "48%", size: 6, delay: "31s", anim: "animate-content-particle-1" },
    { left: "92%", top: "28%", size: 9, delay: "30s", anim: "animate-content-particle-2" },
    { left: "5%", top: "12%", size: 4, delay: "33s", anim: "animate-content-particle-3" },
    { left: "18%", top: "8%", size: 6, delay: "32s", anim: "animate-content-particle-4" },
    { left: "32%", top: "5%", size: 5, delay: "35s", anim: "animate-content-particle-1" },
    { left: "48%", top: "12%", size: 8, delay: "34s", anim: "animate-content-particle-2" },
    { left: "63%", top: "6%", size: 4, delay: "37s", anim: "animate-content-particle-3" },
    { left: "78%", top: "14%", size: 7, delay: "36s", anim: "animate-content-particle-4" },
    { left: "85%", top: "5%", size: 5, delay: "39s", anim: "animate-content-particle-1" },
    { left: "96%", top: "15%", size: 6, delay: "38s", anim: "animate-content-particle-2" },
    { left: "14%", top: "78%", size: 4, delay: "41s", anim: "animate-content-particle-3" },
    { left: "37%", top: "82%", size: 7, delay: "40s", anim: "animate-content-particle-4" },
    { left: "59%", top: "74%", size: 5, delay: "43s", anim: "animate-content-particle-1" },
    { left: "77%", top: "86%", size: 6, delay: "42s", anim: "animate-content-particle-2" },
    { left: "6%", top: "66%", size: 8, delay: "45s", anim: "animate-content-particle-3" },
    { left: "91%", top: "76%", size: 4, delay: "44s", anim: "animate-content-particle-4" }
  ];

  // 14 floating medical symbols (+, •, ✕, ○)
  const symbols = [
    { char: "+", left: "8%", top: "10%", delay: "0s", anim: "animate-content-symbol-1", size: 16 },
    { char: "•", left: "22%", top: "35%", delay: "4s", anim: "animate-content-symbol-2", size: 18 },
    { char: "○", left: "35%", top: "15%", delay: "2s", anim: "animate-content-symbol-1", size: 14 },
    { char: "+", left: "48%", top: "45%", delay: "6s", anim: "animate-content-symbol-2", size: 20 },
    { char: "✕", left: "62%", top: "20%", delay: "3s", anim: "animate-content-symbol-1", size: 12 },
    { char: "+", left: "75%", top: "40%", delay: "7s", anim: "animate-content-symbol-2", size: 16 },
    { char: "•", left: "88%", top: "12%", delay: "1s", anim: "animate-content-symbol-1", size: 14 },
    { char: "○", left: "15%", top: "60%", delay: "5s", anim: "animate-content-symbol-2", size: 18 },
    { char: "+", left: "30%", top: "80%", delay: "8s", anim: "animate-content-symbol-1", size: 16 },
    { char: "✕", left: "45%", top: "65%", delay: "9s", anim: "animate-content-symbol-2", size: 14 },
    { char: "•", left: "58%", top: "85%", delay: "2s", anim: "animate-content-symbol-1", size: 16 },
    { char: "+", left: "72%", top: "68%", delay: "10s", anim: "animate-content-symbol-2", size: 18 },
    { char: "○", left: "85%", top: "82%", delay: "4s", anim: "animate-content-symbol-1", size: 14 },
    { char: "+", left: "93%", top: "55%", delay: "7s", anim: "animate-content-symbol-2", size: 16 }
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* 3. Animated Gradient Mesh */}
      <div className="absolute inset-0 w-full h-full animate-content-mesh" />

      {/* 1. Floating Medical Gradient Blobs (7 large circles, blur 120px) */}
      <div 
        className="absolute top-[5%] left-[3%] w-[450px] h-[450px] rounded-full animate-content-blob-20" 
        style={{ backgroundColor: "rgba(13,148,136,0.08)", filter: "blur(120px)" }} 
      />
      <div 
        className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full animate-content-blob-25" 
        style={{ backgroundColor: "rgba(20,184,166,0.06)", filter: "blur(120px)" }} 
      />
      <div 
        className="absolute top-[40%] left-[15%] w-[550px] h-[550px] rounded-full animate-content-blob-30" 
        style={{ backgroundColor: "rgba(37,99,235,0.05)", filter: "blur(120px)" }} 
      />
      <div 
        className="absolute top-[55%] right-[12%] w-[480px] h-[480px] rounded-full animate-content-blob-35" 
        style={{ backgroundColor: "rgba(13,148,136,0.07)", filter: "blur(120px)" }} 
      />
      <div 
        className="absolute top-[75%] left-[8%] w-[520px] h-[520px] rounded-full animate-content-blob-22" 
        style={{ backgroundColor: "rgba(20,184,166,0.06)", filter: "blur(120px)" }} 
      />
      <div 
        className="absolute top-[85%] right-[20%] w-[460px] h-[460px] rounded-full animate-content-blob-28" 
        style={{ backgroundColor: "rgba(37,99,235,0.05)", filter: "blur(120px)" }} 
      />
      <div 
        className="absolute top-[30%] left-[55%] w-[400px] h-[400px] rounded-full animate-content-blob-32" 
        style={{ backgroundColor: "rgba(13,148,136,0.06)", filter: "blur(120px)" }} 
      />

      {/* 6. Soft Pulse Glow */}
      <div 
        className="absolute top-[25%] left-[30%] w-[600px] h-[300px] rounded-full animate-content-pulse" 
        style={{ backgroundColor: "rgba(20,184,166,0.05)", filter: "blur(100px)" }} 
      />
      <div 
        className="absolute top-[70%] right-[25%] w-[600px] h-[300px] rounded-full animate-content-pulse" 
        style={{ backgroundColor: "rgba(13,148,136,0.05)", filter: "blur(100px)", animationDelay: "12s" }} 
      />

      {/* 7. Tiny Moving Connection Lines (Faint dashboard curves) */}
      <svg className="absolute inset-0 w-full h-full animate-content-line opacity-30" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path d="M 0,200 Q 400,150 800,250 T 1600,200" stroke="rgba(13,148,136,0.08)" strokeWidth="1" strokeDasharray="6 6" />
        <path d="M 0,600 Q 500,680 1000,580 T 2000,650" stroke="rgba(37,99,235,0.06)" strokeWidth="1" strokeDasharray="8 8" />
        <path d="M 0,1100 Q 600,1020 1200,1120 T 2400,1050" stroke="rgba(20,184,166,0.07)" strokeWidth="1" strokeDasharray="4 8" />
      </svg>

      {/* 2. Floating Particles */}
      {particles.map((p, idx) => (
        <div
          key={`particle-${idx}`}
          className={`absolute rounded-full bg-slate-teal ${p.anim}`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.12,
            animationDelay: p.delay
          }}
        />
      ))}

      {/* 5. Floating Medical Symbols */}
      {symbols.map((s, idx) => (
        <div
          key={`sym-${idx}`}
          className={`absolute font-bold text-slate-teal flex items-center justify-center select-none ${s.anim}`}
          style={{
            left: s.left,
            top: s.top,
            fontSize: `${s.size}px`,
            opacity: 0.05,
            animationDelay: s.delay
          }}
        >
          {s.char}
        </div>
      ))}

      {/* 4. Soft Light Sweep */}
      <div className="absolute inset-0 w-full h-full animate-content-sweep pointer-events-none" />
    </div>
  );
}
