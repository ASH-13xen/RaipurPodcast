"use client";

import { Play, Clock } from "lucide-react";
import Image from "next/image";

interface EpisodeCardProps {
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  imageUrl: string;
}

export function EpisodeCard({
  episodeNumber,
  title,
  description,
  duration,
  date,
  imageUrl,
}: EpisodeCardProps) {
  return (
    <div className="group relative bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

        {/* Play Button - Centered */}
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 md:size-14 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:hover:scale-110 shadow-lg shadow-purple-900/50">
          <Play className="size-5 md:size-6 fill-white text-white ml-1" />
        </button>

        {/* Episode Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] md:text-xs font-medium text-purple-300 border border-purple-500/30">
          EP {episodeNumber}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 md:p-6 flex flex-col grow">
        <h3 className="text-lg md:text-xl font-medium text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed grow">
          {description}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mt-auto">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="size-3.5" />
            <span>{duration}</span>
          </div>
          <span className="text-slate-700">•</span>
          <span className="text-slate-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
