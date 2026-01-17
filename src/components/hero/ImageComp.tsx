"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { TrendingUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Types ---
interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
}

// --- Configuration / Data ---
const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: "Global Reach",
    imageUrl: "/Home/image1.png",
  },
  {
    id: 2,
    title: "Community Driven",
    imageUrl: "/Home/image1.png",
  },
  {
    id: 3,
    title: "Expert Insights",
    imageUrl: "/Home/image1.png",
  },
  {
    id: 4,
    title: "Future Ready",
    imageUrl: "/Home/image1.png",
  },
  {
    id: 5,
    title: "Innovation Hub",
    imageUrl: "/Home/image1.png",
  },
];

// --- Sub-Component: Individual Accordion Card ---
interface AccordionItemProps {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isActive,
  onMouseEnter,
}) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
        border border-slate-800 bg-slate-900/50 shadow-2xl
        ${
          isActive
            ? "w-[400px] border-purple-500/30 shadow-purple-900/20"
            : "w-[80px] hover:bg-slate-800"
        }
      `}
      onMouseEnter={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`
          absolute inset-0 w-full h-full object-cover transition-opacity duration-500
          ${isActive ? "opacity-100" : "opacity-40 grayscale"}
        `}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "https://placehold.co/400x450/1e293b/cbd5e1?text=Image";
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

      {/* Text Label */}
      <span
        className={`
          absolute text-white font-medium whitespace-nowrap
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? "bottom-8 left-8 text-2xl rotate-0 opacity-100 translate-y-0"
              : "bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-lg rotate-[-90deg] opacity-70 tracking-widest"
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main Component ---
export default function LandingHero() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    // THEME: Slate-950 Background with Radial Spotlights
    <div className="relative min-h-screen bg-slate-950 font-sans flex items-center overflow-hidden">
      {/* 1. Purple Glow (Top Left) */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Pink Glow (Bottom Right) */}
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzhjNWJmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-[0.03]"></div>

      <section className="container relative mx-auto px-4 py-12 md:py-24 z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-16 xl:gap-24">
          {/* Left Side: Text Content */}
          <div className="w-full xl:w-5/12 text-center xl:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-purple-200 border border-purple-500/20 mb-8">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">
                Top Rated Podcast 2026
              </span>
            </div>

            {/* FIXED TEXT SIZE: 'text-6xl' is applied without responsive prefixes */}
            <h1 className="text-6xl font-medium text-white leading-[1.1] tracking-tight">
              The Voice of <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>

            <p className="mt-8 text-xl text-slate-300 leading-relaxed max-w-xl mx-auto xl:mx-0">
              Join us every week as we explore the minds of industry leaders,
              innovators, and change-makers shaping tomorrow&apos;s world.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
              <Button
                size="lg"
                className="gap-2 px-8 font-medium bg-white text-slate-950 hover:bg-slate-200"
              >
                <Play className="size-5 fill-current" />
                Listen Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-slate-700 hover:bg-slate-800 hover:text-white"
              >
                Browse Episodes
              </Button>
            </div>
          </div>

          {/* Right Side: Accordion */}
          <div className="w-full xl:w-7/12">
            <div className="flex flex-row items-center justify-center xl:justify-end gap-2 overflow-hidden py-4 px-2">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
