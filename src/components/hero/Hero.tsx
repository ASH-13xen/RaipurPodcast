/* eslint-disable @next/next/no-img-element */
"use client";

import { Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-6 pb-0 md:pt-35 md:pb-80">
      {/* --- RADIAL SPOTLIGHTS --- */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzhjNWJmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-[0.03]"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6 pt-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-purple-200 border border-purple-500/20">
              <TrendingUp className="size-4" />
              <span className="text-sm font-medium">
                Top Rated Podcast 2026
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white">
              The Voice of{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
              Join us every week as we explore the minds of industry leaders,
              innovators, and change-makers shaping tomorrow&apos;s world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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

            <div className="flex items-center gap-8 pt-4 border-t border-slate-800 mt-8">
              <div>
                <div className="text-3xl text-white font-bold">500+</div>
                <div className="text-sm text-slate-400">Episodes</div>
              </div>
              <div className="h-12 w-px bg-slate-800"></div>
              <div>
                <div className="text-3xl text-white font-bold">2M+</div>
                <div className="text-sm text-slate-400">Listeners</div>
              </div>
              <div className="h-12 w-px bg-slate-800"></div>
              <div>
                <div className="text-3xl text-white font-bold">4.9</div>
                <div className="text-sm text-slate-400">Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
