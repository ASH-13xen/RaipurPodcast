"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Added to highlight active page
import { Mic2, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NewsletterModal } from "../NewsLetterModal";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Hook to get current URL

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

          {/* 2. CENTER: Desktop Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-xl">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                      pathname === link.href
                        ? "text-white bg-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3. RIGHT: CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Subscribe Button (Desktop) */}
            <Button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              className="hidden sm:flex items-center gap-1 p-1 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-xl"
            >
              <Sparkles className="size-3.5 text-purple-600" />
              <span className="text-slate-400 hover:text-white rounded-full transition-all duration-300 px-2">
                Recieve Regular Updates
              </span>
            </Button>

            <NewsletterModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>

                {/* 3. Mobile Menu Content */}
                <SheetContent
                  side="right"
                  className="bg-slate-950 border-l border-white/10 text-white z-[100] w-[300px] sm:w-[350px]"
                >
                  {/* Internal Header with Logo */}
                  <div className="flex items-center gap-2 mb-8 mt-2 select-none">
                    <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-900/20">
                      <Mic2 className="size-4 text-white" />
                    </div>
                    <SheetTitle className="text-lg font-bold text-white tracking-tight">
                      RaipurPodcast
                    </SheetTitle>
                  </div>

                  <SheetDescription className="sr-only">
                    Mobile navigation menu
                  </SheetDescription>

                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                            isActive
                              ? "bg-white/10 text-white"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}

                    <div className="my-2 border-t border-white/5" />

                    {/* Mobile Subscribe Button */}
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsModalOpen(true);
                      }}
                      className="w-full justify-start px-4 py-6 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 border border-purple-500/20 text-white transition-all group"
                    >
                      <Sparkles className="size-4 mr-3 text-purple-400 group-hover:text-purple-300" />
                      Recieve Regular Updates
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
