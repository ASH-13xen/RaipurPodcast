"use client";

import { Play, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { FEATURED_DATA } from "../../data/FeaturedData";
// 1. IMPORT TOOLTIP COMPONENTS
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function FeaturedEpisode() {
  const { section, episode } = FEATURED_DATA;

  return (
    <section
      className="relative py-12 md:py-24 overflow-hidden bg-[#0a0d20]"
      id="recentepisode"
    >
      {/* --- THEME: RADIAL SPOTLIGHTS --- */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-medium text-white mb-3 md:mb-4">
            {section.heading}
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            {section.subHeading}
          </p>
        </div>

        {/* Featured Card */}
        <div className="max-w-7xl mx-auto bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl hover:border-slate-700 transition-colors duration-300 md:h-[550px]">
          <div className="grid md:grid-cols-12 gap-0 h-full">
            {/* Image Section - Adjusted Height for Mobile */}
            <div className="md:col-span-5 relative h-56 sm:h-72 md:h-full w-full">
              <Image
                src={episode.image}
                alt={episode.imageAlt || "Episode Cover"}
                width={800}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden"></div>
            </div>

            {/* Content Section - Adjusted Padding and Text Sizes */}
            <div className="md:col-span-7 p-6 md:p-12 flex flex-col justify-center h-full">
              <div className="inline-flex items-center gap-2 w-fit rounded-full bg-pink-500/10 px-4 py-1.5 text-pink-300 border border-pink-500/20 mb-4">
                <span className="text-xs md:text-sm font-medium">
                  {episode.number}
                </span>
              </div>

              {/* 2. WRAP TITLE IN TOOLTIP */}
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    {/* Title: Adjusted text size */}
                    <h3 className="text-xl md:text-4xl font-medium text-white mb-4 md:mb-6 leading-tight line-clamp-2 hover:cursor-help">
                      {episode.title}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[400px] bg-slate-950 border-slate-800 text-slate-200">
                    <p className="font-medium">{episode.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* 3. WRAP DESCRIPTION IN TOOLTIP */}
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    {/* Description: Smaller text on mobile, fewer lines */}
                    <p className="text-slate-300 mb-6 md:mb-8 leading-relaxed text-base md:text-lg line-clamp-3 md:line-clamp-5 hover:cursor-help">
                      {episode.description}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="max-w-[500px] bg-slate-950 border-slate-800 text-slate-300"
                  >
                    <p className="text-sm leading-relaxed">
                      {episode.description}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="mt-auto">
                <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8 text-xs md:text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-purple-400" />
                    <span>{episode.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-pink-400" />
                    <span>{episode.duration}</span>
                  </div>
                </div>

                <a
                  href={FEATURED_DATA.episode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full md:w-auto"
                >
                  <button className="w-full md:w-auto bg-white text-slate-950 px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                    <Play className="size-5 fill-current" />
                    Listen Now
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
