"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Mic, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- CONFIGURATION DATA ---
const HOST_DATA = {
  name: "Ankit Sharma", // Replace with actual host name
  role: "Host & Creator",
  bio: [
    "I believe that every person in Raipur has a story that can change someone's life. My mission is simple: to dig deep, ask the hard questions, and bring those stories to light.",
    "From sticking to a 9-to-5 job to becoming a full-time creator, my journey has been about taking risks. Now, I sit down with entrepreneurs, artists, and officers to learn how they took theirs.",
  ],
  stats: [
    { label: "Episodes", value: "50+", icon: Mic },
    { label: "Listeners", value: "10K+", icon: Users },
    { label: "Rating", value: "4.9", icon: Star },
  ],
  socials: {
    instagram: "#",
    linkedin: "#",
    twitter: "#",
  },
  image: "/Home/image1.png", // Replace with your host image path
};

export function AboutHost() {
  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden">
      {/* --- Background Glows --- */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE: Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            {/* Image Card */}
            <div className="relative z-10 rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50 shadow-2xl aspect-[4/5] max-w-md mx-auto lg:mx-0">
              <Image
                src={HOST_DATA.image}
                alt={HOST_DATA.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>

              {/* Floating Name Card (Mobile/Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950 to-transparent">
                <h3 className="text-2xl font-bold text-white">
                  {HOST_DATA.name}
                </h3>
                <p className="text-purple-400 font-medium">{HOST_DATA.role}</p>
              </div>
            </div>

            {/* Decorative Elements behind image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-purple-500/20 -z-10 group-hover:-top-6 group-hover:-left-6 transition-all duration-300" />
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-slate-800/20 -z-20" />
          </motion.div>

          {/* RIGHT SIDE: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-purple-400 text-sm font-medium w-fit mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Meet the Host
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Asking the questions <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                you want answered.
              </span>
            </h2>

            <div className="space-y-6 text-slate-300 text-lg leading-relaxed mb-10">
              {HOST_DATA.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-800 py-8 mb-10">
              {HOST_DATA.stats.map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1 text-slate-400 text-sm uppercase tracking-wider font-medium">
                    <stat.icon className="w-4 h-4" />
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="rounded-full border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-purple-400 transition-colors h-12 px-6"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Instagram
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-blue-400 transition-colors h-12 px-6"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-slate-700 bg-transparent text-white hover:bg-slate-800 hover:text-blue-600 transition-colors h-12 px-6"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
