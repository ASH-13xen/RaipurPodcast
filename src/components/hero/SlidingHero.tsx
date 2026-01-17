"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Utility Helper ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  images: string[];
  className?: string;
}

// --- Sub-Components ---
const HeroButton = ({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "px-8 py-3 rounded-full font-bold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 flex items-center justify-center gap-2",
      variant === "primary"
        ? "bg-white text-slate-950 hover:bg-slate-200"
        : "bg-slate-900/50 text-white border border-slate-700 hover:bg-slate-800 hover:border-purple-500 backdrop-blur-sm",
    )}
  >
    {children}
  </motion.button>
);

const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  images,
  className,
}) => {
  const router = useRouter();

  // --- HANDLERS ---
  const handleScrollToEpisodes = () => {
    // Target the ID "recentepisode"
    const section = document.getElementById("recentepisode");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("Section with id 'recentepisode' not found.");
    }
  };

  const handleNavigateToTools = () => {
    router.push("/tools");
  };

  // --- ANIMATION VARIANTS ---
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  const duplicatedImages = [...images, ...images];

  // --- SCROLL LOGIC ---
  const { scrollY } = useScroll();
  const marqueeOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const marqueeY = useTransform(scrollY, [0, 100], [100, 0]);
  const scrollHintOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section
      className={cn(
        "relative w-full h-screen overflow-hidden bg-slate-950 bg-[url('/bg1.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center px-4",
        className,
      )}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/70 pointer-events-none" />

      {/* --- THEME: RADIAL SPOTLIGHTS --- */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content (Text) */}
      <div className="z-10 flex flex-col items-center max-w-4xl mx-auto mt-[-25vh]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="mb-6 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 pt-10 text-sm font-medium text-purple-200 backdrop-blur-sm"
        >
          {tagline}
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
        >
          {typeof title === "string" ? (
            title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={FADE_IN_ANIMATION_VARIANTS}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            <motion.span
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="inline-block"
            >
              {title}
            </motion.span>
          )}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl text-lg text-slate-300"
        >
          {description}
        </motion.p>

        {/* BUTTON GROUP */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* RIGHT BUTTON: Primary (Episodes Scroll) */}
          <HeroButton variant="primary" onClick={handleScrollToEpisodes}>
            {ctaText}
          </HeroButton>
        </motion.div>
      </div>

      {/* --- SCROLL HINT INDICATOR --- */}
      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 z-20"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>

      {/* --- SCROLL REVEAL MARQUEE --- */}
      <motion.div
        style={{ opacity: marqueeOpacity, y: marqueeY }}
        className="absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 pointer-events-none select-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
      >
        {/* MOBILE MARQUEE: FASTER (duration: 20) */}
        <motion.div
          className="flex md:hidden gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 20, // Faster for mobile
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`mobile-${index}`}
              className="relative aspect-[3/4] h-56 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl"
              style={{
                rotate: `${index % 2 === 0 ? -3 : 3}deg`,
              }}
            >
              <img
                src={src}
                alt={`Raipur Podcast Episode ${index + 1}`}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
          ))}
        </motion.div>

        {/* DESKTOP MARQUEE: ORIGINAL SPEED (duration: 40) */}
        <motion.div
          className="hidden md:flex gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 40, // Original speed for laptop/desktop
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`desktop-${index}`}
              className="relative aspect-[3/4] h-56 md:h-80 flex-shrink-0 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl"
              style={{
                rotate: `${index % 2 === 0 ? -3 : 3}deg`,
              }}
            >
              <img
                src={src}
                alt={`Raipur Podcast Episode ${index + 1}`}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- Main Export ---
const DEMO_IMAGES = [
  "/Home/image1.png",
  "/Home/image2.png",
  "/Home/image3.png",
  "/Home/image4.png",
  "/Home/image5.png",
  "/Home/image6.png",
  "/Home/image7.png",
  "/Home/image8.png",
];

const SlidingHero = () => {
  return (
    <AnimatedMarqueeHero
      tagline="The Voice of Chhattisgarh"
      title={
        <>
          The Untold Stories of
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Raipur City
          </span>
        </>
      }
      description="Join us as we explore the minds of the city's entrepreneurs, artists, and change-makers. Authentic conversations, local insights, and global perspectives."
      ctaText="Listen to Latest Episode"
      images={DEMO_IMAGES}
    />
  );
};

export default SlidingHero;
