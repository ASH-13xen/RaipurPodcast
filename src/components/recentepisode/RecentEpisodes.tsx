"use client";

import { useState } from "react";
import { EpisodeCard } from "./EpisodeCard";
import { episodes } from "@/data/RecentEpisode";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RecentEpisodes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- Handlers for Mobile Navigation ---
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % episodes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + episodes.length) % episodes.length);
  };

  return (
    <section className="relative bg-slate-950 py-12 md:py-24 overflow-hidden">
      {/* --- THEME: RADIAL SPOTLIGHTS --- */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-medium text-white mb-2 md:mb-4">
            Recent Episodes
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Catch up on our latest conversations
          </p>
        </div>

        {/* --- DESKTOP VIEW: Grid Layout (Hidden on Mobile) --- */}
        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.episodeNumber} {...episode} />
          ))}
        </div>

        {/* --- MOBILE VIEW: Carousel Layout (Hidden on Desktop) --- */}
        <div className="md:hidden">
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <EpisodeCard {...episodes[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={handlePrev}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-purple-500 hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft className="size-5" />
              <span className="font-medium">Prev</span>
            </button>

            <span className="text-sm text-slate-500 font-medium">
              {currentIndex + 1} / {episodes.length}
            </span>

            <button
              onClick={handleNext}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 hover:border-purple-500 hover:text-white transition-all active:scale-95"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
