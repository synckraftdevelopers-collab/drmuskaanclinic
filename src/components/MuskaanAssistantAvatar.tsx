import React from "react";

interface MuskaanAssistantAvatarProps {
  className?: string;
  decorative?: boolean;
}

export default function MuskaanAssistantAvatar({
  className = "h-12 w-12",
  decorative = false,
}: MuskaanAssistantAvatarProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : "Muskaan AI Guide"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="muskaan-avatar-bg" x1="8" y1="5" x2="55" y2="60">
          <stop offset="0" stopColor="#2A9D8F" />
          <stop offset="1" stopColor="#12355B" />
        </linearGradient>
        <linearGradient id="muskaan-avatar-face" x1="19" y1="17" x2="44" y2="48">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCEEF5" />
        </linearGradient>
        <filter id="muskaan-avatar-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#071D2F" floodOpacity="0.28" />
        </filter>
      </defs>

      <circle cx="32" cy="32" r="30" fill="url(#muskaan-avatar-bg)" />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" />

      <path
        d="M18 31.5C18 22.4 23.8 16 32 16s14 6.4 14 15.5V40c0 6.1-5.1 11-11.3 11h-5.4C23.1 51 18 46.1 18 40v-8.5Z"
        fill="url(#muskaan-avatar-face)"
        filter="url(#muskaan-avatar-shadow)"
      />
      <path
        d="M22.5 22.8c2.3-4.2 5.5-6.3 9.5-6.3 4.1 0 7.4 2.1 9.6 6.3-2.9-1.3-6.1-2-9.6-2s-6.7.7-9.5 2Z"
        fill="#FFFFFF"
        fillOpacity="0.72"
      />

      <ellipse cx="26.5" cy="33" rx="2.2" ry="2.6" fill="#12355B" />
      <ellipse cx="37.5" cy="33" rx="2.2" ry="2.6" fill="#12355B" />
      <circle cx="27.1" cy="32.3" r="0.65" fill="#FFFFFF" />
      <circle cx="38.1" cy="32.3" r="0.65" fill="#FFFFFF" />
      <path
        d="M26.2 40.2c1.6 2 3.5 3 5.8 3s4.2-1 5.8-3"
        fill="none"
        stroke="#2A9D8F"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      <circle cx="47" cy="18" r="8" fill="#FFFFFF" filter="url(#muskaan-avatar-shadow)" />
      <path d="M47 13.8v8.4M42.8 18h8.4" stroke="#2A9D8F" strokeWidth="2.4" strokeLinecap="round" />

      <path
        d="m14.3 18 .9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z"
        fill="#F5C66A"
      />
      <path
        d="m50.5 42 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"
        fill="#F5C66A"
      />
    </svg>
  );
}