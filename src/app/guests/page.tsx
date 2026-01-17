"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Search,
  MessageCircle,
  ArrowRight,
  Users,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Data & Components
import { GUESTS_DATA } from "@/data/guestlist";
import { GuestCard } from "@/components/guests/GuestCard";

/* eslint-disable @next/next/no-img-element */

export default function GuestsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // --- REFS FOR SCROLLING ---
  const directoryRef = useRef<HTMLElement>(null);
  const qaRef = useRef<HTMLElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const categories = ["All", "Tech", "Business", "Health", "Art", "Science"];

  // 1. Scheduled Guests
  const upcomingGuests = GUESTS_DATA.filter((g) => g.status === "upcoming");

  // 2. Directory Guests
  const directoryGuests = GUESTS_DATA.filter((g) => {
    if (g.status === "upcoming") return false;
    const categoryMatch = filter === "All" || g.category === filter;
    const searchMatch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.company.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 translate-x-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzhjNWJmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-[0.03]"></div>

      {/* Adjusted padding for mobile */}
      <main className="container mx-auto px-4 md:px-8 py-12 md:py-24 relative z-10 space-y-16 md:space-y-24">
        {/* --- HEADER --- */}
        <div className="relative max-w-4xl mx-auto text-center space-y-6 md:space-y-8 pt-12 pb-12 md:pt-5 md:pb-24">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Conversations That <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 animate-gradient bg-[length:200%_auto]">
              Shift Reality
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2"
          >
            Go beyond the headlines. We sit down with the world&apos;s most
            elusive thinkers to deconstruct the future, one idea at a time.
          </motion.p>

          {/* --- HERO ACTION BUTTONS --- */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 w-full md:w-auto px-4 md:px-0"
          >
            <Button
              size="lg"
              className="bg-white text-slate-950 hover:bg-slate-200 font-bold h-12 px-8 w-full sm:w-auto"
              onClick={() => scrollToSection(directoryRef)}
            >
              <Users className="mr-2 size-5" /> View All Guests
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12 px-8 w-full sm:w-auto"
              onClick={() => scrollToSection(qaRef)}
            >
              <MessageCircle className="mr-2 size-5" /> Ask a Question
            </Button>
          </motion.div>
        </div>

        {/* --- SECTION 1: SCHEDULED GUESTS (Compact Version) --- */}
        {upcomingGuests.length > 0 && (
          <section>
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-1.5 md:w-2 h-8 md:h-11 rounded-full" />
              <h2 className="text-2xl md:text-4xl font-bold text-white flex items-center gap-2">
                <Clock className="text-purple-400 size-6 md:size-8" /> Upcoming
                Schedule
              </h2>
            </div>

            {/* Fixed width issue: Removed w-500, added w-full, adjusted grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
              {upcomingGuests.map((guest) => (
                <div
                  key={guest.id}
                  className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex flex-row h-28 md:h-full relative z-10">
                    {/* Image */}
                    <div className="w-1/3 relative overflow-hidden shrink-0">
                      <div className="absolute top-2 left-2 z-20">
                        <Badge className="bg-red-500/90 hover:bg-red-500 border-0 animate-pulse text-white text-[10px] px-2 py-0.5">
                          LIVE
                        </Badge>
                      </div>
                      <img
                        src={guest.image}
                        alt={guest.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3 md:p-4 flex flex-col justify-center flex-1 min-w-0">
                      <div className="text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Calendar className="size-3 shrink-0" />
                        <span className="text-white truncate">
                          {guest.date}
                        </span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-white mb-0.5 leading-tight truncate">
                        {guest.name}
                      </h3>
                      <p className="text-slate-400 text-xs truncate">
                        {guest.role}
                      </p>
                      <p className="text-slate-500 text-xs truncate">
                        {guest.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <Separator className="bg-slate-800/50" />

        {/* --- SECTION 2: GUEST DIRECTORY --- */}
        <section className="space-y-6 md:space-y-8" ref={directoryRef}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 md:mb-2">
                Guest Directory
              </h2>
              <p className="text-slate-400 text-sm">
                Browse our complete history of speakers.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 size-4" />
              <Input
                placeholder="Search guests, roles..."
                className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-purple-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Buttons - scrollable on very small screens if needed, otherwise wrapping */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                  filter === cat
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20"
                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/30 backdrop-blur-sm overflow-hidden">
            <ScrollArea className="h-[500px] md:h-[600px] w-full p-4 md:p-6">
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {directoryGuests.map((guest) => (
                    <GuestCard key={guest.id} guest={guest} />
                  ))}
                </AnimatePresence>

                {directoryGuests.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-20 flex flex-col items-center justify-center text-center"
                  >
                    <Search className="size-10 md:size-12 text-slate-700 mb-4" />
                    <h3 className="text-base md:text-lg font-medium text-white">
                      No guests found
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Try adjusting your search or category filter.
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setFilter("All");
                        setSearchQuery("");
                      }}
                      className="text-purple-400"
                    >
                      Clear all filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </ScrollArea>
          </div>
        </section>

        {/* --- SECTION 3: Q&A CTA --- */}
        <section
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-12 text-center md:text-left"
          ref={qaRef}
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-40 md:w-64 h-40 md:h-64 bg-purple-500/20 rounded-full blur-[40px] md:blur-[60px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-40 md:w-64 h-40 md:h-64 bg-pink-500/20 rounded-full blur-[40px] md:blur-[60px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="max-w-2xl space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                <MessageCircle className="size-3" /> Community Q&A
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Have a question for a guest?
              </h2>
              <p className="text-slate-400 text-sm md:text-lg">
                Submit your most thought-provoking questions. If selected,
                we&apos;ll get them answered directly by the guest.
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <Button
                onClick={() => router.push("/contact-us")}
                size="lg"
                className="bg-white text-slate-950 hover:bg-slate-200 font-bold text-sm md:text-md px-8 py-6 h-auto shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] w-full md:w-auto"
              >
                Ask a Question <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
