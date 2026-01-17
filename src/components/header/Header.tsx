"use client";

import Link from "next/link";
import { Mic2, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NewsletterModal } from "../NewsLetterModal";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Guests", href: "/guests" },
    { name: "Blogs", href: "/blogs" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-white/5 -mt-1">
      <div className="container mx-auto px-4 md:px-6">
        {/* Using a grid to ensure perfect centering of the nav regardless of left/right content width */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 1. LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2 select-none group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-900/20 group-hover:shadow-purple-500/30 transition-shadow">
              <Mic2 className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              RaipurPodcast
            </span>
          </Link>

          {/* 2. CENTER: Pill Navigation (Visible on Desktop) */}
          {/* Absolute positioning ensures it stays dead-center relative to screen */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-xl">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. RIGHT: CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Subscribe Button (Desktop Only) */}
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-xl"
            >
              <Sparkles className="size-3.5 text-purple-600" />
              <span className="text-slate-400 hover:text-white rounded-full transition-all duration-300">
                Recieve Regular Updates
              </span>
            </Button>
            <NewsletterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <Menu className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
