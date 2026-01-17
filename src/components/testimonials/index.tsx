"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Mic, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility Helper ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Constants ---
const SQRT_5000 = Math.sqrt(5000);

// --- Data ---
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Finally, a platform that gives a voice to Chhattisgarh's talent. Proud to listen to this every week.",
    by: "Amit S., Student at NIT Raipur",
    role: "Listener",
    imgSrc: "https://i.pravatar.cc/150?img=11",
  },
  {
    tempId: 1,
    testimonial:
      "Partnering with Raipur Podcast gave our cafe the best ROI. The local reach is unmatched.",
    by: "Rahul Verma, Owner of Café 90s",
    role: "Sponsor",
    imgSrc: "https://i.pravatar.cc/150?img=12",
  },
  {
    tempId: 2,
    testimonial:
      "The production quality matches international standards. Ankit asks the questions that actually matter.",
    by: "Neha Sharma, Digital Creator",
    role: "Guest",
    imgSrc: "https://i.pravatar.cc/150?img=5",
  },
  {
    tempId: 3,
    testimonial:
      "I stopped listening to music on my commute. Now I just listen to these stories. Truly inspiring.",
    by: "Priya P., Software Engineer",
    role: "Super Fan",
    imgSrc: "https://i.pravatar.cc/150?img=9",
  },
  {
    tempId: 4,
    testimonial:
      "A professional team that makes you feel so comfortable. Best interview experience of my life.",
    by: "Dr. A. Singh, Heart Specialist",
    role: "Guest",
    imgSrc: "https://i.pravatar.cc/150?img=13",
  },
  {
    tempId: 5,
    testimonial:
      "If you want to know what's really happening in the city's startup ecosystem, this is the only source.",
    by: "Karan, Founder of TechBhilai",
    role: "Listener",
    imgSrc: "https://i.pravatar.cc/150?img=15",
  },
  {
    tempId: 6,
    testimonial:
      "Authentic, raw, and unfiltered. No other podcast in the state comes close to this depth.",
    by: "Sonia M., Journalist",
    role: "Listener",
    imgSrc: "https://i.pravatar.cc/150?img=20",
  },
];

// --- Sub-Component: Card ---
interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer p-8 transition-all duration-500 ease-in-out flex flex-col justify-between backdrop-blur-md",
        isCenter
          ? // UPDATED: Deeper, richer gradient and subtler glow
            "z-10 bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 text-white shadow-[0_0_40px_rgba(168,85,247,0.25)] border-purple-500/40"
          : // Inactive cards are now slightly darker too
            "z-0 bg-slate-950/90 text-slate-400 border border-slate-800 hover:border-purple-500/30 shadow-xl"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -20 : position % 2 ? 30 : -30}px)
          rotate(${isCenter ? 0 : position % 2 ? 4 : -4}deg)
          scale(${isCenter ? 1 : 0.9})
        `,
        opacity: Math.abs(position) > 2 ? 0 : 1,
      }}
    >
      {/* Corner Accent Line */}
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          // Kept white/40 for contrast against the dark gradient
          isCenter ? "bg-white/40" : "bg-slate-800"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />

      {/* Header: Image & Quote Icon */}
      <div className="relative z-10 flex items-start justify-between">
        <img
          src={testimonial.imgSrc}
          alt={testimonial.by.split(",")[0]}
          className={cn(
            "h-14 w-12 object-cover object-top rounded-sm border-2",
            // UPDATED: Darker border accent
            isCenter ? "border-purple-400/50" : "border-slate-800 opacity-70"
          )}
        />
        <Quote
          className={cn(
            "w-8 h-8 opacity-20",
            isCenter ? "text-white" : "text-purple-600"
          )}
        />
      </div>

      {/* Body: Testimonial Text */}
      <div className="relative z-10 mt-4">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-3 h-3 fill-current",
                // UPDATED: Muted purple stars instead of bright pink
                isCenter ? "text-purple-300" : "text-slate-700"
              )}
            />
          ))}
        </div>
        <h3
          className={cn(
            "text-lg sm:text-xl font-medium leading-snug",
            isCenter ? "text-white" : "text-slate-300"
          )}
        >
          &quot;{testimonial.testimonial}&quot;
        </h3>
      </div>

      {/* Footer: Author Info */}
      <div className="relative z-10 mt-auto pt-4 border-t border-white/10">
        <p
          className={cn(
            "text-sm font-bold uppercase tracking-wider",
            isCenter ? "text-white" : "text-slate-400"
          )}
        >
          {testimonial.by}
        </p>
        <p
          className={cn(
            "text-xs font-medium mt-1",
            // UPDATED: Muted purple role text
            isCenter ? "text-purple-200" : "text-purple-500"
          )}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
const StaggeredTestimonials = () => {
  const [cardSize, setCardSize] = useState(320);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 360 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0a0d20] py-24 relative overflow-hidden">
      {/* Background Glows (Matching the Hero) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-800/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-800/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-16 text-center relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-purple-400 text-sm font-medium mb-4">
          <Mic className="w-3 h-3" />
          <span>Community Love</span>
        </div>
        <h2 className="text-3xl font-bold text-white sm:text-5xl tracking-tight">
          What the City is Saying
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
          From students in dorm rooms to CEOs in boardrooms, Raipur is tuning
          in.
        </p>
      </div>

      <div
        className="relative w-full max-w-6xl overflow-hidden"
        style={{ height: 500 }}
      >
        {testimonialsList.map((testimonial, index) => {
          const position =
            testimonialsList.length % 2
              ? index - (testimonialsList.length + 1) / 2
              : index - testimonialsList.length / 2;

          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}

        {/* Gradient Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0a0d20] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0a0d20] to-transparent z-20" />

        {/* Navigation Buttons */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-4 z-30">
          <button
            onClick={() => handleMove(-1)}
            // UPDATED hover colors to match darker theme
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 shadow-lg transition-all hover:bg-purple-800 hover:border-purple-700 hover:text-white active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleMove(1)}
            // UPDATED hover colors to match darker theme
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-300 shadow-lg transition-all hover:bg-purple-800 hover:border-purple-700 hover:text-white active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StaggeredTestimonials;
