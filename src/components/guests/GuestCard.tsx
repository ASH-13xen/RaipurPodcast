"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Play,
} from "lucide-react";
import { Guest } from "@/data/guestlist"; // Ensure path is correct

/* eslint-disable @next/next/no-img-element */

export const GuestCard = ({ guest }: { guest: Guest }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-1 rounded-md bg-slate-950/80 text-xs font-medium text-white backdrop-blur-sm border border-slate-800">
            {guest.category}
          </span>
        </div>
        <img
          src={guest.image}
          alt={guest.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Play Button Overlay (Only appears on hover if there is a link) */}
        {guest.link && (
          <a
            href={guest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
          >
            <div className="bg-white text-slate-950 rounded-full p-3 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
            {guest.name}
          </h4>
          <p className="text-sm text-slate-400 line-clamp-1">{guest.role}</p>
          <p className="text-xs text-slate-500">{guest.company}</p>
        </div>

        {/* Footer: Date & Socials */}
        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            {guest.date}
          </span>

          <div className="flex gap-2">
            {guest.socials?.youtube && (
              <a
                href={guest.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-red-500 transition-colors"
              >
                <Youtube className="size-4" />
              </a>
            )}
            {guest.socials?.linkedin && (
              <a
                href={guest.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="size-4" />
              </a>
            )}
            {guest.socials?.twitter && (
              <a
                href={guest.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-sky-400 transition-colors"
              >
                <Twitter className="size-4" />
              </a>
            )}
            {guest.socials?.instagram && (
              <a
                href={guest.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-pink-500 transition-colors"
              >
                <Instagram className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
