import Image from "next/image";

interface MuskaanAssistantAvatarProps {
  className?: string;
  decorative?: boolean;
}

export default function MuskaanAssistantAvatar({
  className = "h-12 w-12",
  decorative = false,
}: MuskaanAssistantAvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full ${className}`}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : "Muskaan AI Guide"}
    >
      <Image
        src="/chatbot-doctor-logo.png"
        alt="Muskaan AI Guide"
        fill
        sizes="64px"
        className="scale-[1.08] object-cover object-center"
        priority={false}
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-white/35" aria-hidden="true" />
    </div>
  );
}
