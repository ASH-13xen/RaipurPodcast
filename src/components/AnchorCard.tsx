/* eslint-disable react/no-unescaped-entities */
import { Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const ANCHOR_DATA = {
  name: "Prakhar Agarwal",
  role: "Host & Founder",
  bio: "A curious mind from Raipur exploring the intersection of technology, culture, and human stories. Before starting Raipur Podcast, I spent a decade in software engineering and community building. My mission is to unearth the hidden gems of Chhattisgarh and bring their stories to the world.",
  philosophy:
    "I believe every person has one story that can change someone else's life.",
  image: "/Home/image1.png",
  socials: {
    linkedin: "#",
    twitter: "#",
    instagram: "#",
  },
};

const AnchorCard = () => {
  return (
    <>
      {/* --- SECTION 1: THE ANCHOR (Spotlight) --- */}
      {/* CHANGED: Reduced mt-65 to mt-24 so it doesn't push off screen */}
      <section className="relative w-[90vw] md:w-[70vw] mt-24 md:mt-10">
        {/* Adjusted Gradient to match Purple Theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 rounded-[2rem] md:rounded-[3rem] -z-10" />

        {/* Darker background with purple border tint */}
        {/* MOBILE: p-5 | DESKTOP: p-12 */}
        <div className="bg-slate-950/80 border border-slate-800/60 rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 backdrop-blur-md overflow-hidden shadow-2xl shadow-purple-900/10">
          {/* MOBILE: Flex-col (Vertical) | DESKTOP: Grid (Side-by-side) */}
          <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-12 items-center">
            {/* --- Anchor Image Section --- */}
            <div className="w-full md:col-span-5 relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-500" />

              {/* CHANGED: Reduced mobile height to h-52 (was h-[300px]) to save space */}
              <div className="relative h-52 md:h-[450px] w-full rounded-xl md:rounded-2xl overflow-hidden border border-slate-800/50">
                <img
                  src={ANCHOR_DATA.image}
                  alt={ANCHOR_DATA.name}
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* --- MOBILE ONLY: Name Overlay --- */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-8 pb-3 px-4 md:hidden">
                  <Badge
                    variant="outline"
                    className="text-[10px] text-purple-300 border-purple-500/30 bg-purple-900/50 backdrop-blur-sm px-2 py-0.5 mb-1"
                  >
                    The Voice
                  </Badge>
                  <h2 className="text-xl font-bold text-white leading-none">
                    {ANCHOR_DATA.name}
                  </h2>
                  <p className="text-purple-400 text-xs font-medium mt-0.5">
                    {ANCHOR_DATA.role}
                  </p>
                </div>
              </div>
            </div>

            {/* --- Anchor Bio Section --- */}
            <div className="w-full md:col-span-7 space-y-4 md:space-y-8">
              {/* DESKTOP ONLY: Header (Hidden on Mobile because it's in the overlay) */}
              <div className="space-y-2 hidden md:block">
                <Badge
                  variant="outline"
                  className="text-purple-400 border-purple-500/30 bg-purple-500/10 px-3 py-1 mb-2"
                >
                  The Voice
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {ANCHOR_DATA.name}
                </h2>
                <p className="text-xl text-purple-400 font-medium tracking-wide">
                  {ANCHOR_DATA.role}
                </p>
              </div>

              {/* Bio Text */}
              <div className="space-y-4 md:space-y-6">
                {/* MOBILE: Text-sm/Base | DESKTOP: Text-lg */}
                <p className="text-slate-300 text-sm md:text-lg leading-relaxed text-justify md:text-left">
                  {ANCHOR_DATA.bio}
                </p>

                <blockquote className="border-l-4 border-pink-500 pl-4 md:pl-6 py-2 bg-slate-900/50 rounded-r-xl italic text-slate-400 text-xs md:text-base">
                  "{ANCHOR_DATA.philosophy}"
                </blockquote>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-3 md:gap-4 pt-1 md:pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-700 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 h-9 w-9 md:h-10 md:w-10"
                >
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-700 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 h-9 w-9 md:h-10 md:w-10"
                >
                  <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-slate-700 bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-purple-400 hover:border-purple-500/50 transition-all duration-300 h-9 w-9 md:h-10 md:w-10"
                >
                  <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnchorCard;
